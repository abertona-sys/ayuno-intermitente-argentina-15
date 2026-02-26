import React from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';
import { Gender } from '../types';

interface QuizResultBridgeScreenProps {
  userName: string;
  gender: Gender;
  onNext: () => void;
  onBack: () => void;
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const PointerIcon = () => (
    <span className="text-xl mr-3">👉</span>
);

export const QuizResultBridgeScreen: React.FC<QuizResultBridgeScreenProps> = ({ userName, gender, onNext, onBack }) => {
  
  const images = {
    female: {
      today: "https://i.imgur.com/lXpE0FT.png",
      soon: "https://i.imgur.com/Auopahe.png"
    },
    male: {
      today: "https://i.imgur.com/2nzlNtJ.png",
      soon: "https://i.imgur.com/rKK7tqx.png"
    }
  };

  const currentImages = images[gender];

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
        <ProgressBar currentStep={42} totalSteps={45} />
      </div>

      <div className="w-full max-w-md px-6 flex flex-col items-center text-center pb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        
        {/* Top Branding Eyebrow */}
        <div className="mb-6 flex items-center justify-center space-x-1">
          <span className="text-[#009688] font-bold text-lg sm:text-xl">
            Ayuno intermitente
          </span>
          <span className="text-[#4DB6AC] font-light text-lg sm:text-xl">
            a la Argentina
          </span>
        </div>

        {/* High Impact Headline */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#004D40] leading-tight mb-2 uppercase tracking-wide">
          ¡ES INCREÍBLE!
        </h1>

        {/* Personalized Sub-headline */}
        <h2 className="text-xl sm:text-2xl font-semibold text-[#004D40] leading-snug mb-8">
          Mira lo que es posible para ti, {userName}
        </h2>

        {/* Benefits List */}
        <div className="w-full space-y-4 mb-6 text-left pl-2">
            <div className="flex items-start">
                <PointerIcon />
                <span className="text-[#004D40] text-lg font-medium">Activarás tu quema de grasa natural</span>
            </div>
            <div className="flex items-start">
                <PointerIcon />
                <span className="text-[#004D40] text-lg font-medium">Recuperarás tus niveles de energía</span>
            </div>
            <div className="flex items-start">
                <PointerIcon />
                <span className="text-[#004D40] text-lg font-medium">
                  {gender === 'female' ? 'Te sentirás más ligera y deshinchada' : 'Te sentirás más ligero y deshinchado'}
                </span>
            </div>
        </div>
        
        {/* Closing phrase for list */}
        <p className="text-slate-500 font-medium text-lg mb-8 italic">
            ...en solo los próximos días.
        </p>

        {/* Visual Progress Card */}
        <div className="w-full bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-8">
            <div className="flex items-end justify-between space-x-2">
                
                {/* Left Side (Today) */}
                <div className="flex flex-col items-center w-[45%]">
                     <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-slate-100 shadow-sm relative group">
                        <img 
                            src={currentImages.today} 
                            alt="Estado actual" 
                            className="w-full h-full object-cover grayscale-[20%]"
                        />
                         <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Hoy</span>
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                    </div>
                </div>

                {/* Arrow */}
                 <div className="mb-8 text-slate-300 transform -translate-y-2">
                    ➔
                 </div>

                {/* Right Side (Muy Pronto) */}
                <div className="flex flex-col items-center w-[45%]">
                     <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-slate-100 shadow-md ring-2 ring-[#009688]/20 relative">
                        <img 
                            src={currentImages.soon} 
                            alt="Resultado esperado" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[#009688] font-bold text-xs uppercase tracking-wider mb-1">Muy pronto</span>
                        <div className="w-3 h-3 rounded-full bg-[#009688] shadow-md ring-4 ring-[#E0F2F1]"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* CTA */}
        <div className="w-full mt-8 mb-6">
          <Button onClick={onNext}>
            Ver mi plan completo
          </Button>
        </div>

      </div>
    </div>
  );
};