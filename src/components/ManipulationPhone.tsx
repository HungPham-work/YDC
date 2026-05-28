import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DARK_PATTERNS = [
  {
    id: 'infinite',
    emoji: '♾️',
    name: 'Lướt không điểm dừng',
    desc: 'Xóa bỏ mọi ranh giới tự nhiên, giữ chân bạn trong trạng thái tìm kiếm không hồi kết.',
    target: 'feed',
    color: '#D32F2F',
    label: 'Infinite Scroll',
    thought: '"Thêm một video nữa thôi..."',
  },
  {
    id: 'mystery',
    emoji: '🎁',
    name: 'Hộp quà bí ẩn',
    desc: 'Giống hệt máy chơi bạc. Bạn tiếp tục lướt vì tò mò video tiếp theo có gì mới lạ.',
    target: 'next',
    color: '#1565C0',
    label: 'Variable Reward',
    thought: '"Video tiếp theo có gì hay không?"',
  },
  {
    id: 'autoplay',
    emoji: '▶️',
    name: 'Tự động phát video',
    desc: 'Thiết lập chạy tự động trước khi bạn kịp suy nghĩ, tước đoạt quyền tự chủ.',
    target: 'autoplay',
    color: '#E65100',
    label: 'Autoplay',
    thought: '"Mình chưa chọn mà nó tự chạy rồi..."',
  },
  {
    id: 'pull',
    emoji: '🔄',
    name: 'Kéo để cập nhật',
    desc: 'Kích hoạt phản xạ có điều kiện ăn sâu vào tiềm thức giống như động tác giật máy đánh bạc.',
    target: 'pull',
    color: '#2E7D32',
    label: 'Pull-to-Refresh',
    thought: '"Kéo xuống xem có gì mới không..."',
  },
];

