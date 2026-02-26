import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface QuizPreviousMethodsScreenProps {
  onNext: (methods: string[]) => void;
  onBack: () => void;
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#009688]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const QuizPreviousMethodsScreen: React.FC<QuizPreviousMethodsScreenProps> = ({ onNext, onBack }) => {
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  const options = [
    { id: 'keto', label: 'Dieta Keto / Low Carb', emoji: '🥑' },
    { id: 'fasting', label: 'Ayuno Intermitente', emoji: '🕰️' },
    { id: 'calories', label: 'Contar calorías', emoji: '🔢' },
    { id: 'restrictive', label: 'Dietas restrictivas', emoji: '🥗' },
    { id: 'exercise', label: 'Ejercicio intenso', emoji: '🏋️' },
    { id: 'pills', label: 'Pastillas o suplementos', emoji: '💊' },
    { id: 'none', label: 'Ninguno', emoji: '❌' },
  ];

  const handleToggle = (id: string) => {
    if (id === 'none') {
      // If "None" is selected, clear everything else and select "None"
      // If "None" was already selected, deselect it (toggle off)
      if (selectedMethods.includes('none')) {
        setSelectedMethods([]);
      } else {
        setSelectedMethods(['none']);
      }
    } else {
      // If any other option is selected
      // First remove "none" if it exists
      let newSelection = selectedMethods.filter(m => m !== 'none');
      
      if (newSelection.includes(id)) {
        // Deselect if already present
        newSelection = newSelection.filter(m => m !== id);
      } else {
        // Select if not present
        newSelection.push(id);
      }
      setSelectedMethods(newSelection);
    }
  };

  // Auto-scroll to button when a selection is made
  useEffect(() => {
    if (selectedMethods.length > 0) {
      setTimeout(() => {
        buttonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 150);
    }
  }, [selectedMethods]);

  const isSelected = (id: string) => selectedMethods.includes(id);

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
        <ProgressBar currentStep={30} totalSteps={46} />
      </div>

      <div className="w-full max-w-md px-6 flex flex-col items-center text-center flex-grow pb-12">
        
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
          ¿Qué has probado antes?
        </h2>

        {/* Multi-select Options Stack */}
        <div className="flex flex-col space-y-3 w-full mb-8">
          {options.map((option) => {
            const active = isSelected(option.id);
            return (
              <button 
                key={option.id}
                onClick={() => handleToggle(option.id)}
                className={`
                  w-full py-5 px-5 rounded-2xl shadow-sm border transition-all duration-200 text-left flex items-center
                  ${active 
                    ? 'bg-[#E0F2F1] border-[#009688] shadow-md' 
                    : 'bg-white border-slate-100 hover:border-[#B2DFDB] hover:bg-slate-50'
                  }
                `}
              >
                <span className={`text-lg font-medium flex-1 ${active ? 'text-[#00695C]' : 'text-[#004D40]'}`}>
                  {option.label}
                </span>
                
                <span className="text-2xl mr-4">{option.emoji}</span>

                {/* Visual Check Indicator */}
                <div className={`
                   w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0
                   ${active ? 'border-[#009688] bg-white' : 'border-gray-200 bg-transparent'}
                `}>
                   {active && <CheckIcon />}
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA - Conditionally Rendered/Enabled */}
        {selectedMethods.length > 0 && (
          <div ref={buttonRef} className="w-full mt-8 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button onClick={() => onNext(selectedMethods)}>
              Continuar
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};