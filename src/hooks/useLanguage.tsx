
import React, { useState, useEffect, createContext, useContext } from 'react';

export type Language = 'pt' | 'en' | 'ja';

interface Translations {
  [key: string]: {
    pt: string;
    en: string;
    ja: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.jobs': {
    pt: 'Vagas',
    en: 'Jobs',
    ja: '求人'
  },
  'nav.companies': {
    pt: 'Empresas',
    en: 'Companies',
    ja: '企業'
  },
  'nav.about': {
    pt: 'Sobre',
    en: 'About',
    ja: 'について'
  },
  'nav.login': {
    pt: 'Entrar',
    en: 'Login',
    ja: 'ログイン'
  },
  'nav.register': {
    pt: 'Cadastrar',
    en: 'Register',
    ja: '登録'
  },

  // Home page
  'home.title': {
    pt: 'Encontre sua',
    en: 'Find your',
    ja: 'あなたの'
  },
  'home.titleHighlight': {
    pt: 'vaga ideal',
    en: 'ideal job',
    ja: '理想の仕事を見つけよう'
  },
  'home.subtitle': {
    pt: 'Conectamos talentos com oportunidades incríveis. Milhares de vagas em empresas que valorizam diversidade e crescimento profissional.',
    en: 'We connect talents with incredible opportunities. Thousands of jobs in companies that value diversity and professional growth.',
    ja: '才能と素晴らしい機会を結びつけます。多様性と専門的成長を重視する企業の何千もの求人。'
  },
  'home.searchPlaceholder': {
    pt: 'Cargo, palavra-chave ou empresa',
    en: 'Position, keyword or company',
    ja: '職種、キーワード、会社名'
  },
  'home.locationPlaceholder': {
    pt: 'Cidade, estado ou remoto',
    en: 'City, state or remote',
    ja: '都市、州、またはリモート'
  },
  'home.searchButton': {
    pt: 'Buscar Vagas',
    en: 'Search Jobs',
    ja: '求人検索'
  },
  'home.featuredJobs': {
    pt: 'Vagas em Destaque',
    en: 'Featured Jobs',
    ja: '注目の求人'
  },
  'home.featuredJobsSubtitle': {
    pt: 'Oportunidades selecionadas especialmente para você',
    en: 'Opportunities specially selected for you',
    ja: 'あなたのために特別に選ばれた機会'
  },
  'home.applyButton': {
    pt: 'Candidatar-se',
    en: 'Apply',
    ja: '応募する'
  },
  'home.viewAllJobs': {
    pt: 'Ver Todas as Vagas',
    en: 'View All Jobs',
    ja: 'すべての求人を見る'
  },
  'home.ctaTitle': {
    pt: 'Pronto para encontrar sua próxima oportunidade?',
    en: 'Ready to find your next opportunity?',
    ja: '次の機会を見つける準備はできていますか？'
  },
  'home.ctaSubtitle': {
    pt: 'Cadastre-se gratuitamente e tenha acesso a milhares de vagas exclusivas.',
    en: 'Sign up for free and get access to thousands of exclusive jobs.',
    ja: '無料でサインアップして、何千もの独占求人にアクセスしてください。'
  },
  'home.candidateButton': {
    pt: 'Sou Candidato',
    en: 'I am a Candidate',
    ja: '私は求職者です'
  },
  'home.companyButton': {
    pt: 'Sou Empresa',
    en: 'I am a Company',
    ja: '私は企業です'
  },

  // Stats
  'stats.activeJobs': {
    pt: 'Vagas Ativas',
    en: 'Active Jobs',
    ja: 'アクティブな求人'
  },
  'stats.candidates': {
    pt: 'Candidatos',
    en: 'Candidates',
    ja: '候補者'
  },
  'stats.companies': {
    pt: 'Empresas',
    en: 'Companies',
    ja: '企業'
  },
  'stats.hires': {
    pt: 'Contratações',
    en: 'Hires',
    ja: '採用'
  },

  // Register page
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
  },

  // Jobs page
  'jobs.title': {
    pt: 'Vagas Disponíveis',
    en: 'Available Jobs',
    ja: '利用可能な求人'
  },
  'jobs.subtitle': {
    pt: 'Encontre a oportunidade perfeita para você',
    en: 'Find the perfect opportunity for you',
    ja: 'あなたにぴったりの機会を見つけてください'
  },
  'jobs.noJobs': {
    pt: 'Nenhuma vaga encontrada',
    en: 'No jobs found',
    ja: '求人が見つかりません'
  },
  'jobs.loadMore': {
    pt: 'Carregar mais',
    en: 'Load more',
    ja: 'もっと読み込む'
  },

  // Companies page
  'companies.title': {
    pt: 'Empresas Parceiras',
    en: 'Partner Companies',
    ja: 'パートナー企業'
  },
  'companies.subtitle': {
    pt: 'Conheça as empresas que confiam em nossos talentos',
    en: 'Meet the companies that trust our talents',
    ja: '私たちの才能を信頼する企業を知る'
  },
  'companies.noCompanies': {
    pt: 'Nenhuma empresa encontrada',
    en: 'No companies found',
    ja: '企業が見つかりません'
  },
  'companies.viewJobs': {
    pt: 'Ver Vagas',
    en: 'View Jobs',
    ja: '求人を見る'
  },
  'companies.employees': {
    pt: 'funcionários',
    en: 'employees',
    ja: '従業員'
  },

  // Footer
  'footer.forCandidates': {
    pt: 'Para Candidatos',
    en: 'For Candidates',
    ja: '求職者向け'
  },
  'footer.forCompanies': {
    pt: 'Para Empresas',
    en: 'For Companies',
    ja: '企業向け'
  },
  'footer.support': {
    pt: 'Suporte',
    en: 'Support',
    ja: 'サポート'
  },
  'footer.searchJobs': {
    pt: 'Buscar Vagas',
    en: 'Search Jobs',
    ja: '求人検索'
  },
  'footer.createProfile': {
    pt: 'Criar Perfil',
    en: 'Create Profile',
    ja: 'プロフィール作成'
  },
  'footer.careerTips': {
    pt: 'Dicas de Carreira',
    en: 'Career Tips',
    ja: 'キャリアのヒント'
  },
  'footer.publishJob': {
    pt: 'Publicar Vaga',
    en: 'Post Job',
    ja: '求人掲載'
  },
  'footer.plans': {
    pt: 'Planos',
    en: 'Plans',
    ja: 'プラン'
  },
  'footer.contact': {
    pt: 'Contato',
    en: 'Contact',
    ja: 'お問い合わせ'
  },
  'footer.helpCenter': {
    pt: 'Central de Ajuda',
    en: 'Help Center',
    ja: 'ヘルプセンター'
  },
  'footer.privacy': {
    pt: 'Privacidade',
    en: 'Privacy',
    ja: 'プライバシー'
  },
  'footer.terms': {
    pt: 'Termos de Uso',
    en: 'Terms of Use',
    ja: '利用規約'
  },
  'footer.copyright': {
    pt: '© 2024 JobConnect. Todos os direitos reservados.',
    en: '© 2024 JobConnect. All rights reserved.',
    ja: '© 2024 JobConnect. 全著作権所有。'
  }
};

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
