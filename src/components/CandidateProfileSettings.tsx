
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, MapPin, Calendar, Globe, FileText } from 'lucide-react';

interface CandidateProfile {
  full_name: string;
  phone: string;
  address: string;
  birth_date: string;
  nationality: string;
  ancestry: string;
  bio: string;
  languages: string[];
}

export const CandidateProfileSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<CandidateProfile>({
    full_name: '',
    phone: '',
    address: '',
    birth_date: '',
    nationality: '',
    ancestry: '',
    bio: '',
    languages: []
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('candidate_profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          phone: data.phone || '',
          address: data.address || '',
          birth_date: data.birth_date || '',
          nationality: data.nationality || '',
          ancestry: data.ancestry || '',
          bio: data.bio || '',
          languages: data.languages || []
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('candidate_profiles')
        .upsert({
          id: user?.id,
          ...profile,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso."
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar suas informações.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Informações Pessoais</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>Nome Completo</span>
              </label>
              <Input
                value={profile.full_name}
                onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                placeholder="Seu nome completo"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>E-mail</span>
              </label>
              <Input
                value={user?.email || ''}
                disabled
                className="bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>Telefone</span>
              </label>
              <Input
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Data de Nascimento</span>
              </label>
              <Input
                type="date"
                value={profile.birth_date}
                onChange={(e) => setProfile({...profile, birth_date: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>Nacionalidade</span>
              </label>
              <Input
                value={profile.nationality}
                onChange={(e) => setProfile({...profile, nationality: e.target.value})}
                placeholder="Brasileira"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>Descendência</span>
              </label>
              <Input
                value={profile.ancestry}
                onChange={(e) => setProfile({...profile, ancestry: e.target.value})}
                placeholder="Japonesa, Italiana, etc."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Endereço</span>
            </label>
            <Input
              value={profile.address}
              onChange={(e) => setProfile({...profile, address: e.target.value})}
              placeholder="Rua, número, bairro, cidade, estado"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>Sobre você</span>
            </label>
            <Textarea
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              placeholder="Conte um pouco sobre você, suas experiências e objetivos..."
              rows={4}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
