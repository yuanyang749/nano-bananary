import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useI18n } from '../i18n';

interface PriceRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultMinValue?: number;
  defaultMaxValue?: number;
  currency?: string;
  onRangeChange?: (min: number, max: number) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min = 0,
  max = 1000,
  step = 1,
  defaultMinValue = 16,
  defaultMaxValue = 469,
  currency = 'NZD',
  onRangeChange
}) => {
  const { t } = useI18n();
  const [minValue, setMinValue] = useState(defaultMinValue);
  const [maxValue, setMaxValue] = useState(defaultMaxValue);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  // 拖拽时的临时值，用于平滑移动
  const [dragMinValue, setDragMinValue] = useState(defaultMinValue);
  const [dragMaxValue, setDragMaxValue] = useState(defaultMaxValue);

  const sliderRef = useRef<HTMLDivElement>(null);
  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);

  // 使用useRef存储最新状态值，避免闭包陷阱
  const minValueRef = useRef(minValue);
  const maxValueRef = useRef(maxValue);
  const dragMinValueRef = useRef(dragMinValue);
  const dragMaxValueRef = useRef(dragMaxValue);
  const onRangeChangeRef = useRef(onRangeChange);

  // 更新ref值
  useEffect(() => {
    minValueRef.current = minValue;
    maxValueRef.current = maxValue;
    dragMinValueRef.current = dragMinValue;
    dragMaxValueRef.current = dragMaxValue;
    onRangeChangeRef.current = onRangeChange;
  }, [minValue, maxValue, dragMinValue, dragMaxValue, onRangeChange]);

  // 优化后的状态更新函数
  const handleMinChange = useCallback((value: number) => {
    const newMinValue = Math.min(value, maxValueRef.current - step);
    setMinValue(newMinValue);
    onRangeChangeRef.current?.(newMinValue, maxValueRef.current);
  }, [step]);

  const handleMaxChange = useCallback((value: number) => {
    const newMaxValue = Math.max(value, minValueRef.current + step);
    setMaxValue(newMaxValue);
    onRangeChangeRef.current?.(minValueRef.current, newMaxValue);
  }, [step]);

  // 计算滑块位置百分比
  const getPercentage = useCallback((value: number) => {
    return ((value - min) / (max - min)) * 100;
  }, [min, max]);

  // 优化后的位置计算函数 - 支持动态精度
  const getValueFromPosition = useCallback((clientX: number, dragStep: number = step) => {
    if (!sliderRef.current) return min;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = percentage * (max - min) + min;
    // 拖拽时使用小step，释放时使用原始step
    return Math.round(rawValue / dragStep) * dragStep;
  }, [min, max, step]);

  // 鼠标事件处理
  const handleMouseDown = useCallback((type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    // 开始拖拽时，同步拖拽值
    setDragMinValue(minValue);
    setDragMaxValue(maxValue);
    setIsDragging(type);
  }, [minValue, maxValue]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    // 拖拽时使用小step实现平滑移动
    const dragStep = 0.1;
    const value = getValueFromPosition(e.clientX, dragStep);

    if (isDragging === 'min') {
      const newMinValue = Math.min(value, dragMaxValueRef.current - dragStep);
      setDragMinValue(newMinValue);
      onRangeChangeRef.current?.(Math.round(newMinValue), Math.round(dragMaxValueRef.current));
    } else {
      const newMaxValue = Math.max(value, dragMinValueRef.current + dragStep);
      setDragMaxValue(newMaxValue);
      onRangeChangeRef.current?.(Math.round(dragMinValueRef.current), Math.round(newMaxValue));
    }
  }, [isDragging, getValueFromPosition]);

  const handleMouseUp = useCallback(() => {
    // 拖拽结束时，将拖拽值舍入并同步到最终值
    if (isDragging) {
      const finalMinValue = Math.round(dragMinValue);
      const finalMaxValue = Math.round(dragMaxValue);
      setMinValue(finalMinValue);
      setMaxValue(finalMaxValue);
      setDragMinValue(finalMinValue);
      setDragMaxValue(finalMaxValue);
      onRangeChangeRef.current?.(finalMinValue, finalMaxValue);
    }
    setIsDragging(null);
  }, [isDragging, dragMinValue, dragMaxValue]);

  // 添加全局鼠标事件监听 - 优化性能
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // 触摸事件处理
  const handleTouchStart = useCallback((type: 'min' | 'max') => (e: React.TouchEvent) => {
    e.preventDefault();
    // 开始触摸拖拽时，同步拖拽值
    setDragMinValue(minValue);
    setDragMaxValue(maxValue);
    setIsDragging(type);
  }, [minValue, maxValue]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;

    // 触摸拖拽时也使用小step实现平滑移动
    const dragStep = 0.1;
    const value = getValueFromPosition(e.touches[0].clientX, dragStep);

    if (isDragging === 'min') {
      const newMinValue = Math.min(value, dragMaxValueRef.current - dragStep);
      setDragMinValue(newMinValue);
      onRangeChangeRef.current?.(Math.round(newMinValue), Math.round(dragMaxValueRef.current));
    } else {
      const newMaxValue = Math.max(value, dragMinValueRef.current + dragStep);
      setDragMaxValue(newMaxValue);
      onRangeChangeRef.current?.(Math.round(dragMinValueRef.current), Math.round(newMaxValue));
    }
  }, [isDragging, getValueFromPosition]);

  const handleTouchEnd = useCallback(() => {
    // 触摸结束时，将拖拽值舍入并同步到最终值
    if (isDragging) {
      const finalMinValue = Math.round(dragMinValue);
      const finalMaxValue = Math.round(dragMaxValue);
      setMinValue(finalMinValue);
      setMaxValue(finalMaxValue);
      setDragMinValue(finalMinValue);
      setDragMaxValue(finalMaxValue);
      onRangeChangeRef.current?.(finalMinValue, finalMaxValue);
    }
    setIsDragging(null);
  }, [isDragging, dragMinValue, dragMaxValue]);

  // 添加全局触摸事件监听
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleTouchMove, handleTouchEnd]);

  // 显示时使用拖拽值（如果正在拖拽）或最终值
  const displayMinValue = isDragging ? dragMinValue : minValue;
  const displayMaxValue = isDragging ? dragMaxValue : maxValue;

  const minPercentage = getPercentage(displayMinValue);
  const maxPercentage = getPercentage(displayMaxValue);

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* 标题和平均价格 */}
      <div className="text-center mb-8">
        <p className="text-gray-400 text-sm mb-2">
          {t('slider.averagePrice')} ${Math.round((displayMinValue + displayMaxValue) / 2)} {currency}
        </p>
      </div>

      {/* 价格分布图表（装饰性） */}
      <div className="mb-8 flex items-end justify-center h-20 gap-1">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="bg-teal-500 opacity-60 transition-all duration-300"
            style={{
              width: '8px',
              height: `${Math.random() * 60 + 20}px`,
              opacity: i >= 6 && i <= 13 ? 0.8 : 0.3
            }}
          />
        ))}
      </div>

      {/* 滑块容器 */}
      <div className="relative mb-8">
        {/* 滑块轨道 */}
        <div
          ref={sliderRef}
          className="relative h-2 bg-gray-700 rounded-full cursor-pointer"
        >
          {/* 选中区间 */}
          <div
            className="absolute h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-200"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`
            }}
          />
          
          {/* 最小值滑块 */}
          <div
            ref={minThumbRef}
            className={`absolute w-6 h-6 bg-white border-2 border-teal-500 rounded-full cursor-pointer transform -translate-y-2 -translate-x-3 hover:scale-110 ${
              isDragging === 'min'
                ? 'scale-125 shadow-lg shadow-teal-500/50'
                : 'transition-all duration-200'
            }`}
            style={{ left: `${minPercentage}%` }}
            onMouseDown={handleMouseDown('min')}
            onTouchStart={handleTouchStart('min')}
          />

          {/* 最大值滑块 */}
          <div
            ref={maxThumbRef}
            className={`absolute w-6 h-6 bg-white border-2 border-teal-500 rounded-full cursor-pointer transform -translate-y-2 -translate-x-3 hover:scale-110 ${
              isDragging === 'max'
                ? 'scale-125 shadow-lg shadow-teal-500/50'
                : 'transition-all duration-200'
            }`}
            style={{ left: `${maxPercentage}%` }}
            onMouseDown={handleMouseDown('max')}
            onTouchStart={handleTouchStart('max')}
          />
        </div>
      </div>

      {/* 价格输入框 */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">$</span>
          <input
            type="number"
            value={Math.round(displayMinValue)}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              handleMinChange(newValue);
              setDragMinValue(newValue);
            }}
            className="w-20 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-teal-500 transition-colors"
            min={min}
            max={Math.round(displayMaxValue) - step}
            step={step}
          />
        </div>
        
        <span className="text-gray-500">-</span>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-400">$</span>
          <input
            type="number"
            value={Math.round(displayMaxValue)}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              handleMaxChange(newValue);
              setDragMaxValue(newValue);
            }}
            className="w-20 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:border-teal-500 transition-colors"
            min={Math.round(displayMinValue) + step}
            max={max}
            step={step}
          />
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => {
            setMinValue(defaultMinValue);
            setMaxValue(defaultMaxValue);
            onRangeChange?.(defaultMinValue, defaultMaxValue);
          }}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          {t('slider.clear')}
        </button>
        
        <button className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-md transition-colors duration-200">
          {t('slider.apply')}
        </button>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
