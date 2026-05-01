import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import envelopeCover from "@/assets/envelope-cover.png";
import heroWedding from "@/assets/hero-wedding.jpg";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  // Preload hero image so the site appears instantly after opening
  useEffect(() => {
    const img = new Image();
    img.src = heroWedding;
  }, []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1100);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="envelope"
        className="fixed inset-0 z-50 overflow-hidden bg-black"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          onClick={handleOpen}
          disabled={opening}
          aria-label="Open invitation"
          className="relative w-screen h-screen block focus:outline-none"
          initial={{ scale: 1, opacity: 1 }}
          animate={
            opening
              ? { scale: 1.25, opacity: 0 }
              : { scale: 1, opacity: 1 }
          }
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        >
          <img
            src={envelopeCover}
            alt="Wedding invitation envelope"
            className="absolute inset-0 w-full h-full object-cover select-none"
            draggable={false}
          />

          <div className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
            }}
          />

          {/* Subtle pulsing tap target on the seal in the center */}
          <motion.span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "min(38vw, 220px)",
              height: "min(38vw, 220px)",
              boxShadow: "0 0 0 0 rgba(255, 200, 120, 0.45)",
            }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(255, 200, 120, 0.45)",
                "0 0 0 30px rgba(255, 200, 120, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
