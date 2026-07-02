"use client";

import { useEffect, useState } from "react";

const weddingDate = new Date("2026-12-19T17:00:00-06:00");

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function updateCountdown() {
      const difference = weddingDate.getTime() - Date.now();

      if (difference <= 0) return;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="uppercase tracking-[0.4em] text-[#6a424c]">
          Cuenta regresiva
        </p>

        <h2 className="mt-4 text-5xl text-[#42594a]">Falta muy poco</h2>

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          <TimeCard value={timeLeft.days} label="Días" />
          <TimeCard value={timeLeft.hours} label="Horas" />
          <TimeCard value={timeLeft.minutes} label="Minutos" />
          <TimeCard value={timeLeft.seconds} label="Segundos" />
        </div>
      </div>
    </section>
  );
}

function TimeCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-3xl border border-[#42594a]/10 bg-[#f8f5ef] p-8">
      <div className="text-5xl text-[#42594a]">{value}</div>

      <div className="mt-3 uppercase tracking-[0.3em] text-[#6a424c]">
        {label}
      </div>
    </div>
  );
}
