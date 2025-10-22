import React from 'react';
import { Shield } from 'lucide-react';

/**
 * BankID Verification View
 * Handles personal number input and BankID signing
 */
export const BankIDVerifyView = ({ 
  personalNumber, 
  setPersonalNumber, 
  signing, 
  handleBankIDSign, 
  goToHome 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-12 px-6 bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full my-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-lime-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="text-white" size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Verifiera med BankID</h2>
          <p className="text-gray-600">För att slutföra din registrering behöver vi verifiera din identitet</p>
        </div>

        <div className="space-y-6">
          {/* Personal Number Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Personnummer
            </label>
            <input 
              type="text" 
              value={personalNumber}
              onChange={(e) => {
                const input = e.target.value;
                const cleaned = input.replace(/[^\d-]/g, '');
                if (cleaned.length <= 13) {
                  setPersonalNumber(cleaned);
                }
              }}
              onBlur={() => {
                const numbers = personalNumber.replace(/\D/g, '');
                if (numbers.length === 10 || numbers.length === 12) {
                  const formatted = numbers.length === 12 
                    ? numbers.slice(0, 8) + '-' + numbers.slice(8)
                    : numbers.slice(0, 6) + '-' + numbers.slice(6);
                  setPersonalNumber(formatted);
                }
              }}
              placeholder="ÅÅMMDD-XXXX eller ÅÅÅÅMMDD-XXXX"
              maxLength="13"
              disabled={signing}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-lg text-center font-medium focus:border-green-500 focus:outline-none transition disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Exempel: 901231-1234 eller 19901231-1234
            </p>
          </div>

          {/* BankID Button */}
          <button 
            onClick={handleBankIDSign}
            disabled={signing || !personalNumber}
            className="w-full px-6 py-5 bg-gradient-to-r from-green-600 to-lime-600 text-white rounded-xl text-lg font-bold hover:shadow-lg hover:shadow-green-400/50 transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {signing ? (
              <>
                <div className="w-6 h-6 mr-3 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Signerar med BankID...
              </>
            ) : (
              <>
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                Signera med BankID
              </>
            )}
          </button>

          {/* Info Box */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800">
                  <span className="font-bold">Säker identifiering:</span> Vi använder BankID för att säkerställa din identitet och skapa en digital fullmakt.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={goToHome} 
          disabled={signing}
          className="w-full text-sm text-gray-500 mt-6 hover:text-cyan-600 transition disabled:opacity-50"
        >
          ← Avbryt och gå tillbaka
        </button>
      </div>
    </div>
  );
};
