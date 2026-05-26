import React, { useState } from 'react';
import { ShieldCheck, Flame, Play, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

interface HedonicScaleCardProps {
  mode: 'fast' | 'slow';
  title: string;
  description: string;
}

export default function HedonicScaleCard({ mode, title, description }: HedonicScaleCardProps) {
  const [simulationState, setSimulationState] = useState<'idle' | 'phase1' | 'phase2'>('idle');
  const isFast = mode === 'fast';

  const triggerSimulation = () => {
    if (simulationState !== 'idle') return;

    // Phase 1
    setSimulationState('phase1');

    // Transition to Phase 2
    setTimeout(() => {
      setSimulationState('phase2');
    }, 1500);
  };

  const resetSimulation = () => {
    setSimulationState('idle');
  };

  // Rotation logic based on mode and current active state
  let rotateAngle = 0;
  if (simulationState === 'phase1') {
    rotateAngle = isFast ? -18 : 12; // tilted left (pleasure) vs tilted right (healthy discomfort/effort)
  } else if (simulationState === 'phase2') {
    rotateAngle = isFast ? 22 : 0; // major crash right (pain/depression) vs perfect balanced center (homeostasis)
  }

  // Subtitle/Instruction under the scale based on state
  const getStatusText = () => {
    if (simulationState === 'idle') {
      return isFast 
        ? "Nhấn để mô phỏng tác động của mạng xã hội." 
        : "Nhấn để mô phỏng tác động của kỷ luật, thể thao, đọc sách.";
    }
    if (simulationState === 'phase1') {
      return isFast 
        ? "💥 Dopamine giải phóng tức thì!" 
        : "⚡ Não bộ chịu đựng khó chịu ban đầu";
    }
    return isFast 
      ? "📉 Dopamine sụt giảm đột ngột - trống rỗng, mệt mỏi, uể oải!" 
      : "🌟 Não cân bằng trở lại - sảng khoái và minh mẫn tuyệt đối.";
  };

  return (
    <div
      id={`scale-card-${mode}`}
      className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 border overflow-hidden ${
        isFast 
          ? 'bg-white border-gray-100 shadow-xl shadow-gray-100/50' 
          : 'bg-neutral-900 border-neutral-800 text-white'
      }`}
    >
      {/* Decorative Blur Background */}
      <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none ${
        isFast ? 'bg-[#FF5722]' : 'bg-emerald-500'
      }`} />

      {/* Top Meta info */}
      <div className="flex justify-between items-start mb-6">
        <span className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider ${
          isFast 
            ? 'bg-rose-50 text-rose-600 border border-rose-100' 
            : 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/40'
        }`}>
          {isFast ? 'FAST DOPAMINE' : 'SLOW DOPAMINE'}
        </span>
        
        {simulationState !== 'idle' && (
          <button 
            onClick={resetSimulation} 
            className={`text-xs underline font-mono cursor-pointer transition-colors ${
              isFast ? 'text-gray-400 hover:text-black' : 'text-neutral-500 hover:text-white'
            }`}
          >
            Reset
          </button>
        )}
      </div>

      {/* Title & Static Desc */}
      <div className="mb-6">
        <h3 className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 ${isFast ? 'text-gray-900' : 'text-white'}`}>
          {title}
        </h3>
        <p className={`text-sm leading-relaxed whitespace-pre-line ${isFast ? 'text-gray-600' : 'text-neutral-400'}`}>
          {description}
        </p>
      </div>

      {/* Visual Balance Bar widget */}
      <div className={`my-8 py-10 rounded-2xl border flex flex-col items-center justify-center relative ${
        isFast ? 'bg-gray-50/50 border-gray-100' : 'bg-neutral-950 border-neutral-800'
      }`}>
        <div className="absolute top-2 left-4 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
          Mô hình Cân bằng Nội môi Stanford
        </div>

        {/* Pivot Point & Stand */}
        <div className="relative w-full max-w-[280px] h-32 flex items-end justify-center">
          
          {/* Moving beam */}
          <div 
            style={{ transform: `rotate(${rotateAngle}deg)` }}
            className={`absolute bottom-10 w-full h-2 rounded-full transition-transform duration-1000 ease-in-out origin-center ${
              isFast ? 'bg-gray-400' : 'bg-neutral-700'
            }`}
          >
            {/* Left Weight / Pleasure */}
            <div 
              style={{ transform: `rotate(${-rotateAngle}deg)` }}
              className={`absolute -top-4 left-0 w-12 h-10 rounded-lg flex flex-col items-center justify-center transition-all duration-1000 ${
                simulationState === 'phase1' && isFast 
                  ? 'scale-110 bg-rose-500 text-white shadow-lg shadow-rose-300' 
                  : isFast 
                    ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                    : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
              }`}
            >
              <span className="text-[9px] font-mono font-bold">K.CẢM</span>
            </div>

            {/* Pivot center indicator */}
            <div className={`absolute left-1/2 -translate-x-1/2 -top-0.5 w-3 h-3 rounded-full transition-colors ${
              simulationState === 'phase2' && !isFast ? 'bg-emerald-400 animate-ping' : 'bg-neutral-600'
            }`} />

            {/* Right Weight / Pain */}
            <div 
              style={{ transform: `rotate(${-rotateAngle}deg)` }}
              className={`absolute -top-4 right-0 w-12 h-10 rounded-lg flex flex-col items-center justify-center transition-all duration-1000 ${
                ((simulationState === 'phase2' && isFast) || (simulationState === 'phase1' && !isFast))
                  ? 'scale-110 bg-amber-500 text-white shadow-lg shadow-amber-300' 
                  : !isFast 
                    ? 'bg-emerald-900/60 text-emerald-400 border border-emerald-800' 
                    : 'bg-gray-200 text-gray-500 border border-gray-300'
              }`}
            >
              <span className="text-[9px] font-mono font-bold">ĐAU</span>
            </div>
          </div>

          {/* Triangluar Stand */}
          <div className={`w-0 h-0 border-l-[16px] border-r-[16px] border-b-[32px] border-l-transparent border-r-transparent ${
            isFast ? 'border-b-gray-300' : 'border-b-neutral-700'
          }`} />
          
          {/* Pivot cap */}
          <div className="absolute bottom-[28px] w-3.5 h-3.5 rounded-full bg-neutral-900 border-2 border-white" />
        </div>

        {/* Live dynamic HUD badges appearing on transition */}
        <div className="h-6">
          {simulationState === 'phase1' && (
            <span className={`inline-flex items-center space-x-1 text-xs font-mono font-semibold px-2 py-0.5 rounded-md ${
              isFast ? 'bg-rose-100 text-rose-700' : 'bg-blue-950/50 text-blue-400 border border-blue-900/40'
            }`}>
              {isFast ? <AlertTriangle className="w-3.5 h-3.5 animate-bounce" /> : <Flame className="w-3.5 h-3.5 animate-pulse" />}
              <span>{isFast ? 'DOPAMINE SPIKE +200%' : 'KÍCH THÍCH LÀNH MẠNH'}</span>
            </span>
          )}
          {simulationState === 'phase2' && (
            <span className={`inline-flex items-center space-x-1 text-xs font-mono font-semibold px-2 py-0.5 rounded-md ${
              isFast ? 'bg-amber-100 text-amber-800' : 'bg-emerald-950/60 text-emerald-400 border border-emerald-900'
            }`}>
              {isFast ? <AlertTriangle className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{isFast ? 'DOPAMINE CRASH' : 'CÂN BẰNG NÃO BỘ'}</span>
            </span>
          )}
        </div>
      </div>

      {/* Simulation Trigger button (Actionable Scale Control) */}
      <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <p className={`text-xs font-mono transition-colors duration-300 ${
            simulationState === 'phase1' 
              ? 'text-rose-500 font-bold' 
              : simulationState === 'phase2' 
                ? (isFast ? 'text-amber-500 font-bold' : 'text-emerald-400 font-bold')
                : (isFast ? 'text-gray-400' : 'text-neutral-500')
          }`}>
            {getStatusText()}
          </p>
        </div>

        <div>
          <button
            onClick={triggerSimulation}
            disabled={simulationState !== 'idle'}
            className={`group rounded-full py-2 px-5 text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              simulationState !== 'idle'
                ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed dark:bg-neutral-800 dark:text-neutral-700'
                : isFast
                  ? 'bg-black text-white hover:bg-[#FF5722] hover:scale-105 shadow-md shadow-gray-200'
                  : 'bg-white text-black hover:bg-emerald-400 hover:scale-105 shadow-md shadow-neutral-950'
            }`}
          >
            <span>KÍCH HOẠT MÔ PHỎNG</span>
            <Play className="w-3 h-3 fill-current group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
