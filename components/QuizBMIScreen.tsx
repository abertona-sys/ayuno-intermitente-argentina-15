import React from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface QuizBMIScreenProps {
  height: string;
  weight: string;
  onNext: () => void;
  onBack: () => void;
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const QuizBMIScreen: React.FC<QuizBMIScreenProps> = ({ height, weight, onNext, onBack }) => {
  
  const calculateBMI = (hStr: string, wStr: string) => {
    // Parse Height
    let hM = 0;
    if (hStr.includes('cm')) {
      hM = parseInt(hStr) / 100;
    } else {
      const parts = hStr.match(/(\d+)\s*ft\s*(\d+)\s*in/);
      if (parts) {
        hM = ((parseInt(parts[1]) * 12) + parseInt(parts[2])) * 0.0254;
      }
    }

    // Parse Weight
    let wKg = 0;
    if (wStr.includes('kg')) {
      wKg = parseInt(wStr);
    } else {
      const lb = parseInt(wStr);
      wKg = lb * 0.453592;
    }

    if (hM > 0) {
      return (wKg / (hM * hM)).toFixed(1);
    }
    return "0.0";
  };

  const bmi = calculateBMI(height, weight);

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
        <ProgressBar currentStep={23} totalSteps={46} />
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

        {/* Processing Message */}
        <h2 className="text-xl sm:text-2xl font-medium text-[#004D40] leading-tight mb-8">
          Analizando tu perfil...
        </h2>

        {/* Results Card */}
        <div className="w-full bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
            
            {/* Data summary */}
            <div className="flex flex-col space-y-2 mb-6 border-b border-slate-50 pb-6">
                <span className="text-slate-500 text-lg">
                    Altura: <span className="text-slate-700 font-medium">{height}</span>
                </span>
                <span className="text-slate-500 text-lg">
                    Peso: <span className="text-slate-700 font-medium">{weight}</span>
                </span>
            </div>

            {/* BMI Result */}
            <div className="mb-6">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wide mb-1">Tu IMC</p>
                <div className="text-5xl font-bold text-[#004D40] tracking-tight">{bmi}</div>
            </div>

            {/* Soft Explanation */}
            <p className="text-slate-500 leading-relaxed mb-6">
                Este indicador nos ayuda a entender mejor tu punto de partida. Tu plan se centrará en optimizar tu bienestar metabólico.
            </p>

            {/* Companion Message */}
            <p className="text-[#009688] font-medium text-lg">
               Vamos a personalizar tu rutina para alcanzar tus metas de forma saludable.
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