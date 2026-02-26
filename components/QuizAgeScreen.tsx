import React from 'react';
import { Gender } from '../types';
import { ProgressBar } from './ProgressBar';

interface QuizAgeScreenProps {
  gender: Gender;
  onNext: (ageRange: string) => void;
  onBack: () => void;
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const QuizAgeScreen: React.FC<QuizAgeScreenProps> = ({ gender, onNext, onBack }) => {
  
  const options = [
    { 
      id: 'under_30', 
      label: 'Menos de 30', 
      img: 'https://i.imgur.com/E9sOIRZ.png' 
    },
    { 
      id: '30_39', 
      label: 'Entre 30 y 39', 
      img: 'https://i.imgur.com/r1eLan7.png' 
    },
    { 
      id: '40_49', 
      label: 'Entre 40 y 49', 
      img: 'https://i.imgur.com/g921PGC.png' 
    },
    { 
      id: '50_plus', 
      label: '50 o más', 
      img: 'https://i.imgur.com/z2CR0zT.png' 
    },
  ];

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
        <ProgressBar currentStep={1} totalSteps={15} />
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
          ¡Hola! Qué bueno tenerte acá. Para empezar a armar tu estructura ideal, ¿en qué rango de edad estás?
        </h2>

        {/* Options Stack */}
        <div className="w-full flex flex-col space-y-4">
          {options.map((option) => (
            <button 
              key={option.id}
              onClick={() => onNext(option.id)}
              className="w-full bg-white rounded-2xl p-3 shadow-sm border border-transparent hover:border-[#4DB6AC] hover:shadow-md transition-all duration-200 group flex items-center text-left"
            >
              {/* Image Avatar */}
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border border-slate-100 shrink-0">
                <img 
                  src={option.img} 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Text */}
              <span className="text-[#004D40] font-bold text-lg flex-1">
                {option.label}
              </span>

              {/* Selection Circle (Optional visual cue) */}
              <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-[#009688] flex items-center justify-center mr-2">
                <div className="w-3 h-3 rounded-full bg-[#009688] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};