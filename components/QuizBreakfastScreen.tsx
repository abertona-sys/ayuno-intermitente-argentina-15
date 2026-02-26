import React from 'react';
import { ProgressBar } from './ProgressBar';

interface QuizBreakfastScreenProps {
  onNext: (time: string) => void;
  onBack: () => void;
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const QuizBreakfastScreen: React.FC<QuizBreakfastScreenProps> = ({ onNext, onBack }) => {
  const options = [
    { id: 'mate_coffee', label: 'Solo mate o café y arranco', emoji: '🧉' },
    { id: 'full_breakfast', label: 'Desayuno completo apenas me levanto', emoji: '🥞' },
    { id: 'quick_snack', label: 'Pico algo rápido a las corridas', emoji: '🏃‍♀️' },
    { id: 'no_hunger', label: 'No me da hambre hasta el mediodía', emoji: '😶' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E0F7FA] to-white flex flex-col items-center">
      
      {/* Header: Back Button & Progress Bar */}
      <div className="w-full max-w-md px-4 mt-4 mb-6 flex items-end space-x-3">
        <button 
          onClick={onBack}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1 -ml-1 rounded-full hover:bg-slate-100 mb-0.5"
          aria-label="Volver"
        >
          <BackIcon />
        </button>
        <ProgressBar currentStep={4} totalSteps={15} />
      </div>

      <div className="w-full max-w-md px-6 flex flex-col items-center text-center flex-grow pb-8">
        
        {/* Top Branding Eyebrow */}
        <div className="mb-6 flex items-center justify-center space-x-1">
          <span className="text-[#009688] font-bold text-lg sm:text-xl">
            Ayuno intermitente
          </span>
          <span className="text-[#4DB6AC] font-light text-lg sm:text-xl">
            a la Argentina
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#004D40] leading-tight mb-8">
          Claro, es súper común. Vamos a tu rutina: ¿Cómo arrancás tus mañanas habitualmente?
        </h2>

        {/* Options Stack */}
        <div className="flex flex-col space-y-4 w-full">
          {options.map((option) => (
            <button 
              key={option.id}
              onClick={() => onNext(option.id)}
              className="w-full bg-white py-6 px-6 rounded-2xl shadow-sm border border-slate-100 hover:border-[#4DB6AC] hover:shadow-md hover:bg-slate-50 transition-all duration-200 group flex items-center justify-between"
            >
              <span className="text-[#004D40] font-medium text-xl text-left group-hover:scale-[1.02] transition-transform">
                {option.label}
              </span>
              <span className="text-2xl transform group-hover:scale-110 transition-transform">
                {option.emoji}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};