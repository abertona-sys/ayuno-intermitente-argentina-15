import React from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface QuizEmotionalSupportScreenProps {
  userName: string;
  onNext: () => void;
  onBack: () => void;
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const QuizEmotionalSupportScreen: React.FC<QuizEmotionalSupportScreenProps> = ({ userName, onNext, onBack }) => {
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
        <ProgressBar currentStep={19} totalSteps={46} />
      </div>

      <div className="w-full max-w-md px-6 flex flex-col items-center text-center pb-8">
        
        {/* Top Branding Eyebrow */}
        <div className="mb-6 flex items-center justify-center space-x-1">
          <span className="text-[#009688] font-bold text-lg sm:text-xl">
            Ayuno intermitente
          </span>
          <span className="text-[#4DB6AC] font-light text-lg sm:text-xl">
            a la Argentina
          </span>
        </div>

        {/* Content Container (Subtle Card) */}
        <div className="w-full bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-100 shadow-sm mt-8">
            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#004D40] leading-tight mb-6">
              ¡Esa es la actitud {userName}! 💪
            </h2>

            {/* Authority/Support Text */}
            <p className="text-lg text-slate-500 font-normal leading-relaxed">
              Tu determinación es clave. Con nuestro plan personalizado, convertirás esa motivación en resultados visibles.
            </p>
        </div>

        {/* CTA */}
        <div className="w-full mt-8 mb-6">
          <Button onClick={onNext}>
            Continuar
          </Button>
        </div>

      </div>
    </div>
  );
};