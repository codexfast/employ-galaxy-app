
import { useTranslations, useTranslationSection, Language } from './useTranslations';

// Hook de compatibilidade que mantém a API antiga
export const useLanguage = () => {
  const { language, changeLanguage, isLoading } = useTranslations();
  
  // Carrega seções necessárias
  useTranslationSection('navigation');
  useTranslationSection('home');
  useTranslationSection('stats');
  useTranslationSection('register');
  useTranslationSection('userType');
  useTranslationSection('form');
  useTranslationSection('button');
  useTranslationSection('social');
  useTranslationSection('terms');
  useTranslationSection('jobs');
  useTranslationSection('companies');
  useTranslationSection('footer');

  const t = (key: string): string => {
    // Mapeia as chaves antigas para o novo formato
    const keyMappings: Record<string, { section: string; key: string }> = {
      // Navigation
      'nav.jobs': { section: 'navigation', key: 'jobs' },
      'nav.companies': { section: 'navigation', key: 'companies' },
      'nav.about': { section: 'navigation', key: 'about' },
      'nav.login': { section: 'navigation', key: 'login' },
      'nav.register': { section: 'navigation', key: 'register' },

      // Home page
      'home.title': { section: 'home', key: 'title' },
      'home.titleHighlight': { section: 'home', key: 'titleHighlight' },
      'home.subtitle': { section: 'home', key: 'subtitle' },
      'home.searchPlaceholder': { section: 'home', key: 'searchPlaceholder' },
      'home.locationPlaceholder': { section: 'home', key: 'locationPlaceholder' },
      'home.searchButton': { section: 'home', key: 'searchButton' },
      'home.featuredJobs': { section: 'home', key: 'featuredJobs' },
      'home.featuredJobsSubtitle': { section: 'home', key: 'featuredJobsSubtitle' },
      'home.applyButton': { section: 'home', key: 'applyButton' },
      'home.viewAllJobs': { section: 'home', key: 'viewAllJobs' },
      'home.ctaTitle': { section: 'home', key: 'ctaTitle' },
      'home.ctaSubtitle': { section: 'home', key: 'ctaSubtitle' },
      'home.candidateButton': { section: 'home', key: 'candidateButton' },
      'home.companyButton': { section: 'home', key: 'companyButton' },

      // Stats
      'stats.activeJobs': { section: 'stats', key: 'activeJobs' },
      'stats.candidates': { section: 'stats', key: 'candidates' },
      'stats.companies': { section: 'stats', key: 'companies' },
      'stats.hires': { section: 'stats', key: 'hires' },

      // Register page
      'register.title': { section: 'register', key: 'title' },
      'register.subtitle': { section: 'register', key: 'subtitle' },
      
      // User type selection
      'userType.candidate': { section: 'userType', key: 'candidate' },
      'userType.company': { section: 'userType', key: 'company' },
      'userType.candidateDesc': { section: 'userType', key: 'candidateDesc' },
      'userType.companyDesc': { section: 'userType', key: 'companyDesc' },
      
      // Form fields
      'form.fullName': { section: 'form', key: 'fullName' },
      'form.email': { section: 'form', key: 'email' },
      'form.password': { section: 'form', key: 'password' },
      'form.confirmPassword': { section: 'form', key: 'confirmPassword' },
      'form.companyName': { section: 'form', key: 'companyName' },
      'form.responsibleName': { section: 'form', key: 'responsibleName' },
      
      // Buttons
      'button.register': { section: 'button', key: 'register' },
      'button.alreadyHaveAccount': { section: 'button', key: 'alreadyHaveAccount' },
      'button.login': { section: 'button', key: 'login' },
      'button.backToHome': { section: 'button', key: 'backToHome' },
      
      // Social login
      'social.continueWithGoogle': { section: 'social', key: 'continueWithGoogle' },
      'social.continueWithFacebook': { section: 'social', key: 'continueWithFacebook' },
      'social.or': { section: 'social', key: 'or' },
      
      // Terms
      'terms.agree': { section: 'terms', key: 'agree' },
      'terms.terms': { section: 'terms', key: 'terms' },
      'terms.and': { section: 'terms', key: 'and' },
      'terms.privacy': { section: 'terms', key: 'privacy' },

      // Jobs page
      'jobs.title': { section: 'jobs', key: 'title' },
      'jobs.subtitle': { section: 'jobs', key: 'subtitle' },
      'jobs.noJobs': { section: 'jobs', key: 'noJobs' },
      'jobs.loadMore': { section: 'jobs', key: 'loadMore' },

      // Companies page
      'companies.title': { section: 'companies', key: 'title' },
      'companies.subtitle': { section: 'companies', key: 'subtitle' },
      'companies.noCompanies': { section: 'companies', key: 'noCompanies' },
      'companies.viewJobs': { section: 'companies', key: 'viewJobs' },
      'companies.employees': { section: 'companies', key: 'employees' },

      // Footer
      'footer.forCandidates': { section: 'footer', key: 'forCandidates' },
      'footer.forCompanies': { section: 'footer', key: 'forCompanies' },
      'footer.support': { section: 'footer', key: 'support' },
      'footer.searchJobs': { section: 'footer', key: 'searchJobs' },
      'footer.createProfile': { section: 'footer', key: 'createProfile' },
      'footer.careerTips': { section: 'footer', key: 'careerTips' },
      'footer.publishJob': { section: 'footer', key: 'publishJob' },
      'footer.plans': { section: 'footer', key: 'plans' },
      'footer.contact': { section: 'footer', key: 'contact' },
      'footer.helpCenter': { section: 'footer', key: 'helpCenter' },
      'footer.privacy': { section: 'footer', key: 'privacy' },
      'footer.terms': { section: 'footer', key: 'terms' },
      'footer.copyright': { section: 'footer', key: 'copyright' }
    };

    const mapping = keyMappings[key];
    if (mapping) {
      const { t: translate } = useTranslations();
      return translate(mapping.section, mapping.key);
    }

    return key;
  };

  return { language, t, changeLanguage, isLoading };
};

export type { Language };
