import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Brain, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import RollingButton from './RollingButton';

interface PopupQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
}

interface Question {
  id: number;
  q: string;
  options: { text: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    q: "Bạn thường kiểm tra điện thoại lần đầu tiên trong ngày khi nào?",
    options: [
      { text: "Vừa mở mắt, vẫn còn nằm trên giường ngủ", score: 3 },
      { text: "Trong vòng 30 phút đầu sau khi thức dậy", score: 2 },
      { text: "Sau khi vệ sinh cá nhân & chuẩn bị xong xuôi", score: 1 },
      { text: "Chỉ khi bắt đầu bước vào bàn làm việc", score: 0 }
    ]
  },
  {
    id: 2,
    q: "Khi phải chờ đợi trong 1 phút (chờ thang máy, xếp hàng, đèn đỏ), bạn thường:",
    options: [
      { text: "Lập tức rút điện thoại lướt mạng xã hội vô thức", score: 3 },
      { text: "Kiểm tra tin nhắn hoặc thông báo nhanh rồi cất đi", score: 2 },
      { text: "Đôi lúc rút ra xem, đôi lúc đứng nhìn xung quanh", score: 1 },
      { text: "Đứng im thư giãn, không hề chạm tới điện thoại", score: 0 }
    ]
  },
  {
    id: 3,
    q: "Khi đang học tập hoặc làm việc tập trung, tần suất bạn bị phân tâm bởi điện thoại là:",
    options: [
      { text: "Mỗi 5 - 10 phút một lần (không thể cưỡng lại)", score: 3 },
      { text: "Khoảng 20 - 30 phút một lần (làm giảm nhịp độ)", score: 2 },
      { text: "Chỉ khi đã hoàn thành xong một công việc cụ thể", score: 1 },
      { text: "Tập trung sâu trên 1 tiếng không đụng điện thoại", score: 0 }
    ]
  },
  {
    id: 4,
    q: "Thời gian bạn tiêu tốn cho video ngắn (TikTok, Reels, Shorts) mỗi ngày là bao lâu?",
    options: [
      { text: "Trên 3 tiếng mỗi ngày (thường xuyên lướt xuyên đêm)", score: 3 },
      { text: "Từ 1 đến 3 tiếng mỗi ngày (chiếm hết thời gian rảnh)", score: 2 },
      { text: "Dưới 1 tiếng mỗi ngày (chỉ xem lúc thực sự rảnh)", score: 1 },
      { text: "Hầu như không động đến hoặc đã chủ động xóa app", score: 0 }
    ]
  }
];

