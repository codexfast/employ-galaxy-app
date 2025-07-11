
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RegisterData {
  email: string;
  password: string;
  userType: 'candidate' | 'company';
  fullName?: string;
  companyName?: string;
  responsibleName?: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const register = async (data: RegisterData) => {
    setLoading(true);
    try {
      const metadata: any = {
        user_type: data.userType,
      };

      if (data.userType === 'candidate' && data.fullName) {
        metadata.full_name = data.fullName;
      } else if (data.userType === 'company') {
        metadata.company_name = data.companyName;
        metadata.responsible_name = data.responsibleName;
      }

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: metadata
        }
      });

      if (error) {
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Cadastro realizado!",
        description: "Verifique seu email para confirmar a conta."
      });
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading
  };
};
