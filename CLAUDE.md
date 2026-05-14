# CLAUDE.md — Mantran.Documentacao.API

Guia de referência para o assistente de IA sobre padrões, arquitetura e convenções deste projeto.

---

## 1. Visão Geral do Projeto

SPA React 19 de documentação técnica interna da empresa **Mantran** (transportadora). Documenta APIs .NET, serviços Windows e integrações. Não usa React Router — navegação é 100% via estado (`selectedContent` + `scrollToSection`).

- **Stack:** React 19, Tailwind CSS, Create React App (react-scripts 5.0.1)
- **Estilo:** Tailwind para layout/UI + classes CSS customizadas em `src/index.css` para o conteúdo das documentações
- **Autenticação:** login local hardcoded em `src/components/Login.js` (`admin` / `senha456`) — só libera a seção de Serviços e submenus privados

---

## 2. Estrutura de Arquivos

```
src/
├── App.js                          # Roteamento central e estado global
├── index.css                       # Classes CSS do conteúdo das documentações
├── components/
│   ├── Header.js                   # Barra superior vermelha (bg-red-700)
│   ├── Sidebar.js                  # Menu lateral com controle público/privado
│   ├── Login.js                    # Tela de login
│   └── ModalSearch.js              # Modal de busca global
├── data/
│   └── searchIndex.js              # Índice flat de todas as seções para busca
└── pages/
    ├── GenericContent.js           # Wrapper de página (título + conteúdo)
    ├── MantranAPI_Principal/       # ← PASTA DO PROJETO PRINCIPAL
    │   ├── MantranAPI_Login.js         (Arquitetura)
    │   ├── MantranAPI_Login_Auth.js    (Login/Auth)
    │   ├── MantranAPI_Empresa.js       (Empresa)
    │   ├── MantranAPI_Filial.js        (Filial)
    │   └── MantranAPI_GerarToken.js    (Gerar Token - público)
    ├── MantranSQLViews/
    ├── LeoMadeirasAPI/
    ├── SignIn_SignOn/
    ├── WebAPI.CalculoFrete/
    ├── WebAPI.Conhecimento/
    ├── LocalizeCargas_Rodoviario/
    ├── WebAPIMobile/
    ├── Routeasy_Comprovei_Leo/
    └── Servico/
        ├── Bandeirantes/
        ├── LeoMadeiras/
        └── Shopee/
```

---

## 3. Como a Navegação Funciona

`App.js` mantém dois estados:
- `selectedContent` — string que identifica qual página renderizar (ex: `'Mantran.API - Principal'`)
- `scrollToSection` — string com o id da seção para scroll automático (ex: `'mantran_api_empresa'`)

### 3.1 Fluxo ao clicar no sidebar

```
Sidebar clica em sub.id (ex: 'mantran_api_empresa')
    ↓
App.js: sectionToPage['mantran_api_empresa'] → 'Mantran.API - Principal'
    ↓
handleSelect('Mantran.API - Principal', 'mantran_api_empresa')
    ↓
renderContent() switch case 'Mantran.API - Principal'
    ↓
if (scrollToSection === 'mantran_api_empresa') return <MantranAPI_Empresa .../>
```

### 3.2 sectionToPage (App.js)

Todo novo submenu DEVE ter uma entrada aqui:
```js
const sectionToPage = {
  'mantran_api_gerar_token':  'Mantran.API - Principal',
  'mantran_api_login':        'Mantran.API - Principal',
  'mantran_api_login_auth':   'Mantran.API - Principal',
  'mantran_api_empresa':      'Mantran.API - Principal',
  'mantran_api_filial':       'Mantran.API - Principal',
  // ... outras páginas
};
```

O valor DEVE ser idêntico ao case no switch de `renderContent()`.

### 3.3 Switch em renderContent() (App.js)

Para páginas com múltiplos submenus (como Mantran.API - Principal):
```js
case 'Mantran.API - Principal':
  if (scrollToSection === 'mantran_api_gerar_token') return <MantranAPI_GerarToken ... />;
  if (scrollToSection === 'mantran_api_login_auth')  return <MantranAPI_Login_Auth ... />;
  if (scrollToSection === 'mantran_api_empresa')     return <MantranAPI_Empresa ... />;
  if (scrollToSection === 'mantran_api_filial')      return <MantranAPI_Filial ... />;
  return <MantranAPI_Login ... />;  // default = Arquitetura
```

---

## 4. Controle de Acesso (Público vs. Privado)

### 4.1 Seções inteiras privadas

A seção **Serviços** no sidebar só aparece quando `isLoggedIn === true`.

### 4.2 Submenus privados dentro de uma seção pública

