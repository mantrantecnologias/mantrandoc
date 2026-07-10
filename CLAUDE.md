# Mantran.Docs

SPA React 19 + TypeScript de documentação técnica interna da empresa **Mantran** (transportadora). Documenta
APIs .NET, serviços Windows e integrações legadas. Leia os arquivos de contexto antes de gerar código.
Regras transversais do monorepo: `../../CLAUDE.md`.

---

## Monorepo

App do monorepo **Mantran.Applications** (Turborepo + npm workspaces). App irmão: `apps/web` (mesma stack de
build) e `apps/api` (fonte do login usado pela seção "Serviços" deste app). Config local: `.env` próprio
(`apps/docs/.env`, prefixo `DOCS_*`), autossuficiente para deploy isolado; `.env` da raiz é fallback de dev.
Execução: `npm run docs` (ou `dev`/`build`/`lint`/`check-types`/`test` via Turborepo) a partir da raiz.

---

## Stack

React 19 · TypeScript · Vite · React Router · Tailwind CSS · Vitest + Testing Library · ESLint

**Sem** TanStack Query / Zod / React Hook Form / Zustand — este app não tem CRUD nem formulários de negócio,
só conteúdo estático + uma única chamada de login (ver §Autenticação). O único ponto de contato com HTTP é
`authLogin`, importado direto de `@repo/api-client` (mesmo pacote/endpoint que o `apps/web` usa).

---

## Estrutura de pastas

```
src/
├── app/
│   ├── main.tsx              # bootstrap
│   ├── App.tsx                # layout (Header + Sidebar/Login + ModalSearch) + <Routes> de topo
│   ├── router/AppRoutes.tsx   # rotas de conteúdo, uma por página de documentação
│   └── pages/                 # HomePage, LoginPage — páginas do app, não de conteúdo de domínio
├── assets/                    # logo
├── shared/
│   ├── components/            # Header, Sidebar, ModalSearch, GenericContent, TokenNotice
│   ├── hooks/                 # useAuth, useScrollToHash
│   ├── data/                  # searchIndex.ts
│   ├── config/                # apiConfig.ts (URL da API LEGADA documentada — não confundir com a API do monorepo)
│   └── routes/paths.ts        # constantes de rota (path por página)
└── pages/                     # conteúdo de documentação, agrupado por família (prefixo de domínio)
    ├── mantranApi/ (+ seguradora/)
    ├── sqlViews/, leoMadeirasApi/, signInSignOn/, webApiCalculoFrete/, webApiConhecimento/, webApi/
    └── servicos/ (routeasy/, leoMadeiras/, shopee/, bandeirantes/)
```

Aliases: `@app/*`, `@assets/*`, `@shared/*`, `@pages/*`. Nomenclatura de página: sufixo `Page.tsx`
(`MantranApiEmpresaPage.tsx`). Testes em `tests/` espelhando `src/`.

---

## Roteamento

Cada página de documentação é uma rota real (`react-router-dom`), declarada em `src/shared/routes/paths.ts`
e registrada em `src/app/router/AppRoutes.tsx`. **Não existe mais** o padrão antigo de navegação por estado
(`selectedContent`/`scrollToSection` + `sectionToPage` + switch gigante em `App.js`) — isso foi eliminado na
migração para TypeScript (2026-07-02).

Sub-seções dentro de uma mesma página (ex.: os 5 endpoints de Embalagem) usam **hash de URL**
(`/mantran-api/embalagem#embalagem_incluir`) em vez de uma segunda rota. O scroll suave até o elemento com
esse `id` é feito automaticamente pelo hook `useScrollToHash` (`@shared/hooks/useScrollToHash`), chamado uma
única vez dentro de `GenericContent` — páginas de conteúdo **não** implementam scroll próprio.

### Checklist para adicionar uma nova página de documentação

- [ ] Criar arquivo em `src/pages/<familia>/<Entidade>Page.tsx` (agrupar por família quando 2+ páginas
      compartilham prefixo de domínio — mesma regra do `apps/web`).
- [ ] Primeira `<section>` da página tem `id` igual ao anchor que será usado nos links de busca/deep-link.
- [ ] Página pública ou privada: incluir `<TokenNotice />` (`@shared/components/TokenNotice`) logo no topo do
      `content`, antes do primeiro `<h4>` — aviso obrigatório em toda página (ver §Padrões de documentação).
- [ ] Adicionar a rota em `src/shared/routes/paths.ts` e registrar `<Route>` em `src/app/router/AppRoutes.tsx`.
- [ ] `src/shared/components/Sidebar.tsx`: adicionar entrada no array `navItems`/`servicesItems`
      (`leaf`/`nested`/`group`, com `private: true` quando aplicável).
- [ ] `src/shared/data/searchIndex.ts`: adicionar uma ou mais entradas (`path`, `hash`, `page`, `label`,
      `content`, `private?`) para cada seção pesquisável da página.

---

## Autenticação

