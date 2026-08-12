import { useEffect, useRef } from 'react';
export default function NeuralBackground() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext('2d'); let frame;
    const dots = Array.from({ length: 70 }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 }));
    const draw = () => { canvas.width = innerWidth; canvas.height = innerHeight; ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot, index) => { dot.x = (dot.x + dot.vx + canvas.width) % canvas.width; dot.y = (dot.y + dot.vy + canvas.height) % canvas.height;
        for (let j = index + 1; j < dots.length; j += 1) { const other = dots[j], distance = Math.hypot(dot.x - other.x, dot.y - other.y); if (distance < 130) { ctx.strokeStyle = `rgba(58,211,242,${.14 * (1 - distance / 130)})`; ctx.beginPath(); ctx.moveTo(dot.x, dot.y); ctx.lineTo(other.x, other.y); ctx.stroke(); } }
        ctx.fillStyle = 'rgba(140,123,255,.5)'; ctx.beginPath(); ctx.arc(dot.x, dot.y, 1.2, 0, 7); ctx.fill();
      }); frame = requestAnimationFrame(draw); };
    draw(); return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={ref} className="neural-bg" aria-hidden="true" />;
}