import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-01T17:00:00+05:30").getTime();

export function getTimeLeft() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    total: diff,
  };
}

export function useCountdown() {
  const [t, setT] = useState(getTimeLeft);
  useEffect(() => {
    const i = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(i);
  }, []);
  return t;
}

export const WEDDING_DATE = TARGET;
