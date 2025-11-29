import { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, themes } from '../lib/themes';

interface ThemeContextType {
  theme: Theme;
  themeName: string;
  setTheme: (themeName: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<string>('light');
  const [theme, setThemeState] = useState<Theme>(themes.light);

  // Cargar tema guardado al iniciar
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('app_theme');
      if (savedTheme && themes[savedTheme]) {
        setThemeName(savedTheme);
        setThemeState(themes[savedTheme]);
      }
    } catch (error) {
      console.error('Error al cargar tema:', error);
    }
  };

  const setTheme = async (newThemeName: string) => {
    try {
      if (themes[newThemeName]) {
        setThemeName(newThemeName);
        setThemeState(themes[newThemeName]);
        await AsyncStorage.setItem('app_theme', newThemeName);
      }
    } catch (error) {
      console.error('Error al guardar tema:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}