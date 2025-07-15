
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
import { User, MapPin, Globe, Languages, FileText } from 'lucide-react';

interface CandidateData {
  full_name: string;
  address: string;
  nationality: string;
  ancestry: string;
  is_immigrant: boolean;
  speaks_japanese: boolean;
  japanese_level: string;
  bio: string;
  phone: string;
}

export const CandidateOnboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CandidateData>({
    full_name: '',
    address: '',
    nationality: '',
    ancestry: '',
    is_immigrant: false,
    speaks_japanese: false,
    japanese_level: '',
    bio: '',
    phone: ''
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

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
        .from('candidate_profiles')
        .upsert({
          id: user?.id,
          full_name: data.full_name,
          address: data.address,
          nationality: data.nationality,
          ancestry: data.ancestry,
          bio: data.bio,
          phone: data.phone,
          languages: data.speaks_japanese ? [data.japanese_level] : [],
          is_profile_complete: true
        });

      if (error) throw error;

      toast({
        title: "Perfil completado!",
        description: "Bem-vindo ao Jobsnow! Seu perfil foi configurado com sucesso."
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
              <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Informações Pessoais</h2>
              <p className="text-gray-600">Conte-nos um pouco sobre você</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nome Completo *</label>
              <Input
                value={data.full_name}
                onChange={(e) => setData({...data, full_name: e.target.value})}
                placeholder="Seu nome completo"
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
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Você é imigrante?</h2>
              <p className="text-gray-600">Queremos entender melhor seu background</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={data.is_immigrant ? "default" : "outline"}
                  onClick={() => setData({...data, is_immigrant: true})}
                  className="h-20"
                >
                  Sim, sou imigrante
                </Button>
                <Button
                  variant={!data.is_immigrant ? "default" : "outline"}
                  onClick={() => setData({...data, is_immigrant: false})}
                  className="h-20"
                >
                  Não, sou nativo
                </Button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Nacionalidade e Descendência</h2>
              <p className="text-gray-600">Informe sua origem</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nacionalidade *</label>
              <Input
                value={data.nationality}
                onChange={(e) => setData({...data, nationality: e.target.value})}
                placeholder="Ex: Brasileira"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Descendência</label>
              <Input
                value={data.ancestry}
                onChange={(e) => setData({...data, ancestry: e.target.value})}
                placeholder="Ex: Japonesa, Italiana, etc."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Languages className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Você fala japonês?</h2>
              <p className="text-gray-600">Isso pode ser uma vantagem para muitas vagas</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={data.speaks_japanese ? "default" : "outline"}
                  onClick={() => setData({...data, speaks_japanese: true})}
                  className="h-20"
                >
                  Sim, falo japonês
                </Button>
                <Button
                  variant={!data.speaks_japanese ? "default" : "outline"}
                  onClick={() => setData({...data, speaks_japanese: false})}
                  className="h-20"
                >
                  Não falo japonês
                </Button>
              </div>
              {data.speaks_japanese && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nível de Japonês</label>
                  <select
                    value={data.japanese_level}
                    onChange={(e) => setData({...data, japanese_level: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione o nível</option>
                    <option value="N5">N5 (Iniciante)</option>
                    <option value="N4">N4 (Básico)</option>
                    <option value="N3">N3 (Intermediário)</option>
                    <option value="N2">N2 (Avançado)</option>
                    <option value="N1">N1 (Fluente)</option>
                    <option value="Nativo">Nativo</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Onde você mora?</h2>
              <p className="text-gray-600">Informe seu endereço atual</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Endereço Completo *</label>
              <Input
                value={data.address}
                onChange={(e) => setData({...data, address: e.target.value})}
                placeholder="Rua, número, bairro, cidade, estado"
                required
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Conte sobre você</h2>
              <p className="text-gray-600">Descreva sua experiência e objetivos</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Biografia</label>
              <Textarea
                value={data.bio}
                onChange={(e) => setData({...data, bio: e.target.value})}
                placeholder="Conte um pouco sobre sua experiência profissional, habilidades e objetivos..."
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
        return data.full_name.trim() !== '';
      case 2:
        return true; // Boolean já está definido
      case 3:
        return data.nationality.trim() !== '';
      case 4:
        return !data.speaks_japanese || data.japanese_level !== '';
      case 5:
        return data.address.trim() !== '';
      case 6:
        return true; // Bio é opcional
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
              Complete seu Perfil
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
