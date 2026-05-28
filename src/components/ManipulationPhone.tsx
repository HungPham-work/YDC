import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Plus, RotateCcw, Play, Infinity, Gift } from 'lucide-react';

const DARK_PATTERNS = [
  {
    id: 'infinite',
    icon: <Infinity size={12} />,
    name: 'Lướt không điểm dừng',
    desc: 'Xóa bỏ mọi ranh giới tự nhiên, giữ chân bạn trong trạng thái tìm kiếm không hồi kết.',
    target: 'feed',
    color: '#D32F2F',
    label: 'Infinite Scroll',
    thought: '"Thêm một video nữa thôi..."',
    // position on phone: top/left in %
    badgePos: { top: '42%', left: '8px' },
  },
  {
    id: 'mystery',
    icon: <Gift size={12} />,
    name: 'Hộp quà bí ẩn',
    desc: 'Giống hệt máy chơi bạc. Bạn tiếp tục lướt vì tò mò video tiếp theo có gì mới lạ.',
    target: 'next',
    color: '#1565C0',
    label: 'Variable Reward',
    thought: '"Video tiếp theo có gì hay không?"',
    badgePos: { top: '62%', right: '8px' },
  },
  {
    id: 'autoplay',
    icon: <Play size={12} />,
    name: 'Tự động phát video',
    desc: 'Thiết lập chạy tự động trước khi bạn kịp suy nghĩ, tước đoạt quyền tự chủ.',
    target: 'autoplay',
    color: '#E65100',
    label: 'Autoplay',
    thought: '"Mình chưa chọn mà nó tự chạy rồi..."',
    badgePos: { top: '14%', left: '50%', transform: 'translateX(-50%)' },
  },
  {
    id: 'pull',
    icon: <RotateCcw size={12} />,
    name: 'Kéo để cập nhật',
    desc: 'Kích hoạt phản xạ có điều kiện ăn sâu vào tiềm thức giống như động tác giật máy đánh bạc.',
    target: 'pull',
    color: '#2E7D32',
    label: 'Pull-to-Refresh',
    thought: '"Kéo xuống xem có gì mới không..."',
    badgePos: { bottom: '14px', left: '50%', transform: 'translateX(-50%)' },
  },
];

const FAKE_VIDEOS = [
  {
    user: '@namdo_vlogs', desc: 'Ngày đầu đi làm tại Nhật 🇯🇵✨ #japan #cuocsong',
    likes: '142.3K', comments: '2.1K', shares: '8.4K',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=711&fit=crop&q=90',
    song: 'Nhạc nền - Trending',
  },
  {
    user: '@trangbeauty', desc: 'Routine buổi sáng của mình 🌸 #beauty #morning',
    likes: '89.7K', comments: '934', shares: '3.2K',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=711&fit=crop&q=90',
    song: 'Lofi Morning - Chill Beats',
  },
  {
    user: '@gaming.vn', desc: 'Cách kiếm 10M/tháng chơi game 💰 #gaming',
    likes: '231.1K', comments: '5.6K', shares: '19.8K',
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=711&fit=crop&q=90',
    song: 'Epic Gaming Music',
  },
  {
    user: '@foodholic.hcm', desc: 'Quán bún bò ngon nhất Sài Gòn 🍜 #food #saigon',
    likes: '67.4K', comments: '1.2K', shares: '4.1K',
    img: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=711&fit=crop&q=90',
    song: 'Vui Vẻ - Nhạc Việt',
  },
];

