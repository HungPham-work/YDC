import React from 'react';
import { ArrowRight, type LucideIcon } from 'lucide-react';

interface RollingButtonProps {
  text: string;
  onClick?: () => void;
  color?: 'orange' | 'dark' | 'white';
  icon?: LucideIcon;
  iconRotate?: string; // e.g. "group-hover:rotate-0 -rotate-45"
  type?: 'button' | 'submit';
}

export default function RollingButton({
  text,
  onClick,
  color = 'dark',
  icon: Icon = ArrowRight,
  type = 'button',
}: RollingButtonProps) {
  // Define color themes
  const colorClasses = {
    orange: 'bg-[#FF5722] text-white hover:bg-[#ff6c3e]',
    dark: 'bg-black text-white hover:bg-gray-900 border border-neutral-800',
    white: 'bg-white text-black hover:bg-gray-100 border border-gray-200',
  };

  return (
    <button
      id={`btn-${text.toLowerCase().replace(/\s+/g, '-')}`}
      type={type}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-full py-2.5 px-6 transition-all duration-300 ease-out inline-flex items-center space-x-3 text-sm font-semibold tracking-wide cursor-pointer ${colorClasses[color]}`}
    >
      <div className="relative h-5 overflow-hidden flex flex-col justify-start">
        {/* Rolling Text Layer */}
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
          {text}
        </span>
        <span className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full whitespace-nowrap">
          {text}
        </span>
      </div>
      
      {/* Icon with rotational hover transition */}
      <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center">
        <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -rotate-45 group-hover:rotate-0">
          <Icon className="w-4 h-4 flex-shrink-0" />
        </div>
      </div>
    </button>
  );
}
