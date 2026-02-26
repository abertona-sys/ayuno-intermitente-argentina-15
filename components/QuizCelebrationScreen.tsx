import React, { useEffect, useRef } from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface QuizCelebrationScreenProps {
  onNext: () => void;
}

const ConfettiExplosion = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const colors = ['#FFC107', '#2196F3', '#4CAF50', '#E91E63', '#9C27B0', '#00BCD4'];
    
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      rotationSpeed: number;
      tilt: number;
      tiltSpeed: number;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        // Random angle for explosion
        const angle = Math.random() * Math.PI * 2;
        // Random speed - burst effect
        const velocity = Math.random() * 25 + 10;
        
        this.vx = Math.cos(angle) * velocity;
        this.vy = Math.sin(angle) * velocity - 5; // Slight upward lift initial

        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 12 + 8;
        
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        
        this.tilt = Math.random() * Math.PI;
        this.tiltSpeed = Math.random() * 0.2 - 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Physics
        this.vy += 0.8; // Gravity
        this.vx *= 0.92; // Air drag
        this.vy *= 0.92; // Air drag
        
        this.rotation += this.rotationSpeed;
        this.tilt += this.tiltSpeed;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        
        // 3D effect: scale based on tilt to simulate spinning card
        const scaleX = Math.cos(this.tilt);
        ctx.scale(scaleX, 1);
        
        // Shadow for depth
        ctx.shadowColor = 'rgba(0,0,0,0.1)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillStyle = this.color;
        // Draw square confetti
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        
        ctx.restore();
      }
    }

    const createBurst = (x: number, y: number, count: number = 100) => {
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(x, y));
        }
    };

    // Initial burst from center
    createBurst(canvas.width / 2, canvas.height / 2, 150);

    // Secondary bursts for more fun
    setTimeout(() => createBurst(canvas.width * 0.2, canvas.height * 0.3, 80), 200);
    setTimeout(() => createBurst(canvas.width * 0.8, canvas.height * 0.3, 80), 400);

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        
        // Remove off-screen particles
        if (p.y > canvas.height + 50) {
            particles.splice(i, 1);
        }
      }

      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[100]" />;
};

export const QuizCelebrationScreen: React.FC<QuizCelebrationScreenProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E0F7FA] to-white flex flex-col items-center relative">
      
      <ConfettiExplosion />

      {/* Header: Progress Bar */}
      <div className="w-full max-w-md px-4 mt-4 mb-6 flex items-end space-x-3 relative z-10">
        <div className="w-6"></div> {/* Empty space where back button usually is, for alignment */}
        <ProgressBar currentStep={40} totalSteps={45} />
      </div>

      <div className="w-full max-w-md px-6 flex flex-col items-center text-center pb-8 animate-in fade-in zoom-in duration-700 relative z-10 pt-12">
        
        {/* Celebration Block */}
        <div className="mb-8">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-bold text-[#004D40] leading-tight mb-4">
              🎉 ¡Increíble!
            </h1>

            {/* Reinforcement */}
            <p className="text-xl text-slate-500 font-normal">
              Todo está a tu favor.
            </p>
        </div>

        {/* CTA */}
        <div className="w-full mt-8">
          <Button onClick={onNext}>
            Continuar
          </Button>
        </div>

      </div>
    </div>
  );
};