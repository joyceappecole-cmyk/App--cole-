/**
 * Utilitaire de compression et recadrage d'image de profil étudiant
 * 100% côté client, léger pour un stockage fiable dans le localStorage
 */

export async function processProfileImage(file: File, maxSize = 256): Promise<string> {
  return new Promise((resolve, reject) => {
    // Vérifier que c'est bien une image
    if (!file.type.startsWith('image/')) {
      reject(new Error('Le fichier sélectionné n\'est pas une image valide.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Impossible de lire le fichier image.'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Erreur lors du décodage de l\'image.'));
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = maxSize;
          canvas.height = maxSize;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error('Impossible d\'initialiser le contexte canvas.'));
            return;
          }

          // Déterminer le recadrage carré centré (center crop)
          const minDim = Math.min(img.width, img.height);
          const startX = (img.width - minDim) / 2;
          const startY = (img.height - minDim) / 2;

          // Dessiner avec lissage de haute qualité
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(
            img,
            startX,
            startY,
            minDim,
            minDim,
            0,
            0,
            maxSize,
            maxSize
          );

          // Convertir en format JPEG compressé (~15 à 30 Ko maximum)
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          resolve(compressedDataUrl);
        } catch (err) {
          reject(err);
        }
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
