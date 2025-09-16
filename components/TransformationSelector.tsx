

import React, { useRef, useState } from 'react';
import type { Transformation } from '../types';
import { useI18n } from '../i18n';

interface TransformationSelectorProps {
  transformations: Transformation[];
  onSelect: (transformation: Transformation) => void;
  hasPreviousResult: boolean;
  onOrderChange: (newOrder: Transformation[]) => void;
}

// 定义不同变换类型的主题色彩
const getTransformationTheme = (id: string) => {
  // Viral & Fun Transformations - 紫色/粉色系
  if (['custom', 'figurine', 'funko', 'lego', 'crochet', 'cosplay', 'plushie', 'keychain'].includes(id)) {
    return {
      gradient: 'from-purple-500/20 via-pink-500/20 to-purple-600/20',
      border: 'border-purple-500/30',
      hoverBorder: 'hover:border-purple-400',
      hoverGradient: 'hover:from-purple-500/30 hover:via-pink-500/30 hover:to-purple-600/30',
      shadow: 'shadow-purple-500/20',
      hoverShadow: 'hover:shadow-purple-500/40',
      glow: 'hover:shadow-lg hover:shadow-purple-500/25'
    };
  }

  // Photorealistic & Enhancement - 蓝色/青色系
  if (['hdEnhance', 'poseReference', 'photorealistic', 'fashionMagazine', 'hyperRealistic'].includes(id)) {
    return {
      gradient: 'from-blue-500/20 via-cyan-500/20 to-blue-600/20',
      border: 'border-blue-500/30',
      hoverBorder: 'hover:border-blue-400',
      hoverGradient: 'hover:from-blue-500/30 hover:via-cyan-500/30 hover:to-blue-600/30',
      shadow: 'shadow-blue-500/20',
      hoverShadow: 'hover:shadow-blue-500/40',
      glow: 'hover:shadow-lg hover:shadow-blue-500/25'
    };
  }

  // Design & Product - 绿色/翠绿系
  if (['architecture', 'productRender', 'sodaCan', 'industrialDesign'].includes(id)) {
    return {
      gradient: 'from-green-500/20 via-emerald-500/20 to-green-600/20',
      border: 'border-green-500/30',
      hoverBorder: 'hover:border-green-400',
      hoverGradient: 'hover:from-green-500/30 hover:via-emerald-500/30 hover:to-green-600/30',
      shadow: 'shadow-green-500/20',
      hoverShadow: 'hover:shadow-green-500/40',
      glow: 'hover:shadow-lg hover:shadow-green-500/25'
    };
  }

  // Artistic & Stylistic - 橙色/黄色系 (主题色)
  if (['colorPalette', 'lineArt', 'paintingProcess', 'markerSketch', 'addIllustration', 'cyberpunk', 'vanGogh'].includes(id)) {
    return {
      gradient: 'from-orange-500/20 via-yellow-500/20 to-orange-600/20',
      border: 'border-orange-500/30',
      hoverBorder: 'hover:border-orange-400',
      hoverGradient: 'hover:from-orange-500/30 hover:via-yellow-500/30 hover:to-orange-600/30',
      shadow: 'shadow-orange-500/20',
      hoverShadow: 'hover:shadow-orange-500/40',
      glow: 'hover:shadow-lg hover:shadow-orange-500/25'
    };
  }

  // Utility & Specific Edits - 红色/玫瑰色系
  if (['isolate', 'screenEffect', 'makeupAnalysis', 'changeBackground'].includes(id)) {
    return {
      gradient: 'from-red-500/20 via-rose-500/20 to-red-600/20',
      border: 'border-red-500/30',
      hoverBorder: 'hover:border-red-400',
      hoverGradient: 'hover:from-red-500/30 hover:via-rose-500/30 hover:to-red-600/30',
      shadow: 'shadow-red-500/20',
      hoverShadow: 'hover:shadow-red-500/40',
      glow: 'hover:shadow-lg hover:shadow-red-500/25'
    };
  }

  // 默认主题 - 橙色/黄色系
  return {
    gradient: 'from-orange-500/20 via-yellow-500/20 to-orange-600/20',
    border: 'border-orange-500/30',
    hoverBorder: 'hover:border-orange-400',
    hoverGradient: 'hover:from-orange-500/30 hover:via-yellow-500/30 hover:to-orange-600/30',
    shadow: 'shadow-orange-500/20',
    hoverShadow: 'hover:shadow-orange-500/40',
    glow: 'hover:shadow-lg hover:shadow-orange-500/25'
  };
};

