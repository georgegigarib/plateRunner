import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';
import { parseBulkPlates } from '@/lib/plateUtils';
import { Plate } from '@/types';

interface PlateTextareaProps {
  onAddPlates: (plates: Plate[]) => void;
}

export const PlateTextarea: React.FC<PlateTextareaProps> = ({ onAddPlates }) => {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (value.trim()) {
      const plates = parseBulkPlates(value);
      if (plates.length > 0) {
        onAddPlates(plates);
        setValue('');
      }
    }
  };

  const plateCount = value.trim() ? parseBulkPlates(value).length : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <FileText className="h-4 w-4" />
        <span>Bulk import (comma, space, or newline separated)</span>
      </div>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value.toUpperCase())}
        placeholder="ABC123, XYZ789, DEF456&#10;Or paste multiple lines..."
        className="font-display tracking-wider uppercase bg-secondary border-border min-h-[100px] resize-none"
      />
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {plateCount > 0 && `${plateCount} plate${plateCount !== 1 ? 's' : ''} detected`}
        </span>
        <Button
          onClick={handleAdd}
          disabled={plateCount === 0}
          className="bg-primary text-primary-foreground hover:bg-primary/90 btn-traffic"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add {plateCount > 0 ? `${plateCount} Plates` : 'Plates'}
        </Button>
      </div>
    </div>
  );
};

export default PlateTextarea;
