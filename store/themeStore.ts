import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      isDark: Appearance.getColorScheme() === 'dark',
      setTheme: (theme: Theme) => {
        set({ 
          theme,
          isDark: theme === 'system' 
            ? Appearance.getColorScheme() === 'dark'
            : theme === 'dark'
        });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);


Appearance.addChangeListener(({ colorScheme }) => {
  const themeStore = useThemeStore.getState();
  if (themeStore.theme === 'system') {
    themeStore.setTheme('system');
  }
});