
-- Criação das tabelas principais
CREATE TYPE public.user_type AS ENUM ('candidate', 'company');
CREATE TYPE public.sector_type AS ENUM ('IT', 'retail', 'construction', 'manufacturing', 'services', 'education', 'healthcare', 'tourism', 'food', 'logistics', 'other');
CREATE TYPE public.job_type AS ENUM ('full_time', 'part_time', 'contract', 'internship', 'freelance');
CREATE TYPE public.application_status AS ENUM ('pending', 'accepted', 'rejected', 'withdrawn');

-- Tabela de perfis de usuários
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  user_type user_type NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de perfis de candidatos
CREATE TABLE public.candidate_profiles (
  id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  nationality TEXT,
  ancestry TEXT,
  languages TEXT[],
  phone TEXT,
  address TEXT,
  birth_date DATE,
  bio TEXT,
  resume_url TEXT,
  is_profile_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de perfis de empresas
CREATE TABLE public.company_profiles (
  id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  company_name TEXT,
  cnpj TEXT,
  address TEXT,
  sector sector_type,
  responsible_name TEXT,
  phone TEXT,
  website TEXT,
  logo_url TEXT,
  description TEXT,
  employee_count INTEGER,
  founded_year INTEGER,
  is_profile_complete BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  subscription_active BOOLEAN DEFAULT FALSE,
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de vagas
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.company_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  location TEXT NOT NULL,
  job_type job_type NOT NULL,
  sector sector_type NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de candidaturas
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  status application_status DEFAULT 'pending',
  cover_letter TEXT,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(job_id, candidate_id)
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para candidate_profiles
CREATE POLICY "Candidates can view their own profile" ON public.candidate_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Companies can view candidate profiles" ON public.candidate_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.user_type = 'company'
    )
  );

CREATE POLICY "Candidates can insert their own profile" ON public.candidate_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Candidates can update their own profile" ON public.candidate_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para company_profiles
CREATE POLICY "Companies can view their own profile" ON public.company_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Public can view company profiles" ON public.company_profiles
  FOR SELECT USING (true);

CREATE POLICY "Companies can insert their own profile" ON public.company_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Companies can update their own profile" ON public.company_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para jobs
CREATE POLICY "Everyone can view active jobs" ON public.jobs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Companies can view their own jobs" ON public.jobs
  FOR SELECT USING (
    company_id IN (
      SELECT id FROM public.company_profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Companies can insert jobs" ON public.jobs
  FOR INSERT WITH CHECK (
    company_id IN (
      SELECT id FROM public.company_profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Companies can update their own jobs" ON public.jobs
  FOR UPDATE USING (
    company_id IN (
      SELECT id FROM public.company_profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Companies can delete their own jobs" ON public.jobs
  FOR DELETE USING (
    company_id IN (
      SELECT id FROM public.company_profiles WHERE id = auth.uid()
    )
  );

-- Políticas RLS para applications
CREATE POLICY "Candidates can view their own applications" ON public.applications
  FOR SELECT USING (candidate_id = auth.uid());

CREATE POLICY "Companies can view applications for their jobs" ON public.applications
  FOR SELECT USING (
    job_id IN (
      SELECT jobs.id FROM public.jobs 
      JOIN public.company_profiles ON jobs.company_id = company_profiles.id
      WHERE company_profiles.id = auth.uid()
    )
  );

CREATE POLICY "Candidates can insert applications" ON public.applications
  FOR INSERT WITH CHECK (candidate_id = auth.uid());

CREATE POLICY "Candidates can update their own applications" ON public.applications
  FOR UPDATE USING (candidate_id = auth.uid());

CREATE POLICY "Companies can update applications for their jobs" ON public.applications
  FOR UPDATE USING (
    job_id IN (
      SELECT jobs.id FROM public.jobs 
      JOIN public.company_profiles ON jobs.company_id = company_profiles.id
      WHERE company_profiles.id = auth.uid()
    )
  );

-- Função para criar perfil automaticamente após registro
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, user_type, email)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'user_type', 'candidate')::user_type,
    NEW.email
  );
  
  -- Criar perfil específico baseado no tipo de usuário
  IF (NEW.raw_user_meta_data ->> 'user_type') = 'company' THEN
    INSERT INTO public.company_profiles (id, company_name, responsible_name)
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data ->> 'company_name',
      NEW.raw_user_meta_data ->> 'responsible_name'
    );
  ELSE
    INSERT INTO public.candidate_profiles (id, full_name)
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data ->> 'full_name'
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
