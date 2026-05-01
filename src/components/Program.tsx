import { Reveal } from "./Reveal";

const program = [
  { icon: "🕌", title: "Guests Arrival", sub: "Welcome & seating of guests", time: "5:00 PM" },
  { icon: "💍", title: "Nikah Ceremony", sub: "Solemnization of the Nikah", time: "5:00 PM" },
  { icon: "🍽️", title: "Walima Feast", sub: "Grand wedding feast for all", time: "7:30 PM" },
  { icon: "💐", title: "Rukhsati", sub: "Farewell blessings & send-off", time: "11:00 PM" },
];

export function Program() {
  return (
    <section className="bg-cream text-[oklch(0.25_0.02_60)] pb-20 px-6">
      <div className="mx-auto max-w-xl">
        <Reveal className="text-center mb-10">
          <h2 className="font-script text-5xl">Day Program</h2>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[oklch(0.5_0.03_60)]">
            What we have planned for the day
          </p>
        </Reveal>

        <div className="space-y-4">
          {program.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="flex items-center gap-4 rounded-2xl bg-white/70 border border-[oklch(0.85_0.02_60)] p-4 shadow-sm">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[oklch(0.93_0.02_70)] text-2xl">
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-lg font-semibold">{p.title}</div>
                  <div className="text-sm text-[oklch(0.5_0.03_60)]">{p.sub}</div>
                </div>
                <div className="text-sm font-medium text-[oklch(0.4_0.04_60)] whitespace-nowrap">
                  {p.time}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
