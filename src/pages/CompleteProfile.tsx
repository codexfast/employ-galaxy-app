
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { CandidateOnboarding } from '@/components/CandidateOnboarding';
import { CompanyOnboarding } from '@/components/CompanyOnboarding';
import { Skeleton } from '@/components/ui/skeleton';

const CompleteProfile = () => {
  const { user, session } = useAuth();
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
        // Check if user already has a complete profile
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
          
          // Check if profile is already complete
          if (profile.user_type === 'candidate') {
            const { data: candidateProfile } = await supabase
              .from('candidate_profiles')
              .select('is_profile_complete')
              .eq('id', user?.id)
              .single();
            
            if (candidateProfile?.is_profile_complete) {
              navigate('/dashboard');
              return;
            }
          } else if (profile.user_type === 'company') {
            const { data: companyProfile } = await supabase
              .from('company_profiles')
              .select('is_profile_complete')
              .eq('id', user?.id)
              .single();
            
            if (companyProfile?.is_profile_complete) {
              navigate('/dashboard');
              return;
            }
          }
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

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erro</h1>
          <p className="text-gray-600">Não foi possível determinar o tipo de usuário.</p>
        </div>
      </div>
    );
  }

  return userType === 'candidate' ? <CandidateOnboarding /> : <CompanyOnboarding />;
};

export default CompleteProfile;
