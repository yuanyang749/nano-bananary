import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import PriceRangeSlider from '../components/PriceRangeSlider';

const SliderDemo: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans">
      <header className="bg-black/60 backdrop-blur-lg sticky top-0 z-20 border-b border-white/10">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">
              {t('slider.title')}
            </h1>
            <Link
              to="/"
              className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              {t('slider.backToHome')}
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              {t('slider.demoTitle')}
            </h2>
            <p className="text-gray-400 text-lg">
              {t('slider.description')}
            </p>
          </div>

          <div className="bg-gray-950/60 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl shadow-black/20 p-8">
            <PriceRangeSlider />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              {t('slider.note')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SliderDemo;
