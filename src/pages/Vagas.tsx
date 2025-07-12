
import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Building, Clock, DollarSign, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';

const Vagas = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [sector, setSector] = useState('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          company_profiles (
            company_name,
            logo_url
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchTerm || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_profiles?.company_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = !location || 
      job.location.toLowerCase().includes(location.toLowerCase());
    
    const matchesJobType = !jobType || job.job_type === jobType;
    const matchesSector = !sector || job.sector === sector;

    return matchesSearch && matchesLocation && matchesJobType && matchesSector;
  });

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return null;
    if (min && max) return `¥${min.toLocaleString()} - ¥${max.toLocaleString()}`;
    if (min) return `A partir de ¥${min.toLocaleString()}`;
    if (max) return `Até ¥${max.toLocaleString()}`;
    return null;
  };

  const getJobTypeLabel = (type: string) => {
    const types: { [key: string]: { pt: string; en: string; ja: string } } = {
      'full_time': { pt: 'Tempo Integral', en: 'Full Time', ja: 'フルタイム' },
      'part_time': { pt: 'Meio Período', en: 'Part Time', ja: 'パートタイム' },
      'contract': { pt: 'Contrato', en: 'Contract', ja: '契約' },
      'internship': { pt: 'Estágio', en: 'Internship', ja: 'インターンシップ' },
      'freelance': { pt: 'Freelance', en: 'Freelance', ja: 'フリーランス' }
    };
    return types[type]?.[useLanguage().language] || type;
  };

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
              <Link to="/vagas" className="text-blue-600 font-medium">
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

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('jobs.title')}</h1>
          <p className="text-xl text-gray-600">{t('jobs.subtitle')}</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder={t('home.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder={t('home.locationPlaceholder')}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Vaga" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="full_time">Tempo Integral</SelectItem>
                  <SelectItem value="part_time">Meio Período</SelectItem>
                  <SelectItem value="contract">Contrato</SelectItem>
                  <SelectItem value="internship">Estágio</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger>
                  <SelectValue placeholder="Setor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os setores</SelectItem>
                  <SelectItem value="IT">Tecnologia</SelectItem>
                  <SelectItem value="retail">Varejo</SelectItem>
                  <SelectItem value="construction">Construção</SelectItem>
                  <SelectItem value="manufacturing">Manufatura</SelectItem>
                  <SelectItem value="services">Serviços</SelectItem>
                  <SelectItem value="education">Educação</SelectItem>
                  <SelectItem value="healthcare">Saúde</SelectItem>
                  <SelectItem value="tourism">Turismo</SelectItem>
                  <SelectItem value="food">Alimentação</SelectItem>
                  <SelectItem value="logistics">Logística</SelectItem>
                  <SelectItem value="other">Outros</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setLocation('');
                  setJobType('');
                  setSector('');
                }}
                variant="outline"
              >
                <Filter className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Carregando vagas...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('jobs.noJobs')}</h3>
            <p className="text-gray-600">Tente ajustar os filtros de pesquisa</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mb-2">
                        <Building className="h-4 w-4" />
                        {job.company_profiles?.company_name}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {getJobTypeLabel(job.job_type)}
                        </div>
                        {formatSalary(job.salary_min, job.salary_max) && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {formatSalary(job.salary_min, job.salary_max)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="secondary">{getJobTypeLabel(job.job_type)}</Badge>
                      <Badge variant="outline">{job.sector}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {job.description}
                  </p>
                  {job.requirements && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Requisitos:</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{job.requirements}</p>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Publicado em {new Date(job.created_at).toLocaleDateString('pt-BR')}
                    </span>
                    <Link to="/login">
                      <Button className="bg-green-600 hover:bg-green-700">
                        {t('home.applyButton')}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vagas;