No `Sidebar.js`, cada subitem pode ter a flag `private: true`:
```js
subitems: [
  { id: 'mantran_api_gerar_token', label: 'Gerar Token' },           // público
  { id: 'mantran_api_login',       label: 'Arquitetura', private: true }, // privado
  { id: 'mantran_api_login_auth',  label: 'Login',       private: true }, // privado
  { id: 'mantran_api_empresa',     label: 'Empresa',     private: true }, // privado
  { id: 'mantran_api_filial',      label: 'Filial',      private: true }, // privado
]
```

A função `visibleSubitems()` filtra: `!sub.private || isLoggedIn`.
Submenus privados exibem um ícone de cadeado pequeno ao lado do nome.

---

## 5. Padrão de uma Página de Documentação

### 5.1 Estrutura base
```jsx
import React, { useEffect } from 'react';
import GenericContent from '../GenericContent';

const MinhaPagina = ({ scrollToSection, onNavigateToGerarToken }) => {

  useEffect(() => {
    if (scrollToSection) {
      const el = document.getElementById(scrollToSection);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    }
  }, [scrollToSection]);

  const content = (
    <div className="conteudo-div">

      {/* AVISO DE TOKEN — incluir em todas as páginas privadas */}
      <div style={{ background:'#fef9c3', border:'1px solid #fbbf24', borderRadius:'8px',
        padding:'14px 18px', marginBottom:'24px', display:'flex', alignItems:'center',
        gap:'10px', fontSize:'0.92rem', color:'#78350f' }}>
        <span style={{ fontSize:'1.1rem' }}>⚠</span>
        <span>
          Para acessar os endpoints desta documentação é necessário um token de acesso.{' '}
          <button onClick={onNavigateToGerarToken} style={{ background:'none', border:'none',
            padding:0, color:'#b91c1c', fontWeight:700, cursor:'pointer',
            textDecoration:'underline', fontSize:'inherit' }}>
            Clique aqui para ver como gerar o token
          </button>.
        </span>
      </div>

      <h4>Documentação Técnica — NomeController (TMS Web)</h4>

      <section id="id_da_primeira_secao">
        <h3>1. Visão Geral</h3>
        <p>...</p>
      </section>

    </div>
  );

  return <GenericContent title="Mantran.API — NomePágina" content={content} />;
};

export default MinhaPagina;
```

### 5.2 O ID da primeira section DEVE ser o mesmo que o id do submenu no Sidebar
```js
// Sidebar: { id: 'mantran_api_filial', label: 'Filial', private: true }
// Página:  <section id="mantran_api_filial">
```

---

## 6. Classes CSS do Conteúdo (`src/index.css`)

| Classe | Uso |
|---|---|
| `.conteudo-div` | Wrapper externo de toda documentação. `padding: 40px`, `max-width: 1000px` |
| `.conteudo-div section` | Card branco com sombra e efeito hover de elevação |
| `.conteudo-div h3` | Título de seção na cor primária (`--primary-color`) |
| `.conteudo-div h4` | Subtítulo de seção |
| `.conteudo-div p` | Parágrafo em `#546e7a` |
| `.code-block` | Bloco de código. Fundo escuro `#1e293b`, fonte monospace |
| `.data-table` | Tabela estilizada. Header com texto na cor primária, bordas arredondadas |

**Cor primária:** `#b91c1c` (vermelho `red-700` do Tailwind — igual à barra do Header)

### 6.1 Uso no JSX
```jsx
<pre className="code-block">{`código aqui`}</pre>
<table className="data-table">...</table>
```

---

## 7. Índice de Busca (`src/data/searchIndex.js`)

Array flat de objetos. Todo novo submenu/seção DEVE ter entrada aqui:
```js
{
  page: "Mantran.API - Principal",   // DEVE bater com o case do switch em App.js
  id: "mantran_api_filial",          // DEVE bater com o id da <section> na página
  label: "Filial — Visão Geral",     // texto exibido no resultado da busca
  content: "palavras chave separadas por espaço para busca full-text"
}
```

**Regra:** `page` deve ser idêntico ao valor do switch case em `renderContent()`. Múltiplas seções da mesma página têm o mesmo `page` e `id`s diferentes.

---

## 8. Passando Navegação para Páginas Privadas

Páginas que precisam de link para "Gerar Token" recebem a prop `onNavigateToGerarToken`:

**Em App.js:**
```jsx
if (scrollToSection === 'mantran_api_filial')
  return <MantranAPI_Filial
    scrollToSection={scrollToSection}
    onNavigateToGerarToken={() => handleSelect('Mantran.API - Principal', 'mantran_api_gerar_token')}
  />;
```

**Na página:**
```jsx
const MinhaPagina = ({ scrollToSection, onNavigateToGerarToken }) => { ... }
```

---

## 9. Checklist para Adicionar um Novo Submenu

