import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Plus, Zap } from 'lucide-react';

// ── DATA ──────────────────────────────────────────────────────────────────────

const VIDEOS = [
  { src: '/assets/animal.mp4',   user: '@wildlife.vn',    desc: 'Khoảnh khắc động vật hoang dã 🦁 #nature #animal',    likes: '284.1K', comments: '3.2K', shares: '12.4K' },
  { src: '/assets/food.mp4',     user: '@foodholic.hcm',  desc: 'Quán bún bò ngon nhất Sài Gòn 🍜 #food #saigon',      likes: '67.4K',  comments: '1.2K', shares: '4.1K'  },
  { src: '/assets/game.mp4',     user: '@gaming.vn',      desc: 'Cách kiếm 10M/tháng chơi game 💰 #gaming #kiemtien',  likes: '231.1K', comments: '5.6K', shares: '19.8K' },
  { src: '/assets/brainrot.mp4', user: '@brainrot.daily', desc: 'POV: não bạn sau 3 tiếng TikTok 🧠💀 #brainrot',      likes: '512.9K', comments: '8.1K', shares: '34.2K' },
  { src: '/assets/random.mp4',   user: '@random.stuff',   desc: 'Không biết tại sao mình xem cái này 😂 #random',      likes: '45.2K',  comments: '891',  shares: '2.3K'  },
  { src: '/assets/another.mp4',  user: '@another.creator',desc: 'Thêm một video nữa thôi... rồi đi ngủ 😴 #relatable', likes: '198.3K', comments: '4.4K', shares: '9.1K'  },
  // loop lại
  { src: '/assets/animal.mp4',   user: '@wildlife.vn',    desc: 'Khoảnh khắc động vật hoang dã 🦁 #nature',            likes: '284.1K', comments: '3.2K', shares: '12.4K' },
  { src: '/assets/food.mp4',     user: '@foodholic.hcm',  desc: 'Món ăn đường phố Việt Nam 🍢 #streetfood',            likes: '93.7K',  comments: '2.1K', shares: '6.8K'  },
  { src: '/assets/game.mp4',     user: '@gaming.vn',      desc: 'Top 1 server VN gọi tên aiiii? 🎮 #esports',       likes: '176.4K', comments: '3.9K', shares: '14.2K' },
  { src: '/assets/brainrot.mp4', user: '@brainrot.daily', desc: 'Tiktok lúc 2h sáng 🌙',        likes: '623.8K', comments: '11.2K',shares: '41.5K' },
];

