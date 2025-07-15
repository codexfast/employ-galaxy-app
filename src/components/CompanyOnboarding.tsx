
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Building, MapPin, Users, Calendar, FileText } from 'lucide-react';

interface CompanyData {
  company_name: string;
  responsible_name: string;
  address: string;
  phone: string;
  website: string;
  cnpj: string;
  sector: string;
  employee_count: number;
  founded_year: number;
  description: string;
}

export const CompanyOnboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CompanyData>({
    company_name: '',
    responsible_name: '',
    address: '',
    phone: '',
    website: '',
    cnpj: '',
    sector: '',
    employee_count: 0,
    founded_year: new Date().getFullYear(),
    description: ''
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const sectors = [
    { value: 'IT', label: 'Tecnologia da Informação' },
    { value: 'manufacturing', label: 'Manufatura' },
    { value: 'retail', label: 'Varejo' },
    { value: 'construction', label: 'Construção' },
    { value: 'services', label: 'Serviços' },
    { value: 'education', label: 'Educação' },
    { value: 'healthcare', label: 'Saúde' },
    { value: 'tourism', label: 'Turismo' },
    { value: 'food', label: 'Alimentação' },
    { value: 'logistics', label: 'Logística' },
    { value: 'other', label: 'Outro' }
  ];

  const employeeRanges = [
    { value: 1, label: '1-10 funcionários' },
    { value: 25, label: '11-50 funcionários' },
    { value: 75, label: '51-100 funcionários' },
    { value: 250, label: '101-500 funcionários' },
    { value: 1000, label: '501-1000 funcionários' },
    { value: 5000, label: 'Mais de 1000 funcionários' }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('company_profiles')
        .upsert({
          id: user?.id,
          company_name: data.company_name,
          responsible_name: data.responsible_name,
          address: data.address,
          phone: data.phone,
          website: data.website,
          cnpj: data.cnpj,
          sector: data.sector as any,
          employee_count: data.employee_count,
          founded_year: data.founded_year,
          description: data.description,
          is_profile_complete: true
        });

      if (error) throw error;

      toast({
        title: "Perfil completado!",
        description: "Bem-vindo ao Jobsnow! Seu perfil empresarial foi configurado com sucesso."
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing profile:', error);
      toast({
        title: "Erro ao salvar perfil",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Informações da Empresa</h2>
              <p className="text-gray-600">Dados básicos da sua empresa</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nome da Empresa *</label>
              <Input
                value={data.company_name}
                onChange={(e) => setData({...data, company_name: e.target.value})}
                placeholder="Nome da sua empresa"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nome do Responsável *</label>
              <Input
                value={data.responsible_name}
                onChange={(e) => setData({...data, responsible_name: e.target.value})}
                placeholder="Seu nome completo"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">CNPJ</label>
              <Input
                value={data.cnpj}
                onChange={(e) => setData({...data, cnpj: e.target.value})}
                placeholder="00.000.000/0000-00"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Localização e Contato</h2>
              <p className="text-gray-600">Onde encontrar sua empresa</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Endereço da Empresa *</label>
              <Input
                value={data.address}
                onChange={(e) => setData({...data, address: e.target.value})}
                placeholder="Rua, número, bairro, cidade, estado"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Telefone</label>
              <Input
                value={data.phone}
                onChange={(e) => setData({...data, phone: e.target.value})}
                placeholder="(11) 99999-9999"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Website</label>
              <Input
                value={data.website}
                onChange={(e) => setData({...data, website: e.target.value})}
                placeholder="https://www.suaempresa.com"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Setor da Empresa</h2>
              <p className="text-gray-600">Em qual área sua empresa atua?</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Setor *</label>
              <select
                value={data.sector}
                onChange={(e) => setData({...data, sector: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecione o setor</option>
                {sectors.map((sector) => (
                  <option key={sector.value} value={sector.value}>
                    {sector.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Tamanho da Empresa</h2>
              <p className="text-gray-600">Quantos funcionários trabalham na empresa?</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Número de Funcionários</label>
              <select
                value={data.employee_count}
                onChange={(e) => setData({...data, employee_count: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>Selecione o tamanho</option>
                {employeeRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Ano de Fundação</label>
              <Input
                type="number"
                value={data.founded_year}
                onChange={(e) => setData({...data, founded_year: parseInt(e.target.value)})}
                placeholder="2020"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Sobre a Empresa</h2>
              <p className="text-gray-600">Descreva sua empresa para os candidatos</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Descrição da Empresa</label>
              <Textarea
                value={data.description}
                onChange={(e) => setData({...data, description: e.target.value})}
                placeholder="Descreva a história, missão, valores e cultura da sua empresa..."
                rows={4}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.company_name.trim() !== '' && data.responsible_name.trim() !== '';
      case 2:
        return data.address.trim() !== '';
      case 3:
        return data.sector !== '';
      case 4:
        return data.employee_count > 0;
      case 5:
        return true; // Descrição é opcional
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Complete o Perfil da Empresa
            </CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Passo {currentStep} de {totalSteps}</span>
                <span>{Math.round(progress)}% concluído</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardHeader>
          <CardContent>
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>
              
              {currentStep === totalSteps ? (
                <Button
                  onClick={handleFinish}
                  disabled={loading || !canProceed()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Salvando...' : 'Finalizar'}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Próximo
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
