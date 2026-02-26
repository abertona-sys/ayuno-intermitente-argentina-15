import React from 'react';
import { ProgressBar } from './ProgressBar';

interface QuizGenderScreenProps {
  onNext: (gender: 'female' | 'male') => void;
}

const LaurelIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7 21C7 21 5.5 16.5 7 13C8.5 9.5 12 7 12 7C12 7 10 7.5 9 10C8 12.5 8.5 15 8.5 15C8.5 15 7.5 13.5 7.5 12C7.5 10.5 9 8.5 9 8.5C9 8.5 6 9.5 5 13C4 16.5 5.5 20 5.5 20L7 21ZM17 21C17 21 18.5 16.5 17 13C15.5 9.5 12 7 12 7C12 7 14 7.5 15 10C16 12.5 15.5 15 15.5 15C15.5 15 16.5 13.5 16.5 12C16.5 10.5 15 8.5 15 8.5C15 8.5 18 9.5 19 13C20 16.5 18.5 20 18.5 20L17 21Z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const QuizGenderScreen: React.FC<QuizGenderScreenProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E0F7FA] to-white flex flex-col items-center">
      
      {/* Header: Progress Bar Only */}
      <div className="w-full max-w-md px-4 mt-4 mb-6 flex items-end space-x-3">
        <ProgressBar currentStep={1} totalSteps={46} />
      </div>

      <div className="w-full max-w-md px-6 flex flex-col items-center text-center flex-grow">
        
        {/* Top Branding Eyebrow */}
        <div className="mb-6 flex items-center justify-center space-x-1">
          <span className="text-[#009688] font-bold text-lg sm:text-xl">
            Ayuno intermitente
          </span>
          <span className="text-[#4DB6AC] font-light text-lg sm:text-xl">
            a la Argentina
          </span>
        </div>

        {/* Headline Group with Hierarchy */}
        <div className="flex flex-col space-y-2 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#004D40] leading-tight">
            Perdé peso con pequeños cambios en tu rutina
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#00695C] leading-snug">
            Adiós inflamación y cansancio
          </h2>
          <h3 className="text-lg sm:text-xl font-medium text-[#4DB6AC]">
            (mate permitido)
          </h3>
        </div>

        {/* Trust Badge */}
        <div className="relative mb-10">
          <div className="flex items-center justify-center bg-white border border-[#4DB6AC] rounded-full px-8 py-3 shadow-sm relative z-10">
            {/* Left Laurel */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <LaurelIcon className="w-8 h-8 text-[#00695C]" />
            </div>

            <div className="flex flex-col items-center">
              <div className="flex space-x-1 mb-1">
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <div className="text-center">
                <span className="block font-bold text-gray-800 text-sm leading-none">+1000</span>
                <span className="block text-[10px] text-gray-500 font-medium mt-0.5">usuarios satisfechos</span>
              </div>
            </div>

            {/* Right Laurel - Flipped */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 scale-x-[-1]">
              <LaurelIcon className="w-8 h-8 text-[#00695C]" />
            </div>
          </div>
        </div>

        {/* Question Subtitle */}
        <h3 className="text-xl text-[#004D40] font-medium mb-6">
          Selecciona tu sexo
        </h3>

        {/* Gender Selection Cards */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          
          {/* Female Option */}
          <button 
            onClick={() => onNext('female')}
            className="group relative bg-white rounded-2xl p-3 shadow-md border border-transparent hover:border-[#4DB6AC] hover:shadow-lg transition-all duration-300 flex flex-col items-center"
          >
            <div className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-gray-100 relative">
               <img 
                 src="https://i.imgur.com/2WmydmG.png" 
                 alt="Mujer" 
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[#004D40] font-bold text-lg group-hover:text-[#00796B] transition-colors flex items-center">
              Mujer <span className="ml-1 text-sm">›</span>
            </span>
          </button>

          {/* Male Option */}
          <button 
            onClick={() => onNext('male')}
            className="group relative bg-white rounded-2xl p-3 shadow-md border border-transparent hover:border-[#4DB6AC] hover:shadow-lg transition-all duration-300 flex flex-col items-center"
          >
             <div className="w-full aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-gray-100 relative">
               <img 
                 src="https://i.imgur.com/VUwLWvS.png" 
                 alt="Hombre" 
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[#004D40] font-bold text-lg group-hover:text-[#00796B] transition-colors flex items-center">
              Hombre <span className="ml-1 text-sm">›</span>
            </span>
          </button>

        </div>

        {/* LEGAL FOOTER */}
        <div className="w-full mt-12 border-t border-slate-200 pt-8 text-center opacity-70 pb-8">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Aviso Legal</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
              Los resultados pueden variar de persona a persona y dependen de factores como tu punto de partida, tus objetivos, tu constancia y la exactitud de las respuestas que brindes en este cuestionario. Algunas personas pueden experimentar descensos de peso de hasta 4 kg en la primera semana, aunque esto no es una garantía de resultados.
              <br /><br />
              La información compartida en este sitio tiene fines educativos y no reemplaza el asesoramiento médico profesional. Tu salud es lo más importante: ante cualquier duda o condición particular, consultá con tu médico antes de comenzar cambios en tu alimentación o rutina.
            </p>
            
            <div className="w-10 h-px bg-slate-200 mx-auto my-4"></div>

            <p className="text-[10px] text-slate-400 leading-relaxed">
              Los resultados pueden variar de persona a persona. Este sitio no forma parte del sitio web de Facebook ni de Facebook Inc. Además, este sitio NO está avalado ni afiliado de ninguna manera con Facebook. Facebook es una marca registrada de Facebook, Inc.
            </p>
        </div>

      </div>
    </div>
  );
};