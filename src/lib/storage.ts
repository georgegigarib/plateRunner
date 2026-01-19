import { PlateList } from '@/types';

const STORAGE_KEY = 'plates-runner-lists';

/**
 * Loads all plate lists from localStorage
 */
export const loadLists = (): PlateList[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as PlateList[];
  } catch (error) {
    console.error('Error loading lists from storage:', error);
    return [];
  }
};

/**
 * Saves all plate lists to localStorage
 */
export const saveLists = (lists: PlateList[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  } catch (error) {
    console.error('Error saving lists to storage:', error);
  }
};

/**
 * Gets a single list by ID
 */
export const getListById = (id: string): PlateList | null => {
  const lists = loadLists();
  return lists.find((list) => list.id === id) || null;
};

/**
 * Saves or updates a single list
 */
export const saveList = (list: PlateList): void => {
  const lists = loadLists();
  const index = lists.findIndex((l) => l.id === list.id);

  if (index >= 0) {
    lists[index] = { ...list, updatedAt: Date.now() };
  } else {
    lists.push(list);
  }

  saveLists(lists);
};

/**
 * Deletes a list by ID
 */
export const deleteList = (id: string): void => {
  const lists = loadLists();
  const filtered = lists.filter((list) => list.id !== id);
  saveLists(filtered);
};

/**
 * Clears all lists from storage
 */
export const clearAllLists = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
