
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Mail, Phone, MapPin, Globe, FileText, Users, Calendar } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type SectorType = Database['public']['Enums']['sector_type'];

interface CompanyProfile {
  company_name: string;
  responsible_name: string;
  phone: string;
  address: string;
  website: string;
  description: string;
  cnpj: string;
  sector: SectorType | null;
  employee_count: number;
  founded_year: number;
}

const sectors: { value: SectorType; label: string }[] = [
  { value: 'IT', label: 'Tecnologia da Informação' },
  { value: 'retail', label: 'Varejo' },
  { value: 'construction', label: 'Construção' },
  { value: 'manufacturing', label: 'Manufatura' },
  { value: 'services', label: 'Serviços' },
  { value: 'education', label: 'Educação' },
  { value: 'healthcare', label: 'Saúde' },
  { value: 'tourism', label: 'Turismo' },
  { value: 'food', label: 'Alimentação' },
  { value: 'logistics', label: 'Logística' },
  { value: 'other', label: 'Outros' }
];

export const CompanyProfileSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<CompanyProfile>({
    company_name: '',
    responsible_name: '',
    phone: '',
    address: '',
    website: '',
    description: '',
    cnpj: '',
    sector: null,
    employee_count: 0,
    founded_year: new Date().getFullYear()
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile({
          company_name: data.company_name || '',
          responsible_name: data.responsible_name || '',
          phone: data.phone || '',
          address: data.address || '',
          website: data.website || '',
          description: data.description || '',
          cnpj: data.cnpj || '',
          sector: data.sector,
          employee_count: data.employee_count || 0,
          founded_year: data.founded_year || new Date().getFullYear()
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
      const updateData: any = {
        id: user?.id,
        company_name: profile.company_name,
        responsible_name: profile.responsible_name,
        phone: profile.phone,
        address: profile.address,
        website: profile.website,
        description: profile.description,
        cnpj: profile.cnpj,
        employee_count: profile.employee_count,
        founded_year: profile.founded_year
      };

      // Only include sector if it's not null
      if (profile.sector !== null) {
        updateData.sector = profile.sector;
      }

      const { error } = await supabase
        .from('company_profiles')
        .upsert(updateData);

      if (error) {
        throw error;
      }

      toast({
        title: "Perfil atualizado!",
        description: "As informações da empresa foram salvas com sucesso."
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as informações da empresa.",
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
          <Building className="h-5 w-5" />
          <span>Informações da Empresa</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Building className="h-4 w-4" />
                <span>Nome da Empresa</span>
              </label>
              <Input
                value={profile.company_name}
                onChange={(e) => setProfile({...profile, company_name: e.target.value})}
                placeholder="Nome da sua empresa"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Nome do Responsável</span>
              </label>
              <Input
                value={profile.responsible_name}
                onChange={(e) => setProfile({...profile, responsible_name: e.target.value})}
                placeholder="Seu nome"
                required
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
              <label className="text-sm font-medium text-gray-700">
                CNPJ
              </label>
              <Input
                value={profile.cnpj}
                onChange={(e) => setProfile({...profile, cnpj: e.target.value})}
                placeholder="00.000.000/0000-00"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Setor
              </label>
              <Select 
                value={profile.sector || undefined} 
                onValueChange={(value) => setProfile({...profile, sector: value as SectorType})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o setor" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map((sector) => (
                    <SelectItem key={sector.value} value={sector.value}>
                      {sector.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Número de Funcionários</span>
              </label>
              <Input
                type="number"
                value={profile.employee_count}
                onChange={(e) => setProfile({...profile, employee_count: parseInt(e.target.value) || 0})}
                placeholder="100"
                min="1"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Ano de Fundação</span>
              </label>
              <Input
                type="number"
                value={profile.founded_year}
                onChange={(e) => setProfile({...profile, founded_year: parseInt(e.target.value) || new Date().getFullYear()})}
                placeholder="2020"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <Globe className="h-4 w-4" />
              <span>Website</span>
            </label>
            <Input
              value={profile.website}
              onChange={(e) => setProfile({...profile, website: e.target.value})}
              placeholder="https://www.suaempresa.com"
            />
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
              <span>Descrição da Empresa</span>
            </label>
            <Textarea
              value={profile.description}
              onChange={(e) => setProfile({...profile, description: e.target.value})}
              placeholder="Conte sobre sua empresa, missão, valores e o que vocês fazem..."
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
