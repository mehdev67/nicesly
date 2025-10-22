import React from 'react';
import { Shield, Brain, QrCode, CheckCircle } from 'lucide-react';

/**
 * AI Card Showcase Component
 * Used in BankID and generic signup flows
 */
export const AICardShowcase = ({ simStep, simulationSteps, isCentered, isBankID }) => {
  const currentSimStep = simulationSteps[simStep];
  const progressColor = isBankID 
    ? 'bg-gradient-to-r from-green-500 to-lime-600' 
    : 'bg-gradient-to-r from-cyan-500 to-blue-600';
  const bgColor = isBankID ? 'bg-green-50 border-green-100' : 'bg-cyan-50 border-cyan-100';
  const textColor = isBankID ? 'text-green-600' : 'text-cyan-600';
  const shadowColor = isBankID ? 'shadow-green-200/50' : 'shadow-blue-200/50';

  return (
    <div className={`relative p-6 md:p-12 ${isCentered ? 'max-w-md mx-auto' : ''}`}>
      <div className={`relative bg-white rounded-[2.5rem] shadow-2xl ${shadowColor} p-6 sm:p-10 space-y-6 border border-gray-100`}>
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 ${progressColor} rounded-xl flex items-center justify-center shadow-lg`}>
            {isBankID ? <QrCode className="text-white" size={28} /> : <Brain className="text-white" size={28} />}
          </div>
          <div>
            <div className="text-lg font-bold text-gray-800">David AI</div>
            <div className="text-sm text-gray-500">
              {isBankID ? 'BankID-verifiering' : 'Din personliga assistent'}
            </div>
          </div>
        </div>
        <div className={`${bgColor} rounded-xl p-5 space-y-3 border`}>
          <div className="text-sm text-gray-700 font-medium">
            {isBankID ? 'BankID-flöde:' : 'David AI kör analys:'}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${progressColor} h-2 rounded-full transition-all duration-1000`}
              style={{ width: currentSimStep.progress }}
            ></div>
          </div>
          <div className={`text-xs ${textColor} font-medium min-h-[1rem] transition-opacity duration-500`}>
            {currentSimStep.text}
          </div>
        </div>
        <div className="flex justify-between text-base border-t pt-4">
          <span className="text-gray-600 font-medium">Status:</span>
          <span className="font-bold text-blue-600">
            {isBankID ? 'Väntar på din signering' : '< 3 minuter'}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * BankID Success Overlay
 * Shows after successful BankID signing
 */
export const BankIDSuccessOverlay = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-fade-in">
      <div className="text-center px-6">
        <div className="mb-6">
          <div className="text-white text-4xl font-bold mb-4">NICESLY.SE</div>
          <div className="h-px bg-gray-500 w-full mb-8"></div>
        </div>
        
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-6">
          Inloggning i mobilappen<br />företag
        </h1>
        
        <div className="h-px bg-gray-500 w-full mb-8"></div>
        
        <div className="text-white text-lg leading-relaxed mb-8">
          <p className="font-bold mb-4">Tänk på!</p>
          <p className="text-gray-300">
            När du loggar in ska det alltid vara på ditt eget initiativ. Om du har blivit uppringd 
            och ombedd att logga in kan det vara ett försök till bedrägeri, avsluta samtalet och 
            kontakta oss på <span className="text-cyan-400">08-123 456 78</span>
          </p>
        </div>
        
        <div className="mt-12">
          <div className="inline-block px-8 py-4 bg-cyan-400 text-slate-900 rounded-lg text-lg font-semibold">
            Identifiera med säkerhetskod
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Pricing Card Component
 * Reusable for all tier cards
 */
export const PricingCard = ({ 
  title, 
  price, 
  oldPrice, 
  description, 
  features, 
  buttonText, 
  buttonClass, 
  highlight, 
  isRecommended,
  loyalty,
  onClick 
}) => (
  <div className={`bg-white rounded-3xl shadow-xl overflow-hidden border ${
    highlight 
      ? 'border-4 border-cyan-500 shadow-2xl shadow-cyan-300/50' 
      : 'border-gray-100 shadow-gray-200/50'
  } flex flex-col transition transform hover:-translate-y-1`}>
    <div className={`p-8 text-center ${
      highlight 
        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <p className={`text-sm font-semibold mb-2 uppercase tracking-widest ${
        highlight ? 'text-white' : 'text-cyan-600'
      }`}>
        {title}
      </p>
      
      <div className="flex items-center justify-center space-x-3 mb-2 leading-none">
        {oldPrice && (
          <span className={`text-2xl font-semibold opacity-70 line-through ${
            highlight ? 'text-white' : 'text-gray-400'
          }`}>
            {oldPrice}
          </span>
        )}
        <span className="text-5xl font-extrabold">{price}</span>
      </div>
      
      <div className={`text-xl font-light opacity-90 ${
        highlight ? 'text-white' : 'text-gray-600'
      }`}>
        per månad
      </div>
      
      {description && (
        <p className={`text-sm mt-3 ${highlight ? 'opacity-80' : 'text-gray-500'}`}>
          {description}
        </p>
      )}
      
      {isRecommended && (
        <div className="mt-4">
          <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Rekommenderad
          </span>
        </div>
      )}
    </div>

    <div className="p-8 flex-1 flex flex-col">
      <ul className="space-y-4 flex-1 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      {loyalty && (
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
          <p className="text-xs font-semibold text-purple-800">
            🎁 LOJALITETSBONUS: {loyalty}
          </p>
        </div>
      )}

      <button
        onClick={onClick}
        className={`w-full px-6 py-4 rounded-xl text-lg font-bold transition transform hover:scale-105 active:scale-95 ${buttonClass}`}
      >
        {buttonText}
      </button>
    </div>
  </div>
);
