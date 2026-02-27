import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { trackEvent } from '../utils/analytics';

interface QuizTSLScreenProps {
  userName: string;
  digestion: string;
  onNext: () => void;
}

interface IconProps {
  className?: string;
}

// Icons
const CheckIcon = ({ className = "w-5 h-5 text-[#009688] flex-shrink-0 mt-0.5" }: IconProps) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const GiftIcon = ({ className = "w-6 h-6 text-white" }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
);

const StarIcon: React.FC<IconProps> = ({ className = "w-5 h-5 text-amber-400 fill-current" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const QuizTSLScreen: React.FC<QuizTSLScreenProps> = ({ 
  userName, 
  digestion,
  onNext 
}) => {
  const [timeLeft, setTimeLeft] = useState(411); // 6:51 in seconds

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleBuyClick = () => {
    trackEvent('purchase_initiated', {
      value: 16999,
      currency: 'ARS'
    });
    window.location.href = 'https://www.metodoguiasexpress.net/cart/43286306226382:1?storefront=true&discount=AYUNO50';
  };

  const digestionPhrases: Record<string, string> = {
    'bloated': 'esa sensación de estar súper hinchada y pesada al final del día',
    'normal_low_energy': 'esa falta de energía que arrastrás al final del día',
    'depends': 'esa pesadez que aparece cuando improvisás tus comidas',
    'good': 'esas ganas de optimizar al 100% tu digestión y tus horarios',
  };

  const digestionPhrase = digestionPhrases[digestion] || 'esa sensación de malestar';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      
      {/* Container */}
      <div className="w-full max-w-md px-6 flex flex-col items-center pb-12 pt-6">

        {/* BLOCK 1: Hero / Benefit Activation */}
        <div className="w-full text-center mb-6">
             <div className="inline-flex items-center bg-[#E0F2F1] text-[#009688] px-5 py-2.5 rounded-full font-bold text-base uppercase tracking-wide mb-4 shadow-sm border border-[#B2DFDB]">
                <span className="bg-[#009688] rounded-full p-1 mr-2"><GiftIcon className="w-3.5 h-3.5 text-white" /></span>
                BENEFICIO ACTIVADO
             </div>
             <h1 className="text-3xl font-bold text-[#004D40] mb-3 leading-tight">
                🧠 Tu plan personalizado está listo, {userName}
             </h1>
             <p className="text-slate-500 font-medium text-lg">
                Gracias por completar la evaluación.
             </p>
             <p className="text-slate-500 text-base mt-2">
                Según tus respuestas sobre tu falta de energía y {digestionPhrase}, armamos la versión de tu plan adaptada a tu estilo de vida.
             </p>
        </div>

        {/* BLOCK 2: No Diet */}
        <div className="w-full text-center mb-10 px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#004D40] leading-snug mb-3">
                🌿 No se trata de hacer dieta
            </h2>
            <p className="text-xl text-[#009688] font-medium mb-4">
                Se trata de organizar tus horarios
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-left">
                <p className="text-[#004D40] font-bold mb-4">Este programa te ayuda a:</p>
                <ul className="space-y-3">
                    <li className="flex items-start"><CheckIcon className="w-4 h-4 text-[#009688] flex-shrink-0 mt-1.5 mr-2" /> <span className="text-slate-600 text-lg">Definir una ventana de comidas que puedas sostener.</span></li>
                    <li className="flex items-start"><CheckIcon className="w-4 h-4 text-[#009688] flex-shrink-0 mt-1.5 mr-2" /> <span className="text-slate-600 text-lg">Simplificar qué comer sin pensar todo el día.</span></li>
                    <li className="flex items-start"><CheckIcon className="w-4 h-4 text-[#009688] flex-shrink-0 mt-1.5 mr-2" /> <span className="text-slate-600 text-lg">Mantener constancia sin rigidez.</span></li>
                    <li className="flex items-start"><CheckIcon className="w-4 h-4 text-[#009688] flex-shrink-0 mt-1.5 mr-2" /> <span className="text-slate-600 text-lg">Sentir más control sobre tu rutina diaria.</span></li>
                </ul>
            </div>
        </div>

        {/* BLOCK 3: What you can do */}
        <div className="w-full mb-10 px-4">
            <h2 className="text-2xl font-bold text-[#004D40] text-center mb-6">
                ✨ ¿Qué vas a poder hacer con este plan?
            </h2>
            <div className="space-y-4">
                {[
                    "Saber exactamente cuándo comer, sin improvisar.",
                    "Armar comidas con lo que tengas en casa.",
                    "Ajustar horarios según tu día real.",
                    "Mantener hábitos sin sentirte restringida."
                ].map((item, i) => (
                    <div key={i} className="flex items-start bg-white p-4 rounded-xl shadow-sm border border-slate-50">
                        <span className="text-[#009688] mr-3 font-bold">•</span>
                        <span className="text-slate-600 font-medium">{item}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* BLOCK 4: Inclusions */}
        <div className="w-full space-y-6 mb-10">
            <h3 className="text-center text-slate-400 text-base font-bold uppercase tracking-widest mb-2">📦 Tu acceso hoy incluye:</h3>
            
            {/* Item 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div>
                    <h4 className="font-bold text-[#004D40] text-lg mb-1">Guía principal</h4>
                    <p className="text-base text-slate-500 font-medium mb-2 leading-snug">Plan personalizado de organización de horarios. Te muestra cómo estructurar tu día de forma simple.</p>
                    <img 
                        src="https://i.imgur.com/TSRuaMz.png" 
                        alt="Mockup Guía Principal" 
                        className="w-32 h-auto mx-auto"
                        referrerPolicy="no-referrer"
                    />
                </div>
            </div>

            {/* Item 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div>
                    <h4 className="font-bold text-[#004D40] text-lg mb-1">Asesor inteligente + Nutri Chef</h4>
                    <p className="text-base text-slate-500 font-medium mb-2 leading-snug">Es como tener acompañamiento 24/7. Podés preguntar qué cocinar con lo que tenés en la heladera o cómo combinar comidas en tu ventana.</p>
                    <img 
                        src="https://i.imgur.com/tIt19C5.png" 
                        alt="Mockup Asesor Inteligente" 
                        className="w-32 h-auto mx-auto"
                        referrerPolicy="no-referrer"
                    />
                </div>
            </div>

            {/* Item 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div>
                    <h4 className="font-bold text-[#004D40] text-lg mb-1">Guía Mate + Rutina diaria</h4>
                    <p className="text-base text-slate-500 font-medium mb-4 leading-snug">Aprendé cómo integrar el mate dentro de tu estructura de ayuno y cómo arrancar las mañanas con más claridad.</p>
                    <img 
                        src="https://i.imgur.com/GqYPCTg.png" 
                        alt="Mockup Guía Mate" 
                        className="w-32 h-auto mx-auto"
                        referrerPolicy="no-referrer"
                    />
                </div>
            </div>

            {/* Item 4 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div>
                    <h4 className="font-bold text-[#004D40] text-lg mb-1">Calculadora + Tracker</h4>
                    <p className="text-base text-slate-500 font-medium mb-4 leading-snug">Visualizás tu ventana, seguís tu energía y ajustás horarios según tu experiencia.</p>
                    <img 
                        src="https://i.imgur.com/lMRMcMw.png" 
                        alt="Mockup Calculadora" 
                        className="w-32 h-auto mx-auto"
                        referrerPolicy="no-referrer"
                    />
                </div>
            </div>

            {/* Item 5 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div>
                    <h4 className="font-bold text-[#004D40] text-lg mb-1">Bitácora de 7 días (imprimible)</h4>
                    <p className="text-base text-slate-500 font-medium mb-2 leading-snug">Un espacio para registrar sensaciones y pequeños avances diarios.</p>
                    <img 
                        src="https://i.imgur.com/ZlzjiF6.png" 
                        alt="Mockup Bitácora" 
                        className="w-32 h-auto mx-auto"
                        referrerPolicy="no-referrer"
                    />
                </div>
            </div>
        </div>

        {/* BLOCK 5: Real Life Design */}
        <div className="w-full bg-white rounded-2xl p-8 mb-10 text-center border border-slate-100">
            <div className="text-4xl mb-4">💙</div>
            <h3 className="text-2xl font-bold text-[#004D40] mb-4">Diseñado para la vida real argentina</h3>
            <div className="space-y-2 text-lg text-slate-600">
                <p>No hay conteo obsesivo de calorías.</p>
                <p>No hay alimentos prohibidos.</p>
                <p>Solo estructura, claridad y acompañamiento.</p>
            </div>
        </div>

        {/* BLOCK 6: Urgency Timer */}
        <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 p-5 mb-8 flex flex-col items-center justify-center">
            <p className="text-slate-500 text-base font-semibold uppercase tracking-wide mb-1">
                🔥 Descuento activo por:
            </p>
            <div className="text-5xl font-bold text-slate-700 tracking-wider mb-1 font-mono">
                {formatTime(timeLeft)}
            </div>
            <p className="text-sm text-slate-400">
                (Luego vuelve al precio regular)
            </p>
        </div>

        {/* BLOCK 7: Price + Discount */}
        <div className="w-full bg-[#E0F2F1] rounded-2xl p-8 mb-8 text-center border border-[#B2DFDB] relative overflow-hidden">
             {/* Tag */}
             <div className="absolute top-0 right-0 bg-[#FF7043] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                50% OFF
             </div>

             <h3 className="text-[#004D40] font-bold text-xl mb-6">💰 Acceso con 50% de descuento exclusivo por haber completado la evaluación.</h3>
             
             <div className="flex flex-col items-center justify-center mb-6">
                <span className="text-slate-400 line-through text-xl font-medium">Precio regular: $33.999 ARS</span>
                <span className="text-5xl font-bold text-[#00796B]">Hoy: $16.999 ARS</span>
             </div>

             <div className="flex flex-col items-start space-y-2.5 max-w-[240px] mx-auto text-base text-[#004D40]">
                <div className="flex items-center"><CheckIcon /><span className="ml-2">Pago único</span></div>
                <div className="flex items-center"><CheckIcon /><span className="ml-2">Acceso inmediato</span></div>
                <div className="flex items-center"><CheckIcon /><span className="ml-2">Sin suscripciones ni cargos ocultos</span></div>
             </div>
        </div>

        {/* BLOCK 8: CTA */}
        <div className="w-full mb-8">
            <Button 
                onClick={handleBuyClick} 
                className="py-6 text-xl uppercase tracking-wide shadow-xl shadow-[#00A650]/20 bg-[#00A650] hover:bg-[#008f45] text-white"
            >
                👉 QUIERO MI PLAN PERSONALIZADO
            </Button>
        </div>

        {/* BLOCK 9: Warranty */}
        <div className="w-full bg-white rounded-xl p-5 shadow-sm border border-slate-100 mb-8 flex items-center justify-center space-x-4">
             <div>
                <p className="font-bold text-[#004D40] text-base text-center">🛡️ Garantía de 30 días</p>
                <p className="text-sm text-slate-500 text-center">Probalo sin riesgo. Si sentís que no se adapta a tu vida, te devolvemos el dinero.</p>
             </div>
        </div>

        {/* BLOCK 10: WhatsApp Testimonials */}
        <div className="w-full mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-[#004D40] text-center mb-6 leading-tight">
                Mensajes de clientas
            </h2>
            <div className="space-y-4">
                <img src="https://i.imgur.com/m5aDUC8.png" alt="Testimonio WhatsApp 1" className="w-full rounded-2xl shadow-md border border-slate-100" referrerPolicy="no-referrer" />
                <img src="https://i.imgur.com/AcVIw56.png" alt="Testimonio WhatsApp 2" className="w-full rounded-2xl shadow-md border border-slate-100" referrerPolicy="no-referrer" />
                <img src="https://i.imgur.com/gsyGDdX.png" alt="Testimonio WhatsApp 3" className="w-full rounded-2xl shadow-md border border-slate-100" referrerPolicy="no-referrer" />
            </div>
        </div>

        {/* BLOCK 11: Text Testimonials */}
        <div className="w-full mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#004D40] text-center mb-8 leading-tight">
                💬 Lo que dicen otras mujeres:
            </h2>
            <div className="space-y-5">
                {[
                    "“Me ayudó a organizarme mejor y sostener el hábito sin sentir presión.”",
                    "“Por primera vez sentí que un plan se adaptaba a mi rutina.”",
                    "“Me dio claridad. Ya no improviso mis comidas todos los días.”"
                ].map((text, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center space-x-1 mb-3">
                             {[...Array(5)].map((_, j) => <StarIcon key={j} className="w-5 h-5 text-amber-400 fill-current" />)}
                        </div>
                        <p className="text-slate-600 text-base italic leading-relaxed">
                            {text}
                        </p>
                    </div>
                ))}
            </div>
        </div>

        {/* BLOCK 12: Social Proof */}
        <div className="w-full text-center mb-12">
            <p className="text-3xl font-bold text-[#004D40] mb-2">💪 +1.800 personas</p>
            <p className="text-slate-500 text-base">confían en Ayuno a la Argentina.</p>
            <p className="text-slate-500 text-base">Tu plan ya está listo para arrancar hoy mismo.</p>
        </div>

        {/* BLOCK 13: Final CTA */}
        <div className="w-full mb-8">
            <Button 
                onClick={handleBuyClick} 
                className="py-6 text-xl uppercase tracking-wide shadow-xl shadow-[#00A650]/20 bg-[#00A650] hover:bg-[#008f45] text-white"
            >
                👉 QUIERO MI PLAN PERSONALIZADO
            </Button>
        </div>

        {/* LEGAL FOOTER */}
        <div className="w-full mt-12 border-t border-slate-200 pt-8 text-center opacity-70">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Aviso legal</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 text-left">
              Los resultados pueden variar según el metabolismo, la constancia y el punto de partida de cada persona. Este contenido tiene fines educativos y no reemplaza el asesoramiento médico profesional.
            </p>
        </div>

      </div>
    </div>
  );
};