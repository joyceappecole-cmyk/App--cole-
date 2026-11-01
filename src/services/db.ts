/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// IndexedDB service for RéviGenius
const DB_NAME = 'revigenius_offline_db';
const DB_VERSION = 1;

export interface StoredPdfRecord {
  id: string;
  courseId: string;
  name: string;
  size: number;
  type: string;
  blob: Blob;
  savedAt: number;
}

export interface StoredCourseRecord {
  id: string;
  title: string;
  subject: string;
  description?: string;
  createdAt: string;
  createdAtTimestamp: number;
  hasPdf: boolean;
  pdfFileName?: string;
  pdfFileSize?: number;
  pdfFileId?: string;
  facultyId?: string;
}

class DatabaseService {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private async getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    if (typeof window === 'undefined' || !window.indexedDB) {
      throw new Error('IndexedDB n\'est pas disponible dans cet environnement de navigation.');
    }

    this.dbPromise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Store for course metadata
        if (!db.objectStoreNames.contains('courses')) {
          const courseStore = db.createObjectStore('courses', { keyPath: 'id' });
          courseStore.createIndex('subject', 'subject', { unique: false });
          courseStore.createIndex('createdAtTimestamp', 'createdAtTimestamp', { unique: false });
        }

        // Store for actual PDF Blobs
        if (!db.objectStoreNames.contains('pdf_files')) {
          const pdfStore = db.createObjectStore('pdf_files', { keyPath: 'id' });
          pdfStore.createIndex('courseId', 'courseId', { unique: false });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error || new Error('Impossible d\'ouvrir la base de données locale IndexedDB.'));
      };
    });

    return this.dbPromise;
  }

  /**
   * Save a course with optional PDF file into IndexedDB
   */
  async saveCourseWithPdf(
    course: StoredCourseRecord,
    pdfFile?: File | Blob
  ): Promise<{ success: boolean; course: StoredCourseRecord; pdfId?: string }> {
    const db = await this.getDB();

    let pdfId: string | undefined = undefined;

    // 1. If PDF is attached, save it in pdf_files store first
    if (pdfFile) {
      pdfId = `pdf_${course.id}_${Date.now()}`;
      const pdfRecord: StoredPdfRecord = {
        id: pdfId,
        courseId: course.id,
        name: course.pdfFileName || 'document.pdf',
        size: pdfFile.size,
        type: pdfFile.type || 'application/pdf',
        blob: pdfFile,
        savedAt: Date.now(),
      };

      await new Promise<void>((resolve, reject) => {
        try {
          const tx = db.transaction('pdf_files', 'readwrite');
          const store = tx.objectStore('pdf_files');
          const putReq = store.put(pdfRecord);

          putReq.onsuccess = () => resolve();
          putReq.onerror = () => {
            const err = putReq.error;
            if (err && err.name === 'QuotaExceededError') {
              reject(new Error('Espace de stockage insuffisant sur l\'appareil pour enregistrer ce fichier PDF.'));
            } else {
              reject(err || new Error('Erreur lors de l\'enregistrement du fichier PDF dans IndexedDB.'));
            }
          };

          tx.onabort = () => reject(new Error('Transaction interrompue lors de l\'écriture du fichier.'));
        } catch (e) {
          reject(e);
        }
      });

      // Verification read: Ensure the PDF is really there
      const verifyPdf = await this.getPdfBlob(pdfId);
      if (!verifyPdf) {
        throw new Error('Échec de vérification : le document PDF n\'a pas pu être validé dans le stockage.');
      }

      course.hasPdf = true;
      course.pdfFileId = pdfId;
    }

    // 2. Save course metadata
    await new Promise<void>((resolve, reject) => {
      try {
        const tx = db.transaction('courses', 'readwrite');
        const store = tx.objectStore('courses');
        const putReq = store.put(course);

        putReq.onsuccess = () => resolve();
        putReq.onerror = () => reject(putReq.error || new Error('Erreur lors de l\'enregistrement du cours.'));
      } catch (e) {
        reject(e);
      }
    });

    // Verification read of the course
    const verifyCourse = await this.getCourseById(course.id);
    if (!verifyCourse) {
      throw new Error('Échec de vérification : le cours n\'a pas été correctement enregistré.');
    }

    return { success: true, course, pdfId };
  }

  /**
   * Get all courses sorted by createdAtTimestamp desc
   */
  async getAllCourses(): Promise<StoredCourseRecord[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction('courses', 'readonly');
        const store = tx.objectStore('courses');
        const getAllReq = store.getAll();

        getAllReq.onsuccess = () => {
          const list: StoredCourseRecord[] = getAllReq.result || [];
          list.sort((a, b) => (b.createdAtTimestamp || 0) - (a.createdAtTimestamp || 0));
          resolve(list);
        };
        getAllReq.onerror = () => reject(getAllReq.error);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Get single course by ID
   */
  async getCourseById(id: string): Promise<StoredCourseRecord | null> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction('courses', 'readonly');
        const store = tx.objectStore('courses');
        const getReq = store.get(id);

        getReq.onsuccess = () => resolve(getReq.result || null);
        getReq.onerror = () => reject(getReq.error);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Retrieve PDF Blob from IndexedDB
   */
  async getPdfBlob(pdfId: string): Promise<Blob | null> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction('pdf_files', 'readonly');
        const store = tx.objectStore('pdf_files');
        const getReq = store.get(pdfId);

        getReq.onsuccess = () => {
          const record: StoredPdfRecord | undefined = getReq.result;
          resolve(record ? record.blob : null);
        };
        getReq.onerror = () => reject(getReq.error);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Delete a course and its associated PDF from IndexedDB
   */
  async deleteCourse(courseId: string, pdfId?: string): Promise<boolean> {
    const db = await this.getDB();

    // 1. Delete PDF if present
    if (pdfId) {
      await new Promise<void>((resolve) => {
        try {
          const tx = db.transaction('pdf_files', 'readwrite');
          const store = tx.objectStore('pdf_files');
          store.delete(pdfId);
          tx.oncomplete = () => resolve();
          tx.onerror = () => resolve(); // continue even if pdf missing
        } catch {
          resolve();
        }
      });
    }

    // 2. Delete Course record
    await new Promise<void>((resolve, reject) => {
      try {
        const tx = db.transaction('courses', 'readwrite');
        const store = tx.objectStore('courses');
        const delReq = store.delete(courseId);

        delReq.onsuccess = () => resolve();
        delReq.onerror = () => reject(delReq.error);
      } catch (e) {
        reject(e);
      }
    });

    return true;
  }

  /**
   * Clear all stored courses and PDFs from IndexedDB
   */
  async clearAll(): Promise<void> {
    try {
      const db = await this.getDB();
      await new Promise<void>((resolve) => {
        try {
          const tx = db.transaction(['courses', 'pdf_files'], 'readwrite');
          tx.objectStore('courses').clear();
          tx.objectStore('pdf_files').clear();
          tx.oncomplete = () => resolve();
          tx.onerror = () => resolve();
        } catch {
          resolve();
        }
      });
    } catch (e) {
      console.warn('clearAll IndexedDB failed:', e);
    }
  }
}

export const dbService = new DatabaseService();
