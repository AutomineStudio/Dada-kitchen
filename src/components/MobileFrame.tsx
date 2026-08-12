import React, { useState, useEffect } from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [isFramed, setIsFramed] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${mins}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#1e1b18] text-[#001f29] flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 transition-colors duration-300 font-['Be_Vietnam_Pro',sans-serif]">
      {/* Desktop Mode Toggle Header */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-[430px] mb-3 px-2 text-white/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#33a395] animate-pulse"></span>
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-white tracking-wide">
            Dada Kitchen Mobile
          </span>
        </div>
        <button
          onClick={() => setIsFramed(!isFramed)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white font-medium text-[11px] backdrop-blur-md active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">
            {isFramed ? 'aspect_ratio' : 'phone_iphone'}
          </span>
          <span>{isFramed ? 'Plein écran' : 'Mode Smartphone'}</span>
        </button>
      </div>

      {/* Main Screen Shell */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col bg-[#fffaf0] overflow-hidden ${
          isFramed
            ? 'sm:max-w-[410px] sm:h-[840px] sm:rounded-[48px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] sm:ring-12 sm:ring-[#2d2825] sm:border-4 sm:border-[#3d3632]'
            : 'max-w-full min-h-screen'
        }`}
        style={{ transform: 'translateZ(0)' }}
      >
        {/* Mobile Status Bar */}
        {isFramed && (
          <div className="w-full bg-[#fffaf0]/95 backdrop-blur-md pt-3 pb-1 px-7 flex justify-between items-center z-50 text-[#001f29] text-xs font-semibold select-none border-b border-[#dec0b9]/20 flex-shrink-0">
            {/* Time */}
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs">{currentTime}</span>

            {/* Camera Dynamic Pill */}
            <div className="w-20 h-4 bg-[#1e1b18] rounded-full flex items-center justify-center gap-1 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#0d0c0a]/80"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a3a5c]"></span>
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-xs text-[#001f29]">
              <span className="material-symbols-outlined text-[15px]">signal_cellular_4_bar</span>
              <span className="material-symbols-outlined text-[15px]">wifi</span>
              <span className="material-symbols-outlined text-[16px] rotate-90">battery_full</span>
            </div>
          </div>
        )}

        {/* Inner App Container */}
        <div className="flex-1 overflow-y-auto relative no-scrollbar flex flex-col">
          {children}
        </div>

        {/* Mobile Home Indicator */}
        {isFramed && (
          <div className="w-full bg-[#fffaf0]/95 backdrop-blur-md py-1.5 flex justify-center items-center z-50 pointer-events-none border-t border-[#dec0b9]/10 flex-shrink-0">
            <div className="w-32 h-1 bg-[#2d1b00]/30 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};
