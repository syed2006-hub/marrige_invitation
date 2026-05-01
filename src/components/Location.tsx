import { MapPin, Navigation } from "lucide-react";
import { Reveal } from "./Reveal";

const MAPS_URL = "https://maps.app.goo.gl/ifjfA3PpSHh7TXy37";

export function Location() {
  const openMaps = () => window.open(MAPS_URL, "_blank", "noopener,noreferrer");

  return (
    <section className="bg-cream text-[oklch(0.25_0.02_60)] py-20 px-6">
      <Reveal className="mx-auto max-w-xl text-center">
        <button
          type="button"
          onClick={openMaps}
          className="w-full text-center cursor-pointer group"
          aria-label="Open Shiraz Hall on Google Maps"
        >
          <MapPin className="mx-auto h-8 w-8 text-[oklch(0.45_0.05_60)] group-hover:scale-110 transition" />
          <h2 className="font-script text-5xl mt-4 text-[oklch(0.25_0.02_60)]">
            Shiraz Hall
          </h2>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-sm">
            <MapPin className="h-4 w-4" /> Chennai, Tamil Nadu
          </p>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-sm">
            <Navigation className="h-3.5 w-3.5" /> Egmore, 600008
          </p>
          <p className="mt-3 text-sm text-[oklch(0.45_0.04_60)] leading-relaxed">
            10, Whannels Rd, Ansari Estate,<br />
            Egmore, Chennai, Tamil Nadu 600008
          </p>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[oklch(0.45_0.05_60)]/30 px-5 py-2.5 text-sm font-medium group-hover:bg-[oklch(0.45_0.05_60)]/10 transition">
            <Navigation className="h-4 w-4" /> Open in Google Maps
          </span>

          <div className="mt-8 overflow-hidden rounded-2xl shadow-xl relative">
            <iframe
              title="Shiraz Hall location"
              src="https://www.google.com/maps?q=Shiraz+Hall,+10,+Whannels+Rd,+Ansari+Estate,+Egmore,+Chennai,+Tamil+Nadu+600008&output=embed"
              className="w-full h-64 border-0 pointer-events-none"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <span className="absolute inset-0" />
          </div>
        </button>
      </Reveal>
    </section>
  );
}
