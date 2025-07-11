
import { useState, useEffect } from 'react';

export type Language = 'pt' | 'en' | 'ja';

interface Translations {
  [key: string]: {
    pt: string;
    en: string;
    ja: string;
  };
}

const translations: Translations = {
  // Header
  'register.title': {
    pt: 'Cadastro',
    en: 'Register',
    ja: '登録'
  },
  'register.subtitle': {
    pt: 'Encontre sua oportunidade no Japão',
    en: 'Find your opportunity in Japan',
    ja: '日本での機会を見つけよう'
  },
  
  // User type selection
  'userType.candidate': {
    pt: 'Sou Candidato',
    en: 'I am a Candidate',
    ja: '私は求職者です'
  },
  'userType.company': {
    pt: 'Sou Empresa',
    en: 'I am a Company',
    ja: '私は企業です'
  },
  'userType.candidateDesc': {
    pt: 'Procuro oportunidades de trabalho no Japão',
    en: 'Looking for job opportunities in Japan',
    ja: '日本での就職機会を探しています'
  },
  'userType.companyDesc': {
    pt: 'Quero contratar talentos brasileiros',
    en: 'Want to hire Brazilian talent',
    ja: 'ブラジル人の人材を採用したい'
  },
  
  // Form fields
  'form.fullName': {
    pt: 'Nome completo',
    en: 'Full name',
    ja: '氏名'
  },
  'form.email': {
    pt: 'E-mail',
    en: 'Email',
    ja: 'メールアドレス'
  },
  'form.password': {
    pt: 'Senha',
    en: 'Password',
    ja: 'パスワード'
  },
  'form.confirmPassword': {
    pt: 'Confirme a senha',
    en: 'Confirm password',
    ja: 'パスワード確認'
  },
  'form.companyName': {
    pt: 'Nome da empresa',
    en: 'Company name',
    ja: '会社名'
  },
  'form.responsibleName': {
    pt: 'Nome do responsável',
    en: 'Responsible person name',
    ja: '担当者名'
  },
  
  // Buttons
  'button.register': {
    pt: 'Criar conta',
    en: 'Create account',
    ja: 'アカウント作成'
  },
  'button.alreadyHaveAccount': {
    pt: 'Já tem uma conta?',
    en: 'Already have an account?',
    ja: 'すでにアカウントをお持ちですか？'
  },
  'button.login': {
    pt: 'Faça login',
    en: 'Sign in',
    ja: 'ログイン'
  },
  'button.backToHome': {
    pt: '← Voltar ao início',
    en: '← Back to home',
    ja: '← ホームに戻る'
  },
  
  // Social login
  'social.continueWithGoogle': {
    pt: 'Continuar com Google',
    en: 'Continue with Google',
    ja: 'Googleで続行'
  },
  'social.continueWithFacebook': {
    pt: 'Continuar com Facebook',
    en: 'Continue with Facebook',
    ja: 'Facebookで続行'
  },
  'social.or': {
    pt: 'ou',
    en: 'or',
    ja: 'または'
  },
  
  // Terms
  'terms.agree': {
    pt: 'Concordo com os',
    en: 'I agree to the',
    ja: '私は同意します'
  },
  'terms.terms': {
    pt: 'termos de uso',
    en: 'terms of service',
    ja: '利用規約'
  },
  'terms.and': {
    pt: 'e',
    en: 'and',
    ja: 'と'
  },
  'terms.privacy': {
    pt: 'política de privacidade',
    en: 'privacy policy',
    ja: 'プライバシーポリシー'
  }
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['pt', 'en', 'ja'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  return {
    language,
    t,
    changeLanguage
  };
};
