import { Plate, PlateList, ListColor, CarColor } from '@/types';

/**
 * Generates a unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Generates a random plate with 5-8 alphanumeric characters
 */
export const generateRandomPlate = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = Math.floor(Math.random() * 4) + 5; // 5-8 characters
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Creates a new plate object
 */
export const createPlate = (value: string = ''): Plate => ({
  id: generateId(),
  value: value.toUpperCase().slice(0, 11), // Max 11 characters
});

/**
 * Creates a new plate list
 */
export const createPlateList = (name: string, color: ListColor = 'blue', plates: Plate[] = [], intervalSeconds: number = 30, animationSpeed: number = 2.0): PlateList => ({
  id: generateId(),
  name,
  color,
  plates,
  intervalSeconds,
  animationSpeed,
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

/**
 * Creates a random plate list with specified number of plates
 */
export const createRandomPlateList = (name: string, plateCount: number, color: ListColor = 'blue'): PlateList => {
  const plates: Plate[] = [];
  for (let i = 0; i < plateCount; i++) {
    plates.push(createPlate(generateRandomPlate()));
  }
  return createPlateList(name, color, plates);
};

/**
 * Exports plates to CSV
 */
export const exportToCSV = (list: PlateList): void => {
  const headers = ['ID', 'Plate Number'];
  const rows = list.plates.map((plate) => [plate.id, plate.value]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${list.name.replace(/\s+/g, '_')}_plates.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/**
 * Parses bulk plate input (comma or space separated)
 */
export const parseBulkPlates = (input: string): Plate[] => {
  const values = input
    .split(/[,\s\n]+/)
    .map((v) => v.trim().toUpperCase())
    .filter((v) => v.length <= 11); // Allow empty and up to 11 chars

  return values.map((value) => createPlate(value));
};

/**
 * Validates a plate value (0-11 characters)
 */
export const isValidPlate = (value: string): boolean => {
  return value.length <= 11;
};

/**
 * Available list colors with their CSS classes
 */
export const LIST_COLORS: Record<ListColor, string> = {
  red: 'bg-car-red',
  blue: 'bg-car-blue',
  green: 'bg-car-green',
  yellow: 'bg-car-yellow',
  orange: 'bg-car-orange',
  purple: 'bg-car-purple',
  white: 'bg-car-white',
};

/**
 * Available car colors for animation
 */
export const CAR_COLORS: CarColor[] = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'white', 'black'];

/**
 * Gets a car color based on index (cycles through colors)
 */
export const getCarColorByIndex = (index: number): CarColor => {
  return CAR_COLORS[index % CAR_COLORS.length];
};

/**
 * Formats seconds to display string (e.g., "30s" or "1m 30s")
 */
export const formatTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
};

/**
 * Formats remaining time for display
 */
export const formatRemainingTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
