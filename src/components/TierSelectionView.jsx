import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

/**
 * Tier Selection View
 * Shows after successful BankID verification
 * Allows user to choose pricing plan
 */
export const TierSelectionView = ({ goToHome }) => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const tiers = [
    {
      name: 'AI-Brev',
      price: '49 kr',
      stripeProductId: 'prod_THSNuBtTi4dd8d',
      description: 'AI skriver breven åt dig',
      features: [
        'AI skriver professionella brev',
        'Matchar mot juridiska invändningar',
        'PDF + redigerbar Word-fil'
      ],
      buttonClass: 'bg-gray-800 text-white hover:bg-gray-700',
      highlight: false
    },
    {
      name: 'AI-Brev + Kurir',
      price: '99 kr',
      stripeProductId: 'prod_THSWpxmkl07VMr',
      description: 'AI-brev med fysisk leverans',
      features: [
        'Allt i AI-Brev, plus:',
        { text: 'Mänsklig kurir levererar brevet fysiskt', bold: true },
        'Leveransspårning'
      ],
      buttonClass: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-400/50 hover:shadow-lg hover:scale-[1.02]',
      highlight: true,
      recommended: true
    },
    {
      name: 'Total AI-Ombud',
      price: '168 kr',
      oldPrice: '198 kr',
      stripeProductId: 'prod_THSZuwWHLIDa4B',
      description: 'AI-agent + David AI Guardian',
      features: [
        'Allt i AI-Brev + Kurir, plus:',
        { text: 'AI-agent hanterar samtal, SMS, e-post', bold: true },
        { text: '🛡️ David AI Guardian - Realtidsövervakning 24/7', bold: true, color: 'text-purple-600' },
        { text: 'Proaktiva varningar innan förfall', color: 'text-purple-600' },
        { text: 'Auto-kontaktar borgenärer vid risk', color: 'text-purple-600' },
        '20 samtal/mån ingår'
      ],
      buttonClass: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-400/50 hover:shadow-lg hover:scale-[1.02]',
      highlight: false,
      badge: '🛡️ GUARDIAN'
    }
  ];

  const handleTierSelect = async (tier) => {
    setSelectedTier(tier.name);
    setRedirecting(true);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/create-checkout-session', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     productId: tier.stripeProductId,
      //     userId: 'user-id-here'
      //   })
      // });
      // const { checkoutUrl } = await response.json();
      // window.location.href = checkoutUrl;

      // Demo: Show alert
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Redirecting to Stripe for product:', tier.stripeProductId);
      alert(`Redirecting till Stripe checkout...\nProdukt: ${tier.name}\nProduct ID: ${tier.stripeProductId}`);
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Ett fel uppstod. Försök igen.');
      setSelectedTier(null);
    } finally {
      setRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Välj din plan
          </h1>
          <p className="text-xl text-gray-600">
            Välkommen! Nu är det dags att välja vilket stöd du behöver.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`bg-white rounded-3xl shadow-xl overflow-hidden border ${
                tier.highlight 
                  ? 'border-4 border-cyan-500 transform scale-105 relative' 
                  : 'border-gray-100'
              } hover:shadow-2xl transition transform hover:-translate-y-1`}
            >
              {tier.recommended && (
                <div className="absolute top-4 right-4 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  REKOMMENDERAD
                </div>
              )}
              {tier.badge && (
                <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  {tier.badge}
                </div>
              )}
              
              <div className={`p-8 text-center ${
                tier.highlight 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                  : 'bg-gray-50'
              }`}>
                <p className={`text-sm font-semibold mb-2 uppercase tracking-widest ${
                  tier.highlight ? 'text-white' : 'text-cyan-600'
                }`}>
                  {tier.name}
                </p>
                
                <div className="flex items-center justify-center space-x-3 mb-2">
                  {tier.oldPrice && (
                    <span className={`text-2xl font-semibold line-through ${
                      tier.highlight ? 'text-white opacity-70' : 'text-gray-400'
                    }`}>
                      {tier.oldPrice}
                    </span>
                  )}
                  <span className={`text-5xl font-extrabold ${
                    tier.highlight ? 'text-white' : 'text-gray-900'
                  }`}>
                    {tier.price}
                  </span>
                </div>
                
                <div className={`text-xl font-light ${
                  tier.highlight ? 'text-white opacity-90' : 'text-gray-600'
                }`}>
                  per månad
                </div>
                
                <p className={`text-sm mt-3 ${
                  tier.highlight ? 'text-white opacity-80' : 'text-gray-500'
                }`}>
                  {tier.description}
                </p>
              </div>
              
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className={`${
                        typeof feature === 'object' && feature.bold ? 'font-bold' : ''
                      } ${
                        typeof feature === 'object' && feature.color ? feature.color : 'text-gray-700'
                      }`}>
                        {typeof feature === 'object' ? feature.text : feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleTierSelect(tier)}
                  disabled={selectedTier === tier.name || redirecting}
                  className={`w-full px-6 py-4 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${tier.buttonClass}`}
                >
                  {selectedTier === tier.name ? (
                    redirecting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Omdirigerar...
                      </div>
                    ) : (
                      'Vald ✓'
                    )
                  ) : (
                    `Välj ${tier.name}`
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={goToHome}
            disabled={redirecting}
            className="text-gray-500 hover:text-cyan-600 transition text-sm disabled:opacity-50"
          >
            ← Tillbaka till startsidan
          </button>
        </div>
      </div>
    </div>
  );
};
