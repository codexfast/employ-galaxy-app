
import React, { useState, useEffect, createContext, useContext } from 'react';

export type Language = 'pt' | 'en' | 'ja';

interface TranslationContextType {
  language: Language;
  t: (section: string, key: string) => string;
  changeLanguage: (lang: Language) => void;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Cache para evitar recarregar traduções
const translationCache: Record<string, any> = {};

const loadTranslations = async (language: Language, section: string) => {
  const cacheKey = `${language}-${section}`;
  
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    const translations = await import(`../locales/${language}/${section}.json`);
    translationCache[cacheKey] = translations.default;
    return translations.default;
  } catch (error) {
    console.warn(`Translation not found: ${language}/${section}`);
    return {};
  }
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');
  const [isLoading, setIsLoading] = useState(false);

  const t = (section: string, key: string): string => {
    const cacheKey = `${language}-${section}`;
    const sectionTranslations = translationCache[cacheKey];
    
    if (sectionTranslations && sectionTranslations[key]) {
      return sectionTranslations[key];
    }
    
    // Fallback: retorna a chave se não encontrar a tradução
    return `${section}.${key}`;
  };

  const changeLanguage = async (lang: Language) => {
    setIsLoading(true);
    setLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Pré-carrega seções principais
    const mainSections = ['navigation', 'home', 'stats', 'footer'];
    await Promise.all(
      mainSections.map(section => loadTranslations(lang, section))
    );
    
    setIsLoading(false);
  };

  useEffect(() => {
    const initializeLanguage = async () => {
      const savedLang = localStorage.getItem('language') as Language;
      const initialLang = (savedLang && ['pt', 'en', 'ja'].includes(savedLang)) ? savedLang : 'pt';
      
      setIsLoading(true);
      setLanguage(initialLang);
      
      // Pré-carrega seções principais
      const mainSections = ['navigation', 'home', 'stats', 'footer'];
      await Promise.all(
        mainSections.map(section => loadTranslations(initialLang, section))
      );
      
      setIsLoading(false);
    };

    initializeLanguage();
  }, []);

  // Hook para carregar seções sob demanda
  const preloadSection = async (section: string) => {
    await loadTranslations(language, section);
  };

  return (
    <TranslationContext.Provider value={{ language, t, changeLanguage, isLoading }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslations = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within a TranslationProvider');
  }
  return context;
};

// Hook para carregar seções específicas
export const useTranslationSection = (section: string) => {
  const { language } = useTranslations();
  
  useEffect(() => {
    loadTranslations(language, section);
  }, [language, section]);
};
