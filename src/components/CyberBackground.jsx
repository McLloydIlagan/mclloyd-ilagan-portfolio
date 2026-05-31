import { useEffect, useRef } from 'react';

export default function CyberBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const connections = [];
    const PARTICLE_COUNT = 60;

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '#00d4ff' : '#0066ff';
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    // Floating binary strings
    const binaryStrings = [];
    for (let i = 0; i < 8; i++) {
      binaryStrings.push({
        x: Math.random() * width,
        y: Math.random() * height,
        text: Array.from({ length: 8 }, () => Math.round(Math.random())).join(''),
        speed: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.08 + 0.02,
      });
    }

    let animId;
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#00d4ff';
            ctx.globalAlpha = (1 - dist / 130) * 0.12;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw binary strings
      ctx.font = '10px JetBrains Mono, monospace';
      binaryStrings.forEach((b) => {
        b.y += b.speed;
        if (b.y > height + 20) {
          b.y = -20;
          b.x = Math.random() * width;
          b.text = Array.from({ length: 8 }, () => Math.round(Math.random())).join('');
        }
        ctx.fillStyle = '#00d4ff';
        ctx.globalAlpha = b.alpha;
        ctx.fillText(b.text, b.x, b.y);
        ctx.globalAlpha = 1;
      });

      animId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="cyber-canvas"
        aria-hidden="true"
      />
      <div className="scanline" aria-hidden="true" />
    </>
  );
}
