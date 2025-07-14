
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Briefcase, User, Bell, Settings, LogOut, Plus, Eye, Edit, Trash2, Users, Calendar, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { CandidateProfileSettings } from '@/components/CandidateProfileSettings';
import { CompanyProfileSettings } from '@/components/CompanyProfileSettings';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslations, useTranslationSection } from '@/hooks/useTranslations';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useTranslations();
  const [userType, setUserType] = useState<'candidate' | 'company' | null>(null);
  const [loading, setLoading] = useState(true);

  // Load dashboard translations
  useTranslationSection('dashboard');

  useEffect(() => {
    if (user) {
      fetchUserType();
    }
  }, [user]);

  const fetchUserType = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching user type:', error);
        return;
      }

      setUserType(data.user_type);
    } catch (error) {
      console.error('Error fetching user type:', error);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login if not authenticated
  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
  };

  // Mock data - mantendo os dados existentes
  const candidaturas = [
    {
      id: 1,
      vaga: 'Desenvolvedor Frontend React',
      empresa: 'TechCorp Brasil',
      status: 'analyzing',
      data: '2024-01-15',
      salario: 'R$ 8.000 - R$ 12.000'
    },
    {
      id: 2,
      vaga: 'Engenheiro de Software',
      empresa: 'StartupXYZ',
      status: 'interviewScheduled',
      data: '2024-01-10',
      salario: 'R$ 10.000 - R$ 15.000'
    }
  ];

  const minhasVagas = [
    {
      id: 1,
      titulo: 'Analista de Marketing Digital',
      candidatos: 24,
      status: 'active',
      publicada: '2024-01-12',
      expira: '2024-02-12'
    },
    {
      id: 2,
      titulo: 'Desenvolvedor Full Stack',
      candidatos: 18,
      status: 'paused',
      publicada: '2024-01-08',
      expira: '2024-02-08'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'analyzing':
        return 'bg-yellow-100 text-yellow-800';
      case 'interviewScheduled':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (userType === 'candidate') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Jobsnow</span>
              </Link>
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="w-64 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" />
                  <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-900">{user?.email}</div>
                  <div className="text-sm text-gray-500">{t('dashboard', 'candidate')}</div>
                </div>
              </div>
              <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="dashboard">{t('dashboard', 'dashboard')}</TabsTrigger>
                  <TabsTrigger value="profile">{t('dashboard', 'profile')}</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="mt-4">
                <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('dashboard', 'logout')}
                </Button>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <Tabs defaultValue="dashboard" className="w-full">
                <TabsContent value="dashboard">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('dashboard', 'welcome')}</h1>
                    <p className="text-gray-600">{t('dashboard', 'welcomeSubtitle')}</p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{t('dashboard', 'candidateApplications')}</p>
                            <p className="text-2xl font-bold text-gray-900">8</p>
                          </div>
                          <Briefcase className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{t('dashboard', 'interviews')}</p>
                            <p className="text-2xl font-bold text-gray-900">3</p>
                          </div>
                          <Calendar className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{t('dashboard', 'profileViews')}</p>
                            <p className="text-2xl font-bold text-gray-900">24</p>
                          </div>
                          <Eye className="h-8 w-8 text-purple-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Applications */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('dashboard', 'recentApplications')}</CardTitle>
                      <CardDescription>{t('dashboard', 'recentApplicationsSubtitle')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {candidaturas.map((candidatura) => (
                          <div key={candidatura.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{candidatura.vaga}</h3>
                              <p className="text-sm text-gray-600">{candidatura.empresa}</p>
                              <p className="text-sm text-gray-500">{candidatura.salario}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge className={getStatusColor(candidatura.status)}>
                                {t('dashboard', `status.${candidatura.status}`)}
                              </Badge>
                              <span className="text-sm text-gray-500">{candidatura.data}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <Button variant="outline">{t('dashboard', 'viewAllApplications')}</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="profile">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('dashboard', 'profileSettings')}</h1>
                    <p className="text-gray-600">{t('dashboard', 'profileSettingsSubtitle')}</p>
                  </div>
                  <CandidateProfileSettings />
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard da Empresa
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Jobsnow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" />
                <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-gray-900">{user?.email}</div>
                <div className="text-sm text-gray-500">{t('dashboard', 'company')}</div>
              </div>
            </div>
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="dashboard">{t('dashboard', 'dashboard')}</TabsTrigger>
                <TabsTrigger value="profile">{t('dashboard', 'profile')}</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="mt-4">
              <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                {t('dashboard', 'logout')}
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsContent value="dashboard">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('dashboard', 'companyWelcome')}</h1>
                    <p className="text-gray-600">{t('dashboard', 'companyWelcomeSubtitle')}</p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('dashboard', 'newJob')}
                  </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{t('dashboard', 'activeJobs')}</p>
                          <p className="text-2xl font-bold text-gray-900">12</p>
                        </div>
                        <Briefcase className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{t('dashboard', 'candidates')}</p>
                          <p className="text-2xl font-bold text-gray-900">156</p>
                        </div>
                        <Users className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{t('dashboard', 'interviews')}</p>
                          <p className="text-2xl font-bold text-gray-900">8</p>
                        </div>
                        <Calendar className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{t('dashboard', 'hires')}</p>
                          <p className="text-2xl font-bold text-gray-900">3</p>
                        </div>
                        <BarChart3 className="h-8 w-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Jobs */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('dashboard', 'myJobs')}</CardTitle>
                    <CardDescription>{t('dashboard', 'myJobsSubtitle')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {minhasVagas.map((vaga) => (
                        <div key={vaga.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{vaga.titulo}</h3>
                            <p className="text-sm text-gray-600">{vaga.candidatos} candidatos</p>
                            <p className="text-sm text-gray-500">Publicada em {vaga.publicada}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge className={getStatusColor(vaga.status)}>
                              {t('dashboard', `status.${vaga.status}`)}
                            </Badge>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline">{t('dashboard', 'viewAllJobs')}</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('dashboard', 'companySettings')}</h1>
                  <p className="text-gray-600">{t('dashboard', 'companySettingsSubtitle')}</p>
                </div>
                <CompanyProfileSettings />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
