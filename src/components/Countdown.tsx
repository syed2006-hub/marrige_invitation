import { motion } from "framer-motion";
import { Moon } from "lucide-react";
import { useCountdown } from "@/lib/wedding";

export function Countdown() {
  const t = useCountdown();
  const items = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];
  return (
    <section className="bg-arabesque py-20 px-4 relative overflow-hidden">
      {/* Decorative arc on top */}
      <div className="absolute left-1/2 -translate-x-1/2 top-6 w-72 h-32 pointer-events-none">
        <svg viewBox="0 0 300 120" className="w-full h-full">
          <path
            d="M 20 110 Q 150 -20 280 110"
            fill="none"
            stroke="oklch(0.78 0.13 75)"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
          <path
            d="M 40 115 Q 150 5 260 115"
            fill="none"
            stroke="oklch(0.78 0.13 75)"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="text-center mb-12 relative"
      >
        {/* Crescent Moon Badge */}
        <div className="mx-auto mt-12 h-16 w-16 rounded-full border border-primary/40 flex items-center justify-center bg-card/30 backdrop-blur-sm">
          <Moon className="h-7 w-7 text-primary" style={{ transform: "rotate(-20deg)" }} />
        </div>

        {/* Bismillah */}
        <p
          className="mt-6 text-xl sm:text-2xl text-primary"
          style={{ fontFamily: "'Noto Nastaliq Urdu', serif", direction: "rtl" }}
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>

        <h2 className="font-script text-5xl sm:text-6xl text-cream mt-4">
          Counting the Moments
        </h2>
        <p className="mt-3 text-xs sm:text-sm uppercase tracking-[0.4em] text-muted-foreground">
          Until We Become One
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-2xl grid-cols-4 gap-3 sm:gap-5 px-2">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
            className="relative rounded-2xl py-6 sm:py-8 text-center"
            style={{
              background:
                "linear-gradient(160deg, oklch(0.26 0.03 50 / 0.55), oklch(0.20 0.02 50 / 0.45))",
              border: "1px solid oklch(0.78 0.13 75 / 0.18)",
              boxShadow:
                "0 10px 30px -15px rgba(0,0,0,0.5), inset 0 1px 0 oklch(0.78 0.13 75 / 0.12)",
            }}
          >
            <div className="font-serif text-3xl sm:text-5xl text-primary tabular-nums font-medium">
              {String(it.value).padStart(2, "0")}
            </div>
            <div className="mt-2 text-[9px] sm:text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {it.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider with diamond */}
      <div className="mt-16 flex items-center justify-center gap-3 max-w-md mx-auto">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/50" />
        <span className="text-primary text-sm">◆</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/50" />
      </div>
    </section>
  );
}
