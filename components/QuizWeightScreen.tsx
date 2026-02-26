import React, { useState } from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface QuizWeightScreenProps {
  onNext: (weight: string) => void;
  onBack: () => void;
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const QuizWeightScreen: React.FC<QuizWeightScreenProps> = ({ onNext, onBack }) => {
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
  const [weight, setWeight] = useState('');

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 3) setWeight(value);
  };

  const isValid = () => {
    const val = parseInt(weight);
    if (unit === 'kg') {
      return val >= 30 && val <= 300;
    } else {
      return val >= 60 && val <= 600;
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isValid()) {
      const finalValue = unit === 'kg' ? `${weight} kg` : `${weight} lb`;
      onNext(finalValue);
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
        <ProgressBar currentStep={22} totalSteps={46} />
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
          ¿Cuánto pesas?
        </h2>

        {/* Unit Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-8 w-64 mx-auto">
          <button
            onClick={() => setUnit('kg')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
              unit === 'kg'
                ? 'bg-[#B2DFDB] text-[#004D40] shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            kg
          </button>
          <button
            onClick={() => setUnit('lb')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
              unit === 'lb'
                ? 'bg-[#B2DFDB] text-[#004D40] shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            lb
          </button>
        </div>

        {/* Weight Input Block */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 focus-within:border-[#4DB6AC] focus-within:shadow-md transition-all duration-300 mb-8">
              <div className="flex items-center justify-center">
                <input
                  type="tel"
                  pattern="[0-9]*"
                  value={weight}
                  onChange={handleWeightChange}
                  placeholder={unit === 'kg' ? '73' : '160'}
                  className="w-32 text-center text-3xl text-[#004D40] font-bold placeholder-slate-300 outline-none bg-transparent"
                  autoFocus
                />
                <span className="text-xl text-[#004D40] font-medium ml-2">{unit}</span>
              </div>
          </div>

          {/* CTA directly below input */}
          <div className="w-full">
            <Button onClick={() => handleSubmit()} disabled={!isValid()}>
              Continuar
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};