
# Sistema de Traduções - Jobsnow

## Como adicionar uma nova linguagem

### 1. Criar a estrutura de pastas
Para adicionar uma nova linguagem (ex: espanhol - 'es'), crie a pasta:
```
src/locales/es/
```

### 2. Criar arquivos de tradução
Copie todos os arquivos JSON das outras linguagens e traduza o conteúdo:

```
src/locales/es/navigation.json
src/locales/es/home.json
src/locales/es/stats.json
src/locales/es/register.json
src/locales/es/userType.json
src/locales/es/form.json
src/locales/es/button.json
src/locales/es/social.json
src/locales/es/terms.json
src/locales/es/jobs.json
src/locales/es/companies.json
src/locales/es/footer.json
```

### 3. Atualizar o tipo Language
No arquivo `src/hooks/useTranslations.tsx`, adicione a nova linguagem:

```typescript
export type Language = 'pt' | 'en' | 'ja' | 'es';
```

### 4. Atualizar o LanguageSelector
No arquivo `src/components/LanguageSelector.tsx`, adicione a nova opção:

```typescript
const languages = [
  { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
];
```

### 5. Atualizar validação no useTranslations
No arquivo `src/hooks/useTranslations.tsx`, adicione a nova linguagem na validação:

```typescript
const initialLang = (savedLang && ['pt', 'en', 'ja', 'es'].includes(savedLang)) ? savedLang : 'pt';
```

## Estrutura dos arquivos de tradução

Cada arquivo JSON deve conter apenas as traduções para uma seção específica:

```json
{
  "key1": "Tradução 1",
  "key2": "Tradução 2",
  "key3": "Tradução 3"
}
```

## Benefícios desta arquitetura

- ✅ **Escalável**: Fácil adicionar novas linguagens
- ✅ **Organizadas**: Traduções separadas por seção
- ✅ **Performance**: Carregamento sob demanda
- ✅ **Cache**: Evita recarregar traduções
- ✅ **Manutenível**: Fácil encontrar e editar traduções
- ✅ **Compatibilidade**: Mantém API antiga funcionando

## Como usar no código

### Nova API (recomendada):
```typescript
import { useTranslations } from '@/hooks/useTranslations';

const { t } = useTranslations();
const text = t('navigation', 'jobs'); // Seção e chave
```

### API antiga (compatibilidade):
```typescript
import { useLanguage } from '@/hooks/useLanguage';

const { t } = useLanguage();
const text = t('nav.jobs'); // Chave com ponto
```
