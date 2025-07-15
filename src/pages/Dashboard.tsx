
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useTranslations } from '@/hooks/useTranslations';
import { LanguageSelector } from '@/components/LanguageSelector';
import { CandidateProfileSettings } from '@/components/CandidateProfileSettings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Briefcase, User, Settings, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, session, logout } = useAuth();
  const { t } = useTranslations();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'candidate' | 'company' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    const checkUserProfile = async () => {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user?.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error);
          navigate('/login');
          return;
        }

        if (profile) {
          setUserType(profile.user_type);
          
          // Check if profile is complete
          if (profile.user_type === 'candidate') {
            const { data: candidateProfile } = await supabase
              .from('candidate_profiles')
              .select('is_profile_complete')
              .eq('id', user?.id)
              .single();
            
            if (!candidateProfile?.is_profile_complete) {
              navigate('/complete-profile');
              return;
            }
          } else if (profile.user_type === 'company') {
            const { data: companyProfile } = await supabase
              .from('company_profiles')
              .select('is_profile_complete')
              .eq('id', user?.id)
              .single();
            
            if (!companyProfile?.is_profile_complete) {
              navigate('/complete-profile');
              return;
            }
          }
        } else {
          navigate('/complete-profile');
        }
      } catch (error) {
        console.error('Error checking profile:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkUserProfile();
  }, [user, session, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 mx-auto" />
            <Skeleton className="h-3 w-24 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Jobsnow</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>{t('dashboard', 'header.logout')}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard', 'welcome.title')}
          </h2>
          <p className="text-gray-600">
            {userType === 'candidate' 
              ? t('dashboard', 'welcome.candidateSubtitle')
              : t('dashboard', 'welcome.companySubtitle')
            }
          </p>
        </div>

        {userType === 'candidate' ? (
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{t('dashboard', 'tabs.profile')}</span>
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>{t('dashboard', 'tabs.applications')}</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>{t('dashboard', 'tabs.settings')}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <CandidateProfileSettings />
            </TabsContent>

            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>{t('dashboard', 'applications.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t('dashboard', 'applications.empty')}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>{t('dashboard', 'settings.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t('dashboard', 'settings.description')}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Tabs defaultValue="jobs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="jobs" className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>{t('dashboard', 'tabs.jobs')}</span>
              </TabsTrigger>
              <TabsTrigger value="candidates" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{t('dashboard', 'tabs.candidates')}</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>{t('dashboard', 'tabs.settings')}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs">
              <Card>
                <CardHeader>
                  <CardTitle>{t('dashboard', 'jobs.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t('dashboard', 'jobs.empty')}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="candidates">
              <Card>
                <CardHeader>
                  <CardTitle>{t('dashboard', 'candidates.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t('dashboard', 'candidates.empty')}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>{t('dashboard', 'settings.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{t('dashboard', 'settings.description')}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
