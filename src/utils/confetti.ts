/**
 * Utilitaires d'animation de joie et confettis festifs
 * Zéro dépendance externe, 100% autonome et compatible hors-ligne
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  shape: 'rect' | 'circle' | 'star' | 'heart';
}

const FESTIVE_COLORS = [
  '#10b981', // Emerald
  '#059669', // Deep emerald
  '#3b82f6', // Blue
  '#f59e0b', // Amber / Gold
  '#ec4899', // Pink
  '#8b5cf6', // Violet
  '#14b8a6', // Teal
  '#f97316', // Orange
];

export function fireJoyConfetti(originX = 0.5, originY = 0.4, count = 55) {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const particles: Particle[] = [];
  const startX = width * originX;
  const startY = height * originY;

  const shapes: Particle['shape'][] = ['rect', 'circle', 'star', 'heart'];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 9;
    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      size: 6 + Math.random() * 8,
      color: FESTIVE_COLORS[Math.floor(Math.random() * FESTIVE_COLORS.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    });
  }

  let animationFrameId: number;
  const startTime = Date.now();
  const duration = 2400; // ms

  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / duration;

    if (progress >= 1) {
      cancelAnimationFrame(animationFrameId);
      canvas.remove();
      return;
    }

    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // Gravité douce
      p.vx *= 0.98; // Friction air
      p.rotation += p.rotationSpeed;
      p.opacity = Math.max(0, 1 - progress * 1.2);

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'heart') {
        ctx.font = `${p.size + 4}px serif`;
        ctx.fillText('✨', -p.size / 2, p.size / 2);
      } else {
        // Étoile
        ctx.font = `${p.size + 4}px serif`;
        ctx.fillText('🌟', -p.size / 2, p.size / 2);
      }

      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animationFrameId = requestAnimationFrame(animate);
}

export function fireCelebrationExplosion() {
  fireJoyConfetti(0.2, 0.5, 45);
  setTimeout(() => fireJoyConfetti(0.8, 0.5, 45), 200);
  setTimeout(() => fireJoyConfetti(0.5, 0.35, 60), 450);
}
