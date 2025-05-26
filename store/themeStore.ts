// store/themeStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

// Get initial system theme
const getSystemTheme = () => {
  try {
    return Appearance.getColorScheme() === 'dark';
  } catch (error) {
    return false; // Default to light theme if error
  }
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'system', // 'light', 'dark', 'system'
      isDark: getSystemTheme(),

      setTheme: (newTheme) => {
        let isDark;
        if (newTheme === 'system') {
          isDark = getSystemTheme();
        } else {
          isDark = newTheme === 'dark';
        }
        set({ theme: newTheme, isDark });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Add error handling for storage
      onRehydrateStorage: () => (state) => {
        if (state && state.theme === 'system') {
          state.isDark = getSystemTheme();
        }
      },
    }
  )
);

// Listen to system theme changes - but don't cause re-renders during initialization
let isInitialized = false;

const themeChangeListener = ({ colorScheme }) => {
  if (!isInitialized) {
    isInitialized = true;
    return;
  }

  const { theme } = useThemeStore.getState();
  if (theme === 'system') {
    useThemeStore.setState({ isDark: colorScheme === 'dark' });
  }
};

// Add listener after a small delay to avoid initialization issues
setTimeout(() => {
  Appearance.addChangeListener(themeChangeListener);
  isInitialized = true;
}, 100);