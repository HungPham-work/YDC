import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TARGET = new Date('2026-05-31T08:30:00+07:00');

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const tick = () => {
      const diff = TARGET.getTime() - Date.now();
      if (diff <= 0) {
        setExpired(true);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
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
    { label: 'NGÀY', value: timeLeft.days },
    { label: 'GIỜ', value: timeLeft.hours },
    { label: 'PHÚT', value: timeLeft.minutes },
    { label: 'GIÂY', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-10 flex flex-col items-center"
    >
      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-4">
        Hội thảo bắt đầu sau
      </span>
      <div className="flex items-center gap-3 sm:gap-4">
        {units.map((u, i) => (
          <React.Fragment key={u.label}>
            <div className="flex flex-col items-center">
              <div className="bg-black text-white rounded-2xl w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-black tabular-nums font-display">
                  {pad(u.value)}
                </span>
              </div>
              <span className="text-[9px] font-mono text-gray-400 mt-2 tracking-widest">
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="text-xl font-black text-gray-300 mb-4">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}
