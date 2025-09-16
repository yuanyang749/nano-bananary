import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n';

interface ApiKeySettingsProps {
  onApiKeyChange: (apiKey: string) => void;
  currentApiKey: string;
}

const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({ onApiKeyChange, currentApiKey }) => {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  useEffect(() => {
    setInputValue(currentApiKey);
  }, [currentApiKey]);

  const handleSave = async () => {
    if (!inputValue.trim()) {
      setValidationStatus('invalid');
      return;
    }

    setIsValidating(true);
    setValidationStatus('idle');

    try {
      // 保存 API Key（移除格式校验）
      onApiKeyChange(inputValue.trim());
      setValidationStatus('valid');
      setIsExpanded(false);

      // 3秒后清除验证状态
      setTimeout(() => setValidationStatus('idle'), 3000);
    } catch (error) {
      setValidationStatus('invalid');
    } finally {
      setIsValidating(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
    onApiKeyChange('');
    setValidationStatus('idle');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setValidationStatus('idle');
    }
  };

  const maskedApiKey = currentApiKey 
    ? `${currentApiKey.slice(0, 8)}${'*'.repeat(Math.max(0, currentApiKey.length - 12))}${currentApiKey.slice(-4)}`
    : '';

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="bg-gray-950/60 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl shadow-black/20">
        <button
          onClick={toggleExpanded}
          className="w-full p-3 md:p-4 flex items-center justify-between text-left hover:bg-gray-900/30 transition-colors duration-200 rounded-xl"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-orange-500/20 rounded-lg flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-200 text-sm md:text-base">{t('apiKey.title')}</h3>
              <p className="text-xs md:text-sm text-gray-400 truncate">
                {currentApiKey ? (
                  <>
                    <span className="text-green-400">✓</span> <span className="hidden sm:inline">{maskedApiKey}</span><span className="sm:hidden">已设置</span>
                  </>
                ) : (
                  t('apiKey.notSet')
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {validationStatus === 'valid' && (
              <span className="text-green-400 text-sm">{t('apiKey.saved')}</span>
            )}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </button>

        {isExpanded && (
          <div className="px-3 md:px-4 pb-3 md:pb-4 border-t border-white/10 animate-fade-in">
            <div className="mt-3 md:mt-4 space-y-3 md:space-y-4">
              <div>
                <label htmlFor="api-key-input" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('apiKey.inputLabel')}
                </label>
                <div className="relative">
                  <input
                    id="api-key-input"
                    type={showKey ? 'text' : 'password'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={t('apiKey.placeholder')}
                    className="w-full px-3 py-2 pr-10 bg-gray-900/50 border border-white/20 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                  >
                    {showKey ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-400 bg-gray-900/30 p-3 rounded-lg">
                <p className="mb-2">{t('apiKey.instructions')}</p>
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-400 underline"
                >
                  {t('apiKey.getKeyLink')}
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={handleSave}
                  disabled={isValidating || !inputValue.trim()}
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold rounded-lg hover:from-orange-600 hover:to-yellow-500 disabled:bg-gray-800 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  {isValidating ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('apiKey.validating')}
                    </>
                  ) : (
                    t('apiKey.save')
                  )}
                </button>
                <button
                  onClick={handleClear}
                  className="py-2 px-4 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm sm:flex-shrink-0"
                >
                  {t('apiKey.clear')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiKeySettings;