export default function ManipulationPhone() {
  const [active, setActive] = useState<string | null>(null);
  const [isPulling, setIsPulling] = useState(false);
  const [videoIdx, setVideoIdx] = useState(0);
  const [liked, setLiked] = useState(false);

  const activePattern = DARK_PATTERNS.find(p => p.id === active);
  const video = FAKE_VIDEOS[videoIdx];

  const handleTap = (target: string) => {
    const pattern = DARK_PATTERNS.find(p => p.target === target);
    if (!pattern) return;
    setActive(prev => prev === pattern.id ? null : pattern.id);
    if (target === 'next') setTimeout(() => setVideoIdx(i => (i + 1) % FAKE_VIDEOS.length), 200);
    if (target === 'pull') {
      setIsPulling(true);
      setTimeout(() => { setVideoIdx(i => (i + 1) % FAKE_VIDEOS.length); setIsPulling(false); }, 900);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 py-4">

      {/* ── PHONE ── */}
      <div className="relative flex-shrink-0 select-none mx-auto">
        <div
          className="relative rounded-[44px] overflow-hidden shadow-2xl mx-auto"
          style={{
            width: 260, height: 520,
            background: '#000',
            border: activePattern ? `8px solid ${activePattern.color}` : '8px solid #1a1a1a',
            boxShadow: activePattern
              ? `0 0 0 1px ${activePattern.color}55, 0 32px 64px rgba(0,0,0,0.5)`
              : '0 0 0 1px #333, 0 32px 64px rgba(0,0,0,0.5)',
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}
        >
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-9 z-30 flex items-center justify-between px-4 pt-1.5">
            <span className="text-white text-[10px] font-semibold">9:41</span>
            <div className="w-16 h-4 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-0" />
            <div className="flex items-center gap-0.5 text-white text-[9px]">
              <span>▐▐▐</span><span> ⊡</span>
            </div>
          </div>

          {/* Progress bars */}
          <div className="absolute top-9 left-3 right-3 z-30 flex gap-0.5">
            {FAKE_VIDEOS.map((_, i) => (
              <div key={i} className="flex-1 h-[2px] rounded-full bg-white/25 overflow-hidden">
                {i === videoIdx && (
                  <motion.div className="h-full bg-white" initial={{ width: '0%' }}
                    animate={{ width: '100%' }} transition={{ duration: 12, ease: 'linear' }} key={videoIdx} />
                )}
                {i < videoIdx && <div className="h-full bg-white w-full" />}
              </div>
            ))}
          </div>

          {/* Pull indicator */}
          <AnimatePresence>
            {isPulling && (
              <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }}
                className="absolute top-10 left-0 right-0 z-40 flex justify-center">
                <div className="text-[10px] font-bold px-3 py-1 rounded-full text-white flex items-center gap-1.5"
                  style={{ background: '#2E7D32' }}>
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}>
                    <RotateCcw size={10} />
                  </motion.span>
                  Đang tải...
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Background image */}
          <AnimatePresence mode="wait">
            <motion.img key={videoIdx} src={video.img} alt=""
              initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full object-cover" />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40" />

          {/* Clickable feed bg */}
          <button onClick={() => handleTap('feed')}
            className="absolute inset-0 z-10 w-full h-full cursor-pointer" style={{ background: 'transparent' }} />

          {/* ── HOTSPOT PULSE DOTS ── */}
          {DARK_PATTERNS.map(p => (
            <div
              key={`hotspot-${p.id}`}
              className="absolute z-30 pointer-events-none"
              style={{
                ...(p.badgePos as React.CSSProperties),
                // offset slightly so dot appears at corner of badge
              }}
            >
              <AnimatePresence>
                {active !== p.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative flex items-center justify-center w-5 h-5"
                  >
                    {/* Outer ping */}
                    <motion.div
                      animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', delay: DARK_PATTERNS.findIndex(x => x.id === p.id) * 0.3 }}
                      className="absolute w-4 h-4 rounded-full"
                      style={{ background: p.color }}
                    />
                    {/* Inner dot */}
                    <div className="w-3 h-3 rounded-full border-2 border-white shadow-md z-10"
                      style={{ background: p.color }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* ── FLOATING BADGES on phone ── */}
          {DARK_PATTERNS.map(p => (
            <AnimatePresence key={p.id}>
              {active === p.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-40 pointer-events-none"
                  style={p.badgePos as React.CSSProperties}
                >
                  <div className="rounded-xl px-2.5 py-1.5 text-white shadow-lg"
                    style={{ background: p.color, maxWidth: 130 }}>
                    <div className="flex items-center gap-1 mb-0.5">
                      {p.icon}
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider">{p.label}</span>
                    </div>
                    <p className="text-[9px] leading-snug opacity-90">{p.thought}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}

          {/* Right side actions */}
          <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-5">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-pink-400 to-orange-400" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center text-white"
                style={{ background: '#D32F2F' }}>
                <Plus size={10} strokeWidth={3} />
              </div>
            </div>

            <button onClick={(e) => { e.stopPropagation(); setLiked(l => !l); }}
              className="flex flex-col items-center gap-1">
              <motion.div animate={liked ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.3 }}>
                <Heart size={28} fill={liked ? '#ff4d4d' : 'none'} color={liked ? '#ff4d4d' : 'white'} strokeWidth={1.5} />
              </motion.div>
              <span className="text-white text-[9px] font-semibold">{video.likes}</span>
            </button>

            <div className="flex flex-col items-center gap-1">
              <MessageCircle size={28} color="white" strokeWidth={1.5} />
              <span className="text-white text-[9px] font-semibold">{video.comments}</span>
            </div>

            <button onClick={(e) => { e.stopPropagation(); handleTap('next'); }}
              className="flex flex-col items-center gap-1">
              <motion.div animate={active === 'mystery' ? { rotate: [0, -12, 12, -8, 0] } : {}}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: active === 'mystery' ? DARK_PATTERNS[1].color : 'rgba(255,255,255,0.15)' }}>
                <Share2 size={16} color="white" strokeWidth={1.5} />
              </motion.div>
              <span className="text-white text-[9px] font-semibold">{video.shares}</span>
            </button>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-14 z-20 p-4 pb-4">
            <AnimatePresence mode="wait">
              <motion.div key={videoIdx}
                initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.22 }}>
                <p className="text-white font-bold text-sm mb-1">{video.user}</p>
                <p className="text-white/80 text-[11px] leading-relaxed mb-2 line-clamp-2">{video.desc}</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/40 flex items-center justify-center">
                    <Play size={6} fill="white" color="white" />
                  </div>
                  <p className="text-white/50 text-[9px] truncate max-w-[150px]">{video.song}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pull to refresh tap zone */}
          <button onClick={(e) => { e.stopPropagation(); handleTap('pull'); }}
            className="absolute bottom-0 left-0 right-0 h-7 z-20 flex items-center justify-center">
            <span className={`text-[9px] font-mono transition-colors ${active === 'pull' ? 'text-[#4caf50]' : 'text-white/25'}`}>
              ↓ kéo để xem thêm
            </span>
          </button>
        </div>

        {/* ── MINI DESC CARD below phone ── */}
        <div className="mt-4 w-[260px] mx-auto min-h-[80px]">
          <AnimatePresence mode="wait">
            {activePattern ? (
              <motion.div key={activePattern.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="rounded-2xl p-4 text-white"
                style={{ background: activePattern.color }}>
                <div className="text-[9px] font-mono uppercase tracking-widest opacity-70 mb-1">
                  {activePattern.label}
                </div>
                <p className="text-[11px] leading-relaxed">{activePattern.desc}</p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-4">
                <p className="text-[11px] text-gray-400 font-mono">
                  Tap vào các chấm trên phone để khám phá
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
