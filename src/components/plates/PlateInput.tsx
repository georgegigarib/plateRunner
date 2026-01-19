import React, { useState, KeyboardEvent, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Shuffle } from 'lucide-react';
import { generateRandomPlate, isValidPlate } from '@/lib/plateUtils';

interface PlateInputProps {
  onAddPlate: (value: string) => void;
}

export const PlateInput: React.FC<PlateInputProps> = ({ onAddPlate }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (isValidPlate(value)) {
      onAddPlate(value.toUpperCase());
      setValue('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRandomize = () => {
    setValue(generateRandomPlate());
  };

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value.toUpperCase().slice(0, 11))}
          onKeyDown={handleKeyDown}
          placeholder="Enter plate (e.g., ABC1234)"
          className="pr-10 font-display tracking-wider uppercase bg-secondary border-border"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-primary"
          onClick={handleRandomize}
          title="Generate random plate"
        >
          <Shuffle className="h-4 w-4" />
        </Button>
      </div>
      <Button onClick={handleAdd} className="bg-primary text-primary-foreground hover:bg-primary/90 btn-traffic">
        <Plus className="h-4 w-4 mr-1" />
        Add
      </Button>
    </div>
  );
};

export default PlateInput;
