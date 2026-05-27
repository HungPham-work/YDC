import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HOURS_PER_SECOND = 1649;
const BASE_ACTIVE_USERS = 500_000_000;

// Slot machine single digit
function SlotDigit({ digit, dark }: { digit: string; dark?: boolean }) {
  const digits = ['0','1','2','3','4','5','6','7','8','9'];

  return (
    <div
      className={`relative overflow-hidden inline-block w-[0.6em] h-[1.2em] align-bottom`}
      style={{ lineHeight: '1.2em' }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`absolute inset-0 flex items-center justify-center font-black tabular-nums ${dark ? 'text-[#FF5722]' : 'text-gray-900'}`}
          style={{ lineHeight: '1.2em' }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// Render a number string with slot animation per digit, preserving separators
function SlotNumber({ value, dark }: { value: string; dark?: boolean }) {
  return (
    <span className="inline-flex items-end text-4xl font-black font-display tracking-tight">
      {value.split('').map((char, i) =>
        /\d/.test(char)
          ? <SlotDigit key={i} digit={char} dark={dark} />
          : <span key={i} className={`${dark ? 'text-[#FF5722]' : 'text-gray-900'} font-black`}>{char}</span>
      )}
    </span>
  );
}

export default function LiveDopamineStat() {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [activeUsers, setActiveUsers] = useState(BASE_ACTIVE_USERS);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
  if (!isVisible) return;
  const interval = setInterval(() => {
    setSecondsElapsed(s => s + 1);
    setActiveUsers(u => u + Math.floor((Math.random() - 0.45) * 100_000));
  }, 1000);
  return () => clearInterval(interval);
}, [isVisible]);

  const hoursWasted = (secondsElapsed * HOURS_PER_SECOND).toLocaleString('vi-VN');
  const activeUsersStr = activeUsers.toLocaleString('vi-VN');

  return (
    <div ref={ref} className="flex flex-col gap-4 h-full">
      {/* Live badge */}
      <div className="flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-600">Dữ liệu thời gian thực</span>
      </div>

      {/* Stat 1: Hours wasted */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="bg-neutral-950 rounded-2xl p-6 flex flex-col gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 font-semibold">
          Giờ lướt video ngắn toàn cầu
        </span>
        <span className="text-[10px] font-mono text-neutral-400">kể từ khi bạn mở trang này</span>
        <div className="mt-1">
          <SlotNumber value={hoursWasted} dark />
        </div>
        <span className="text-xs text-neutral-500 font-light">giờ</span>
      </motion.div>

      {/* Stat 2: Active users */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600 font-semibold">
          Người đang lướt ngay lúc này
        </span>
        <div className="mt-1">
          <SlotNumber value={activeUsersStr} />
        </div>
        <span className="text-xs text-gray-500 font-light">người dùng toàn cầu</span>
      </motion.div>

      {/* Source note */}
      <span className="text-[10px] font-mono text-gray-500 mt-1">
        Ước tính dựa trên báo cáo TikTok 2024 — 95 phút/người/ngày
      </span>
    </div>
  );
}
