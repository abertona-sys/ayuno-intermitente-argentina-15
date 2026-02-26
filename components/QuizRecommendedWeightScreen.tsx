import React from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface QuizRecommendedWeightScreenProps {
  height: string;
  unit: 'kg' | 'lb';
  onNext: () => void;
  onBack: () => void;
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const QuizRecommendedWeightScreen: React.FC<QuizRecommendedWeightScreenProps> = ({ height, unit, onNext, onBack }) => {

  const calculateHealthyRange = (hStr: string) => {
    // Parse Height to meters
    let hM = 0;
    if (hStr.includes('cm')) {
      hM = parseInt(hStr) / 100;
    } else {
      const parts = hStr.match(/(\d+)\s*ft\s*(\d+)\s*in/);
      if (parts) {
        hM = ((parseInt(parts[1]) * 12) + parseInt(parts[2])) * 0.0254;
      }
    }

    if (hM === 0) return { suggested: 0, min: 0, max: 0 };

    // BMI Constants
    const minBMI = 18.5;
    const maxBMI = 24.9;
    const idealBMI = 21.7; // Mid-range healthy target

    let minWeight = minBMI * (hM * hM);
    let maxWeight = maxBMI * (hM * hM);
    let suggestedWeight = idealBMI * (hM * hM);

    if (unit === 'lb') {
      minWeight = minWeight * 2.20462;
      maxWeight = maxWeight * 2.20462;
      suggestedWeight = suggestedWeight * 2.20462;
    }

    return {
      suggested: Math.round(suggestedWeight),
      min: Math.round(minWeight),
      max: Math.round(maxWeight)
    };
  };

  const { suggested, min, max } = calculateHealthyRange(height);

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
        <ProgressBar currentStep={25} totalSteps={46} />
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

        {/* Card Block */}
        <div className="w-full bg-white rounded-2xl p-8 shadow-sm border border-slate-50 mb-10">
          
          {/* Intro Text */}
          <p className="text-slate-500 font-normal text-lg mb-4">
             Según tu complexión, un peso saludable sería:
          </p>

          {/* Main Result */}
          <h2 className="text-4xl sm:text-5xl font-bold text-[#004D40] mb-6">
            {suggested} {unit}
          </h2>

          {/* Healthy Range */}
          <p className="text-slate-500 text-lg mb-8">
            Rango saludable: {min} - {max} {unit}
          </p>

          {/* Reinforcement Message */}
          <p className="text-slate-500 font-normal text-lg leading-relaxed">
            💬 Esto es una estimación basada en promedios saludables. Tu meta personal es lo más importante.
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