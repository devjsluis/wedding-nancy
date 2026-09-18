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

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

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
    <section className="relative overflow-hidden bg-[#6a424c] py-24 text-white md:py-32">
      {/* Decoración sutil de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-28 h-96 w-96 rounded-full border border-white/10"
      />

      <div className="relative mx-auto max-w-5xl px-5 text-center">
        <p className="text-xs uppercase tracking-[0.5em] text-white/65 md:text-sm">
          Cuenta regresiva
        </p>

        <h2 className="mt-5 font-serif text-5xl italic leading-none text-white md:text-6xl">
          Faltan
        </h2>

        <div className="mx-auto mt-7 h-px w-16 bg-white/45" />

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-4 md:mt-14">
          <TimeUnit value={timeLeft.days} label="días" />
          <TimeUnit value={timeLeft.hours} label="horas" />
          <TimeUnit value={timeLeft.minutes} label="minutos" />
          <TimeUnit value={timeLeft.seconds} label="segundos" />
        </div>

        <p className="mt-12 font-serif text-xl italic tracking-wide text-white/90 md:mt-14 md:text-2xl">
          para nuestra boda
        </p>

        <div className="mx-auto mt-6 flex max-w-[170px] items-center gap-3">
          <span className="h-px flex-1 bg-white/25" />
          <span className="text-sm text-white/60">♡</span>
          <span className="h-px flex-1 bg-white/25" />
        </div>
      </div>
    </section>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="relative px-1 text-center md:px-6">
      <div className="font-serif text-4xl font-light leading-none text-white sm:text-5xl md:text-6xl">
        {value}
      </div>

      <div className="mt-3 text-[9px] uppercase tracking-[0.16em] text-white/70 sm:text-[11px] md:mt-4 md:text-xs md:tracking-[0.25em]">
        {label}
      </div>
    </div>
  );
}
