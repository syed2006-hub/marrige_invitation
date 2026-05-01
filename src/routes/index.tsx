import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Envelope } from "@/components/Envelope";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { Location } from "@/components/Location";
import { Program } from "@/components/Program";
import { SaveTheDate } from "@/components/SaveTheDate";
import { Wishes } from "@/components/Wishes";
import { ScratchCard } from "@/components/ScratchCard";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened && typeof document !== "undefined") {
      document.body.style.overflow = "auto";
    } else if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  }, [opened]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" theme="dark" />
      {!opened && <Envelope onOpen={() => setOpened(true)} />}
      {opened && (
        <>
          <Hero />
          <Countdown />
          <Location />
          <Program />
          <ScratchCard />
          <SaveTheDate />
          <Wishes />
          <footer className="bg-cream text-[oklch(0.25_0.02_60)] py-14 text-center px-6">
            <p className="font-script text-4xl sm:text-5xl">Abdul Rahman &amp; Noorjahan</p>
            <p className="mt-3 font-serif text-base text-[oklch(0.45_0.03_60)]">
              June 1, 2026 · Chennai
            </p>
            <div className="mt-5 text-primary text-xl">♥</div>
          </footer>
        </>
      )}
    </main>
  );
}
