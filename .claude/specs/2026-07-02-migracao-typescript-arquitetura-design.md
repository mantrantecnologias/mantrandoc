# Migração do apps/docs para TypeScript + arquitetura do monorepo

Data: 2026-07-02

## Contexto

`apps/docs` (SPA de documentação técnica interna, hoje `Mantran.Documentacao.API`) foi copiado para o
monorepo com `.git` próprio ainda dentro da pasta (não versionado pelo git do monorepo — aparecia como
`?? apps/docs/`). Usa Create React App + JavaScript puro, navegação 100% via estado (`selectedContent` +
`scrollToSection`, sem React Router) e login hardcoded (`admin`/`senha456`) sem chamada a API.

Foram encontrados, já commitados no repo de origem:
- Conflito de merge não resolvido em `src/App.js` e `src/components/Sidebar.js`
  (`<<<<<<< HEAD` / `=======` / `>>>>>>>`), com um lado trazendo páginas de Seguradora e o outro
  Produto/RotaLivre/grupos de navegação (Veículo, Produto, Integrações).
- Arquivos órfãos duplicados (nomes quase idênticos, não importados por nada): `Interfaces_SaaS.js`,
  `LocalizeCargas_Rodoviario.js`, `WebAPI.CalculoFrete_Nader.js`, `API_BaixaCTe_Difalux.js`,
  `data/contentIndex.js`.
- Artefatos de build antigos (`build/`, `static/`) não referenciados pelo `public/index.html`.

## Objetivo

Migrar para TypeScript + Vite, alinhar à arquitetura do `apps/web` **na medida em que faz sentido** para um
site de documentação estático (sem CRUD, sem API de negócio) e trazê-lo para dentro do versionamento e do
Turborepo do monorepo. **O design visual das telas não muda** — é refatoração de arquitetura, não de UI.

## Decisões

1. **Conflito de merge:** resolvido como união dos dois lados (mantém Seguradora e Produto/RotaLivre/grupos).
2. **Arquivos órfãos:** removidos (não são importados por nada).
3. **Escopo de arquitetura:** TypeScript, Vite, ESLint/Prettier, aliases de import, testes em `tests/`,
   agrupamento por domínio — **sem** TanStack Query/Zod/React Hook Form/Zustand/`features` DDD (não há
   formulário de negócio nem CRUD neste app).
4. **Roteamento:** migra de navegação por estado para **React Router**. Cada página ganha URL própria;
   âncoras internas (sub-seções de uma mesma página) viram hash de URL (`#id-da-secao`) com um hook
   compartilhado de scroll, substituindo `sectionToPage` + o switch gigante em `App.js`.
5. **Build tool:** Create React App → Vite (mesma stack de build do `apps/web`).
6. **Autenticação:** deixa de ser hardcoded. Login chama `authGetToken` de `@repo/api-client`
   (`POST /api/auth/token`, mesmo endpoint que o `apps/web` usa) autenticando o usuário técnico
   **`suporte.mantran`**; sucesso libera a seção "Serviços". Sessão em memória (hook `useAuth`), sem
   Zustand — reseta ao recarregar a página, mesmo comportamento de hoje. Requer que `API_CORS_ALLOWED`
   (na API) inclua a origem de dev do docs — fora do escopo desta migração, é config de ambiente.
7. **`apiConfig.ts` (URL da API legada/TMS)** é conteúdo de documentação (exemplos de código nas próprias
   páginas), não infraestrutura do app — permanece constante, não vira env var.
8. **`.git` interno:** removido; conteúdo passa a ser versionado como parte do monorepo (histórico antigo
   preservado no GitLab de origem `Mantran.Documentacao.API`).
9. **Integração ao monorepo:** `package.json` renomeado para `"Mantran.Docs"`, entra no Turborepo
   (`npm run docs` na raiz), `.env` próprio (`DOCS_PORT`, `DOCS_API_URL`) com fallback na raiz — mesmo
   padrão de `apps/web`.

## Estrutura de pastas

```
apps/docs/src/
├── app/
│   ├── main.tsx
│   ├── App.tsx
│   └── router/AppRoutes.tsx
├── assets/
├── shared/
│   ├── components/   # Header, Sidebar, Login, ModalSearch, GenericContent
│   ├── hooks/        # useAuth, useDocSearch, useScrollToHash
│   ├── data/         # searchIndex.ts
│   ├── config/       # apiConfig.ts
│   └── routes/       # paths.ts
└── pages/
    ├── mantranApi/ (+ seguradora/)
    ├── sqlViews/
    ├── leoMadeirasApi/
    ├── signInSignOn/
    ├── webApiCalculoFrete/
    ├── webApiConhecimento/
    ├── webApi/
    └── servicos/ (routeasy/, leoMadeiras/, shopee/, bandeirantes/)
```

Aliases: `@app/*`, `@assets/*`, `@shared/*`, `@pages/*`. Componentes de página com sufixo `Page.tsx`
(mesmo padrão `<Entidade>Page.tsx` do `apps/web`). Testes em `tests/` espelhando `src/`.

## Fora de escopo

- Mudança de layout/estilo visual das páginas de documentação.
- Qualquer alteração em `apps/api` (o endpoint de login já existe e é reutilizado como está).
- Conteúdo técnico das documentações em si (texto, tabelas, exemplos) — só migração de forma/arquitetura.
