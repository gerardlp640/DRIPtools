import React from 'react';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
}

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  prefix = '',
  suffix = '',
}) => {
  const formatValue = (val: number) => {
    return `${prefix}${val.toLocaleString()}${suffix}`;
  };

  return (
    <div className="space-y-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
      />
      <div className="flex justify-between text-sm text-text-secondary">
        <span>{formatValue(min)}</span>
        <span>{formatValue(value)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
};

export default Slider;