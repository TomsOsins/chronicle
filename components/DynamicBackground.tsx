import React, { useEffect, useRef } from 'react';

interface DynamicBackgroundProps {
  seed?: string;
  loading?: boolean;
}

class Noise2D {
  p = new Uint8Array(512);
  constructor(seed: number) {
    for (let i = 0; i < 256; i++) this.p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff * (i + 1));
      [this.p[i], this.p[j]] = [this.p[j], this.p[i]];
    }
    for (let i = 0; i < 256; i++) this.p[i + 256] = this.p[i];
  }
  fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
  lerp(t: number, a: number, b: number) { return a + t * (b - a); }
  grad(hash: number, x: number, y: number) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }
  noise(x: number, y: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = this.fade(x);
    const v = this.fade(y);
    const AA = this.p[this.p[X] + Y], AB = this.p[this.p[X] + Y + 1];
    const BA = this.p[this.p[X + 1] + Y], BB = this.p[this.p[X + 1] + Y + 1];
    return this.lerp(v, this.lerp(u, this.grad(AA, x, y), this.grad(BA, x - 1, y)),
                        this.lerp(u, this.grad(AB, x, y - 1), this.grad(BB, x - 1, y - 1)));
  }
}

const GRID_SIZE = 80;
const LEVELS = 18;
const CROSS_SIZE = 7;

const getSeedHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
};

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ seed = 'default', loading = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);
  const loadingRef = useRef(loading);
  const loadingStartRef = useRef<number | null>(null);

  useEffect(() => {
    loadingRef.current = loading;
    if (loading) {
      loadingStartRef.current = performance.now();
    } else {
      loadingStartRef.current = null;
    }
  }, [loading]);

  const preRenderContours = (currentSeed: string) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const offscreen = document.createElement('canvas');
    offscreen.width = w;
    offscreen.height = h;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    const res = 15;
    const cols = Math.ceil(w / res) + 1;
    const rows = Math.ceil(h / res) + 1;
    const noiseGen = new Noise2D(getSeedHash(currentSeed));
    const data = new Float32Array(cols * rows);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const nx = j * 0.0035;
        const ny = i * 0.0035;
        let val = noiseGen.noise(nx * 5, ny * 5) * 1.0;
        val += noiseGen.noise(nx * 15, ny * 15) * 0.5;
        data[i * cols + j] = (val + 1) / 2;
      }
    }

    ctx.lineWidth = 0.8;
    for (let l = 1; l <= LEVELS; l++) {
      const threshold = l / (LEVELS + 1);
      const intensity = Math.floor(40 + (l / LEVELS) * 120);
      const opacity = 0.04 + (l / LEVELS) * 0.12;
      ctx.strokeStyle = `rgba(${intensity}, ${intensity}, ${intensity}, ${opacity})`;
      ctx.beginPath();

      for (let i = 0; i < rows - 1; i++) {
        for (let j = 0; j < cols - 1; j++) {
          const x = j * res;
          const y = i * res;
          const v0 = data[i * cols + j], v1 = data[i * cols + (j + 1)];
          const v2 = data[(i + 1) * cols + (j + 1)], v3 = data[(i + 1) * cols + j];
          const b0 = v0 >= threshold ? 1 : 0, b1 = v1 >= threshold ? 1 : 0;
          const b2 = v2 >= threshold ? 1 : 0, b3 = v3 >= threshold ? 1 : 0;
          const config = (b0 << 3) | (b1 << 2) | (b2 << 1) | b3;
          const lerpX = (va: number, vb: number) => (threshold - va) / (vb - va);
          const drawSeg = (x1: number, y1: number, x2: number, y2: number) => { ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); };

          const t: [number, number] = [x + res * lerpX(v0, v1), y];
          const r: [number, number] = [x + res, y + res * lerpX(v1, v2)];
          const b: [number, number] = [x + res * lerpX(v3, v2), y + res];
          const le: [number, number] = [x, y + res * lerpX(v0, v3)];

          switch (config) {
            case 1: case 14: drawSeg(le[0], le[1], b[0], b[1]); break;
            case 2: case 13: drawSeg(b[0], b[1], r[0], r[1]); break;
            case 3: case 12: drawSeg(le[0], le[1], r[0], r[1]); break;
            case 4: case 11: drawSeg(t[0], t[1], r[0], r[1]); break;
            case 5: drawSeg(t[0], t[1], le[0], le[1]); drawSeg(b[0], b[1], r[0], r[1]); break;
            case 6: case 9: drawSeg(t[0], t[1], b[0], b[1]); break;
            case 7: case 8: drawSeg(t[0], t[1], le[0], le[1]); break;
            case 10: drawSeg(t[0], t[1], r[0], r[1]); drawSeg(b[0], b[1], le[0], le[1]); break;
          }
        }
      }
      ctx.stroke();
    }
    offscreenCanvasRef.current = offscreen;
  };

  useEffect(() => {
    preRenderContours(seed);

    const render = (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const w = canvas.width = window.innerWidth;
      const h = canvas.height = window.innerHeight;
      ctx.fillStyle = '#020204';
      ctx.fillRect(0, 0, w, h);

      const isLoading = loadingRef.current;

      // Slow pulsating opacity for the topo lines
      const topoPulse = 0.5 + Math.sin(time * 0.0008) * 0.15;

      // Layer 1: Topographic contours — faint, pulsating
      if (offscreenCanvasRef.current) {
        ctx.save();
        ctx.globalAlpha = topoPulse;

        if (isLoading && loadingStartRef.current) {
          // Scan sweep: reveal lines left-to-right during loading
          const elapsed = time - loadingStartRef.current;
          const sweepProgress = Math.min(elapsed / 3000, 1);
          ctx.beginPath();
          ctx.rect(0, 0, w * sweepProgress, h);
          ctx.clip();
        }

        ctx.drawImage(offscreenCanvasRef.current, 0, 0);
        ctx.restore();
      }

      // Layer 2: Subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w; x += GRID_SIZE) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let y = 0; y <= h; y += GRID_SIZE) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();

      // Layer 3: Cross markers at grid intersections
      const cycle = 3000;
      const anim = (time % cycle) / cycle;

      if (isLoading) {
        // Loading state: crosses move diagonally and rotate
        const diagonalOffset = anim * GRID_SIZE;
        const rotation = anim * Math.PI * 2;
        const pulseAlpha = 0.3 + Math.sin(time * 0.006) * 0.1;

        ctx.strokeStyle = `rgba(255, 44, 44, ${pulseAlpha})`;
        ctx.lineWidth = 2;

        for (let x = -GRID_SIZE; x <= w + GRID_SIZE * 2; x += GRID_SIZE) {
          for (let y = -GRID_SIZE; y <= h + GRID_SIZE * 2; y += GRID_SIZE) {
            ctx.save();
            ctx.translate(x + diagonalOffset, y + diagonalOffset);
            ctx.rotate(rotation);
            ctx.beginPath();
            ctx.moveTo(-CROSS_SIZE, 0); ctx.lineTo(CROSS_SIZE, 0);
            ctx.moveTo(0, -CROSS_SIZE); ctx.lineTo(0, CROSS_SIZE);
            ctx.stroke();
            ctx.restore();
          }
        }
      } else {
        // Idle state: static crosses, faint pulse
        const idlePulse = 0.08 + Math.sin(time * 0.001) * 0.04;
        ctx.strokeStyle = `rgba(255, 255, 255, ${idlePulse})`;
        ctx.lineWidth = 1.5;

        for (let x = 0; x <= w; x += GRID_SIZE) {
          for (let y = 0; y <= h; y += GRID_SIZE) {
            ctx.beginPath();
            ctx.moveTo(x - CROSS_SIZE, y); ctx.lineTo(x + CROSS_SIZE, y);
            ctx.moveTo(x, y - CROSS_SIZE); ctx.lineTo(x, y + CROSS_SIZE);
            ctx.stroke();
          }
        }
      }

      // Layer 4: Vignette
      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.8);
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [seed]);

  useEffect(() => {
    const handleResize = () => preRenderContours(seed);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [seed]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020204]">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
