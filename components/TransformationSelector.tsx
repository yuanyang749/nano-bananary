

import React, { useRef, useState } from 'react';
import type { Transformation } from '../types';
import { useI18n } from '../i18n';

interface TransformationSelectorProps {
  transformations: Transformation[];
  onSelect: (transformation: Transformation) => void;
  hasPreviousResult: boolean;
  onOrderChange: (newOrder: Transformation[]) => void;
}

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
    <div className="container mx-auto p-4 md:p-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-4 text-orange-500">{t('transformationSelector.title')}</h2>
      <p className="text-lg text-center text-gray-400 mb-8 max-w-2xl mx-auto">
        {hasPreviousResult 
          ? t('transformationSelector.subtitleWithResult')
          : t('transformationSelector.subtitle')
        }
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {transformations.map((trans, index) => (
          <button
            key={trans.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => onSelect(trans)}
            className={`group flex flex-col items-center justify-center text-center p-4 aspect-square bg-gray-950 rounded-xl border border-white/10 hover:border-orange-500 transition-all duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-orange-500 cursor-grab active:cursor-grabbing ${dragging ? 'border-dashed' : ''}`}
          >
            <span className="text-4xl mb-2 transition-transform duration-200 group-hover:scale-110">{trans.emoji}</span>
            <span className="font-semibold text-sm text-gray-200">{trans.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransformationSelector;
