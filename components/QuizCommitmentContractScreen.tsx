import React, { useState } from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface QuizCommitmentContractScreenProps {
  userName: string;
  onNext: () => void;
  onBack: () => void;
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const CheckIcon = () => (
    <svg className="w-5 h-5 text-[#009688] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export const QuizCommitmentContractScreen: React.FC<QuizCommitmentContractScreenProps> = ({ userName, onNext, onBack }) => {
  // Inicializamos con el nombre del usuario para autocompletar
  const [signature, setSignature] = useState(userName);

  const isValid = signature.trim().length > 0;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isValid) {
      onNext();
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
        <ProgressBar currentStep={41} totalSteps={45} />
      </div>

      <div className="w-full max-w-md px-6 flex flex-col items-center pb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        
        {/* Top Branding Eyebrow */}
        <div className="mb-6 flex items-center justify-center space-x-1">
          <span className="text-[#009688] font-bold text-lg sm:text-xl">
            Ayuno intermitente
          </span>
          <span className="text-[#4DB6AC] font-light text-lg sm:text-xl">
            a la Argentina
          </span>
        </div>

        {/* Personalized Headline */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#004D40] leading-tight text-center mb-8">
          Tu compromiso personal, {userName}
        </h2>

        {/* Commitments List */}
        <div className="w-full bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-sm mb-8 space-y-4">
            <div className="flex items-start space-x-3">
                <CheckIcon />
                <span className="text-[#004D40] text-lg font-medium leading-snug">
                    Priorizaré mi salud y bienestar por encima de todo.
                </span>
            </div>
            <div className="flex items-start space-x-3">
                <CheckIcon />
                <span className="text-[#004D40] text-lg font-medium leading-snug">
                    Seguiré las recomendaciones de mi plan personalizado.
                </span>
            </div>
            <div className="flex items-start space-x-3">
                <CheckIcon />
                <span className="text-[#004D40] text-lg font-medium leading-snug">
                    No me rendiré ante los pequeños obstáculos.
                </span>
            </div>
        </div>

        {/* Signature Block */}
        <div className="w-full mb-8">
            <label className="block text-sm font-medium text-slate-500 mb-2 ml-1">Firma tu compromiso</label>
            <div className="relative">
                <input 
                    type="text" 
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder="Escribe tu nombre"
                    className="w-full bg-white border-b-2 border-slate-200 focus:border-[#009688] px-4 py-4 text-2xl text-[#004D40] font-serif italic outline-none transition-colors text-center"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl">✍️</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">
                La firma es simbólica y no se guarda.
            </p>
        </div>

        {/* CTA */}
        <div className="w-full mb-6">
          <Button onClick={() => handleSubmit()} disabled={!isValid}>
            Acepto el compromiso
          </Button>
        </div>

      </div>
    </div>
  );
};