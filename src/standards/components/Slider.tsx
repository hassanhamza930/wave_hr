import React, { useState, useEffect } from 'react';

interface Props {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  debounceTime?: number;
}

const Slider: React.FC<Props> = ({
  min,
  max,
  step,
  value,
  onChange,
  debounceTime = 100,
}) => {
  const [sliderValue, setSliderValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(sliderValue);
    }, debounceTime);

    return () => {
      clearTimeout(timeoutId);
    };
    
  }, [sliderValue, debounceTime, onChange]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setSliderValue(newValue);

  };

  return (

      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={handleSliderChange}
        className='w-full h-2 bg-blue/20 rounded-full appearance-none outline-none'
      />

  );
};

export default Slider;
