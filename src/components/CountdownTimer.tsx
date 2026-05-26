import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TARGET = new Date('2026-05-31T08:30:00+07:00');

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function FlipDigit({ digit, prevDigit }: { digit: string; prevDigit: string }) {
  const changed = digit !== prevDigit;

  return (
    <div
      style={{ perspective: '200px' }}
      className="relative w-8 sm:w-10 h-12 sm:h-14 bg-black rounded-lg overflow-hidden flex items-center justify-center"
    >
      {/* Base digit always visible */}
      <span className="text-2xl sm:text-3xl font-black text-white tabular-nums font-display select-none z-0">
        {digit}
      </span>

      {/* Flip animation overlay */}
      <AnimatePresence>
        {changed && (
          <motion.div
            key={digit}
            initial={{ rotateX: -90, opacity: 1 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              transformOrigin: 'center',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
              borderRadius: '8px',
              zIndex: 10,
            }}
          >
            <span className="text-2xl sm:text-3xl font-black text-white tabular-nums font-display select-none">
              {digit}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center divider line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-neutral-700 z-20 pointer-events-none" />
    </div>
  );
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const str = pad(value);
  const prevRef = useRef(str);
  const prev = prevRef.current;

  useEffect(() => {
    prevRef.current = str;
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        <FlipDigit digit={str[0]} prevDigit={prev[0]} />
        <FlipDigit digit={str[1]} prevDigit={prev[1]} />
      </div>
      <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

interface Props {
  onOpenQuiz?: () => void;
}

export default function CountdownTimer({ onOpenQuiz }: Props) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const tick = () => {
      const diff = TARGET.getTime() - Date.now();
      if (diff <= 0) { setExpired(true); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (expired) {
    return (
      <div className="text-center mt-10">
        <span className="text-sm font-mono text-[#FF5722] font-bold uppercase tracking-widest">
          Hội thảo đang diễn ra 🔴
        </span>
      </div>
    );
  }

  const units = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-10 flex flex-col items-center"
    >
      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-5">
        Hội thảo bắt đầu sau
      </span>
      <div className="flex items-end gap-3 sm:gap-4">
        {units.map((u, i) => (
          <React.Fragment key={u.label}>
            <FlipUnit value={u.value} label={u.label} />
            {i < units.length - 1 && (
              <span className="text-2xl font-black text-gray-300 mb-7 leading-none">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}
