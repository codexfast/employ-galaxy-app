
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, Lock, Eye, EyeOff, User, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { LanguageSelector } from '@/components/LanguageSelector';

type UserType = 'candidate' | 'company';

const Registro = () => {
  const { t } = useLanguage();
  const { register, registerWithGoogle, loading } = useAuth();
  
  const [userType, setUserType] = useState<UserType | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
    responsibleName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userType) return;
    
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    const success = await register({
      email: formData.email,
      password: formData.password,
      userType,
      fullName: userType === 'candidate' ? formData.fullName : undefined,
      companyName: userType === 'company' ? formData.companyName : undefined,
      responsibleName: userType === 'company' ? formData.responsibleName : undefined,
    });

    if (success) {
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        companyName: '',
        responsibleName: ''
      });
    }
  };

  const handleGoogleRegister = async () => {
    if (!userType) return;
    await registerWithGoogle(userType);
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Jobsnow</span>
            </Link>
            <LanguageSelector />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('register.title')}</h1>
            <p className="text-gray-600">{t('register.subtitle')}</p>
          </div>

          {/* User Type Selection */}
          <div className="space-y-4">
            <button
              onClick={() => setUserType('candidate')}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('userType.candidate')}</h3>
                  <p className="text-gray-600">{t('userType.candidateDesc')}</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setUserType('company')}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('userType.company')}</h3>
                  <p className="text-gray-600">{t('userType.companyDesc')}</p>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
              {t('button.backToHome')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Jobsnow</span>
          </Link>
          <LanguageSelector />
        </div>

        <div className="text-center mb-8">
          <button
            onClick={() => setUserType(null)}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            ← Voltar
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('register.title')}</h1>
          <p className="text-gray-600">
            {userType === 'candidate' ? t('userType.candidateDesc') : t('userType.companyDesc')}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {userType === 'candidate' ? 'Cadastro de Candidato' : 'Cadastro de Empresa'}
            </CardTitle>
            <CardDescription>
              Preencha os dados básicos para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <Button 
                variant="outline" 
                className="w-full" 
                type="button"
                onClick={handleGoogleRegister}
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {t('social.continueWithGoogle')}
              </Button>
              
              <Button variant="outline" className="w-full" type="button" disabled>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                {t('social.continueWithFacebook')}
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">{t('social.or')}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {userType === 'candidate' ? (
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    {t('form.fullName')} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={t('form.fullName')}
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                      {t('form.companyName')} *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="companyName"
                        type="text"
                        placeholder={t('form.companyName')}
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="responsibleName" className="text-sm font-medium text-gray-700">
                      {t('form.responsibleName')} *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="responsibleName"
                        type="text"
                        placeholder={t('form.responsibleName')}
                        value={formData.responsibleName}
                        onChange={(e) => setFormData({...formData, responsibleName: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  {t('form.email')} *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('form.email')}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  {t('form.password')} *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo 8 caracteres"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="pl-10 pr-10"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  {t('form.confirmPassword')} *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={t('form.confirmPassword')}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="text-sm">
                <label className="flex items-start space-x-2">
                  <input type="checkbox" className="rounded border-gray-300 mt-1" required />
                  <span className="text-gray-600">
                    {t('terms.agree')}{' '}
                    <Link to="/termos" className="text-blue-600 hover:text-blue-700">
                      {t('terms.terms')}
                    </Link>{' '}
                    {t('terms.and')}{' '}
                    <Link to="/privacidade" className="text-blue-600 hover:text-blue-700">
                      {t('terms.privacy')}
                    </Link>
                  </span>
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Criando conta...' : t('button.register')}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600 mt-6">
              {t('button.alreadyHaveAccount')}{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                {t('button.login')}
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            {t('button.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;
