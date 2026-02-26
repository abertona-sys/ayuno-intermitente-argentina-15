import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface QuizProgressChartScreenProps {
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

export const QuizProgressChartScreen: React.FC<QuizProgressChartScreenProps> = ({ currentWeightStr, targetWeightStr, unit, onNext, onBack }) => {
  const [sliderValue, setSliderValue] = useState(50); // 0 (slow) to 100 (fast)
  const [estimatedDate, setEstimatedDate] = useState<string>('');
  
  // Parse numeric values
  const currentWeight = parseFloat(currentWeightStr.replace(/[^\d.]/g, '')) || 0;
  const targetWeight = parseFloat(targetWeightStr.replace(/[^\d.]/g, '')) || 0;
  
  // Pace Logic:
  // Base pace: 0.75 kg/week (approx 1.65 lb/week)
  // Min pace (0%): 0.3 kg/week
  // Max pace (100%): 1.2 kg/week
  const calculatePace = (sliderVal: number) => {
    // 0 -> 0.3, 50 -> 0.75, 100 -> 1.2 (approx linear mapping)
    // Formula: 0.3 + (sliderVal / 100) * 0.9
    let kgPerWeek = 0.3 + (sliderVal / 100) * 0.9;
    
    if (unit === 'lb') {
      return kgPerWeek * 2.20462;
    }
    return kgPerWeek;
  };

  useEffect(() => {
    const diff = Math.max(0, currentWeight - targetWeight);
    if (diff === 0) {
        setEstimatedDate("¡Ya estás ahí!");
        return;
    }

    const pace = calculatePace(sliderValue);
    const weeksNeeded = diff / pace;
    
    const today = new Date();
    const targetDate = new Date(today.getTime() + weeksNeeded * 7 * 24 * 60 * 60 * 1000);
    
    // Format date: "15 Octubre"
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    setEstimatedDate(targetDate.toLocaleDateString('es-ES', options));
  }, [sliderValue, currentWeight, targetWeight, unit]);


  // Graph Data
  // We want a simple SVG curve dropping from top-left to bottom-right
  // Height: 150px
  // Width: 100%
  const graphHeight = 150;
  // Start Y is closer to top (but not 0 to leave padding)
  // End Y is closer to bottom
  const startY = 20;
  const endY = 130;
  
  // Control point for Bezier Curve (Q) to make it slightly curved
  // Format: M startX startY Q controlX controlY endX endY
  // Assume viewbox width 300
  const width = 300;
  const pathData = `M 0 ${startY} Q ${width * 0.4} ${endY * 0.8} ${width} ${endY}`;
  
  // Fill area for gradient
  const fillPathData = `${pathData} L ${width} ${graphHeight} L 0 ${graphHeight} Z`;

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
        <ProgressBar currentStep={26} totalSteps={46} />
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

        {/* Intro Title */}
        <h2 className="text-xl sm:text-2xl font-medium text-[#004D40] leading-tight mb-4">
          📉 Tu camino hacia el éxito
        </h2>

        {/* Card Block */}
        <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-50 mb-8 overflow-hidden">
            
            {/* Goal Summary */}
            <div className="flex flex-col items-center mb-8 space-y-2">
                <div className="flex items-center space-x-2 text-slate-500 text-lg">
                    <span>{currentWeight} {unit}</span>
                    <span className="text-slate-300">→</span>
                    <span className="text-[#004D40] font-bold">{targetWeight} {unit}</span>
                </div>
                <div className="text-3xl font-bold text-[#009688]">
                    {estimatedDate}
                </div>
                <div className="text-sm text-slate-400">
                    Fecha estimada de logro
                </div>
            </div>

            {/* Graph Visual */}
            <div className="relative w-full h-[150px] mb-8">
                 <svg viewBox={`0 0 ${width} ${graphHeight}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#009688" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#009688" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* Fill */}
                    <path d={fillPathData} fill="url(#chartGradient)" />
                    {/* Line */}
                    <path d={pathData} fill="none" stroke="#009688" strokeWidth="4" strokeLinecap="round" />
                    
                    {/* Start Dot */}
                    <circle cx="0" cy={startY} r="5" fill="#009688" />
                    <text x="10" y={startY + 20} className="text-[10px] fill-slate-400 font-medium">Hoy</text>
                    
                    {/* End Dot */}
                    <circle cx={width} cy={endY} r="5" fill="#009688" />
                    <text x={width - 25} y={endY - 15} className="text-[10px] fill-slate-400 font-medium">Meta</text>
                 </svg>
            </div>

            {/* Slider */}
            <div className="flex flex-col items-center w-full">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderValue} 
                  onChange={(e) => setSliderValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#009688]"
                />
                <div className="w-full flex justify-between text-xs font-medium text-slate-400 mt-3">
                    <span>Más lento</span>
                    <span>Más rápido</span>
                </div>
            </div>

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