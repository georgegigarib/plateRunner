// Plate types
export interface Plate {
  id: string;
  value: string;
}

// List types
export interface PlateList {
  id: string;
  name: string;
  color: ListColor;
  plates: Plate[];
  intervalSeconds: number;
  createdAt: number;
  updatedAt: number;
}

// Available list colors
export type ListColor = 
  | 'red' 
  | 'blue' 
  | 'green' 
  | 'yellow' 
  | 'orange' 
  | 'purple' 
  | 'white';

// Car colors for animation
export type CarColor = 
  | 'red' 
  | 'blue' 
  | 'green' 
  | 'yellow' 
  | 'orange' 
  | 'purple' 
  | 'white' 
  | 'black';

// Playback state
export interface PlaybackState {
  isPlaying: boolean;
  isPaused: boolean;
  currentIndex: number;
  isInfinite: boolean;
  repeatCurrent: boolean;
  intervalSeconds: number;
  elapsedTime: number;
}

// Dialog types
export interface EndDialogState {
  isOpen: boolean;
  action: 'repeat' | 'exit' | null;
}
