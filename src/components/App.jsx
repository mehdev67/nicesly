import React, { useState, useEffect, useCallback } from 'react';
import { Shield, Brain, TrendingUp, CheckCircle, Lock, Users, ArrowRight, Menu, X, Zap, EyeOff, Scale, HardHat, QrCode, LogIn, Mail, AtSign, Globe } from 'lucide-react';

// Segmented Components
import { AICardShowcase, BankIDSuccessOverlay, PricingCard } from './SharedComponents';
import { BankIDVerifyView } from './BankIDVerifyView';
import { TierSelectionView } from './TierSelectionView';

export default function NiceslyWebsite() {
  // State Management
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [simStep, setSimStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [personalNumber, setPersonalNumber] = useState('');
  const [signing, setSigning] = useState(false);
  const [showBankIDSuccess, setShowBankIDSuccess] = useState(false);

  const TRANSITION_DURATION = 700;

  // Pricing Data
  const pricingOptions = [
    {
      title: "AI-Brev",
      price: "49 kr",
      oldPrice: null,
      description: "AI skriver breven åt dig",
      features: [
        "AI skriver professionella brev",
        "Matchar mot juridiska invändningar",
        "PDF + redigerbar Word-fil",
        "Ingen bindningstid",
        "Säg upp när som helst",
      ],
      loyalty: "5% rabatt efter 3 mån, 10% efter 6 mån",
      buttonText: "Välj AI-Brev",
      buttonClass: "bg-gray-800 text-white hover:bg-gray-700 hover:scale-[1.01] active:scale-[0.99]",
      highlight: false,
      isRecommended: false
    },
    {
      title: "AI-Brev + Kurir",
      price: "99 kr",
      oldPrice: null,
      description: "AI-brev med fysisk leverans",
      features: [
        "Allt i AI-Brev, plus:",
        <span key="f1" className="font-bold">Mänsklig kurir levererar brevet fysiskt</span>,
        "Leveransspårning",
        "Professionell hantering",
      ],
      loyalty: "5% rabatt efter 3 mån, 10% efter 6 mån",
      buttonText: "Välj AI-Brev + Kurir",
      buttonClass: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-400/50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
      highlight: true,
      isRecommended: true
    },
    {
      title: "Total AI-Ombud",
      price: "168 kr",
      oldPrice: "198 kr",
      description: "AI-agent hanterar all kommunikation + David AI Guardian",
      features: [
        "Allt i AI-Brev + Kurir, plus:",
        <span key="f2" className="font-bold">AI-agent hanterar samtal, SMS, e-post till inkasso</span>,
        <span key="f3" className="font-bold text-purple-600">🛡️ David AI Guardian - Realtidsövervakning 24/7</span>,
        <span key="f4" className="text-purple-600">Proaktiva varningar innan betalningar förfaller</span>,
        <span key="f5" className="text-purple-600">Auto-kontaktar borgenärer vid risk för förfall</span>,
        "Fullmakt signeras med Scrive",
        "20 samtal/mån ingår (0,50 kr/extra samtal)",
        "Dashboard med svensk skuldstatistik",
        "Privat användarforum",
        "Prioriterad support",
      ],
      loyalty: "5% rabatt efter 3 mån, 10% efter 6 mån",
      buttonText: "Välj Total AI-Ombud",
      buttonClass: "bg-gray-800 text-white hover:bg-gray-700 hover:scale-[1.01] active:scale-[0.99]",
      highlight: false,
      isRecommended: false
    },
  ];

  // Simulation Steps
  const simulationSteps = [
    { progress: '0%', text: 'Startar analys...' },
    { progress: '25%', text: 'Läser inkassokrav...' },
    { progress: '50%', text: 'Matchar mot juridiska invändningar...' },
    { progress: '75%', text: 'Genererar professionellt brev...' },
    { progress: '100%', text: 'Klart! Brev redo för granskning.' }
  ];

  const bankIDSimulationSteps = [
    { progress: '0%', text: 'Initierar BankID...' },
    { progress: '33%', text: 'Ansluter till BankID-servrar...' },
    { progress: '66%', text: 'Väntar på din signering...' },
    { progress: '100%', text: 'Signering genomförd!' }
  ];

  // Effects
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSimStep((prevStep) => (prevStep + 1) % simulationSteps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [simulationSteps.length]);

  // Navigation Handlers
  const goToHome = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView('home');
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, []);

  const goToBankID = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView('bankid');
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, []);

  const goToGenericSignIn = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView('generic-signin');
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, []);

  const goToLogin = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView('login');
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, []);

  const goToBankIDVerify = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView('bankid-verify');
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, []);

  // BankID Handler
  const handleBankIDSign = useCallback(async () => {
    const numbers = personalNumber.replace(/\D/g, '');
    
    if (!personalNumber || numbers.length < 10) {
      alert('Vänligen ange ett giltigt personnummer (10 eller 12 siffror)');
      return;
    }

    setSigning(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('BankID signing for:', personalNumber);
      
      setShowBankIDSuccess(true);
      setSigning(false);
      
      setTimeout(() => {
        setShowBankIDSuccess(false);
        setCurrentView('tier-selection');
      }, 2000);
      
    } catch (error) {
      console.error('BankID error:', error);
      alert('Ett fel uppstod med BankID. Försök igen.');
      setSigning(false);
    }
  }, [personalNumber]);

  // Auth Handler
  const handleAuthProvider = useCallback(async (provider) => {
    setSelectedProvider(provider);
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log(`Authenticating with ${provider}`);
    alert(`Loggar in med ${provider}...`);

    setIsLoading(false);
    setSelectedProvider(null);
  }, []);

  // Conditional Rendering Logic
  let heroBgClass = 'bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50';
  let content = <HomeContent goToBankID={goToBankID} />;

  if (currentView === 'bankid') {
    heroBgClass = 'bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50';
    content = <BankIDView />;
  } else if (currentView === 'generic-signin') {
    heroBgClass = 'bg-white';
    content = <GenericSignInView />;
  } else if (currentView === 'login') {
    heroBgClass = 'bg-white';
    content = <LoginView />;
  } else if (currentView === 'bankid-verify') {
    heroBgClass = 'bg-white';
    content = <BankIDVerifyView 
      personalNumber={personalNumber}
      setPersonalNumber={setPersonalNumber}
      signing={signing}
      handleBankIDSign={handleBankIDSign}
      goToHome={goToHome}
    />;
  } else if (currentView === 'tier-selection') {
    heroBgClass = 'bg-white';
    content = <TierSelectionView goToHome={goToHome} />;
  }

  // NOTE: HomeContent, BankIDView, GenericSignInView, LoginView 
  // should be extracted to separate files as well
  // For brevity, keeping them here but they can be segmented further

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }

          @keyframes transitionExpand {
            0% { transform: scale(0.1); opacity: 0.5; }
            50% { transform: scale(100); opacity: 1; }
            100% { transform: scale(100); opacity: 0; }
          }
          .animate-transition-expand {
              animation: transitionExpand 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }

          .font-inter {
              font-family: 'Inter', sans-serif;
          }
          .transition-max-height {
            transition: max-height 0.3s ease-in-out;
          }
        `}
      </style>

      <BankIDSuccessOverlay show={showBankIDSuccess} />

      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-transition-expand"></div>
        </div>
      )}

      <div className="min-h-screen bg-white font-inter">
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg backdrop-blur-sm bg-opacity-95' : 'bg-transparent'}`}>
          {/* ... navigation code ... */}
        </nav>

        {/* Main Content */}
        <main className={heroBgClass}>
          {content}
        </main>

        {/* Footer */}
        {currentView !== 'generic-signin' && currentView !== 'login' && currentView !== 'bankid-verify' && currentView !== 'tier-selection' && (
          <footer className="bg-gray-900 text-white py-12">
            {/* ... footer code ... */}
          </footer>
        )}
      </div>
    </>
  );
}

// Placeholder for views to be segmented
// TODO: Extract these to separate files
function HomeContent({ goToBankID }) {
  return <div>Home Content - Extract to HomeView.jsx</div>;
}

function BankIDView() {
  return <div>BankID View - Extract to BankIDView.jsx</div>;
}

function GenericSignInView() {
  return <div>Generic Sign In - Extract to GenericSignInView.jsx</div>;
}

function LoginView() {
  return <div>Login View - Extract to LoginView.jsx</div>;
}
