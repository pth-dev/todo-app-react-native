import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@TodoApp:todos';

/**
 * Service for managing local storage operations
 */
export class StorageService {
  /**
   * Saves data to storage
   */
  async saveData<T>(data: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (err) {
      console.error('Error saving data to storage:', err);
      throw new Error('Failed to save data');
    }
  }

  /**
   * Loads data from storage
   */
  async loadData<T>(): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (err) {
      console.error('Error loading data from storage:', err);
      throw new Error('Failed to load data');
    }
  }

  /**
   * Clears all data from storage
   */
  async clearData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Error clearing data from storage:', err);
      throw new Error('Failed to clear data');
    }
  }
}