const FAKE_VIDEOS = [
  {
    user: '@namdo_vlogs',
    handle: 'Nam Đô Vlogs',
    desc: 'Ngày đầu đi làm tại Nhật 🇯🇵✨ #japan #cuocsong',
    likes: '142.3K',
    comments: '2.1K',
    shares: '8.4K',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=711&fit=crop&q=90',
    song: 'Nhạc nền - Trending 🎵',
  },
  {
    user: '@trangbeauty',
    handle: 'Trang Beauty',
    desc: 'Routine buổi sáng của mình 🌸 #beauty #morning #skincare',
    likes: '89.7K',
    comments: '934',
    shares: '3.2K',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=711&fit=crop&q=90',
    song: 'Lofi Morning - Chill Beats',
  },
  {
    user: '@gaming.vn',
    handle: 'Gaming VN',
    desc: 'Cách kiếm 10M/tháng chơi game 💰 #gaming #kiemtien',
    likes: '231.1K',
    comments: '5.6K',
    shares: '19.8K',
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=711&fit=crop&q=90',
    song: 'Epic Gaming Music - No Copyright',
  },
  {
    user: '@foodholic.hcm',
    handle: 'Foodholic HCM',
    desc: 'Quán bún bò ngon nhất Sài Gòn 🍜 #food #saigon #xuhuong',
    likes: '67.4K',
    comments: '1.2K',
    shares: '4.1K',
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

  const handleTap = (target: string) => {
    const pattern = DARK_PATTERNS.find(p => p.target === target);
    if (!pattern) return;
    setActive(prev => prev === pattern.id ? null : pattern.id);
    if (target === 'next') {
      setTimeout(() => setVideoIdx(i => (i + 1) % FAKE_VIDEOS.length), 200);
    }
    if (target === 'pull') {
      setIsPulling(true);
      setTimeout(() => {
        setVideoIdx(i => (i + 1) % FAKE_VIDEOS.length);
        setIsPulling(false);
      }, 900);
    }
  };

  const video = FAKE_VIDEOS[videoIdx];

  return (
    <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-16 py-4">

      {/* ── PHONE ── */}
      <div className="relative flex-shrink-0 select-none">

        {/* Ambient glow */}
        <AnimatePresence>
          {activePattern && (
            <motion.div
              key={activePattern.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.35, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute -inset-4 rounded-[56px] blur-3xl pointer-events-none"
              style={{ background: activePattern.color }}
            />
          )}
        </AnimatePresence>

        {/* Phone shell */}
        <div
          className="relative rounded-[44px] overflow-hidden shadow-2xl"
          style={{
            width: 260,
            height: 520,
            background: '#000',
            border: '8px solid #1a1a1a',
            boxShadow: '0 0 0 1px #333, 0 32px 64px rgba(0,0,0,0.6)',
          }}
        >
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-10 z-30 flex items-center justify-between px-5 pt-2">
            <span className="text-white text-[10px] font-bold">9:41</span>
            <div className="w-20 h-5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-0" />
            <div className="flex items-center gap-1">
              <span className="text-white text-[10px]">●●●</span>
              <span className="text-white text-[10px]">📶</span>
              <span className="text-white text-[10px]">🔋</span>
            </div>
          </div>

          {/* Pull-to-refresh indicator */}
          <AnimatePresence>
            {isPulling && (
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                className="absolute top-10 left-0 right-0 z-40 flex justify-center"
              >
                <div className="text-[10px] font-bold px-4 py-1.5 rounded-full text-white flex items-center gap-2"
                  style={{ background: '#2E7D32' }}>
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}>
                    🔄
                  </motion.span>
                  Đang tải video mới...
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Background image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={videoIdx}
              src={video.img}
              alt=""
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

          {/* Autoplay badge */}
          <AnimatePresence>
            {active === 'autoplay' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-12 left-3 right-3 z-30 flex justify-center"
              >
                <div className="text-[10px] font-bold px-3 py-1.5 rounded-full text-white flex items-center gap-1.5"
                  style={{ background: '#E65100' }}>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Tự động phát — bạn không chọn điều này
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Infinite scroll highlight */}
          <AnimatePresence>
            {active === 'infinite' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 pointer-events-none rounded-[36px]"
                style={{
                  border: `3px solid ${DARK_PATTERNS[0].color}`,
                  boxShadow: `inset 0 0 40px ${DARK_PATTERNS[0].color}55`,
                }}
              />
            )}
          </AnimatePresence>

          {/* Clickable feed area */}
          <button
            onClick={() => handleTap('feed')}
            className="absolute inset-0 z-10 w-full h-full cursor-pointer"
            style={{ background: 'transparent' }}
          />

          {/* Right side actions */}
          <div className="absolute right-3 bottom-28 z-20 flex flex-col items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-pink-400 to-orange-400" />
              </div>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#D32F2F] rounded-full flex items-center justify-center text-white text-[8px] font-black">+</div>
            </div>

            {/* Like */}
            <button
              onClick={(e) => { e.stopPropagation(); setLiked(l => !l); }}
              className="flex flex-col items-center gap-1"
            >
              <motion.div
                animate={liked ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="text-2xl"
              >
                {liked ? '❤️' : '🤍'}
              </motion.div>
              <span className="text-white text-[9px] font-bold">{video.likes}</span>
            </button>

            {/* Comment */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">💬</span>
              <span className="text-white text-[9px] font-bold">{video.comments}</span>
            </div>

            {/* Next / mystery box */}
            <button
              onClick={(e) => { e.stopPropagation(); handleTap('next'); }}
              className="flex flex-col items-center gap-1"
            >
              <motion.div
                animate={active === 'mystery' ? { rotate: [0, -15, 15, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-lg transition-colors"
                style={{ background: active === 'mystery' ? DARK_PATTERNS[1].color : 'rgba(255,255,255,0.15)' }}
              >
                ▶
              </motion.div>
              <span className="text-white text-[9px] font-bold">{video.shares}</span>
            </button>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-14 z-20 p-4 pb-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={videoIdx}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-white font-black text-sm mb-1">{video.user}</p>
                <p className="text-white/80 text-[11px] leading-relaxed mb-3 line-clamp-2">{video.desc}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]">🎵</span>
                  <p className="text-white/60 text-[10px] truncate max-w-[140px]">{video.song}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pull to refresh zone */}
          <button
            onClick={(e) => { e.stopPropagation(); handleTap('pull'); }}
            className="absolute bottom-0 left-0 right-0 h-8 z-20 flex items-center justify-center"
          >
            <div className={`text-[9px] font-mono transition-colors ${active === 'pull' ? 'text-[#2E7D32]' : 'text-white/30'}`}>
              ↓ kéo để cập nhật
            </div>
          </button>

          {/* TikTok-style progress bar */}
          <div className="absolute top-9 left-3 right-3 z-30 flex gap-0.5">
            {FAKE_VIDEOS.map((_, i) => (
              <div key={i} className="flex-1 h-0.5 rounded-full bg-white/30 overflow-hidden">
                {i === videoIdx && (
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 15, ease: 'linear' }}
                    key={videoIdx}
                  />
                )}
                {i < videoIdx && <div className="h-full bg-white w-full" />}
              </div>
            ))}
          </div>
        </div>

        {/* Pattern buttons below phone */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {DARK_PATTERNS.map(p => (
            <button
              key={p.id}
              onClick={() => setActive(prev => prev === p.id ? null : p.id)}
              className="text-[10px] font-mono px-3 py-1.5 rounded-full border-2 transition-all duration-200"
              style={{
                borderColor: active === p.id ? p.color : '#e5e7eb',
                background: active === p.id ? p.color : 'transparent',
                color: active === p.id ? 'white' : '#9ca3af',
              }}
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── EXPLANATION PANEL ── */}
      <div className="w-full lg:w-80 flex items-start lg:pt-8">
        <AnimatePresence mode="wait">
          {activePattern ? (
            <motion.div
              key={activePattern.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full"
            >
              <div className="rounded-2xl p-5 mb-3 text-white" style={{ background: activePattern.color }}>
                <div className="text-4xl mb-3">{activePattern.emoji}</div>
                <div className="text-[9px] font-mono uppercase tracking-[0.15em] opacity-60 mb-1">
                  Dark Pattern #{DARK_PATTERNS.findIndex(p => p.id === activePattern.id) + 1}
                </div>
                <div className="text-[9px] font-mono uppercase tracking-widest opacity-70 mb-2">
                  {activePattern.label}
                </div>
                <h3 className="text-xl font-black leading-tight">{activePattern.name}</h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-3">
                <p className="text-sm text-gray-700 leading-relaxed">{activePattern.desc}</p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-gray-200">
                <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mb-2">
                  Bạn đang nghĩ
                </div>
                <p className="text-sm font-medium text-gray-800 italic leading-relaxed">
                  {activePattern.thought}
                </p>
              </div>

              {/* Dots nav */}
              <div className="flex gap-2 mt-4 justify-center">
                {DARK_PATTERNS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setActive(p.id)}
                    className="transition-all duration-200 rounded-full"
                    style={{
                      width: active === p.id ? 24 : 8,
                      height: 8,
                      background: active === p.id ? activePattern.color : '#e5e7eb',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full text-center py-12"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-5xl mb-4"
              >
                👆
              </motion.div>
              <p className="text-sm text-gray-400 font-mono leading-relaxed">
                Tap vào các phần trên phone<br />hoặc bấm nút bên dưới<br />để khám phá từng chiêu thức
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
