import React, { useMemo } from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface QuizResultVisualizationScreenProps {
  currentWeightStr: string;
  targetWeightStr: string;
  unit: 'kg' | 'lb';
  onNext: () => void;
  onBack: () => void;
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-slate-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

export const QuizResultVisualizationScreen: React.FC<QuizResultVisualizationScreenProps> = ({ currentWeightStr, targetWeightStr, unit, onNext, onBack }) => {
  
  const estimatedDate = useMemo(() => {
    // Basic calculation logic - assume 0.8kg per week weight loss
    // This is similar to the logic used in the interactive chart but fixed for this result view
    const currentWeight = parseFloat(currentWeightStr.replace(/[^\d.]/g, '')) || 0;
    const targetWeight = parseFloat(targetWeightStr.replace(/[^\d.]/g, '')) || 0;
    
    let diff = Math.max(0, currentWeight - targetWeight);
    
    // If unit is lb, convert to kg for calculation
    if (unit === 'lb') {
        diff = diff * 0.453592;
    }

    if (diff === 0) return "¡Muy pronto!";

    const weeklyLossKg = 0.8; 
    const weeksNeeded = diff / weeklyLossKg;
    
    const today = new Date();
    const targetDate = new Date(today.getTime() + weeksNeeded * 7 * 24 * 60 * 60 * 1000);
    
    // Format: "15 Octubre"
    return targetDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
  }, [currentWeightStr, targetWeightStr, unit]);

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
        <ProgressBar currentStep={35} totalSteps={46} />
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

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#004D40] leading-tight mb-8">
          Según tus respuestas...
        </h2>

        {/* Visual Summary Card */}
        <div className="w-full bg-white rounded-2xl p-8 shadow-sm border border-slate-50 mb-10 flex flex-col items-center">
            
            {/* Weight Row */}
            <div className="flex items-center justify-center space-x-4 mb-8 w-full">
                <div className="flex flex-col items-center">
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Actual</span>
                    <span className="text-xl font-medium text-slate-600">{currentWeightStr}</span>
                </div>
                
                <ArrowRightIcon />

                <div className="flex flex-col items-center">
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Meta</span>
                    <span className="text-xl font-bold text-[#009688]">{targetWeightStr}</span>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-slate-100 mb-8" />

            {/* Estimated Date */}
            <div className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl font-bold text-[#009688] mb-2">{estimatedDate}</span>
                <span className="text-slate-400 font-medium">Fecha estimada</span>
            </div>

        </div>

        {/* Emotional Message */}
        <p className="text-[#004D40] font-medium text-lg leading-relaxed mb-8 max-w-[90%]">
           👉 Tu perfil metabólico indica que puedes lograrlo sin pasar hambre.
        </p>

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