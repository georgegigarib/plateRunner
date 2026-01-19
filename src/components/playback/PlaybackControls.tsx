import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Repeat, 
  SkipForward, 
  Repeat1, 
  Home,
  Infinity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlaybackControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  isInfinite: boolean;
  repeatCurrent: boolean;
  onPlayPause: () => void;
  onRestart: () => void;
  onToggleInfinite: () => void;
  onNext: () => void;
  onToggleRepeat: () => void;
  onExit: () => void;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  isPaused,
  isInfinite,
  repeatCurrent,
  onPlayPause,
  onRestart,
  onToggleInfinite,
  onNext,
  onToggleRepeat,
  onExit,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {/* Exit */}
      <Button
        variant="outline"
        size="icon"
        onClick={onExit}
        className="h-12 w-12 rounded-full border-border hover:border-primary hover:bg-primary/10"
        title="Exit to home"
      >
        <Home className="h-5 w-5" />
      </Button>

      {/* Restart */}
      <Button
        variant="outline"
        size="icon"
        onClick={onRestart}
        className="h-12 w-12 rounded-full border-border hover:border-primary hover:bg-primary/10"
        title="Restart"
      >
        <RotateCcw className="h-5 w-5" />
      </Button>

      {/* Play/Pause */}
      <Button
        size="icon"
        onClick={onPlayPause}
        className={cn(
          'h-16 w-16 rounded-full btn-traffic',
          isPaused 
            ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        )}
        title={isPaused ? 'Resume' : 'Pause'}
      >
        {isPaused ? (
          <Play className="h-7 w-7 ml-1" />
        ) : (
          <Pause className="h-7 w-7" />
        )}
      </Button>

      {/* Next */}
      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        className="h-12 w-12 rounded-full border-border hover:border-primary hover:bg-primary/10"
        title="Next plate"
      >
        <SkipForward className="h-5 w-5" />
      </Button>

      {/* Repeat Current */}
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleRepeat}
        className={cn(
          'h-12 w-12 rounded-full border-border',
          repeatCurrent 
            ? 'bg-primary/20 border-primary text-primary' 
            : 'hover:border-primary hover:bg-primary/10'
        )}
        title={repeatCurrent ? 'Stop repeating' : 'Repeat current plate'}
      >
        <Repeat1 className="h-5 w-5" />
      </Button>

      {/* Infinite toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleInfinite}
        className={cn(
          'h-12 w-12 rounded-full border-border',
          isInfinite 
            ? 'bg-accent/20 border-accent text-accent' 
            : 'hover:border-primary hover:bg-primary/10'
        )}
        title={isInfinite ? 'Infinite loop ON' : 'Infinite loop OFF'}
      >
        {isInfinite ? (
          <Infinity className="h-5 w-5" />
        ) : (
          <Repeat className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default PlaybackControls;
