import AsyncStorage from '@react-native-async-storage/async-storage';

/** redux-persist storage adapter */
export const storage = {
  setItem: (key: string, value: string) => AsyncStorage.setItem(key, value),
  getItem: (key: string) => AsyncStorage.getItem(key),
  removeItem: (key: string) => AsyncStorage.removeItem(key),
};
