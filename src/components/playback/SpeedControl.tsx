import React from 'react';
import { cn } from '@/lib/utils';
import { Clock, Zap } from 'lucide-react';

interface SpeedControlProps {
  value: number;
  onChange: (value: number) => void;
  animationSpeed?: number;
  onAnimationSpeedChange?: (value: number) => void;
  showAnimationSpeed?: boolean;
  className?: string;
}

export const SpeedControl: React.FC<SpeedControlProps> = ({ value, onChange, animationSpeed = 1.5, onAnimationSpeedChange, showAnimationSpeed = true, className }) => {
  const [unit, setUnit] = React.useState<'sec' | 'min'>('sec');

  // Local state for display value to avoid jumping during typing
  const [localValue, setLocalValue] = React.useState<string>('');

  // Sync local value when unit or value changes from parent
  React.useEffect(() => {
    if (unit === 'sec') {
      setLocalValue(value.toString());
    } else {
      setLocalValue((value / 60).toFixed(1).replace(/\.0$/, ''));
    }
  }, [value, unit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setLocalValue(newVal);

    const parsed = parseFloat(newVal);
    if (!isNaN(parsed) && parsed > 0) {
      if (unit === 'sec') {
        onChange(parsed);
      } else {
        onChange(parsed * 60);
      }
    }
  };

  return (
    <div className={cn('flex flex-col gap-2 p-2 glass-card rounded-lg', className)}>
      {/* Interval Control */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground uppercase font-medium">Next Car In</span>
        </div>

        <div className="flex items-center gap-1 bg-secondary/30 rounded p-0.5 border border-border/50">
          <input
            type="number"
            value={localValue}
            onChange={handleInputChange}
            step={unit === 'min' ? 0.1 : 1}
            min={0.1}
            className="w-16 bg-transparent text-right font-display font-bold text-base outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-1"
          />
          <div className="flex bg-background/50 rounded-sm">
            <button
              onClick={() => setUnit('sec')}
              className={cn(
                'px-2.5 py-0.5 text-[16px] font-bold transition-colors rounded-sm',
                unit === 'sec' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              s
            </button>
            <button
              onClick={() => setUnit('min')}
              className={cn(
                'px-2.5 py-0.5 text-[16px] font-bold transition-colors rounded-sm',
                unit === 'min' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              m
            </button>
          </div>
        </div>
      </div>

      {/* Speed Control */}
      <div className="h-px bg-border/50 w-full" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground uppercase font-medium">Car Speed</span>
        </div>

        <div className="flex bg-secondary/50 rounded-md p-1.5">
          {[
            { label: 'Slow', speed: 20.0 },
            { label: 'Normal', speed: 15.0 },
            { label: 'Fast', speed: 10.0 },
          ].map((option) => (
            <button
              key={option.label}
              onClick={() => {
                if (onAnimationSpeedChange) onAnimationSpeedChange(option.speed);
              }}
              className={cn(
                'px-2 py-1 text-[10px] font-medium rounded-sm transition-all',
                animationSpeed === option.speed ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-background/50',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeedControl;
