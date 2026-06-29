import React, { useEffect, useRef } from 'react';

export function Lightfall({
  colors = ['#A6C8FF', '#5227FF', '#FF9FFC'],
  backgroundColor = '#0A29FF',
  speed = 0.5,
  streakCount = 2,
  streakWidth = 1,
  streakLength = 1,
  glow = 1,
  density = 0.6,
  twinkle = 1,
  zoom = 3,
  backgroundGlow = 0.5,
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 0.5,
  mouseRadius = 1,
  color1,
  color2,
  color3,
  className = '',
  ...props
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const activeColors = [color1, color2, color3].filter(Boolean);
    const palette = activeColors.length > 0 ? activeColors : colors;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      if (!mouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Calculate total streaks
    const totalStreaks = Math.floor((width / 40) * streakCount * density * (zoom / 2));
    const streaks = Array.from({ length: Math.max(15, totalStreaks) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      len: (40 + Math.random() * 80) * streakLength,
      spd: (1.5 + Math.random() * 2.5) * speed,
      w: (0.8 + Math.random() * 1.2) * streakWidth,
      color: palette[Math.floor(Math.random() * palette.length)] || '#ffffff',
      alpha: 0.3 + Math.random() * 0.7,
      twinkleSpd: (0.01 + Math.random() * 0.03) * twinkle,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Draw radial background glow if enabled
      if (backgroundGlow > 0) {
        const gradient = ctx.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.7
        );
        gradient.addColorStop(0, palette[0] || '#ffffff');
        gradient.addColorStop(1, 'transparent');
        ctx.save();
        ctx.globalAlpha = backgroundGlow * 0.25;
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      ctx.save();
      ctx.globalAlpha = opacity;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const radius = mouseRadius * 120;

      streaks.forEach((s) => {
        s.y += s.spd;
        if (s.y - s.len > height) {
          s.y = -s.len;
          s.x = Math.random() * width;
        }

        if (twinkle > 0) {
          s.alpha += s.twinkleSpd;
          if (s.alpha > 1 || s.alpha < 0.2) s.twinkleSpd = -s.twinkleSpd;
        }

        let currentAlpha = Math.max(0.1, Math.min(1, s.alpha));
        let currentWidth = s.w;
        let glowAmount = glow * 10;

        // Mouse interaction flare
        if (mouseInteraction && mx >= 0 && my >= 0) {
          const dx = s.x - mx;
          const dy = s.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius) {
            const factor = (1 - dist / radius) * mouseStrength;
            currentAlpha = Math.min(1, currentAlpha + factor * 0.8);
            currentWidth += factor * 2;
            glowAmount += factor * 15;
          }
        }

        ctx.beginPath();
        const grad = ctx.createLinearGradient(s.x, s.y - s.len, s.x, s.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.8, s.color);
        grad.addColorStop(1, '#ffffff');

        ctx.strokeStyle = grad;
        ctx.lineWidth = currentWidth;
        ctx.lineCap = 'round';

        if (glowAmount > 0) {
          ctx.shadowBlur = glowAmount;
          ctx.shadowColor = s.color;
        }

        ctx.globalAlpha = currentAlpha;
        ctx.moveTo(s.x, s.y - s.len);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [
    colors,
    backgroundColor,
    speed,
    streakCount,
    streakWidth,
    streakLength,
    glow,
    density,
    twinkle,
    zoom,
    backgroundGlow,
    opacity,
    mouseInteraction,
    mouseStrength,
    mouseRadius,
    color1,
    color2,
    color3,
  ]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-auto ${className}`} {...props}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

export default Lightfall;
