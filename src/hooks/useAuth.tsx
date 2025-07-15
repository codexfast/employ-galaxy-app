
import React, { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
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

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  register: (data: RegisterData) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Login realizado!",
            description: "Bem-vindo de volta!"
          });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

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
        if (error.message.includes('User already registered')) {
          toast({
            title: "E-mail já cadastrado",
            description: "Este e-mail já está registrado. Tente fazer login ou usar outro e-mail.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Erro no cadastro",
            description: error.message,
            variant: "destructive"
          });
        }
        return false;
      }

      toast({
        title: "Cadastro realizado!",
        description: "Verifique seu e-mail para confirmar a conta. Pode levar alguns minutos para chegar."
      });
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Credenciais inválidas",
            description: "E-mail ou senha incorretos. Verifique suas informações e tente novamente.",
            variant: "destructive"
          });
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: "E-mail não confirmado",
            description: "Verifique sua caixa de entrada e confirme seu e-mail antes de fazer login.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Erro no login",
            description: error.message,
            variant: "destructive"
          });
        }
        return false;
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        toast({
          title: "Erro no login com Google",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        title: "Erro no login com Google",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Erro ao sair",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Logout realizado",
          description: "Você foi desconectado com sucesso."
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: "Erro na recuperação",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "E-mail enviado!",
        description: "Verifique sua caixa de entrada para instruções de recuperação de senha."
      });
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      toast({
        title: "Erro na recuperação",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        toast({
          title: "Erro ao atualizar senha",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Senha atualizada!",
        description: "Sua senha foi atualizada com sucesso."
      });
      return true;
    } catch (error) {
      console.error('Update password error:', error);
      toast({
        title: "Erro ao atualizar senha",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
