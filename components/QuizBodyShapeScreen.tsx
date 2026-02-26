import React from 'react';
import { Gender } from '../types';
import { ProgressBar } from './ProgressBar';

interface QuizBodyShapeScreenProps {
  gender: Gender;
  onNext: (shape: string) => void;
  onBack: () => void;
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

// Component to render schematic body outlines
const BodyShapeIllustration = ({ id, color }: { id: string; color: string }) => {
  const props = {
    viewBox: "0 0 100 160",
    fill: "none",
    stroke: color,
    strokeWidth: "2.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "w-full h-full drop-shadow-sm",
  };

  const head = <circle cx="50" cy="20" r="10" />;
  
  let bodyPath = "";

  switch (id) {
    // FEMALE SHAPES
    case 'hourglass':
      // Hombros y caderas anchos, cintura estrecha
      bodyPath = "M30 40 Q25 40 25 55 Q25 75 42 90 Q25 105 25 125 Q25 140 30 140 H70 Q75 140 75 125 Q75 105 58 90 Q75 75 75 55 Q75 40 70 40 Z";
      break;
    case 'pear':
    case 'triangle':
      // Hombros estrechos, caderas anchas
      bodyPath = "M38 40 Q35 40 35 60 Q35 90 25 125 Q22 140 35 140 H65 Q78 140 75 125 Q65 90 65 60 Q65 40 62 40 Z";
      break;
    case 'apple':
    case 'oval':
      // Cintura ancha / redondeado
      bodyPath = "M35 40 Q20 70 20 90 Q20 115 35 140 H65 Q80 115 80 90 Q80 70 65 40 Z";
      break;
    case 'rectangle':
      // Recto arriba y abajo
      bodyPath = "M32 40 H68 L68 140 H32 Z";
      break;
    case 'inverted_triangle':
      // Hombros anchos, caderas estrechas
      bodyPath = "M20 40 H80 Q85 40 80 55 L65 140 H35 L20 55 Q15 40 20 40 Z";
      break;
    
    // MALE SHAPES
    case 'trapezoid':
      // Hombros anchos que se estrechan ligeramente (ideal masculino)
      bodyPath = "M22 40 H78 L70 140 H30 L22 40 Z";
      break;
      
    case 'unsure':
    default:
      return (
        <svg {...props} strokeDasharray="4 4" opacity="0.5">
           <circle cx="50" cy="20" r="10" />
           <path d="M30 40 H70 L70 140 H30 Z" />
           <text x="50" y="100" textAnchor="middle" stroke="none" fill={color} fontSize="40" fontWeight="bold">?</text>
        </svg>
      );
  }

  return (
    <svg {...props}>
      {head}
      <path d={bodyPath} />
    </svg>
  );
};

export const QuizBodyShapeScreen: React.FC<QuizBodyShapeScreenProps> = ({ gender, onNext, onBack }) => {
  const content = {
    female: {
      title: "¿Cuál es tu forma corporal?",
      options: [
        { id: 'hourglass', label: 'Reloj de arena' },
        { id: 'pear', label: 'Pera' },
        { id: 'apple', label: 'Manzana' },
        { id: 'rectangle', label: 'Rectángulo' },
        { id: 'inverted_triangle', label: 'Triángulo inv.' },
        { id: 'unsure', label: 'No lo sé' },
      ]
    },
    male: {
      title: "¿Cuál es tu forma corporal?",
      options: [
        { id: 'trapezoid', label: 'Trapecio' },
        { id: 'rectangle', label: 'Rectángulo' },
        { id: 'inverted_triangle', label: 'Triángulo inv.' },
        { id: 'oval', label: 'Óvalo' },
        { id: 'triangle', label: 'Triángulo' },
        { id: 'unsure', label: 'No lo sé' },
      ]
    }
  };

  const currentContent = content[gender];

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
        <ProgressBar currentStep={7} totalSteps={46} />
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
          {currentContent.title}
        </h2>

        {/* Grid Options */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {currentContent.options.map((option) => (
            <button 
              key={option.id}
              onClick={() => onNext(option.id)}
              className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-[#4DB6AC] hover:shadow-lg hover:bg-[#E0F2F1]/30 transition-all duration-300 flex flex-col items-center group relative overflow-hidden"
            >
              {/* Illustration Container */}
              <div className="w-24 h-32 mb-4 relative transition-transform duration-300 group-hover:scale-110">
                 <BodyShapeIllustration 
                    id={option.id} 
                    color="#004D40" // Dark green outline
                 />
                 {/* Hover effect glow */}
                 <div className="absolute inset-0 bg-[#4DB6AC] opacity-0 group-hover:opacity-10 filter blur-xl transition-opacity rounded-full"></div>
              </div>

              <span className="text-[#004D40] font-bold text-lg leading-tight">
                {option.label}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};