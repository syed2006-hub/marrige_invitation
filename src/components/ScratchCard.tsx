import { useEffect, useRef, useState } from "react";
import { Hand, Moon } from "lucide-react";
import { Reveal } from "./Reveal";

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);
  const [size, setSize] = useState({ w: 320, h: 320 });

  // Responsive size
  useEffect(() => {
    function update() {
      const w = Math.min(340, window.innerWidth - 80);
      setSize({ w, h: w });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Paint the gold "scratchable" overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h } = size;
    canvas.width = w;
    canvas.height = h;

    // Gold gradient overlay
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#d4a64a");
    grad.addColorStop(0.5, "#f5d17a");
    grad.addColorStop(1, "#b8862e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle arabesque dots pattern
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    for (let y = 10; y < h; y += 22) {
      for (let x = 10; x < w; x += 22) {
        ctx.beginPath();
        ctx.arc(x + (y % 44 === 0 ? 0 : 11), y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Hint text
    ctx.fillStyle = "rgba(45,25,10,0.85)";
    ctx.font = "600 18px 'Cormorant Garamond', serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ Scratch to Reveal ✦", w / 2, h / 2 - 8);
    ctx.font = "400 12px 'Inter', sans-serif";
    ctx.fillText("Use your finger or mouse", w / 2, h / 2 + 16);

    ctx.globalCompositeOperation = "destination-out";
    setRevealed(false);
  }, [size]);

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX: number, clientY: number;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  }

  function scratch(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();
    checkReveal();
  }

  function checkReveal() {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    // Sample every 20th pixel for performance
    for (let i = 3; i < data.length; i += 80) {
      if (data[i] === 0) cleared++;
    }
    const total = data.length / 80;
    if (cleared / total > 0.45 && !revealed) {
      setRevealed(true);
      // Smooth fade out
      canvas.style.transition = "opacity 0.6s ease";
      canvas.style.opacity = "0";
    }
  }

  return (
    <section className="bg-arabesque py-20 px-6 relative overflow-hidden">
      <Reveal className="mx-auto max-w-md text-center relative">
        <div className="mx-auto h-14 w-14 rounded-full border border-primary/40 flex items-center justify-center bg-card/30 backdrop-blur-sm mb-4">
          <Moon className="h-6 w-6 text-primary" style={{ transform: "rotate(-20deg)" }} />
        </div>
        <h2 className="font-script text-5xl text-cream">A Little Surprise</h2>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Bismillah
        </p>
        <p className="mt-2 text-sm text-cream/70 font-serif italic">
          Reveal the secret celebration awaiting you
        </p>

        {/* Card */}
        <div className="mt-10 relative mx-auto" style={{ width: size.w, height: size.h }}>
          {/* Decorative gold frame */}
          <div
            className="absolute -inset-3 rounded-[2rem] opacity-90"
            style={{
              background:
                "conic-gradient(from 0deg, #d4a64a, #f5d17a, #b8862e, #f5d17a, #d4a64a)",
              filter: "blur(2px)",
            }}
          />
          <div className="absolute inset-0 rounded-[1.75rem] overflow-hidden border-2 border-primary/40 shadow-[0_20px_60px_-20px_rgba(212,166,74,0.6)]">
            {/* Reveal layer */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, oklch(0.28 0.02 60), oklch(0.18 0.012 60))",
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary/80">
                You're Invited To
              </p>
              <h3 className="font-script text-6xl text-gradient-gold mt-3 leading-none">
                Haldi
              </h3>
              <div className="my-4 gold-divider text-primary text-xs uppercase tracking-[0.3em]">
                Celebration
              </div>
              <p className="font-serif text-2xl text-cream">May 31</p>
            </div>

            {/* Scratch overlay */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
              style={{ width: "100%", height: "100%" }}
              onMouseDown={(e) => {
                isDrawing.current = true;
                scratch(e);
              }}
              onMouseMove={scratch}
              onMouseUp={() => (isDrawing.current = false)}
              onMouseLeave={() => (isDrawing.current = false)}
              onTouchStart={(e) => {
                isDrawing.current = true;
                scratch(e);
              }}
              onTouchMove={scratch}
              onTouchEnd={() => (isDrawing.current = false)}
            />
          </div>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary/80">
          <Hand className="h-4 w-4" />
          {revealed ? "MashaAllah — see you there!" : "Tap & drag to scratch"}
        </div>
      </Reveal>
    </section>
  );
}