- [ ] Criar arquivo em `src/pages/NomePasta/NomePagina.js`
- [ ] Primeira `<section>` da página tem `id` igual ao id do submenu
- [ ] Incluir aviso de token se a página for privada
- [ ] Sidebar.js: adicionar `{ id: '...', label: '...', private: true/false }` no array subitems correto
- [ ] App.js: adicionar import da página
- [ ] App.js: adicionar entrada em `sectionToPage`
- [ ] App.js: adicionar `if (scrollToSection === '...')` no switch case
- [ ] App.js: passar `onNavigateToGerarToken` se a página for privada
- [ ] `searchIndex.js`: adicionar entradas para todas as seções da página

---

## 10. Páginas Existentes e seus IDs

### APIs (seção pública no sidebar)

| Submenu | ID | Página | Arquivo |
|---|---|---|---|
| Gerar Token | `mantran_api_gerar_token` | Mantran.API - Principal | MantranAPI_GerarToken.js |
| Arquitetura *(privado)* | `mantran_api_login` | Mantran.API - Principal | MantranAPI_Login.js |
| Login *(privado)* | `mantran_api_login_auth` | Mantran.API - Principal | MantranAPI_Login_Auth.js |
| Empresa *(privado)* | `mantran_api_empresa` | Mantran.API - Principal | MantranAPI_Empresa.js |
| Filial *(privado)* | `mantran_api_filial` | Mantran.API - Principal | MantranAPI_Filial.js |
| Views | `section_buscar_dados_view` | Mantran - SQL Views | MantranSQLViews.js |
| Consulta NF | `section_consulta_pagina` | Mantran.Leo_Madeiras.API | LeoMadeirasAPI.js |
| Interfaces SaaS | `section_interfaces_saas` | Web API Interfaces | Interfaces_SaaS.js |
| Integração SSO | `section_tms_leo_web` | Sign In Sign On | TMSLeoWeb.js |
| Cotação | `section_api_nader_contacao` | Web API Cálculo de Frete | WebAPI.CalculoFrete_Nader.js |
| Baixa CTe | `section_api_difalux_baixa_cte` | Web API Conhecimento | API_BaixaCTe_Difalux.js |
| Localize Cargas | `section_localize_cargas` | Web API - Principal | LocalizeCargas_Rodoviario.js |
| Web API Mobile | `section_mobile` | WebAPIMobile | WebAPIMobile.js |

### Serviços (seção privada — só aparece logado)

| Submenu | ID | Página | Arquivo |
|---|---|---|---|
| RouteEasy | `section_routeasy_manifesto` | Mantran x RouteEasy | LeoMadeiras_BaixarManifesto.js |
| Baixa NF Leo | `leo_nf` | Leo Madeiras | LeoMadeiras_Servico_BaixaNF.js |
| Geração Automática | `leo_auto` | Leo Madeiras | LeoMadeiras_Servico_GeracaoAutomatica.js |
| Gerar CTe | `shopee_cte` | Shopee | Shopee_Servico_GerarCTe.js |
| MultiCTe | `shopee_multi` | Shopee | Shopee_Servico_MultiCTe.js |
| Geração Envio Docs | `shopee_envio` | Shopee | Shopee_Servico_GeracaoEnvioDocumentos.js |
| Bandeirantes | `bandeirantes_servico_mantran_vira_section` | Bandeirantes | Bandeirantes_Servico_Mantran_Vira.js |

---

## 11. Padrões de Documentação de Endpoints .NET

Ao receber um controller C# para documentar, seguir esta estrutura de seções:

1. **Visão Geral** — tabela resumo com Método / Rota / Permissão Extra / Descrição
2. **Controle de Permissão** (se houver `Checar_Permissao_Processo`) — tabela com códigos e exemplo de resposta 403
3. **Modelo de Dados** — tabela dos campos do transport class, agrupados por categoria quando há muitos campos
4. **Um endpoint por seção** — cada seção contém: requisição (code-block), resposta 200 (code-block), tabela de respostas de erro, implementação (code-block opcional)

### Padrão de resposta de erro (todos os endpoints seguem este envelope):
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

## 12. Informações Técnicas da API .NET

- **BaseController** — todos os controllers herdam. Métodos: `Resposta<T>()` e `GetItem<T>(key)`
- **Conexao_Transp** — objeto de conexão multi-tenant injetado via `HttpContext.Items["CONEXAO"]` pelo `ConexaoMiddleware`
- **Retorno_Modelo_API_Transp\<T\>** — envelope padrão de todas as respostas. Métodos: `.Ok(data, msg)` e `.Erro(msg, codigo)`
- **Role obrigatória em todos os endpoints:** `[Authorize(Roles = "tms_web")]`
- **Permissão extra:** `Funcao_Negocio.Checar_Permissao_Processo(codigo, descricao, "Parametro", obj_cn)`

---

## 13. Endpoint de Produção para Gerar Token

```
POST http://api.mantran.eti.br:35390/api/Token/gerar-token
Content-Type: application/json

{ "usuario": "seu_usuario", "senha": "sua_senha" }
```

Retorna string JWE com validade de 8 horas.
