import React, { useEffect, useState } from 'react';
import { Button } from './Button';

interface QuizFinalReportScreenProps {
  userName: string;
  obstacle: string;
  criticalMoment: string;
  digestion: string;
  workSchedule: string;
  onNext: () => void;
}

const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#009688] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const PointerIcon = () => (
    <span className="text-xl mr-2">👉</span>
);

export const QuizFinalReportScreen: React.FC<QuizFinalReportScreenProps> = ({ userName, obstacle, criticalMoment, digestion, workSchedule, onNext }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t1 = setTimeout(() => setProgress(23), 200);
    const t2 = setTimeout(() => setProgress(57), 1200);
    const t3 = setTimeout(() => setProgress(93), 2200);
    const t4 = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Mappings for dynamic content
  const obstacleLabels: Record<string, string> = {
    'afternoon_slump': 'El bajón de energía a la tarde',
    'boredom_stress': 'Comer por aburrimiento o estrés',
    'bloating_after_eating': 'Me hincho mucho después de comer',
    'no_schedule': 'No tengo horarios fijos y vivo improvisando',
  };

  const criticalMomentLabels: Record<string, string> = {
    'mid_morning': 'A media mañana',
    'after_lunch': 'Después de almorzar',
    'afternoon_5pm': 'El clásico bajón de las 17hs',
    'night_couch': 'A la noche tirada en el sillón',
  };

  const criticalMomentPhrases: Record<string, string> = {
    'mid_morning': 'frenar la ansiedad de media mañana.',
    'after_lunch': 'frenar la ansiedad que te da después de almorzar.',
    'afternoon_5pm': 'frenar la ansiedad del clásico bajón de las 17hs.',
    'night_couch': 'frenar la ansiedad que aparece a la noche cuando te tirás en el sillón.',
  };

  const digestionLabels: Record<string, string> = {
    'bloated': 'Súper hinchada y pesada',
    'normal_low_energy': 'Normal, pero con poca energía',
    'depends': 'Depende mucho de lo que coma',
    'good': 'Bastante bien, la verdad',
  };

  const workScheduleLabels: Record<string, string> = {
    'office': 'Horario fijo de oficina',
    'wfh_flexible': 'Trabajo desde casa o flexible',
    'rotating': 'Turnos rotativos',
    'entrepreneur': 'Emprendedora, no tengo horario fijo',
  };

  const workSchedulePhrases: Record<string, string> = {
    'office': 'con una rutina de horario fijo de oficina.',
    'wfh_flexible': 'con una rutina de trabajo flexible o desde casa.',
    'rotating': 'con una rutina de turnos rotativos.',
    'entrepreneur': 'con tu ritmo de emprendedora y sin horarios fijos.',
  };

  const obstacleText = obstacleLabels[obstacle] || obstacle;
  const criticalMomentText = criticalMomentLabels[criticalMoment] || criticalMoment;
  const criticalMomentPhrase = criticalMomentPhrases[criticalMoment] || `frenar la ansiedad de ${criticalMomentText}.`;
  const digestionText = digestionLabels[digestion] || digestion;
  const workScheduleText = workScheduleLabels[workSchedule] || workSchedule;
  const workSchedulePhrase = workSchedulePhrases[workSchedule] || `con una rutina de ${workScheduleText}.`;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E0F7FA] to-white flex flex-col items-center justify-center">
        <div className="w-full max-w-md px-6 flex flex-col items-center text-center">
          <h2 className="text-[#004D40] font-bold text-2xl sm:text-3xl mb-8 animate-pulse">
            Preparando tu informe...
          </h2>
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-6 shadow-inner relative">
             <div 
                className="h-full bg-[#009688] transition-all duration-1000 ease-out rounded-full shadow-[0_0_15px_rgba(0,150,136,0.5)]" 
                style={{ width: `${progress}%` }} 
             />
          </div>
          <div className="text-[#009688] font-bold text-5xl tabular-nums transition-all duration-300">
              {progress}%
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center animate-in fade-in zoom-in duration-500">
      
      <div className="w-full max-w-md px-6 flex flex-col items-center pb-12 pt-8">
        
        {/* HEADER BLOCK */}
        <div className="w-full bg-white rounded-2xl shadow-sm p-8 mb-8 text-center border border-slate-100">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#004D40] leading-tight mb-4">
                🧠 Este es tu informe personalizado, {userName}
            </h1>
            <p className="text-slate-500 font-normal text-lg mb-6">
                Analizamos:
            </p>
            <ul className="text-[#004D40] text-lg space-y-2 mb-6">
                <li className="flex items-center justify-center gap-2">
                  <span className="text-[#009688]">✔</span> Tus horarios de descanso y comidas.
                </li>
                <li className="flex items-center justify-center gap-2">
                  <span className="text-[#009688]">✔</span> Tu nivel de actividad diaria.
                </li>
                <li className="flex items-center justify-center gap-2">
                  <span className="text-[#009688]">✔</span> Tu relación actual con el mate y la ansiedad.
                </li>
            </ul>
            <p className="text-[#004D40] font-medium text-lg border-t border-slate-100 pt-6">
                Con esta información armamos una estrategia adaptada a tu rutina real.
            </p>
        </div>

        {/* BLOCK 1: Diagnóstico */}
        <div className="w-full bg-white rounded-2xl shadow-sm p-8 mb-8 border-l-4 border-[#009688]">
            <h2 className="text-xl font-semibold text-[#004D40] mb-6 flex items-center">
                📊 Tu punto de partida (Diagnóstico)
            </h2>
            
            <div className="space-y-4 mb-6">
                <div>
                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">Mayor obstáculo actual</p>
                    <p className="text-[#004D40] font-bold text-lg">{obstacleText}</p>
                </div>
                <div>
                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">Momento más crítico</p>
                    <p className="text-[#004D40] font-bold text-lg">{criticalMomentText}</p>
                </div>
                <div>
                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">Estado digestivo</p>
                    <p className="text-[#004D40] font-bold text-lg">{digestionText}</p>
                </div>
            </div>

            <p className="text-slate-500 text-sm mb-0">
                Estos datos nos confirman por qué te venís sintiendo así. Muchas mujeres de tu misma edad en situaciones similares suelen notar que el problema no es lo que comen, sino el desorden de los horarios.
            </p>
        </div>

        {/* BLOCK 2: Enfoque Recomendado */}
        <div className="w-full bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="text-xl font-semibold text-[#004D40] mb-6 flex items-center">
                🎯 Tu enfoque recomendado
            </h2>
            
            <p className="text-lg text-slate-600 mb-6">
                No vamos a trabajar con calorías. Vamos a enfocarnos en:
            </p>

            <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                    <span className="text-[#009688]">✔</span>
                    <span className="text-lg text-[#004D40]">Ordenar tu ventana de comidas.</span>
                </div>
                <div className="flex items-start space-x-3">
                    <span className="text-[#009688]">✔</span>
                    <span className="text-lg text-[#004D40]">Cortar la inflamación de raíz.</span>
                </div>
                <div className="flex items-start space-x-3">
                    <span className="text-[#009688]">✔</span>
                    <span className="text-lg text-[#004D40]">Integrar tus mates diarios estratégicamente para {criticalMomentPhrase}</span>
                </div>
            </div>
        </div>

        {/* BLOCK 3: Qué esperar de tu PROTOCOLO */}
        <div className="w-full bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="text-xl font-semibold text-[#004D40] mb-6 flex items-center">
                📅 Qué esperar de tu PROTOCOLO
            </h2>

            <div className="relative pt-2 pb-6 px-2 mb-6 border-l-2 border-slate-100 ml-4 space-y-8">
                <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-4 h-4 bg-[#4DB6AC] rounded-full border-2 border-white box-content shadow-sm"></div>
                    <p className="text-sm font-bold text-[#4DB6AC] uppercase tracking-wide mb-1">⏳ Días 1 a 5: Desinflamación rápida</p>
                    <p className="text-[#004D40] font-medium">Adiós pesadez post-comidas. Tu digestión descansa, la energía se estabiliza y el mate te salva de la ansiedad sin pasar hambre.</p>
                </div>
                <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-4 h-4 bg-[#009688] rounded-full border-2 border-white box-content shadow-sm"></div>
                    <p className="text-sm font-bold text-[#009688] uppercase tracking-wide mb-1">👖 Semanas 2 a 4: La ropa cede</p>
                    <p className="text-[#004D40] font-medium">Ese pantalón que te apretaba empieza a quedar cómodo. Los antojos de azúcar por la tarde desaparecen por completo.</p>
                </div>
                <div className="relative">
                    <div className="absolute -left-[23px] top-0 w-5 h-5 bg-[#004D40] rounded-full border-2 border-white box-content shadow-md ring-4 ring-[#E0F2F1]"></div>
                    <p className="text-sm font-bold text-[#004D40] uppercase tracking-wide mb-1">🚀 Mes 2 en adelante: Piloto automático</p>
                    <p className="text-[#004D40] font-bold">Ya no es un esfuerzo, es un hábito. Disfrutás el fin de semana sin culpa porque sabés exactamente cómo manejar tus horarios.</p>
                </div>
            </div>

            <p className="text-xs text-slate-400 text-center leading-relaxed">
                (los resultados varían según cada persona)
            </p>
        </div>

        {/* BLOCK 4: Tu Perfil Estratégico */}
        <div className="w-full bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="text-xl font-semibold text-[#004D40] mb-6 flex items-center">
                🧠 Tu perfil estratégico
            </h2>
            
            <p className="text-lg text-slate-600 mb-6">
                Según tus respuestas:
            </p>

            <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                    <span className="text-[#009688]">✔</span>
                    <span className="text-lg text-[#004D40]">Valorás la estructura pero {workSchedulePhrase}</span>
                </div>
                <div className="flex items-start space-x-3">
                    <span className="text-[#009688]">✔</span>
                    <span className="text-lg text-[#004D40]">Necesitás flexibilidad para no abandonar.</span>
                </div>
            </div>

            <div className="flex items-start space-x-2 p-4 bg-[#E0F2F1] rounded-xl">
                <PointerIcon />
                <span className="text-[#004D40] font-medium text-lg leading-snug">
                    Por eso, tu cuerpo necesita una ventana adaptable, no un molde rígido.
                </span>
            </div>
        </div>

        {/* BLOCK 5: Tranquilidad Total */}
        <div className="w-full bg-white rounded-2xl shadow-sm p-8 mb-12 text-center">
            <div className="text-4xl mb-4">💙</div>
            <h2 className="text-2xl font-bold text-[#004D40] mb-4">
                Tranquilidad total
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
                No se trata de hacer dieta.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
                Se trata de organizar mejor tus horarios.
            </p>
        </div>

        {/* CTA */}
        <div className="w-full">
            <Button 
                onClick={onNext} 
                className="py-5 text-xl shadow-xl shadow-blue-500/20"
            >
                👉 Ver mi plan
            </Button>
        </div>

      </div>
    </div>
  );
};