
import { Link } from 'react-router-dom';
import { Briefcase, Users, Target, Award, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';

const Sobre = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Target,
      title: 'Missão',
      description: 'Conectar talentos brasileiros com oportunidades de trabalho no Japão, facilitando a integração cultural e profissional.'
    },
    {
      icon: Heart,
      title: 'Valores',
      description: 'Transparência, respeito cultural, suporte contínuo e crescimento mútuo entre candidatos e empresas.'
    },
    {
      icon: Globe,
      title: 'Visão',
      description: 'Ser a principal ponte entre profissionais brasileiros e o mercado de trabalho japonês.'
    }
  ];

  const team = [
    {
      name: 'Yuki Tanaka',
      role: 'CEO & Fundador',
      description: 'Especialista em RH internacional com 10 anos de experiência no mercado japonês.'
    },
    {
      name: 'Carlos Silva',
      role: 'Head de Operações',
      description: 'Brasileiro residente no Japão há 8 anos, expert em integração cultural.'
    },
    {
      name: 'Akiko Yamamoto',
      role: 'Gerente de Parcerias',
      description: 'Responsável pelas relações com empresas japonesas e recrutamento.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Jobsnow</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/vagas" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('nav.jobs')}
              </Link>
              <Link to="/empresas" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('nav.companies')}
              </Link>
              <Link to="/sobre" className="text-blue-600 font-medium">
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

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Sobre a <span className="text-blue-600">Jobsnow</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos uma plataforma especializada em conectar profissionais brasileiros 
            com oportunidades de trabalho no Japão, oferecendo suporte completo 
            para uma transição cultural e profissional bem-sucedida.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-none">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa História</h2>
                  <p className="text-gray-700 mb-4">
                    A Jobsnow nasceu da experiência pessoal de brasileiros que enfrentaram 
                    os desafios de trabalhar no Japão. Percebemos a necessidade de uma 
                    plataforma que não apenas conectasse talentos com oportunidades, 
                    mas que também oferecesse suporte cultural e linguístico.
                  </p>
                  <p className="text-gray-700">
                    Desde 2020, já ajudamos mais de 2.000 profissionais brasileiros 
                    a encontrarem trabalho no Japão, criando uma ponte sólida entre 
                    duas culturas ricas e complementares.
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-600 rounded-full text-white mb-4">
                    <Users className="h-16 w-16" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">2,000+</p>
                  <p className="text-gray-600">Profissionais conectados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nossos Valores
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nossa Equipe
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-semibold">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <Card className="bg-blue-600 text-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">2,000+</div>
                  <div className="text-blue-100">Candidatos Conectados</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-blue-100">Empresas Parceiras</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">85%</div>
                  <div className="text-blue-100">Taxa de Sucesso</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">3+</div>
                  <div className="text-blue-100">Anos de Experiência</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-8">
              <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Pronto para sua jornada no Japão?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Junte-se a milhares de brasileiros que já encontraram oportunidades 
                incríveis no Japão através da nossa plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/registro?tipo=candidato">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Buscar Empregos
                  </Button>
                </Link>
                <Link to="/registro?tipo=empresa">
                  <Button size="lg" variant="outline">
                    Contratar Talentos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.forCompanies')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/registro?tipo=empresa" className="hover:text-white">Publicar Vaga</Link></li>
                <li><Link to="/sobre" className="hover:text-white">Sobre Nós</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/sobre" className="hover:text-white">Contato</Link></li>
                <li><Link to="/sobre" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t('footer.copyright')} Jobsnow 2024.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sobre;
