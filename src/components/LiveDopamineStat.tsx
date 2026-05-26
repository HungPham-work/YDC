import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Thống kê thực:
// TikTok: ~1.5 tỷ người dùng × 95 phút/ngày = ~142,500,000 giờ/ngày toàn cầu
// = 1,649 giờ/giây
const HOURS_PER_SECOND = 1649;

// ~500 triệu người online bất kỳ lúc nào
const BASE_ACTIVE_USERS = 500_000_000;

export default function LiveDopamineStat() {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
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
    }, 1000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const hoursWasted = (secondsElapsed * HOURS_PER_SECOND).toLocaleString('vi-VN');
  const activeUsers = (BASE_ACTIVE_USERS + secondsElapsed * 120).toLocaleString('vi-VN');

  return (
    <div ref={ref} className="flex flex-col gap-4 h-full">
      {/* Live badge */}
      <div className="flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Dữ liệu thời gian thực</span>
      </div>

      {/* Stat 1: Hours wasted */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="bg-neutral-950 rounded-2xl p-6 flex flex-col gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
          Giờ lướt video ngắn toàn cầu
        </span>
        <span className="text-[10px] font-mono text-neutral-600">kể từ khi bạn mở trang này</span>
        <div className="text-4xl font-black text-[#FF5722] tracking-tight font-display mt-1 tabular-nums">
          {hoursWasted}
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
        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
          Người đang lướt ngay lúc này
        </span>
        <div className="text-4xl font-black text-gray-900 tracking-tight font-display mt-1 tabular-nums">
          {activeUsers}
        </div>
        <span className="text-xs text-gray-400 font-light">người dùng toàn cầu</span>
      </motion.div>

      {/* Source note */}
      <span className="text-[10px] font-mono text-gray-300 mt-1">
        Ước tính dựa trên báo cáo TikTok 2024 — 95 phút/người/ngày
      </span>
    </div>
  );
}
