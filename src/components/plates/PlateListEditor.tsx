import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plate } from '@/types';
import { PlateItem } from './PlateItem';

interface PlateListEditorProps {
  plates: Plate[];
  onPlatesChange: (plates: Plate[]) => void;
}

export const PlateListEditor: React.FC<PlateListEditorProps> = ({
  plates,
  onPlatesChange,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = plates.findIndex((p) => p.id === active.id);
      const newIndex = plates.findIndex((p) => p.id === over.id);
      onPlatesChange(arrayMove(plates, oldIndex, newIndex));
    }
  };

  const handleUpdate = (id: string, value: string) => {
    onPlatesChange(
      plates.map((p) => (p.id === id ? { ...p, value } : p))
    );
  };

  const handleDelete = (id: string) => {
    onPlatesChange(plates.filter((p) => p.id !== id));
  };

  if (plates.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="font-display text-lg mb-2">No plates yet</p>
        <p className="text-sm">Add plates using the input above</p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={plates.map((p) => p.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {plates.map((plate, index) => (
            <PlateItem
              key={plate.id}
              plate={plate}
              index={index}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default PlateListEditor;