Login real via `authLogin` (`@repo/api-client`, `POST /api/auth/login` da `apps/api` — grava o cookie
`HttpOnly`), autenticando sempre o usuário técnico **`suporte.mantran`** (campo de usuário fixo/readonly na
tela de login — só a senha é digitada). Login bem-sucedido libera a seção "Serviços" no Sidebar. O booleano
`isLoggedIn` fica em memória (`useAuth`, `@shared/hooks/useAuth`) — sem persistência, reseta ao recarregar a
página; a sessão em si vive no cookie, não em localStorage. Sem Zustand: o hook é instanciado uma vez em
`App.tsx` e as props (`isLoggedIn`/`login`/`isLoading`/`error`) descem para `Header`/`Sidebar`/`LoginPage`.

**Nota:** isso não é um controle de acesso real às páginas — o Sidebar só *esconde* os links privados; as
páginas em si continuam no bundle e acessíveis por URL direta a quem souber o path. Mesmo comportamento do
app anterior (o switch de `App.js` nunca checava `isLoggedIn`), não é uma regressão.

Requer que `API_CORS_ALLOWED` (config da `apps/api`) inclua a origem de dev deste app — configuração de
ambiente, fora do código deste repo.

---

## Controle de acesso (Público vs. Privado)

A seção **Serviços** no sidebar só aparece quando `isLoggedIn === true`. Dentro de "Mantran.API - Principal",
cada subitem pode ter a flag `private: true` — filtrada em `Sidebar.tsx` (`visibleLeaves`). Submenus privados
exibem um ícone de cadeado; públicos, um check verde.

---

## Padrões de documentação de endpoints .NET

Ao receber um controller C# para documentar, seguir esta estrutura de seções:

1. **Visão Geral** — tabela resumo com Método / Rota / Descrição (sem coluna de Role)
2. **Controle de Permissão** (se houver `Checar_Permissao_Processo`) — tabela com códigos e exemplo de resposta 403
3. **Modelo de Dados** — tabela dos campos do transport class, agrupados por categoria quando há muitos campos
4. **Um endpoint por seção** — cada seção contém: requisição (code-block), resposta 200 (code-block), tabela de respostas de erro, implementação (code-block opcional)

### Regras obrigatórias de conteúdo

- **`<TokenNotice />` em toda página da seção "APIs"** (pública ou privada no sidebar) — endpoints documentados
  aí exigem token de acesso, então o aviso deve aparecer no topo do `content`. **Não se aplica** às páginas da
  seção "Serviços" (`pages/servicos/`) — documentam integrações/rotinas internas, não endpoints que o leitor
  chama diretamente com um token, então não recebem o aviso (assim já era no app original).
- **Nunca expor roles** — Nomes de roles (`tms_web`, `rota_livre`, etc.) são informação interna e **não devem aparecer** na documentação. Isso inclui: coluna "Role" na tabela de visão geral, seções de autenticação que mencionam a role, e descrições de erro 403. O 403 deve ser descrito simplesmente como `"Sem permissão de acesso"`.

### Padrão de resposta de erro (endpoints da API legada/TMS documentados aqui):
```json
{
  "sucesso": false,
  "mensagem": ["mensagem de erro"],
  "data": null,
  "codigo": 500
}
```

### StatusCodes padrão Mantran:
- `200` — sucesso
- `400` — bad request / validação
- `401` — token ausente ou inválido
- `403` — autorizado mas sem permissão de processo
- `422` — ValidacaoException (regra de negócio)
- `500` — erro genérico

---

## Informações técnicas da API legada (TMS) documentada por este app

- **BaseController** — todos os controllers herdam. Métodos: `Resposta<T>()` e `GetItem<T>(key)`
- **Conexao_Transp** — objeto de conexão multi-tenant injetado via `HttpContext.Items["CONEXAO"]` pelo `ConexaoMiddleware`
- **Retorno_Modelo_API_Transp\<T\>** — envelope padrão de todas as respostas. Métodos: `.Ok(data, msg)` e `.Erro(msg, codigo)`
- **Role obrigatória em todos os endpoints:** `[Authorize(Roles = "tms_web")]`
- **Permissão extra:** `Funcao_Negocio.Checar_Permissao_Processo(codigo, descricao, "Parametro", obj_cn)`

`src/shared/config/apiConfig.ts` centraliza a URL de produção dessa API legada (`API_BASE_URL`) — é
**conteúdo de documentação** (usado em exemplos de código dentro das próprias páginas), não infraestrutura
deste app. Não confundir com `apps/api` (API nova do monorepo, usada só para o login de `suporte.mantran`).

```
POST http://api.mantran.eti.br:35390/api/Token/gerar-token
Content-Type: application/json

{ "usuario": "seu_usuario", "senha": "sua_senha" }
```

Retorna string JWE com validade de 8 horas.

---

## Tasks

### Concluídas recentemente

- **✅ Migração para TypeScript + arquitetura do monorepo** (2026-07-02) — CRA → Vite, navegação por estado →
  React Router (páginas viram rotas reais; sub-seções viram hash de URL + `useScrollToHash`), login
  hardcoded → `authGetToken` real (`suporte.mantran`), `.git` interno removido (era o repo standalone
  `Mantran.Documentacao.API`), conflito de merge em `App.js`/`Sidebar.js` resolvido como união (Seguradora +
  Produto/RotaLivre/grupos), arquivos órfãos e artefatos de build antigos removidos. Design em
  `.claude/specs/2026-07-02-migracao-typescript-arquitetura-design.md`.
