import React from 'react';
import { Button } from './Button';

interface Screen1Props {
  onStart: () => void;
}

export const Screen1: React.FC<Screen1Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center pt-8 sm:pt-12 pb-8">
      {/* Mobile-first fixed width container */}
      <div className="w-full max-w-md px-6 flex flex-col items-center text-center">
        
        {/* Top Branding Eyebrow */}
        <div className="mb-12 flex items-center justify-center space-x-1">
          <span className="text-[#009688] font-bold text-lg sm:text-xl">
            Ayuno intermitente
          </span>
          <span className="text-[#4DB6AC] font-light text-lg sm:text-xl">
            a la Argentina
          </span>
        </div>
        
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-bold text-[#004E4E] leading-tight mb-6">
          Descubre tu plan <br className="hidden sm:block" />
          de ayuno ideal
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-slate-500 font-normal leading-snug max-w-[90%] mb-12">
          Toma este test de 1 minuto para crear tu programa personalizado.
        </p>

        {/* CTA */}
        <div className="w-full mb-6">
          <Button onClick={onStart}>
            Comenzar Ahora
          </Button>
        </div>

        {/* Prueba Social (Moved to bottom) */}
        <div className="mb-8">
          <p className="text-xs sm:text-sm font-medium text-slate-400">
            Más de 1,000 personas ya han transformado su vida
          </p>
        </div>

        {/* LEGAL FOOTER */}
        <div className="w-full mt-24 border-t border-slate-200 pt-8 text-center opacity-70">
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