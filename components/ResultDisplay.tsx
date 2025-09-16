

import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { GeneratedContent } from '../types';
import { useI18n } from '../i18n';

interface ResultDisplayProps {
  content: GeneratedContent;
  onUseImageAsInput: (imageUrl: string) => void;
  onImageClick: (imageUrl: string) => void;
  originalImageUrl: string | null;
}

type ViewMode = 'result' | 'side-by-side' | 'slider';
type TwoStepViewMode = 'result' | 'grid' | 'slider';
type ImageSelection = 'Original' | 'Line Art' | 'Final Result';

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, onUseImageAsInput, onImageClick, originalImageUrl }) => {
  const { t } = useI18n();
  
  const [viewMode, setViewMode] = useState<ViewMode>('result');
  const [twoStepViewMode, setTwoStepViewMode] = useState<TwoStepViewMode>('result');
  
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  
  const [sliderLeft, setSliderLeft] = useState<ImageSelection>('Original');
  const [sliderRight, setSliderRight] = useState<ImageSelection>('Final Result');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sliderContainerRef.current) return;
      const rect = sliderContainerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      setSliderPosition(percent);
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = () => setIsDragging(true);

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    if (!content.imageUrl) return;
    const fileExtension = content.imageUrl.split(';')[0].split('/')[1] || 'png';
    downloadImage(content.imageUrl, `generated-image-${Date.now()}.${fileExtension}`);
  };

  const handleDownloadBoth = () => {
    if (content.secondaryImageUrl) {
        downloadImage(content.secondaryImageUrl, `line-art-${Date.now()}.png`);
    }
    if (content.imageUrl) {
        downloadImage(content.imageUrl, `final-result-${Date.now()}.png`);
    }
  };
  
  const handleDownloadComparison = useCallback(async () => {
    const imagesToLoad: {url: string | null, img: HTMLImageElement}[] = [
        { url: originalImageUrl, img: new Image() },
    ];
    if (content.secondaryImageUrl && content.imageUrl) {
        imagesToLoad.push({ url: content.secondaryImageUrl, img: new Image() });
        imagesToLoad.push({ url: content.imageUrl, img: new Image() });
    } else if (content.imageUrl) {
        imagesToLoad.push({ url: content.imageUrl, img: new Image() });
    }

    const validImages = imagesToLoad.filter(item => item.url);
    if (validImages.length < 2) return;

    const loadPromises = validImages.map(item => {
        item.img.crossOrigin = 'anonymous';
        item.img.src = item.url!;
        return new Promise(resolve => item.img.onload = resolve);
    });

    await Promise.all(loadPromises);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const totalWidth = validImages.reduce((sum, item) => sum + item.img.width, 0);
    const maxHeight = Math.max(...validImages.map(item => item.img.height));

    canvas.width = totalWidth;
    canvas.height = maxHeight;
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let currentX = 0;
    for (const item of validImages) {
        ctx.drawImage(item.img, currentX, (maxHeight - item.img.height) / 2);
        currentX += item.img.width;
    }

    downloadImage(canvas.toDataURL('image/png'), `comparison-image-${Date.now()}.png`);

  }, [originalImageUrl, content.imageUrl, content.secondaryImageUrl]);


  if (content.secondaryImageUrl && content.imageUrl && originalImageUrl) {
    const twoStepImageLabels: Record<ImageSelection, string> = {
        'Original': t('result.twoStep.original'),
        'Line Art': t('result.twoStep.lineArt'),
        'Final Result': t('result.twoStep.final'),
    };
    const imageMap: Record<ImageSelection, string> = {
        'Original': originalImageUrl,
        'Line Art': content.secondaryImageUrl,
        'Final Result': content.imageUrl,
    };
    const imageOptions: ImageSelection[] = ['Original', 'Line Art', 'Final Result'];

    const leftImageSrc = imageMap[sliderLeft];
    const rightImageSrc = imageMap[sliderRight];
    
    return (
       <div className="w-full h-full flex flex-col items-center gap-4 animate-fade-in">
        <div className="w-full flex justify-center">
            <div className="p-1 bg-gray-900 rounded-lg flex items-center gap-1">
                {(['result', 'grid', 'slider'] as TwoStepViewMode[]).map(mode => (
                <button
                    key={mode}
                    onClick={() => setTwoStepViewMode(mode)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors duration-200 ${
                    twoStepViewMode === mode
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-black'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                >
                    {t(`result.viewModes.${mode}`)}
                </button>
                ))}
            </div>
        </div>
        
        {twoStepViewMode === 'result' && (
            <div className="w-full h-full flex flex-col items-center gap-4 flex-grow">
                <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-2 flex-grow">
                {[
                    { src: content.secondaryImageUrl, label: t('result.twoStep.lineArt') },
                    { src: content.imageUrl, label: t('result.twoStep.final') },
                ].map(({ src, label }) => (
                    <div key={label} className="relative rounded-lg overflow-hidden border border-white/10 bg-black flex items-center justify-center flex-col p-1 aspect-square md:aspect-auto">
                    <img src={src!} alt={label} className="max-w-full max-h-full object-contain cursor-pointer" onClick={() => onImageClick(src!)} />
                    <div className="absolute bottom-1 right-1 text-xs bg-black/50 text-white px-2 py-1 rounded">{label}</div>
                    </div>
                ))}
                </div>
                <div className="w-full flex flex-col md:flex-row gap-3 mt-auto">
                    <button onClick={handleDownloadBoth} className="flex-1 py-2 px-4 bg-gray-800 text-gray-200 font-semibold rounded-lg shadow-sm hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        {t('result.twoStep.downloadBoth')}
                    </button>
                    <button onClick={() => onUseImageAsInput(content.secondaryImageUrl!)} className="flex-1 py-2 px-4 bg-gray-800 text-gray-200 font-semibold rounded-lg shadow-sm hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2-2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                        {t('result.twoStep.useLineArt')}
                    </button>
                    <button onClick={() => onUseImageAsInput(content.imageUrl!)} className="flex-1 py-2 px-4 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold rounded-lg shadow-md shadow-orange-500/20 hover:from-orange-600 hover:to-yellow-500 transition-all duration-200 flex items-center justify-center gap-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2-2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                        {t('result.twoStep.useFinal')}
                    </button>
                </div>
            </div>
        )}

        {twoStepViewMode === 'grid' && (
             <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-2 flex-grow">
                {[
                    {src: originalImageUrl, label: t('result.twoStep.original')},
                    {src: content.secondaryImageUrl, label: t('result.twoStep.lineArt')},
                    {src: content.imageUrl, label: t('result.twoStep.final')},
                ].map(({src, label}) => (
                    <div key={label} className="relative rounded-lg overflow-hidden border border-white/10 bg-black flex items-center justify-center flex-col p-1 aspect-square md:aspect-auto">
                        <img src={src} alt={label} className="max-w-full max-h-full object-contain"/>
                        <div className="absolute bottom-1 right-1 text-xs bg-black/50 text-white px-2 py-1 rounded">{label}</div>
                    </div>
                ))}
            </div>
        )}

        {twoStepViewMode === 'slider' && (
            <div className="w-full flex-grow flex flex-col gap-4">
                 <div className="flex items-center justify-center gap-4 text-sm">
                    <select value={sliderLeft} onChange={e => setSliderLeft(e.target.value as ImageSelection)} className="bg-gray-800 border-gray-700 border text-white rounded p-1">
                        {imageOptions.filter(o => o !== sliderRight).map(o => <option key={o} value={o}>{twoStepImageLabels[o]}</option>)}
                    </select>
                    <span>vs</span>
                     <select value={sliderRight} onChange={e => setSliderRight(e.target.value as ImageSelection)} className="bg-gray-800 border-gray-700 border text-white rounded p-1">
                        {imageOptions.filter(o => o !== sliderLeft).map(o => <option key={o} value={o}>{twoStepImageLabels[o]}</option>)}
                    </select>
                </div>
                <div ref={sliderContainerRef} onMouseDown={handleMouseDown} className="relative w-full h-full overflow-hidden rounded-lg cursor-ew-resize border border-white/10 select-none bg-black">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img src={leftImageSrc} alt={sliderLeft} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                        <img src={rightImageSrc} alt={sliderRight} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="absolute top-0 bottom-0 bg-orange-500 w-1 cursor-ew-resize" style={{ left: `calc(${sliderPosition}% - 2px)` }}>
                        <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 bg-orange-500 h-8 w-8 rounded-full border-2 border-black flex items-center justify-center text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                        </div>
                    </div>
                </div>
            </div>
        )}
         
         {twoStepViewMode !== 'result' && (
            <div className="w-full flex flex-col md:flex-row gap-3 mt-auto">
                <button
                onClick={handleDownloadComparison}
                className="flex-1 py-2 px-4 bg-gray-800 text-gray-200 font-semibold rounded-lg shadow-sm hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM15 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z" /></svg>
                <span>{t('result.downloadComparison')}</span>
                </button>
                <button
                onClick={() => onUseImageAsInput(content.imageUrl!)}
                className="flex-1 py-2 px-4 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold rounded-lg shadow-md shadow-orange-500/20 hover:from-orange-600 hover:to-yellow-500 transition-all duration-200 flex items-center justify-center gap-2"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2-2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
                <span>{t('result.twoStep.useFinal')}</span>
                </button>
            </div>
         )}
       </div>
    );
  }

  const ViewSwitcher = () => (
    <div className="w-full flex justify-center">
        <div className="p-1 bg-gray-900 rounded-lg flex items-center gap-1">
            {(['result', 'side-by-side', 'slider'] as ViewMode[]).map(mode => (
            <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors duration-200 ${
                viewMode === mode
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-black'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
            >
                {t(`result.viewModes.${mode.replace('-', '')}`)}
            </button>
            ))}
        </div>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center gap-4 animate-fade-in">
      {content.imageUrl && originalImageUrl && <ViewSwitcher />}
      
      <div className="w-full flex-grow relative">
        {viewMode === 'result' && content.imageUrl && (
          <div 
            className="w-full h-full relative bg-black rounded-lg overflow-hidden shadow-inner cursor-pointer group border border-white/10 flex items-center justify-center"
            onClick={() => onImageClick(content.imageUrl!)}
          >
            <img src={content.imageUrl} alt={t('result.generatedAlt')} className="max-w-full max-h-full object-contain" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
               </svg>
            </div>
          </div>
        )}

        {viewMode === 'side-by-side' && content.imageUrl && originalImageUrl && (
          <div className="w-full h-full grid grid-cols-2 gap-2">
            <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                <img src={originalImageUrl} alt={t('result.originalAlt')} className="max-w-full max-h-full object-contain"/>
                <div className="absolute bottom-1 right-1 text-xs bg-black/50 text-white px-2 py-1 rounded">{t('result.originalLabel')}</div>
            </div>
            <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                <img src={content.imageUrl} alt={t('result.generatedAlt')} className="max-w-full max-h-full object-contain"/>
                <div className="absolute bottom-1 right-1 text-xs bg-black/50 text-white px-2 py-1 rounded">{t('result.generatedLabel')}</div>
            </div>
          </div>
        )}

        {viewMode === 'slider' && content.imageUrl && originalImageUrl && (
          <div ref={sliderContainerRef} onMouseDown={handleMouseDown} className="relative w-full h-full overflow-hidden rounded-lg cursor-ew-resize border border-white/10 select-none bg-black">
            <div className="absolute inset-0 flex items-center justify-center">
                <img src={originalImageUrl} alt={t('result.originalAlt')} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
              <img src={content.imageUrl} alt={t('result.generatedAlt')} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="absolute top-0 bottom-0 bg-orange-500 w-1 cursor-ew-resize" style={{ left: `calc(${sliderPosition}% - 2px)` }}>
                <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 bg-orange-500 h-8 w-8 rounded-full border-2 border-black flex items-center justify-center text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col md:flex-row gap-3 mt-2">
        {content.imageUrl && (
          <>
            {viewMode === 'side-by-side' && (
                <button
                    onClick={handleDownloadComparison}
                    className="flex-1 py-2 px-4 bg-gray-800 text-gray-200 font-semibold rounded-lg shadow-sm hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM15 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z" /></svg>
                <span>{t('result.downloadComparison')}</span>
              </button>
            )}
            <button
              onClick={handleDownload}
              className="flex-1 py-2 px-4 bg-gray-800 text-gray-200 font-semibold rounded-lg shadow-sm hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>{t('result.downloadImage')}</span>
            </button>
            <button
              onClick={() => onUseImageAsInput(content.imageUrl!)}
              className="flex-1 py-2 px-4 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold rounded-lg shadow-md shadow-orange-500/20 hover:from-orange-600 hover:to-yellow-500 transition-all duration-200 flex items-center justify-center gap-2"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2-2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
              <span>{t('result.useAsInput')}</span>
            </button>
          </>
        )}
      </div>

      {content.text && (
        <p className="w-full text-center text-gray-400 bg-gray-900/50 p-3 rounded-md italic mt-4">
          "{content.text}"
        </p>
      )}
    </div>
  );
};

const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);


export default ResultDisplay;