const TransformationSelector: React.FC<TransformationSelectorProps> = ({ transformations, onSelect, hasPreviousResult, onOrderChange }) => {
  const { t } = useI18n();
  const dragItemIndex = useRef<number | null>(null);
  const dragOverItemIndex = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, index: number) => {
    dragItemIndex.current = index;
    setDragging(true);
    setTimeout(() => {
      e.currentTarget.classList.add('opacity-40', 'scale-95');
    }, 0);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLButtonElement>, index: number) => {
    dragOverItemIndex.current = index;
  };

  const handleDragEnd = (e: React.DragEvent<HTMLButtonElement>) => {
    setDragging(false);
    e.currentTarget.classList.remove('opacity-40', 'scale-95');

    if (dragItemIndex.current !== null && dragOverItemIndex.current !== null && dragItemIndex.current !== dragOverItemIndex.current) {
      const newTransformations = [...transformations];
      const draggedItemContent = newTransformations.splice(dragItemIndex.current, 1)[0];
      newTransformations.splice(dragOverItemIndex.current, 0, draggedItemContent);
      onOrderChange(newTransformations);
    }
    
    dragItemIndex.current = null;
    dragOverItemIndex.current = null;
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-4 text-orange-500">{t('transformationSelector.title')}</h2>
        <p className="text-lg text-center text-gray-400 mb-8 max-w-2xl mx-auto">
          {hasPreviousResult
            ? t('transformationSelector.subtitleWithResult')
            : t('transformationSelector.subtitle')
          }
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {transformations.map((trans, index) => {
          const theme = getTransformationTheme(trans.id);
          return (
            <button
              key={trans.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onClick={() => onSelect(trans)}
              className={`
                transformation-card ripple-effect
                group relative overflow-hidden
                flex flex-col items-center justify-center text-center
                p-4 aspect-square
                bg-gradient-to-br ${theme.gradient}
                backdrop-blur-sm
                rounded-2xl border-2 ${theme.border}
                ${theme.hoverBorder} ${theme.hoverGradient}
                shadow-xl ${theme.shadow} ${theme.glow}
                transition-all duration-300 ease-out
                transform hover:-translate-y-3 hover:scale-105 hover:rotate-1
                active:scale-95 active:translate-y-0 active:rotate-0
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-orange-500
                cursor-grab active:cursor-grabbing
                animate-card-slide-in
                ${dragging ? 'border-dashed opacity-60 animate-pulse' : ''}
                motion-safe:hover:animate-float
              `}
              style={{
                animationDelay: `${index * 80}ms`,
                animationFillMode: 'both'
              }}
            >
              {/* 背景光效层 */}
              <div className={`
                absolute inset-0
                bg-gradient-to-br ${theme.gradient}
                opacity-0 group-hover:opacity-100
                transition-all duration-500 ease-out
                rounded-2xl
                animate-pulse-glow
              `} />

              {/* 装饰性光点 */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 animate-ping" />

              {/* 主要内容 */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                {/* Emoji 容器 */}
                <div className="relative mb-3">
                  <span className={`
                    text-4xl block
                    transition-all duration-500 ease-out
                    group-hover:scale-125 group-hover:rotate-12
                    group-active:scale-110 group-active:rotate-6
                    filter drop-shadow-2xl
                    motion-safe:group-hover:animate-spin-pulse
                  `}>
                    {trans.emoji}
                  </span>

                  {/* Emoji 光环效果 */}
                  <div className={`
                    absolute inset-0
                    rounded-full
                    bg-gradient-to-r ${theme.gradient}
                    opacity-0 group-hover:opacity-30
                    scale-150 blur-xl
                    transition-all duration-500
                  `} />
                </div>

                {/* 标题文字 */}
                <span className={`
                  font-semibold text-sm text-gray-200
                  transition-all duration-300 ease-out
                  group-hover:text-white group-hover:font-bold group-hover:scale-105
                  leading-tight text-center
                  max-w-full px-1
                  relative
                  before:absolute before:inset-0 before:bg-gradient-to-r before:${theme.gradient} before:opacity-0 before:group-hover:opacity-20 before:rounded before:blur-sm before:transition-opacity before:duration-300
                `}>
                  {trans.title}
                </span>
              </div>

              {/* 交互反馈层 */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-active:opacity-100 bg-white/10 transition-opacity duration-150" />

              {/* 边框光效 */}
              <div className={`
                absolute inset-0 rounded-2xl
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
                shadow-lg ${theme.hoverShadow}
                animate-pulse-glow
              `} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TransformationSelector;
