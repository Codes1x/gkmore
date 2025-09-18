"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform, animate, useMotionValueEvent } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type RingStatProps = {
  label: string;
  value: number;
  max?: number;
  suffix?: string;
};

function RingStat({ label, value, max = 100, suffix = "" }: RingStatProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const progress = useMotionValue(0);
  const smooth = useSpring(progress, { stiffness: 120, damping: 20 });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState<number>(0);
  const pct = useMemo(() => (value / max) * 100, [value, max]);

  useEffect(() => {
    if (inView) {
      progress.set(pct);
      const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [inView, pct, progress, count, value]);

  useMotionValueEvent(count, "change", (v) => {
    const next = max === 10 ? Math.round(v * 10) / 10 : Math.round(v);
    setDisplay(next);
  });

  const size = 128;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  const dash = useTransform(smooth, (v) => {
    const len = (v / 100) * circumference;
    return `${len} ${circumference}`;
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="group rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--border)" strokeWidth={stroke} fill="none" className="opacity-70" />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="var(--primary)"
              strokeWidth={stroke}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={dash as unknown as string}
              className="[filter:drop-shadow(0_1px_0_rgba(0,0,0,0.05))]"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center rotate-90">
            <span className="text-2xl font-semibold text-foreground">
              {display}
              {suffix}
            </span>
          </div>
          {/* glow on hover */}
          <div className="pointer-events-none absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(300px_120px_at_50%_50%,rgba(230,213,195,0.18),transparent)]" />
        </div>
        <div className="text-sm text-muted-foreground leading-snug max-w-[22ch]">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section className="px-4 sm:px-6 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-[80%] sm:grid-cols-3 gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory sm:overflow-visible sm:[&>*]:snap-none [&>*]:snap-start [&>*]:min-w-[280px] sm:[&>*]:min-w-0">
          <RingStat label="Загрузка за 12 мес" value={78} suffix="%" />
          <RingStat label="RevPAR год к году" value={15} suffix="%" />
          <RingStat label="Рейтинг на Booking" value={9.4} max={10} />
        </div>
      </div>
    </section>
  );
}


