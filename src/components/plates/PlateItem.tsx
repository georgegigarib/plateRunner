import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plate } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2 } from 'lucide-react';

interface PlateItemProps {
  plate: Plate;
  index: number;
  onUpdate: (id: string, value: string) => void;
  onDelete: (id: string) => void;
}

export const PlateItem: React.FC<PlateItemProps> = ({
  plate,
  index,
  onUpdate,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: plate.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 p-2 rounded-lg bg-secondary/50 border border-border ${
        isDragging ? 'opacity-50 z-50' : ''
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground touch-none"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      
      <span className="w-8 text-sm text-muted-foreground font-display">
        #{index + 1}
      </span>
      
      <Input
        value={plate.value}
        onChange={(e) => onUpdate(plate.id, e.target.value.toUpperCase().slice(0, 11))}
        className="flex-1 font-display tracking-wider uppercase bg-background border-border"
        placeholder="Empty plate"
      />
      
      <div className="license-plate text-xs py-1 px-2 min-w-[60px]">
        {plate.value || '•••'}
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(plate.id)}
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PlateItem;