const PATTERNS = [
  { id: 'infinite', color: '#D32F2F', label: 'Infinite Scroll',   desc: 'Không có điểm dừng tự nhiên — feed kéo dài vô tận để giữ bạn ở lại.' },
  { id: 'autoplay', color: '#E65100', label: 'Autoplay',          desc: 'Video tự phát trước khi bạn kịp quyết định có muốn xem không.' },
  { id: 'pull',     color: '#2E7D32', label: 'Pull-to-Refresh',   desc: 'Phản xạ giật máy đánh bạc — kéo xuống để xem mình "thắng" được gì.' },
  { id: 'speed',    color: '#1565C0', label: '2× Speed',          desc: 'Não quen nhận dopamine nhanh — nội dung bình thường trở nên nhàm chán.' },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function ManipulationPhone() {
  const feedRef        = useRef<HTMLDivElement>(null);
  const videoRefs      = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIdx, setActiveIdx]   = useState(0);
  const [liked, setLiked]           = useState<Record<number, boolean>>({});
  const [speed, setSpeed]           = useState(1);
  const [isPulling, setIsPulling]   = useState(false);
  const [pullY, setPullY]           = useState(0);
  const [activePattern, setActivePattern] = useState<string | null>(null);
  const scrollCount = useRef(0);
  const touchStartY = useRef(0);

  // Pause all, play current
  const syncPlay = useCallback((idx: number, spd: number) => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.playbackRate = spd;
      if (i === idx) { v.play().catch(() => {}); }
      else { v.pause(); }
    });
  }, []);

  // IntersectionObserver — detect which video is visible
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.intersectionRatio > 0.6) {
  setActiveIdx(i);
  syncPlay(i, speed);
  if (scrollCount.current === 0) setActivePattern('autoplay');
} },
        { threshold: 0.6, root: feedRef.current }
      );
      obs.observe(v);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [speed, syncPlay]);

  // Speed change
  const toggleSpeed = () => {
    const next = speed === 1 ? 2 : 1;
    setSpeed(next);
    const v = videoRefs.current[activeIdx];
    if (v) v.playbackRate = next;
    setActivePattern('speed');
  };

  // Pull to refresh — touch
  const onTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
  const onTouchMove  = (e: React.TouchEvent) => {
    if (!feedRef.current) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (feedRef.current.scrollTop === 0 && delta > 0) setPullY(Math.min(delta * 0.4, 48));
  };
  const onTouchEnd   = () => {
    if (pullY > 30) {
      setIsPulling(true);
     if (scrollCount.current <= 1) setActivePattern('pull');
      setTimeout(() => { setIsPulling(false); setPullY(0); }, 1000);
    } else {
      setPullY(0);
    }
  };

  // Scroll → flag infinite scroll pattern
  const onScroll = () => {
  if (!feedRef.current) return;
  const { scrollTop } = feedRef.current;
  if (scrollTop < 20) return;
  if (scrollCount.current === 0) {
    scrollCount.current = 1;
    // không set pattern ở đây — để onTouchEnd xử lý
  } else if (scrollCount.current === 1) {
    scrollCount.current = 2;
    setActivePattern('infinite');
  }
};

  const currentPattern = PATTERNS.find(p => p.id === activePattern);

  return (
    <div className="w-full flex flex-col items-center gap-6 py-4">

      {/* ── PHONE FRAME ── */}
      <div className="relative flex-shrink-0 select-none mx-auto"
        style={{ width: 260 }}>

        <div
          className="relative rounded-[44px] overflow-hidden shadow-2xl mx-auto"
          style={{
            width: 260, height: 520,
            background: '#000',
            border: currentPattern ? `8px solid ${currentPattern.color}` : '8px solid #1a1a1a',
            boxShadow: currentPattern
              ? `0 0 0 1px ${currentPattern.color}55, 0 32px 64px rgba(0,0,0,0.5)`
              : '0 0 0 1px #333, 0 32px 64px rgba(0,0,0,0.5)',
            transition: 'border-color 0.35s, box-shadow 0.35s',
          }}
        >
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-9 z-30 flex items-center justify-between px-4 pt-1.5 pointer-events-none">
            <span className="text-white text-[10px] font-semibold">9:41</span>
            <div className="w-16 h-4 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-0" />
            <span className="text-white text-[9px]">▐▐▐ ⊡</span>
          </div>

          {/* Pull indicator */}
          <AnimatePresence>
            {(isPulling || pullY > 10) && (
              <motion.div
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="absolute top-9 left-0 right-0 z-40 flex justify-center pt-1 pointer-events-none">
                <div className="text-[10px] font-bold px-3 py-1 rounded-full text-white flex items-center gap-1.5"
                  style={{ background: '#2E7D32' }}>
                  <motion.span
                    animate={isPulling ? { rotate: 360 } : {}}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}>
                    🔄
                  </motion.span>
                  {isPulling ? 'Đang tải...' : 'Kéo để cập nhật'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2x speed badge */}
          <AnimatePresence>
            {speed === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-10 right-3 z-40 pointer-events-none">
                <div className="text-[10px] font-black px-2 py-1 rounded-lg text-white flex items-center gap-1"
                  style={{ background: '#1565C0' }}>
                  <Zap size={10} fill="white" /> 2×
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pull offset wrapper */}
          <motion.div
            animate={{ y: pullY }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="h-full"
          >
            {/* Scrollable feed */}
            <div
              ref={feedRef}
              onScroll={onScroll}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="h-full overflow-y-scroll"
              style={{ scrollSnapType: 'y mandatory', scrollbarWidth: 'none' }}
            >
              {VIDEOS.map((vid, i) => (
                <div key={i} className="relative flex-shrink-0"
                  style={{ width: '100%', height: 504, scrollSnapAlign: 'start' }}>

                  {/* Video */}
                  <video
                    ref={el => { videoRefs.current[i] = el; }}
                    src={vid.src}
                    loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/30" />

                  {/* Right actions */}
                  <div className="absolute right-3 bottom-24 z-10 flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-pink-400 to-orange-400" />
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center text-white"
                        style={{ background: '#D32F2F' }}>
                        <Plus size={8} strokeWidth={3} />
                      </div>
                    </div>
                    <button onClick={() => setLiked(l => ({ ...l, [i]: !l[i] }))}
                      className="flex flex-col items-center gap-0.5">
                      <motion.div animate={liked[i] ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.3 }}>
                        <Heart size={26} fill={liked[i] ? '#ff4d4d' : 'none'} color={liked[i] ? '#ff4d4d' : 'white'} strokeWidth={1.5} />
                      </motion.div>
                      <span className="text-white text-[9px]">{vid.likes}</span>
                    </button>
                    <div className="flex flex-col items-center gap-0.5">
                      <MessageCircle size={26} color="white" strokeWidth={1.5} />
                      <span className="text-white text-[9px]">{vid.comments}</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <Share2 size={26} color="white" strokeWidth={1.5} />
                      <span className="text-white text-[9px]">{vid.shares}</span>
                    </div>
                    {/* 2x speed button */}
                    <button onClick={toggleSpeed}
                      className="flex flex-col items-center gap-0.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                        style={{ background: speed === 2 ? '#1565C0' : 'rgba(255,255,255,0.15)' }}>
                        <Zap size={14} color="white" fill={speed === 2 ? 'white' : 'none'} />
                      </div>
                      <span className="text-white text-[9px]">{speed}×</span>
                    </button>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-4 left-3 right-14 z-10">
                    <p className="text-white font-bold text-sm mb-1">{vid.user}</p>
                    <p className="text-white/80 text-[11px] leading-relaxed line-clamp-2">{vid.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── PATTERN CARD below phone ── */}
        <div className="mt-4 w-[260px] mx-auto" style={{ minHeight: 72 }}>
          <AnimatePresence mode="wait">
            {currentPattern ? (
              <motion.div key={currentPattern.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="rounded-2xl p-4 text-white"
                style={{ background: currentPattern.color }}>
                <div className="text-[9px] font-mono uppercase tracking-widest opacity-70 mb-1">
                  Dark Pattern — {currentPattern.label}
                </div>
                <p className="text-[11px] leading-relaxed">{currentPattern.desc}</p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-3 flex items-center justify-center gap-2">
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-lg">☝️</motion.div>
                <p className="text-[11px] text-gray-400 font-mono">
                  Cuộn feed để khám phá
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
