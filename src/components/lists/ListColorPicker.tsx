import React from 'react';
import { ListColor } from '@/types';
import { LIST_COLORS } from '@/lib/plateUtils';
import { cn } from '@/lib/utils';

interface ListColorPickerProps {
  value: ListColor;
  onChange: (color: ListColor) => void;
}

const COLOR_OPTIONS: ListColor[] = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'white'];

export const ListColorPicker: React.FC<ListColorPickerProps> = ({ value, onChange }) => {
  return (
    <div className="flex gap-2">
      {COLOR_OPTIONS.map((color) => (
        <button
          key={color}
          onClick={() => onChange(color)}
          className={cn('list-color transition-transform hover:scale-110', LIST_COLORS[color], value === color ? 'ring-primary scale-110' : 'ring-transparent')}
          title={color.charAt(0).toUpperCase() + color.slice(1)}
        />
      ))}
    </div>
  );
};

export default ListColorPicker;
