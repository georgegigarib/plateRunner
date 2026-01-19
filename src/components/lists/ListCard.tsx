import React from 'react';
import { PlateList } from '@/types';
import { LIST_COLORS, formatTime } from '@/lib/plateUtils';
import { Card } from '@/components/ui/card';
import { Clock, Car } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ListCardProps {
  list: PlateList;
  onClick: () => void;
}

export const ListCard: React.FC<ListCardProps> = ({ list, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className="p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:border-primary/50 bg-card border-border"
    >
      <div className="flex items-start gap-3">
        <div className={cn('list-color ring-border', LIST_COLORS[list.color])} />
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-foreground truncate">
            {list.name}
          </h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Car className="h-3.5 w-3.5" />
              <span>{list.plates.length} plates</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatTime(list.intervalSeconds)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {list.plates.length > 0 && (
        <div className="mt-3 flex gap-1 flex-wrap">
          {list.plates.slice(0, 4).map((plate, i) => (
            <span
              key={plate.id}
              className="text-xs bg-secondary px-2 py-0.5 rounded font-display tracking-wide"
            >
              {plate.value || '•••'}
            </span>
          ))}
          {list.plates.length > 4 && (
            <span className="text-xs text-muted-foreground px-2 py-0.5">
              +{list.plates.length - 4} more
            </span>
          )}
        </div>
      )}
    </Card>
  );
};

export default ListCard;
