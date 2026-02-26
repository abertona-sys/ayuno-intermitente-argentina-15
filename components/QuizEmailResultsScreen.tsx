import React, { useState } from 'react';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';

interface QuizEmailResultsScreenProps {
  userName: string;
  onNext: (email: string) => void;
  onBack: () => void;
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-400 mr-1.5">
        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
    </svg>
);

export const QuizEmailResultsScreen: React.FC<QuizEmailResultsScreenProps> = ({ userName, onNext, onBack }) => {
  const [email, setEmail] = useState('');
  
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValid = validateEmail(email);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isValid) {
      onNext(email);
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
        <ProgressBar currentStep={39} totalSteps={46} />
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
          ¿A dónde te enviamos tu plan, {userName}?
        </h2>

        {/* Input Card */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 focus-within:border-[#4DB6AC] focus-within:shadow-md transition-all duration-300 mb-4">
             <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full text-center text-xl text-[#004D40] font-medium placeholder-slate-300 outline-none bg-transparent"
                autoFocus
             />
          </div>

          {/* Privacy Message */}
          <p className="text-xs text-slate-400 mb-8 max-w-[90%] mx-auto">
            Tus datos están 100% seguros y no compartiremos tu información. Al continuar aceptas nuestra política de privacidad.
          </p>

          {/* CTA directly below input */}
          <div className="w-full">
            <Button onClick={() => handleSubmit()} disabled={!isValid}>
              Obtener mi plan
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};