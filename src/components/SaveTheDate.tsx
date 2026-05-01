import { Bell, CalendarDays } from "lucide-react";
import { Reveal } from "./Reveal";
import { useCountdown, WEDDING_DATE } from "@/lib/wedding";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function gcalUrl() {
  const start = "20260601T113000Z"; // 5pm IST = 11:30 UTC
  const end = "20260601T173000Z";   // 11pm IST
  const text = encodeURIComponent("Abdul Rahman & Noorjahan — Wedding");
  const details = encodeURIComponent(
    "Join us in celebrating the wedding of Abdul Rahman & Noorjahan."
  );
  const location = encodeURIComponent(
    "Shiraz Hall, 10, Whannels Rd, Ansari Estate, Egmore, Chennai, Tamil Nadu 600008"
  );
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
}

export function SaveTheDate() {
  const t = useCountdown();
  const [notifying, setNotifying] = useState(false);

  // Build June 2026 calendar (June 1 is Monday)
  const days: (number | null)[] = [];
  // June 1, 2026 = Monday → index 1
  for (let i = 0; i < 1; i++) days.push(null);
  for (let d = 1; d <= 30; d++) days.push(d);

  // Notification scheduler — fires "X days to go" reminders daily
  useEffect(() => {
    const stored = localStorage.getItem("wedding-notifications");
    if (stored === "on") {
      scheduleDailyCheck();
    }
  }, []);

  function scheduleDailyCheck() {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    const lastShown = localStorage.getItem("wedding-last-notif-day");
    const today = new Date().toDateString();
    if (lastShown !== today) {
      const daysLeft = Math.ceil((WEDDING_DATE - Date.now()) / 86400000);
      if (daysLeft > 0 && daysLeft <= 30 && Notification.permission === "granted") {
        new Notification("💍 Abdul Rahman & Noorjahan", {
          body: `${daysLeft} ${daysLeft === 1 ? "day" : "days"} to go until the big day!`,
          icon: "/favicon.ico",
        });
        localStorage.setItem("wedding-last-notif-day", today);
      }
    }
  }

  async function enableNotifications() {
    if (typeof window === "undefined" || !("Notification" in window)) {
      toast.error("Notifications are not supported on this device");
      return;
    }
    setNotifying(true);
    try {
      const perm = await Notification.requestPermission();
      if (perm === "granted") {
        localStorage.setItem("wedding-notifications", "on");
        const daysLeft = Math.ceil((WEDDING_DATE - Date.now()) / 86400000);
        new Notification("💍 You'll be reminded daily!", {
          body: `${daysLeft} days to go until Abdul Rahman & Noorjahan's wedding`,
        });
        toast.success("Daily countdown reminders enabled");
        scheduleDailyCheck();
      } else {
        toast.error("Permission denied");
      }
    } finally {
      setNotifying(false);
    }
  }

  return (
    <section className="bg-arabesque py-20 px-6">
      <Reveal className="mx-auto max-w-xl text-center">
        <div className="mx-auto h-14 w-14 rounded-full border border-primary/40 flex items-center justify-center">
          <CalendarDays className="h-6 w-6 text-primary" />
        </div>
        <h2 className="font-script text-5xl mt-4 text-cream">Save the Date</h2>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          June 1, 2026 · Chennai
        </p>

        <button
          onClick={enableNotifications}
          disabled={notifying}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card/40 px-5 py-2.5 text-sm hover:bg-primary/10 transition disabled:opacity-50"
        >
          <Bell className="h-4 w-4 text-primary" />
          {t.days} {t.days === 1 ? "day" : "days"} to go
        </button>

        {/* Mini calendar */}
        <div className="mt-8 rounded-2xl border border-primary/20 bg-card/40 backdrop-blur-sm p-5">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">June 2026</div>
          <div className="grid grid-cols-7 gap-1.5 text-xs text-muted-foreground mb-2">
            {WEEKDAYS.map((d, i) => <div key={i}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((d, i) => (
              <div key={i} className="aspect-square flex items-center justify-center text-sm">
                {d === 1 ? (
                  <div className="h-9 w-9 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold ring-2 ring-primary/40 ring-offset-2 ring-offset-card">
                    1
                  </div>
                ) : (
                  <span className={d ? "text-cream/80" : ""}>{d ?? ""}</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t border-border">
            <div className="font-serif text-lg">Nikah Ceremony</div>
            <div className="text-sm text-muted-foreground">5:00 PM – 11:00 PM</div>
          </div>
        </div>

        <a
          href={gcalUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm uppercase tracking-[0.2em] hover:bg-primary/10 transition"
        >
          <CalendarDays className="h-4 w-4 text-primary" /> Add to Google Calendar
        </a>
      </Reveal>
    </section>
  );
}
