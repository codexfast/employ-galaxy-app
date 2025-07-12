
import { useState, useEffect } from 'react';
import { Search, Building, MapPin, Users, Globe, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';

const Empresas = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sector, setSector] = useState('');
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('company_profiles')
        .select(`
          *,
          jobs!jobs_company_id_fkey (
            id,
            title,
            is_active
          )
        `)
        .not('company_name', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCompanies(data || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = !searchTerm || 
      company.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSector = !sector || sector === 'all' || company.sector === sector;

    return matchesSearch && matchesSector;
  });

  const getSectorLabel = (sectorValue: string) => {
    const sectors: { [key: string]: { pt: string; en: string; ja: string } } = {
      'IT': { pt: 'Tecnologia', en: 'Technology', ja: 'テクノロジー' },
      'retail': { pt: 'Varejo', en: 'Retail', ja: '小売' },
      'construction': { pt: 'Construção', en: 'Construction', ja: '建設' },
      'manufacturing': { pt: 'Manufatura', en: 'Manufacturing', ja: '製造業' },
      'services': { pt: 'Serviços', en: 'Services', ja: 'サービス' },
      'education': { pt: 'Educação', en: 'Education', ja: '教育' },
      'healthcare': { pt: 'Saúde', en: 'Healthcare', ja: '医療' },
      'tourism': { pt: 'Turismo', en: 'Tourism', ja: '観光' },
      'food': { pt: 'Alimentação', en: 'Food', ja: '食品' },
      'logistics': { pt: 'Logística', en: 'Logistics', ja: '物流' },
      'other': { pt: 'Outros', en: 'Other', ja: 'その他' }
    };
    return sectors[sectorValue]?.[useLanguage().language] || sectorValue;
  };

  const getActiveJobsCount = (company: any) => {
    return company.jobs?.filter((job: any) => job.is_active).length || 0;
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
              <Link to="/vagas" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('nav.jobs')}
              </Link>
              <Link to="/empresas" className="text-blue-600 font-medium">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('companies.title')}</h1>
          <p className="text-xl text-gray-600">{t('companies.subtitle')}</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Buscar empresas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
                  setSector('');
                }}
                variant="outline"
              >
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Companies List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Carregando empresas...</p>
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-12">
            <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('companies.noCompanies')}</h3>
            <p className="text-gray-600">Tente ajustar os filtros de pesquisa</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <Card key={company.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      {company.logo_url ? (
                        <img 
                          src={company.logo_url} 
                          alt={company.company_name}
                          className="w-12 h-12 object-contain rounded"
                        />
                      ) : (
                        <Building className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{company.company_name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mb-2">
                        {company.sector && (
                          <Badge variant="outline">{getSectorLabel(company.sector)}</Badge>
                        )}
                        {company.is_verified && (
                          <Badge className="bg-green-100 text-green-800">Verificada</Badge>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {company.description && (
                      <p className="text-gray-700 text-sm line-clamp-3">
                        {company.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {company.address && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {company.address}
                        </div>
                      )}
                      {company.employee_count && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {company.employee_count} {t('companies.employees')}
                        </div>
                      )}
                      {company.website && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          <a 
                            href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Website
                          </a>
                        </div>
                      )}
                    </div>

                    {company.founded_year && (
                      <p className="text-sm text-gray-600">
                        Fundada em {company.founded_year}
                      </p>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="text-sm text-gray-600">
                        {getActiveJobsCount(company)} vagas ativas
                      </span>
                      <Link to="/vagas">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          {t('companies.viewJobs')}
                        </Button>
                      </Link>
                    </div>
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

export default Empresas;
