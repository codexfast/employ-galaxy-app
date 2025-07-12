
// Configuração centralizada do tema da aplicação
// Para alterar as cores do tema, modifique os valores neste arquivo

export const themeConfig = {
  // Cores principais da marca
  brand: {
    primary: 'hsl(217, 91%, 60%)', // Azul principal
    secondary: 'hsl(142, 76%, 36%)', // Verde secundário
    accent: 'hsl(240, 5%, 96%)', // Cinza claro para acentos
  },
  
  // Cores semânticas
  semantic: {
    success: 'hsl(142, 76%, 36%)', // Verde para sucesso
    warning: 'hsl(38, 92%, 50%)', // Amarelo para avisos
    error: 'hsl(0, 84%, 60%)', // Vermelho para erros
    info: 'hsl(217, 91%, 60%)', // Azul para informações
  },
  
  // Tons de cinza
  neutral: {
    50: 'hsl(210, 40%, 98%)',
    100: 'hsl(210, 40%, 96%)',
    200: 'hsl(214, 32%, 91%)',
    300: 'hsl(213, 27%, 84%)',
    400: 'hsl(215, 20%, 65%)',
    500: 'hsl(215, 16%, 47%)',
    600: 'hsl(215, 19%, 35%)',
    700: 'hsl(215, 25%, 27%)',
    800: 'hsl(217, 33%, 17%)',
    900: 'hsl(222, 84%, 5%)',
  },
  
  // Configurações de gradientes
  gradients: {
    primary: 'from-blue-50 via-white to-green-50',
    secondary: 'from-blue-600 to-blue-700',
    success: 'from-green-50 to-emerald-50',
    card: 'from-blue-50 to-indigo-50',
  },
  
  // Configurações de sombra
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  
  // Raios de borda
  borderRadius: {
    sm: '0.125rem',
    default: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  // Configurações de espaçamento
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  
  // Configurações de tipografia
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
  },
} as const;

// Utilitário para acessar cores do tema
export const getThemeColor = (path: string) => {
  const keys = path.split('.');
  let value: any = themeConfig;
  
  for (const key of keys) {
    value = value?.[key];
  }
  
  return value;
};

// Utilitário para aplicar gradientes
export const getGradientClass = (gradientName: keyof typeof themeConfig.gradients) => {
  return `bg-gradient-to-br ${themeConfig.gradients[gradientName]}`;
};
