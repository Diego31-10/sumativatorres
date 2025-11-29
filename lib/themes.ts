export interface Theme {
    name: string;
    colors: {
      primary: string;
      primaryDark: string;
      background: string;
      surface: string;
      text: string;
      textSecondary: string;
      border: string;
      success: string;
      error: string;
      warning: string;
      info: string;
    };
  }
  
  export const themes: Record<string, Theme> = {
    light: {
      name: 'Claro',
      colors: {
        primary: '#3b82f6',
        primaryDark: '#2563eb',
        background: '#f9fafb',
        surface: '#ffffff',
        text: '#1f2937',
        textSecondary: '#6b7280',
        border: '#e5e7eb',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
      },
    },
    dark: {
      name: 'Oscuro',
      colors: {
        primary: '#60a5fa',
        primaryDark: '#3b82f6',
        background: '#111827',
        surface: '#1f2937',
        text: '#f9fafb',
        textSecondary: '#9ca3af',
        border: '#374151',
        success: '#34d399',
        error: '#f87171',
        warning: '#fbbf24',
        info: '#60a5fa',
      },
    },
    green: {
      name: 'Verde',
      colors: {
        primary: '#10b981',
        primaryDark: '#059669',
        background: '#f0fdf4',
        surface: '#ffffff',
        text: '#064e3b',
        textSecondary: '#9ca3af',
        border: '#d1fae5',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#10b981',
      },
    },
  };