export default function PopupQuiz({ isOpen, onClose, onComplete }: PopupQuizProps) {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 to QUESTIONS.length - 1, or level score
  const [totalScore, setTotalScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const handleOptionSelect = (score: number) => {
    const updatedScore = totalScore + score;
    setTotalScore(updatedScore);
    
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setTotalScore(0);
    setQuizFinished(false);
  };

  const getResultTier = (score: number) => {
    if (score >= 9) {
      return {
        title: "CHẾ ĐỘ ĐỎ (MỨC BÁO ĐỘNG)",
        percentage: "BỊ CHIẾM ĐOẠT 85%",
        color: "text-red-500 bg-red-50 border-red-100",
        barColor: "bg-red-500",
        message: "Não bộ của bạn đã hoàn toàn thích nghi với các thuật toán video kích thích nhanh. Khả năng chịu đựng sự nhàm chán lành mạnh gần như biến mất, dẫn đến sự trì hoãn sâu và uể oải mãn tính.",
        tip: "Bạn cực kỳ cần thiết để khởi động một kỳ Dopamine Detox khoa học.",
        recommendation: "Bạn cần một kỳ Dopamine Detox ngay. Tham gia hội thảo để được hướng dẫn cụ thể."
      };
    } else if (score >= 5) {
      return {
        title: "MỨC BÃO HÒA CẢM XÚC",
        percentage: "BỊ CHIẾM ĐOẠT 55%",
        color: "text-[#FF5722] bg-[#FF5722]/5 border-[#FF5722]/10",
        barColor: "bg-[#FF5722]",
        message: "Bạn đang đứng ở ranh giới của sự mất tự chủ. Thế giới thực bắt đầu cảm thấy nhạt nhẽo và bạn có xu hướng dời lịch học, lịch tập sang hôm sau.",
        tip: "Hãy thiết lập các rào cản thông minh ban đầu trước khi tình trạng bão hòa trầm trọng hơn.",
        recommendation: "Hãy đến hội thảo để tìm hiểu cách thiết lập rào cản và cải thiện chất lượng sống."
      };
    } else {
      return {
        title: "KIỂM SOÁT TỐT (MỨC KHỎE MẠNH)",
        percentage: "CHỈ CHIẾM ĐOẠT 15%",
        color: "text-emerald-600 bg-emerald-50 border-emerald-100",
        barColor: "bg-emerald-500",
        message: "Bộ lọc tâm lý của bạn hoạt động khá hiệu quả. Bạn giữ vững được ranh giới trước cám dỗ số và duy trì kỷ luật lành mạnh.",
        tip: "Hãy tối ưu nốt môi trường xung quanh để chuyển hóa năng lượng này thành hiệu suất đột phá định cư sâu.",
        recommendation: "Bạn đang làm tốt. Hãy đến hội thảo để chia sẻ cách duy trì và tối ưu cuộc sống."
      };
    }
  };

  const result = getResultTier(totalScore);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
            className="relative bg-white border border-gray-100 shadow-2xl rounded-3xl w-full max-w-lg overflow-hidden z-10"
          >
            {/* Header branding */}
            <div className="bg-black text-white px-6 py-4 flex justify-between items-center border-b border-neutral-900">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-[#FF5722] animate-pulse" />
                <span className="text-[11px] font-mono tracking-widest font-bold">DOPAMINE DIAGNOSIS</span>
              </div>
              <button 
                onClick={onClose}
                className="text-neutral-400 hover:text-white transition-colors p-1 bg-neutral-800 rounded-full cursor-pointer focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8">
              {!quizFinished ? (
                <div>
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest">
                      Câu hỏi {currentStep + 1} / {QUESTIONS.length}
                    </span>
                    <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#FF5722] h-full transition-all duration-300" 
                        style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug tracking-tight mb-6">
                    {QUESTIONS[currentStep].q}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {QUESTIONS[currentStep].options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleOptionSelect(opt.score)}
                        className="w-full text-left p-4 rounded-2xl border border-gray-100 hover:border-[#FF5722]/40 hover:bg-neutral-50/50 transition-all duration-200 cursor-pointer text-xs sm:text-sm text-gray-700 font-medium active:scale-[0.99] focus:outline-none flex items-center justify-between group"
                      >
                        <span>{opt.text}</span>
                        <span className="w-5 h-5 rounded-full border border-gray-200 group-hover:bg-[#FF5722] group-hover:border-transparent flex items-center justify-center transition-all duration-200">
                          <span className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Results card segment */
                <div className="text-center">
                  <span className="w-12 h-12 rounded-full bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center mx-auto mb-4 scale-110">
                    <Sparkles className="w-6 h-6" />
                  </span>
                  
                  <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 font-bold block mb-1">KẾT QUẢ CỦA BẠN</span>
                  <div className={`inline-block px-4 py-1.5 rounded-full border text-xs font-bold tracking-wider mb-4 ${result.color}`}>
                    {result.title}
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-950 mb-1">
                      {result.percentage}
                    </div>
                    {/* Fake index scale */}
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(totalScore / 12) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full ${result.barColor}`}
                      />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light mb-6">
                    {result.message} <strong className="font-semibold text-gray-800">{result.tip}</strong>
                  </p>

                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-left flex items-start space-x-3 mb-6">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 mb-0.5">Hành động được đề xuất:</h4>
                      <p className="text-[11px] sm:text-xs text-gray-500 leading-snug font-light">
                        {result.recommendation}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={resetQuiz}
                      className="text-xs font-semibold text-gray-400 hover:text-gray-900 transition-colors py-2 px-4 cursor-pointer"
                    >
                      Làm lại trắc nghiệm
                    </button>
                    
                  </div>
                </div>
              )}
            </div>

            {/* Bottom branding footer */}
            <div className="bg-gray-50 border-t border-gray-100/60 px-6 py-3 text-center">
              <span className="text-[9px] font-mono tracking-widest uppercase text-gray-400">YDC DOPAMINE INITIATIVE © 2026</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
