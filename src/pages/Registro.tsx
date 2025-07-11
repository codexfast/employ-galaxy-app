
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Briefcase, Mail, Lock, Eye, EyeOff, User, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const Registro = () => {
  const [searchParams] = useSearchParams();
  const tipoInicial = searchParams.get('tipo') || 'candidato';
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState(tipoInicial);

  // Estados para candidato
  const [candidatoData, setCandidatoData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  // Estados para empresa
  const [empresaData, setEmpresaData] = useState({
    nomeEmpresa: '',
    cnpj: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleCandidatoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registro candidato:', candidatoData);
  };

  const handleEmpresaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registro empresa:', empresaData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">JobConnect</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar conta</h1>
          <p className="text-gray-600">Comece sua jornada profissional conosco</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cadastro</CardTitle>
            <CardDescription>
              Escolha seu tipo de conta e preencha os dados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="candidato" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Candidato
                </TabsTrigger>
                <TabsTrigger value="empresa" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Empresa
                </TabsTrigger>
              </TabsList>

              {/* Candidato Tab */}
              <TabsContent value="candidato" className="space-y-6 mt-6">
                {/* Social Login */}
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" type="button">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continuar com Google
                  </Button>
                  
                  <Button variant="outline" className="w-full" type="button">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Continuar com Facebook
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">ou</span>
                  </div>
                </div>

                <form onSubmit={handleCandidatoSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                      Nome completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="nome"
                        type="text"
                        placeholder="Seu nome completo"
                        value={candidatoData.nome}
                        onChange={(e) => setCandidatoData({...candidatoData, nome: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email-candidato" className="text-sm font-medium text-gray-700">
                      E-mail
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="email-candidato"
                        type="email"
                        placeholder="seu@email.com"
                        value={candidatoData.email}
                        onChange={(e) => setCandidatoData({...candidatoData, email: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="senha-candidato" className="text-sm font-medium text-gray-700">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="senha-candidato"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mínimo 8 caracteres"
                        value={candidatoData.senha}
                        onChange={(e) => setCandidatoData({...candidatoData, senha: e.target.value})}
                        className="pl-10 pr-10"
                        minLength={8}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmar-senha-candidato" className="text-sm font-medium text-gray-700">
                      Confirmar senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="confirmar-senha-candidato"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirme sua senha"
                        value={candidatoData.confirmarSenha}
                        onChange={(e) => setCandidatoData({...candidatoData, confirmarSenha: e.target.value})}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-sm">
                    <label className="flex items-start space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 mt-1" required />
                      <span className="text-gray-600">
                        Concordo com os{' '}
                        <Link to="/termos" className="text-blue-600 hover:text-blue-700">
                          termos de uso
                        </Link>{' '}
                        e{' '}
                        <Link to="/privacidade" className="text-blue-600 hover:text-blue-700">
                          política de privacidade
                        </Link>
                      </span>
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Criar conta como candidato
                  </Button>
                </form>
              </TabsContent>

              {/* Empresa Tab */}
              <TabsContent value="empresa" className="space-y-6 mt-6">
                <form onSubmit={handleEmpresaSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="nome-empresa" className="text-sm font-medium text-gray-700">
                      Nome da empresa
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="nome-empresa"
                        type="text"
                        placeholder="Nome da sua empresa"
                        value={empresaData.nomeEmpresa}
                        onChange={(e) => setEmpresaData({...empresaData, nomeEmpresa: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cnpj" className="text-sm font-medium text-gray-700">
                      CNPJ
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="cnpj"
                        type="text"
                        placeholder="00.000.000/0000-00"
                        value={empresaData.cnpj}
                        onChange={(e) => setEmpresaData({...empresaData, cnpj: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email-empresa" className="text-sm font-medium text-gray-700">
                      E-mail corporativo
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="email-empresa"
                        type="email"
                        placeholder="contato@empresa.com"
                        value={empresaData.email}
                        onChange={(e) => setEmpresaData({...empresaData, email: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="senha-empresa" className="text-sm font-medium text-gray-700">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="senha-empresa"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mínimo 8 caracteres"
                        value={empresaData.senha}
                        onChange={(e) => setEmpresaData({...empresaData, senha: e.target.value})}
                        className="pl-10 pr-10"
                        minLength={8}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmar-senha-empresa" className="text-sm font-medium text-gray-700">
                      Confirmar senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="confirmar-senha-empresa"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirme sua senha"
                        value={empresaData.confirmarSenha}
                        onChange={(e) => setEmpresaData({...empresaData, confirmarSenha: e.target.value})}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-sm">
                    <label className="flex items-start space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 mt-1" required />
                      <span className="text-gray-600">
                        Concordo com os{' '}
                        <Link to="/termos" className="text-blue-600 hover:text-blue-700">
                          termos de uso
                        </Link>{' '}
                        e{' '}
                        <Link to="/privacidade" className="text-blue-600 hover:text-blue-700">
                          política de privacidade
                        </Link>
                      </span>
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Criar conta empresarial
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="text-center text-sm text-gray-600 mt-6">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Faça login
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;
