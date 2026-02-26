import React from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface QuizValidationScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const QuizValidationScreen: React.FC<QuizValidationScreenProps> = ({ onNext, onBack }) => {
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
        <ProgressBar currentStep={4} totalSteps={46} />
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

        {/* Headline / Validation Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#004D40] leading-tight mb-4">
          Estrategia 100% personalizada para ti
        </h2>

        {/* Statistical/Authority Text */}
        <p className="text-lg text-slate-500 font-normal leading-relaxed mb-10 max-w-[90%]">
          Hemos ayudado a miles de personas con tu mismo perfil a alcanzar su peso ideal sin efecto rebote.
        </p>

        {/* Testimonial Block */}
        <div className="w-full bg-white rounded-2xl p-8 shadow-sm border border-slate-50 mb-10">
          <div className="flex justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
          </div>
          <p className="text-[#004D40] text-lg font-medium italic mb-6 leading-relaxed">
            "Al principio dudaba, pero el enfoque gradual hizo que fuera muy fácil de seguir. ¡Los resultados son reales y me siento mejor que nunca!"
          </p>
          <p className="text-slate-400 font-medium">
            — María, 42 años
          </p>
        </div>

        {/* CTA */}
        <div className="w-full mt-4 mb-6">
          <Button onClick={onNext}>
            Continuar
          </Button>
        </div>

      </div>
    </div>
  );
};