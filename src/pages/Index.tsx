
import { useState } from 'react';
import { Search, MapPin, Briefcase, Users, Building, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  // Mock data para vagas
  const featuredJobs = [
    {
      id: 1,
      title: 'Desenvolvedor Frontend React',
      company: 'TechCorp Brasil',
      location: 'São Paulo, SP',
      type: 'CLT',
      salary: 'R$ 8.000 - R$ 12.000',
      description: 'Desenvolvedor React sênior para projetos inovadores...',
      tags: ['React', 'TypeScript', 'Remote']
    },
    {
      id: 2,
      title: 'Analista de Marketing Digital',
      company: 'Marketing Plus',
      location: 'Rio de Janeiro, RJ',
      type: 'PJ',
      salary: 'R$ 5.000 - R$ 8.000',
      description: 'Profissional para gerenciar campanhas digitais...',
      tags: ['Google Ads', 'SEO', 'Analytics']
    },
    {
      id: 3,
      title: 'Engenheiro de Software',
      company: 'StartupXYZ',
      location: 'Remoto',
      type: 'CLT',
      salary: 'R$ 10.000 - R$ 15.000',
      description: 'Engenheiro para arquitetura de sistemas escaláveis...',
      tags: ['Python', 'AWS', 'Docker']
    }
  ];

  const stats = [
    { icon: Briefcase, label: 'Vagas Ativas', value: '1,234' },
    { icon: Users, label: 'Candidatos', value: '5,678' },
    { icon: Building, label: 'Empresas', value: '234' },
    { icon: TrendingUp, label: 'Contratações', value: '892' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">JobConnect</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/vagas" className="text-gray-600 hover:text-blue-600 transition-colors">
                Vagas
              </Link>
              <Link to="/empresas" className="text-gray-600 hover:text-blue-600 transition-colors">
                Empresas
              </Link>
              <Link to="/sobre" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sobre
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline">Entrar</Button>
              </Link>
              <Link to="/registro">
                <Button className="bg-blue-600 hover:bg-blue-700">Cadastrar</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Encontre sua <span className="text-blue-600">vaga ideal</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Conectamos talentos com oportunidades incríveis. Milhares de vagas em empresas 
            que valorizam diversidade e crescimento profissional.
          </p>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Cargo, palavra-chave ou empresa"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Cidade, estado ou remoto"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
                    Buscar Vagas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Vagas em Destaque</h3>
            <p className="text-lg text-gray-600">Oportunidades selecionadas especialmente para você</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{job.type}</Badge>
                    <span className="text-sm text-gray-500">{job.salary}</span>
                  </div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    {job.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link to="/login">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Candidatar-se
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/vagas">
              <Button variant="outline" size="lg">
                Ver Todas as Vagas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Pronto para encontrar sua próxima oportunidade?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Cadastre-se gratuitamente e tenha acesso a milhares de vagas exclusivas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registro?tipo=candidato">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Sou Candidato
              </Button>
            </Link>
            <Link to="/registro?tipo=empresa">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Sou Empresa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">JobConnect</span>
              </div>
              <p className="text-gray-400">Conectando talentos com oportunidades desde 2024.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para Candidatos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/vagas" className="hover:text-white">Buscar Vagas</Link></li>
                <li><Link to="/registro" className="hover:text-white">Criar Perfil</Link></li>
                <li><Link to="/dicas" className="hover:text-white">Dicas de Carreira</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para Empresas</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/publicar-vaga" className="hover:text-white">Publicar Vaga</Link></li>
                <li><Link to="/planos" className="hover:text-white">Planos</Link></li>
                <li><Link to="/contato" className="hover:text-white">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/ajuda" className="hover:text-white">Central de Ajuda</Link></li>
                <li><Link to="/privacidade" className="hover:text-white">Privacidade</Link></li>
                <li><Link to="/termos" className="hover:text-white">Termos de Uso</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JobConnect. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
