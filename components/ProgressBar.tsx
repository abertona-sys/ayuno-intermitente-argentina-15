import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-end mb-1">
         <span className="text-xs font-semibold text-slate-400 tracking-wide">{currentStep}/{totalSteps}</span>
      </div>
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
         <div 
            className="h-full bg-[#009688] transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(0,150,136,0.3)]" 
            style={{ width: `${percentage}%` }} 
         />
      </div>
    </div>
  );
};