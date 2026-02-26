import React, { useState } from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface QuizNameScreenProps {
  onNext: (name: string) => void;
  onBack: () => void;
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const QuizNameScreen: React.FC<QuizNameScreenProps> = ({ onNext, onBack }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (name.trim().length > 0) {
      onNext(name.trim());
    }
  };

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
        <ProgressBar currentStep={5} totalSteps={46} />
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

        {/* Headline / Question */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#004D40] leading-tight mb-8">
          ¿Cómo te llamas?
        </h2>

        {/* Input Field Form */}
        <form onSubmit={handleSubmit} className="w-full">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 focus-within:border-[#4DB6AC] focus-within:shadow-md transition-all duration-300 mb-8">
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full text-center text-2xl text-[#004D40] font-medium placeholder-slate-300 outline-none bg-transparent"
                    autoFocus
                />
            </div>
            
            {/* CTA directly below input for mobile keyboard safety */}
            <div className="w-full">
              <Button 
                onClick={() => handleSubmit()} 
                disabled={name.trim().length === 0}
              >
                Continuar
              </Button>
            </div>
        </form>

      </div>
    </div>
  );
};