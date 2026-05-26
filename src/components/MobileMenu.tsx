import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Clock, Calendar, MapPin, Award } from 'lucide-react';
import LiveClock from './LiveClock';
import RollingButton from './RollingButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollTo: (sectionId: string) => void;
}

export default function MobileMenu({ isOpen, onClose, onScrollTo }: MobileMenuProps) {
  const links = [
    { label: '01 / Bản chất', target: 'nature' },
    { label: '02 / Cân bằng', target: 'mechanism' },
    { label: '03 / Thao túng', target: 'manipulation' },
    { label: '04 / Tác hại', target: 'harm' },
    { label: '05 / Hệ quả', target: 'consequence' },
    { label: '06 / Giải pháp', target: 'solution' },
    { label: '07 / Thắc mắc', target: 'faq' },
  ];

  const handleLinkClick = (target: string) => {
    onClose();
    // Allow sheet transition to finish before scrolling
    setTimeout(() => {
      onScrollTo(target);
    }, 250);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          {/* Overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
          />

          {/* Bottom Sheet wrapper */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative bg-white rounded-t-[32px] px-6 pt-5 pb-8 shadow-2xl z-10 w-full"
          >
            {/* Aesthetic Handle indicator on top */}
            <div className="mx-auto w-12 h-1.5 bg-gray-200 rounded-full mb-6 cursor-pointer" onClick={onClose} />

            {/* Header with exit */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-xs font-mono tracking-wider text-[#FF5722] uppercase font-bold">Fast Dopamine</span>
                <h4 className="text-lg font-bold text-gray-900 mt-1">Hội thảo Quốc Gia 2026</h4>
              </div>
              <button
                id="mobile-close-btn"
                onClick={onClose}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links stack */}
            <nav className="flex flex-col space-y-1.5 mb-8">
              {links.map((link) => (
                <button
                  key={link.target}
                  onClick={() => handleLinkClick(link.target)}
                  className="w-full text-left py-3 px-4 rounded-xl hover:bg-gray-50 text-gray-800 text-sm font-semibold tracking-wide transition-all border border-transparent hover:border-gray-100 flex justify-between items-center group"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-gray-300 group-hover:text-black transition-colors font-mono">→</span>
                </button>
              ))}
            </nav>

            {/* Additional Info Cards inside Mobile Bottom Sheet */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-1.5 text-[#FF5722] mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold font-mono">Thời gian</span>
                </div>
                <p className="text-xs font-bold text-gray-900 leading-tight">Chủ nhật này</p>
                <p className="text-[10px] text-gray-500 font-mono">08:30 – 11:00 AM</p>
              </div>

              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 pb-2">
                <div className="flex items-center space-x-1.5 text-blue-600 mb-1">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-bold font-mono">Chứng nhận</span>
                </div>
                <p className="text-xs font-bold text-gray-900 leading-tight">Stanford Neuro</p>
                <p className="text-[10px] text-gray-500 font-mono">Approved badge</p>
              </div>
            </div>

            {/* Live Clock & Call To Action */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Thời gian Luân Đôn hiện tại:</span>
                <LiveClock />
              </div>

              <div className="pt-2">
                <RollingButton
                  text="ĐĂNG KÝ VÉ MIỄN PHÍ"
                  color="orange"
                  onClick={() => {
                    onClose();
                    setTimeout(() => onScrollTo('register-section'), 300);
                  }}
                />
              </div>
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
