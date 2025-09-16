import React from 'react';
import { useI18n, availableLanguages, Language } from '../i18n';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="flex items-center gap-1 p-1 bg-gray-800/50 rounded-md">
      {availableLanguages.map((lang: Language) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-3 py-1 text-xs font-semibold rounded ${
            language === lang
              ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-black'
              : 'text-gray-300 hover:bg-gray-700/50'
          } transition-colors duration-200`}
        >
          {t(`lang.${lang}`)}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
