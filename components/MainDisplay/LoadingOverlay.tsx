
import React, { useEffect, useRef } from 'react';
import { LEDGER_PROCESSES } from '../../constants';

interface LoadingOverlayProps {
  currentProcessIndex: number;
  overallProgress: number;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  currentProcessIndex,
  overallProgress
}) => {
  const loadingListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadingListRef.current) {
      const container = loadingListRef.current;
      const activeElement = container.children[currentProcessIndex] as HTMLElement;
      if (activeElement) {
        container.scrollTo({
          top: activeElement.offsetTop - container.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    }
  }, [currentProcessIndex]);

  return (
    <div className="absolute inset-0 z-50 bg-[#121212] flex flex-col pt-14 pb-14 px-12 overflow-hidden">
      <div className="absolute bottom-20 right-8 pointer-events-none select-none z-0">
        <span className="six-caps text-[18rem] leading-none text-white/[0.05] tracking-tighter block">
          {overallProgress}%
        </span>
      </div>

      <header className="mb-0 z-10">
        <div className="h-[100px]">
          <h2 className="six-caps text-[8.5rem] leading-[0.75] font-normal tracking-[-2px] uppercase scale-y-[1.25] text-[#FF2C2C] origin-top-left">
            RETRIEVING ARCHIVE RECORDS
          </h2>
        </div>
      </header>

      <div ref={loadingListRef} className="flex-1 overflow-y-auto space-y-2 mt-20 pr-4 scroll-smooth z-10 relative scrollbar-hide">
        {LEDGER_PROCESSES.map((proc, idx) => {
          const isCompleted = idx < currentProcessIndex;
          const isActive = idx === currentProcessIndex;
          const isQueued = idx > currentProcessIndex;

          return (
            <div
              key={idx}
              className={`py-2 px-5 border transition-all duration-300 ${
                isActive
                  ? 'bg-[#FF2C2C] border-[#FF2C2C] text-white translate-x-2'
                  : isCompleted
                    ? 'border-[#88E788]/30 text-[#88E788] bg-[#88E788]/5'
                    : 'opacity-10 border-white/5 text-white/10'
              } ${isCompleted && idx === currentProcessIndex - 1 ? 'animate-[pulse_1s_ease-in-out]' : ''}`}
            >
              <span className="mono text-[12px] font-black tracking-[0.15em] uppercase">
                {isCompleted ? '[ ARCHIVED ] ' : isActive ? '[ READING ] ' : '[ QUEUED ] '}
                {proc}
              </span>
            </div>
          );
        })}
      </div>

      <footer className="mt-8 relative z-10">
        <div className="flex justify-between items-end mb-3">
          <div className="text-[12px] font-black text-[#FF2C2C] mono uppercase tracking-[0.4em]">
            Archivist Sync Status // {overallProgress}%
          </div>
          <div className="text-[11px] font-black text-white/40 mono uppercase">
            Process {Math.min(currentProcessIndex + 1, LEDGER_PROCESSES.length)} of {LEDGER_PROCESSES.length}
          </div>
        </div>
        <div className="h-3 bg-white/5 border border-white/10 p-1">
          <div
            className="h-full bg-[#FF2C2C] transition-all duration-300 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0% { background-color: rgba(136, 231, 136, 0); }
          50% { background-color: rgba(136, 231, 136, 0.4); }
          100% { background-color: rgba(136, 231, 136, 0.05); }
        }
      `}</style>
    </div>
  );
};
