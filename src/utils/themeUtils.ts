
import { themeConfig } from '@/config/theme';

// Utilitário para aplicar classes de tema de forma consistente
export const applyThemeClasses = {
  // Botões primários
  primaryButton: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondaryButton: 'bg-green-600 hover:bg-green-700 text-white',
  
  // Cards e containers
  card: 'bg-white border border-gray-200 rounded-lg shadow-sm',
  cardHover: 'hover:shadow-lg transition-shadow',
  
  // Texto
  heading: 'text-gray-900 font-bold',
  subheading: 'text-gray-600',
  muted: 'text-gray-500',
  
  // Estados
  success: 'text-green-600 bg-green-50 border-green-200',
  warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  error: 'text-red-600 bg-red-50 border-red-200',
  info: 'text-blue-600 bg-blue-50 border-blue-200',
  
  // Gradientes
  heroGradient: 'bg-gradient-to-br from-blue-50 via-white to-green-50',
  ctaGradient: 'bg-blue-600',
  cardGradient: 'bg-gradient-to-r from-blue-50 to-indigo-50',
  successGradient: 'bg-gradient-to-r from-green-50 to-emerald-50',
};

// Função para combinar classes de tema
export const combineThemeClasses = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

// Função para obter cores CSS personalizadas
export const getCSSVariable = (variable: string) => {
  return `var(--${variable})`;
};

// Função para aplicar tema escuro/claro
export const getThemeMode = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') || 'light';
  }
  return 'light';
};

export const setThemeMode = (mode: 'light' | 'dark') => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }
};
