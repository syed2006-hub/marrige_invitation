import hero from "@/assets/hero-wedding.jpg";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <img
        src={hero}
        alt="Wedding venue"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-sm sm:text-base uppercase tracking-[0.4em] text-cream/95"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
        >
          We're Getting Married
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="font-script text-6xl sm:text-7xl md:text-8xl text-cream mt-6 leading-none"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
        >
          Abdul Rahman
        </motion.h1>

        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="font-script text-4xl sm:text-5xl text-primary my-4"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
        >
          &amp;
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="font-script text-6xl sm:text-7xl md:text-8xl text-cream leading-none"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
        >
          Noorjahan
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-8 gold-divider"
        >
          <span className="font-serif text-lg tracking-wider text-cream/95">
            June 1, 2026
          </span>
        </motion.div>
      </div>
    </section>
  );
}
