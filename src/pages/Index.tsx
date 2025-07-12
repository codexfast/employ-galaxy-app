import { useState } from 'react';
import { Search, MapPin, Briefcase, Users, Building, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';

const Index = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  // Mock data para vagas empreiteiras no Japão
  const featuredJobs = [
    {
      id: 1,
      title: 'Carpinteiro - Construção Residencial',
      company: 'Tokyo Construction Co.',
      location: 'Tokyo, Shibuya',
      type: 'Meio Período',
      salary: '¥1,500 - ¥2,000/hora',
      description: 'Trabalho de carpintaria em construção residencial. Experiência com madeira tradicional japonesa é um diferencial.',
      tags: ['Carpintaria', 'Construção', 'Meio Período'],
      sector: 'Construção'
    },
    {
      id: 2,
      title: 'Soldador Industrial',
      company: 'Osaka Steel Works',
      location: 'Osaka, Namba',
      type: 'Tempo Integral',
      salary: '¥2,200 - ¥2,800/hora',
      description: 'Soldagem em estruturas industriais. Certificação de soldagem necessária.',
      tags: ['Soldagem', 'Industrial', 'Certificação'],
      sector: 'Manufatura'
    },
    {
      id: 3,
      title: 'Eletricista Residencial',
      company: 'Nagoya Electric Service',
      location: 'Nagoya, Sakae',
      type: 'Contrato',
      salary: '¥1,800 - ¥2,500/hora',
      description: 'Instalação e manutenção elétrica residencial. Conhecimento do sistema elétrico japonês é preferencial.',
      tags: ['Elétrica', 'Residencial', 'Manutenção'],
      sector: 'Serviços'
    }
  ];

  const stats = [
    { icon: Briefcase, label: t('stats.activeJobs'), value: '1,234' },
    { icon: Users, label: t('stats.candidates'), value: '5,678' },
    { icon: Building, label: t('stats.companies'), value: '234' },
    { icon: TrendingUp, label: t('stats.hires'), value: '892' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Jobsnow</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/vagas" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('nav.jobs')}
              </Link>
              <Link to="/empresas" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('nav.companies')}
              </Link>
              <Link to="/sobre" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('nav.about')}
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <LanguageSelector />
              <Link to="/login">
                <Button variant="outline">{t('nav.login')}</Button>
              </Link>
              <Link to="/registro">
                <Button className="bg-blue-600 hover:bg-blue-700">{t('nav.register')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            {t('home.title')} <span className="text-blue-600">{t('home.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            {t('home.subtitle')}
          </p>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder={t('home.searchPlaceholder')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder={t('home.locationPlaceholder')}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                  <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
                    {t('home.searchButton')}
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('home.featuredJobs')}</h3>
            <p className="text-lg text-gray-600">Vagas empreiteiras no Japão com pagamento por hora</p>
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
                  <div className="mb-3">
                    <Badge variant="outline" className="text-xs mb-2">
                      {job.sector}
                    </Badge>
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
                      {t('home.applyButton')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/vagas">
              <Button variant="outline" size="lg">
                {t('home.viewAllJobs')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            {t('home.ctaTitle')}
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('home.ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registro?tipo=candidato">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                {t('home.candidateButton')}
              </Button>
            </Link>
            <Link to="/registro?tipo=empresa">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                {t('home.companyButton')}
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
                <span className="text-xl font-bold">Jobsnow</span>
              </div>
              <p className="text-gray-400">Conectando talentos com oportunidades no Japão desde 2020.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.forCandidates')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/vagas" className="hover:text-white">{t('footer.searchJobs')}</Link></li>
                <li><Link to="/registro" className="hover:text-white">{t('footer.createProfile')}</Link></li>
                <li><Link to="/dicas" className="hover:text-white">{t('footer.careerTips')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.forCompanies')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/publicar-vaga" className="hover:text-white">{t('footer.publishJob')}</Link></li>
                <li><Link to="/planos" className="hover:text-white">{t('footer.plans')}</Link></li>
                <li><Link to="/contato" className="hover:text-white">{t('footer.contact')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/ajuda" className="hover:text-white">{t('footer.helpCenter')}</Link></li>
                <li><Link to="/privacidade" className="hover:text-white">{t('footer.privacy')}</Link></li>
                <li><Link to="/termos" className="hover:text-white">{t('footer.terms')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
