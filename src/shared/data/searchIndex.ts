import { paths } from "@shared/routes/paths";

export type SearchIndexEntry = {
  path: string;
  hash?: string;
  page: string;
  label: string;
  content: string;
  private?: boolean;
};

export type SearchResult = {
  key: string;
  path: string;
  hash?: string;
  page: string;
  label: string;
  preview: string;
};

export const documentationIndex: SearchIndexEntry[] = [
  // Mantran.Applications - API — Rota Livre
  {
    path: paths.mantranApi.rotaLivre,
    hash: "mantran_api_rota_livre",
    page: "Mantran.Applications - API",
    label: "Rota Livre — Visão Geral",
    content: "rota livre rotalivre integracao roteirizacao ocorrencia POST controller webhook api/RotaLivre",
  },
  {
    path: paths.mantranApi.rotaLivre,
    hash: "rota_livre_arquitetura_processamento",
    page: "Mantran.Applications - API",
    label: "Rota Livre — Como o Processamento Funciona",
    content: "processamento assincrono validar recebido registrado 200",
  },
  {
    path: paths.mantranApi.rotaLivre,
    hash: "rota_livre_modelo_roteirizacao",
    page: "Mantran.Applications - API",
    label: "Rota Livre — Modelo de Dados da Roteirização",
    content:
      "roteirizacao routing_code route_number route_name route_date driver_document driver_name license_plate corporation_code routing_services routing_km lat long order_number motorista placa texto livre",
  },
  {
    path: paths.mantranApi.rotaLivre,
    hash: "rota_livre_modelo_ocorrencia",
    page: "Mantran.Applications - API",
    label: "Rota Livre — Modelo de Dados da Ocorrência",
    content:
      "ocorrencia id_event order_number service_id invoice_key occurrence_code occurrence_description occurrence_date occurrence_hour receiver_name draft_rwb_number rwb_number rwb_key returned_items pod_image",
  },
  {
    path: paths.mantranApi.rotaLivre,
    hash: "rota_livre_endpoint_roteirizacao",
    page: "Mantran.Applications - API",
    label: "Rota Livre — Incluir Roteirização",
    content:
      "incluir-roteirizacao-rotalivre POST roteirizacao incluir requisicao resposta motorista placa",
  },
  {
    path: paths.mantranApi.rotaLivre,
    hash: "rota_livre_endpoint_ocorrencia",
    page: "Mantran.Applications - API",
    label: "Rota Livre — Incluir Ocorrência",
    content: "incluir-ocorrencia-rotalivre POST ocorrencia incluir requisicao resposta entrega recebedor",
  },

  // Mantran.Applications - API — Arquitetura (apps/api, Clean Architecture)
  {
    path: paths.mantranApi.arquitetura,
    hash: "arquitetura_camadas",
    page: "Mantran.Applications - API",
    private: true,
    label: "Arquitetura — Camadas e Dependências (Clean Architecture)",
    content:
      "Clean Architecture camadas Domain Application Infrastructure Api dependencias EntityBase EmpresaEntity EmpresaRepository EmpresaService EmpresaController exemplo ponta a ponta",
  },
  {
    path: paths.mantranApi.arquitetura,
    hash: "arquitetura_features",
    page: "Mantran.Applications - API",
    private: true,
    label: "Arquitetura — Organização por Feature",
    content:
      "Features Common familia entidade Entity sufixo pasta flat promocao Veiculo Empresa Filial Corretora Cliente Gris Permissao",
  },
  {
    path: paths.mantranApi.arquitetura,
    hash: "arquitetura_dados_dapper",
    page: "Mantran.Applications - API",
    private: true,
    label: "Arquitetura — Acesso a Dados (Dapper, sem EF Core)",
    content:
      "Dapper sem EF Core Table Column KeyColumn KeyGeneration EntityBase RepositoryBase SqlSearchBuilder SqlPaginationBuilder InvalidColumnException mapeamento",
  },
  {
    path: paths.mantranApi.arquitetura,
    hash: "arquitetura_autenticacao",
    page: "Mantran.Applications - API",
    private: true,
    label: "Arquitetura — Autenticação e Autorização (JWT ES256 JWE)",
    content:
      "JWT JWS JWE ES256 ECDSA login token AuthController AuthService claims sub role Roles TmsWeb IPermissaoService ProblemDetails ApiErrorResponse 401 403",
  },
  {
    path: paths.mantranApi.arquitetura,
    hash: "arquitetura_multitenant",
    page: "Mantran.Applications - API",
    private: true,
    label: "Arquitetura — Roteamento Multi-Tenant",
    content:
      "multi-tenant TenantConnectionMiddleware TenantContext ITenantConnectionResolver banco central banco tenant claims id_base_referencia nome_base_dados InvalidSessionException",
  },
  {
    path: paths.mantranApi.arquitetura,
    hash: "arquitetura_pipeline",
    page: "Mantran.Applications - API",
    private: true,
    label: "Arquitetura — Pipeline de Requisição (Program.cs)",
    content:
      "Program.cs pipeline UseAuthentication UseAuthorization UseCors UseRateLimiter CsrfProtectionMiddleware TenantConnectionMiddleware rate limiting CSRF CORS Swagger Scalar",
  },
  {
    path: paths.mantranApi.arquitetura,
    hash: "arquitetura_erros",
    page: "Mantran.Applications - API",
    private: true,
    label: "Arquitetura — Contrato de Resposta e Tratamento de Erros",
    content:
      "GlobalExceptionHandler DomainErrorCode ApiErrorResponse ApiPagedResponse sem envelope hasNext items ValidationException 400 401 403 404 409 422 500",
  },
  {
    path: paths.mantranApi.arquitetura,
    hash: "arquitetura_validacao",
    page: "Mantran.Applications - API",
    private: true,
    label: "Arquitetura — Validação (DataAnnotations e FluentValidation)",
    content:
      "DataAnnotations FluentValidation Required MaxLength MinLength Validator ServiceBase CreateAsync UpdateAsync forma regra de negocio",
  },
  {
    path: paths.mantranApi.arquitetura,
    hash: "arquitetura_openapi_client",
    page: "Mantran.Applications - API",
    private: true,
    label: "Arquitetura — OpenAPI e Geração do Cliente TypeScript",
    content:
      "OpenAPI Swagger summary Orval api-client React Query Zod schema gerado cliente TypeScript openapi v1.json",
  },
  {
    path: paths.mantranApi.arquitetura,
    hash: "arquitetura_seguranca",
    page: "Mantran.Applications - API",
    private: true,
    label: "Arquitetura — Controles de Segurança",
    content:
      "seguranca rate limiting CSRF cabecalhos HSTS SQL injection fail-fast JWT secret senha texto plano riscos conhecidos",
  },

  // Mantran.Applications - API — Login (AuthController, JWT ES256 JWE)
  {
    path: paths.mantranApi.login,
    hash: "mantran_api_login_auth",
    page: "Mantran.Applications - API",
    private: true,
    label: "Login — Visão Geral (AuthController, JWT ES256 JWE)",
    content:
      "autenticacao autorizacao login token JWT JWS JWE ES256 ECDSA AuthController api/auth cookie HttpOnly rate limiting",
  },
  {
    path: paths.mantranApi.login,
    hash: "login_fluxo",
    page: "Mantran.Applications - API",
    private: true,
    label: "Login — Fluxo de Login (passo a passo)",
    content:
      "fluxo login AuthService LoginAsync usuario senha base central tenant FixedTimeEquals texto plano token",
  },
  {
    path: paths.mantranApi.login,
    hash: "cookie",
    page: "Mantran.Applications - API",
    private: true,
    label: "Login — O Cookie de Sessão",
    content: "cookie HttpOnly Secure SameSite Path Expires auth_token logout XSS",
  },
  {
    path: paths.mantranApi.login,
    hash: "geracao_token",
    page: "Mantran.Applications - API",
    private: true,
    label: "Login — Geração do Token ES256 + JWE",
    content:
      "geracao token JWT ES256 ECDSA P-256 JWE ECDH-ES A256KW A256GCM jose-jwt criptografia curva eliptica",
  },
  {
    path: paths.mantranApi.login,
    hash: "csrf",
    page: "Mantran.Applications - API",
    private: true,
    label: "Login — Proteção CSRF (double-submit cookie)",
    content:
      "CSRF double-submit cookie XSRF-TOKEN X-XSRF-TOKEN CsrfProtectionMiddleware 403 novidade",
  },
  {
    path: paths.mantranApi.login,
    hash: "claims_token",
    page: "Mantran.Applications - API",
    private: true,
    label: "Login — Claims do Token e Resolução do Tenant",
    content:
      "claims sub jti iat exp iss aud id_base_referencia nome_base_dados role cd_empresa TenantConnectionMiddleware",
  },
  {
    path: paths.mantranApi.login,
    hash: "autorizacao",
    page: "Mantran.Applications - API",
    private: true,
    label: "Login — Autorização (papel do JWT e permissão fina)",
    content:
      "autorizacao Authorize Roles papel permissao fina AllowAnonymous 401 403 revogacao Bearer logout",
  },

  // Mantran.Applications - API — Empresa
  {
    path: paths.mantranApi.empresa,
    hash: "mantran_api_empresa",
    page: "Mantran.Applications - API",
    private: true,
    label: "Empresa — Visão Geral dos Endpoints",
    content: "empresa EmpresaController endpoints REST GET POST PUT DELETE api/Empresa",
  },
  {
    path: paths.mantranApi.empresa,
    hash: "empresa_modelo_dados",
    page: "Mantran.Applications - API",
    private: true,
    label: "Empresa — Modelo de Dados (EmpresaEntity)",
    content:
      "EmpresaEntity EmpresaRequest modelo dados cdEmpresa sigla cgcCpf razaoSocial fantasia endereco bairro cidade uf cep ddd fone eMail flCooperativa site",
  },
  {
    path: paths.mantranApi.empresa,
    hash: "empresa_listar",
    page: "Mantran.Applications - API",
    private: true,
    label: "Empresa — GET Listar Empresas (paginado)",
    content: "listar empresas GET page pageSize search orderBy descending ApiPagedResponse",
  },
  {
    path: paths.mantranApi.empresa,
    hash: "empresa_obter",
    page: "Mantran.Applications - API",
    private: true,
    label: "Empresa — GET Obter Empresa",
    content: "obter empresa GET cdEmpresa 404",
  },
  {
    path: paths.mantranApi.empresa,
    hash: "empresa_next_id",
    page: "Mantran.Applications - API",
    private: true,
    label: "Empresa — GET Próximo Código de Empresa",
    content: "nextId proximo codigo empresa gerado servidor MAX+1",
  },
  {
    path: paths.mantranApi.empresa,
    hash: "empresa_criar",
    page: "Mantran.Applications - API",
    private: true,
    label: "Empresa — POST Criar Empresa",
    content: "criar empresa POST 201 Location cdEmpresa gerado servidor",
  },
  {
    path: paths.mantranApi.empresa,
    hash: "empresa_atualizar",
    page: "Mantran.Applications - API",
    private: true,
    label: "Empresa — PUT Atualizar Empresa",
    content: "atualizar empresa PUT editar 404",
  },
  {
    path: paths.mantranApi.empresa,
    hash: "empresa_excluir",
    page: "Mantran.Applications - API",
    private: true,
    label: "Empresa — DELETE Excluir Empresa",
    content: "excluir empresa DELETE remover 204 404",
  },
  {
    path: paths.mantranApi.empresa,
    hash: "empresa_parametro",
    page: "Mantran.Applications - API",
    private: true,
    label: "Empresa — EmpresaParametroController (Visão Geral)",
    content: "EmpresaParametro api/EmpresaParametro parametros empresa verify-password rota ignorada tenant JWT",
  },
  {
    path: paths.mantranApi.empresa,
    hash: "empresa_parametro_modelo_dados",
    page: "Mantran.Applications - API",
    private: true,
    label: "Empresa — Modelo de Dados EmpresaParametro",
    content:
      "EmpresaParametroEntity EmpresaParametroRequest flReiniciaNumeracaoFatura flTemCiot flTemAtm qtLicencaMobile somente leitura",
  },
  {
    path: paths.mantranApi.empresa,
    hash: "empresa_parametro_obter",
    page: "Mantran.Applications - API",
    private: true,
    label: "Empresa — GET Obter Parâmetros da Empresa",
    content: "obter parametros empresa GET cdEmpresa ignorado tenant token",
  },
  {
    path: paths.mantranApi.empresa,
    hash: "empresa_parametro_verify_password",
    page: "Mantran.Applications - API",
    private: true,
    label: "Empresa — POST Verificar Senha (verify-password)",
    content: "verify-password verificar senha admin config secret exato 401",
  },
  {
    path: paths.mantranApi.empresa,
    hash: "empresa_parametro_upsert",
    page: "Mantran.Applications - API",
    private: true,
    label: "Empresa — PUT Criar ou Atualizar Parâmetros (Upsert)",
    content: "upsert criar atualizar parametros empresa PUT",
  },

  // Mantran.Applications - API — Filial
  {
    path: paths.mantranApi.filial,
    hash: "mantran_api_filial",
    page: "Mantran.Applications - API",
    private: true,
    label: "Filial — Visão Geral dos Endpoints",
    content: "filial FilialController endpoints REST GET POST PUT DELETE api/Filial hub parametro",
  },
  {
    path: paths.mantranApi.filial,
    hash: "filial_permissao",
    page: "Mantran.Applications - API",
    private: true,
    label: "Filial — Verificação de Permissão Extra (403 não padrão)",
    content:
      "permissao 1152 1153 1154 ProblemDetails RFC 7807 403 nao padrao incluir alterar excluir formato diferente",
  },
  {
    path: paths.mantranApi.filial,
    hash: "filial_modelo",
    page: "Mantran.Applications - API",
    private: true,
    label: "Filial — Modelo de Dados (FilialRequest / FilialEntity)",
    content:
      "FilialEntity FilialRequest modelo dados cdEmpresa cdFilial sigla cgc nome endereco cidade uf cep ddd fone rntrc antt alPis alCofins alIss pcTributos pix corFilial",
  },
  {
    path: paths.mantranApi.filial,
    hash: "filial_buscar_lista",
    page: "Mantran.Applications - API",
    private: true,
    label: "Filial — GET Listar Filiais",
    content: "listar filiais GET page pageSize search orderBy descending ApiPagedResponse",
  },
  {
    path: paths.mantranApi.filial,
    hash: "filial_buscar",
    page: "Mantran.Applications - API",
    private: true,
    label: "Filial — GET Obter Filial por Código",
    content: "obter filial GET cdFilial 404",
  },
  {
    path: paths.mantranApi.filial,
    hash: "filial_hub_desenvolvedor",
    page: "Mantran.Applications - API",
    private: true,
    label: "Filial — GET Hub do Desenvolvedor (Consulta por CNPJ)",
    content: "hub desenvolvedor GET cnpj HubFilialResponse integracao externa consulta",
  },
  {
    path: paths.mantranApi.filial,
    hash: "filial_incluir",
    page: "Mantran.Applications - API",
    private: true,
    label: "Filial — POST Criar Filial",
    content: "criar filial POST cdFilial na rota permissao 1152 201",
  },
  {
    path: paths.mantranApi.filial,
    hash: "filial_alterar",
    page: "Mantran.Applications - API",
    private: true,
    label: "Filial — PUT Atualizar Filial",
    content: "atualizar filial PUT permissao 1153 editar",
  },
  {
    path: paths.mantranApi.filial,
    hash: "filial_excluir",
    page: "Mantran.Applications - API",
    private: true,
    label: "Filial — DELETE Excluir Filial",
    content: "excluir filial DELETE permissao 1154 remover 204",
  },
  {
    path: paths.mantranApi.filial,
    hash: "filial_parametro",
    page: "Mantran.Applications - API",
    private: true,
    label: "Filial — FilialParametroController (api/FilialParametro)",
    content:
      "FilialParametro parametros filial senhaFilial dtProcessamento vrBloqueio cdTabelaPadrao ediEnvio integracaoEnvio upsert",
  },
  {
    path: paths.mantranApi.filial,
    hash: "filial_acesso_usuario",
    page: "Mantran.Applications - API",
    private: true,
    label: "Filial — Funcionalidade Não Migrada (filiais por usuário)",
    content: "buscar lista filiais acesso usuario nao migrado sem equivalente",
  },

  // Mantran.Applications - API — Modelo de Veículo
  {
    path: paths.mantranApi.modeloVeiculo,
    hash: "mantran_api_modelo_veiculo",
    page: "Mantran.Applications - API",
    label: "Modelo de Veículo — Visão Geral dos Endpoints",
    content: "modelo veiculo VeiculoModeloController endpoints REST GET POST PUT DELETE api/VeiculoModelo",
  },
  {
    path: paths.mantranApi.modeloVeiculo,
    hash: "modelo_veiculo_codigo_gerado",
    page: "Mantran.Applications - API",
    label: "Modelo de Veículo — Código Agora é Gerado pelo Servidor",
    content: "cdModelo gerado servidor MAX+1 nao escolhido cliente mudanca importante quebra",
  },
  {
    path: paths.mantranApi.modeloVeiculo,
    hash: "modelo_veiculo_modelo",
    page: "Mantran.Applications - API",
    label: "Modelo de Veículo — Modelo de Dados (VeiculoModeloEntity)",
    content: "VeiculoModeloEntity VeiculoModeloRequest cdModelo descricao cdEmpresa 15 caracteres",
  },
  {
    path: paths.mantranApi.modeloVeiculo,
    hash: "modelo_veiculo_listar",
    page: "Mantran.Applications - API",
    label: "Modelo de Veículo — GET Listar Modelos de Veículos",
    content: "listar modelos veiculo GET page pageSize search orderBy descending ApiPagedResponse",
  },
  {
    path: paths.mantranApi.modeloVeiculo,
    hash: "modelo_veiculo_obter",
    page: "Mantran.Applications - API",
    label: "Modelo de Veículo — GET Obter Modelo de Veículo",
    content: "obter modelo veiculo GET cdModelo 404",
  },
  {
    path: paths.mantranApi.modeloVeiculo,
    hash: "modelo_veiculo_next_id",
    page: "Mantran.Applications - API",
    label: "Modelo de Veículo — GET Consultar Próximo Código",
    content: "nextId proximo codigo modelo veiculo gerado servidor",
  },
  {
    path: paths.mantranApi.modeloVeiculo,
    hash: "modelo_veiculo_criar",
    page: "Mantran.Applications - API",
    label: "Modelo de Veículo — POST Criar Modelo de Veículo",
    content: "criar modelo veiculo POST 201 Location cdModelo gerado servidor",
  },
  {
    path: paths.mantranApi.modeloVeiculo,
    hash: "modelo_veiculo_atualizar",
    page: "Mantran.Applications - API",
    label: "Modelo de Veículo — PUT Atualizar Modelo de Veículo",
    content: "atualizar modelo veiculo PUT editar descricao",
  },
  {
    path: paths.mantranApi.modeloVeiculo,
    hash: "modelo_veiculo_excluir",
    page: "Mantran.Applications - API",
    label: "Modelo de Veículo — DELETE Remover Modelo de Veículo",
    content: "excluir remover modelo veiculo DELETE 204 404",
  },

  // Mantran.Applications - API — Veículo Carroceria
  {
    path: paths.mantranApi.veiculoCarroceria,
    hash: "mantran_api_veiculo_carroceria",
    page: "Mantran.Applications - API",
    label: "Veículo Carroceria — Visão Geral (só listagem)",
    content:
      "veiculo carroceria VeiculoCarroceriaController api/VeiculoCarroceria so listagem sem CRUD criar editar excluir nao disponivel",
  },
  {
    path: paths.mantranApi.veiculoCarroceria,
    hash: "veiculo_carroceria_listar",
    page: "Mantran.Applications - API",
    label: "Veículo Carroceria — GET Listar Carrocerias",
    content: "listar carroceria GET page pageSize search orderBy descending ApiPagedResponse cdCarroceria descricao",
  },

  // Segurança (grupo "Corretora", antiga "Seguradora", dentro de Mantran.Applications - API)
  {
    path: paths.mantranApi.corretora,
    hash: "mantran_api_corretora",
    page: "Segurança",
    label: "Corretora",
    content: "Corretora Seguradora api/Corretora listar apolice cobertura agravacao",
  },
  {
    path: paths.mantranApi.seguradoraCliente,
    hash: "mantran_api_seguradora_cliente",
    page: "Segurança",
    label: "Seguradora - Cliente",
    content:
      "Seguradora Cliente API api/SeguradoraCliente buscar lista incluir alterar excluir tms_web autorizacao segurança",
  },
  {
    path: paths.mantranApi.seguradoraGrupo,
    hash: "mantran_api_seguradora_grupo",
    page: "Segurança",
    label: "Seguradora - Grupo",
    content:
      "Seguradora Grupo API api/SeguradoraGrupo buscar lista incluir alterar excluir tms_web autorizacao segurança",
  },
  {
    path: paths.mantranApi.seguradoraPercurso,
    hash: "mantran_api_seguradora_percurso",
    page: "Segurança",
    label: "Seguradora - Percurso",
    content:
      "Seguradora Percurso API api/SeguradoraPercurso buscar lista incluir alterar excluir tms_web autorizacao segurança",
  },
  {
    path: paths.mantranApi.seguradoraProduto,
    hash: "mantran_api_seguradora_produto",
    page: "Segurança",
    label: "Seguradora - Produto",
    content:
      "Seguradora Produto API api/SeguradoraProduto buscar lista incluir alterar excluir tms_web autorizacao segurança",
  },
  {
    path: paths.mantranApi.seguradoraUrbano,
    hash: "mantran_api_seguradora_urbano",
    page: "Segurança",
    label: "Seguradora - Urbano",
    content:
      "Seguradora Urbano API api/SeguradoraUrbano buscar lista incluir alterar excluir tms_web autorizacao segurança",
  },

  // Mantran.Applications - API — Produto
  {
    path: paths.mantranApi.produto,
    hash: "mantran_api_produto",
    page: "Mantran.Applications - API",
    label: "Produto — Visão Geral dos Endpoints",
    content: "produto ProdutoController endpoints buscar listar incluir alterar excluir tms_web Authorize role API",
  },
  {
    path: paths.mantranApi.produto,
    hash: "produto_modelo",
    page: "Mantran.Applications - API",
    label: "Produto — Modelo de Dados (Produto_Transp)",
    content: "Produto_Transp modelo dados CD_Produto Descricao PC_Reducao_BC FL_ICMS CD_Empresa DTO",
  },
  {
    path: paths.mantranApi.produto,
    hash: "produto_buscar_lista",
    page: "Mantran.Applications - API",
    label: "Produto — GET buscar-lista-produto",
    content: "buscar lista produto GET endpoint retorno lista ProdutoController",
  },
  {
    path: paths.mantranApi.produto,
    hash: "produto_buscar",
    page: "Mantran.Applications - API",
    label: "Produto — POST buscar-produto",
    content: "buscar produto POST CD_Produto retorno dados completos consultar",
  },
  {
    path: paths.mantranApi.produto,
    hash: "produto_incluir",
    page: "Mantran.Applications - API",
    label: "Produto — POST incluir-produto",
    content: "incluir produto POST cadastrar novo registro inclusao ProdutoController",
  },
  {
    path: paths.mantranApi.produto,
    hash: "produto_alterar",
    page: "Mantran.Applications - API",
    label: "Produto — POST alterar-produto",
    content: "alterar produto POST atualizar dados ProdutoController editar",
  },
  {
    path: paths.mantranApi.produto,
    hash: "produto_excluir",
    page: "Mantran.Applications - API",
    label: "Produto — POST excluir-produto",
    content: "excluir produto POST remover deletar ProdutoController exclusao",
  },

  // Mantran - SQL Views
  {
    path: paths.sqlViews,
    hash: "section_buscar_dados_view",
    page: "Mantran - SQL Views",
    label: "Autenticação e Busca de Dados (SQL Views)",
    content:
      "autenticacao token bearer JWT endpoint Token ReportData SQL Views paginacao filtros dinamicos usuario senha view buscar dados",
  },

  // Mantran.Leo_Madeiras.API
  {
    path: paths.leoMadeirasApi,
    hash: "section_consulta_pagina",
    page: "Mantran.Leo_Madeiras.API",
    label: "Consulta de Notas Fiscais com Paginação",
    content:
      "notas fiscais NF consulta paginacao filtros dinamicos retorno estruturado metadados Leo Madeiras API endpoint nf-consulta",
  },
  {
    path: paths.leoMadeirasApi,
    hash: "autenticacao",
    page: "Mantran.Leo_Madeiras.API",
    label: "Autenticação – Leo Madeiras API",
    content: "autenticacao token bearer JWT Login Senha TipoUsuario aplicacao endpoint api token CNPJ",
  },

  // Web API Interfaces
  {
    path: paths.webApiInterfaces,
    hash: "section_interfaces_saas",
    page: "Web API Interfaces",
    label: "Interfaces de Integração Mantran (SaaS)",
    content:
      "interfaces integracao SaaS cadastrar nota fiscal NF buscar NF cadastro cliente fornecedor contas frete retorno bearer token POST INSERT",
  },
  {
    path: paths.webApiInterfaces,
    hash: "section_consulta_pagina",
    page: "Web API Interfaces",
    label: "Consulta de NF e dados",
    content: "consulta nota fiscal NF dados paginacao bearer token API Mantran",
  },

  // Sign In Sign On
  {
    path: paths.signInSignOn,
    hash: "section_tms_leo_web",
    page: "Sign In Sign On",
    label: "Integração SSO – Leo Madeiras x Mantran",
    content:
      "SSO Single Sign-On Azure AD Leo Madeiras TMSLeo authorization code JWT token callback frontend React .NET validar",
  },
  {
    path: paths.signInSignOn,
    hash: "visao_geral",
    page: "Sign In Sign On",
    label: "Visão Geral da Arquitetura SSO",
    content:
      "arquitetura autenticacao autorizacao gerenciamento usuarios frontend React API backend .NET Azure AD JWT troca tokens",
  },
  {
    path: paths.signInSignOn,
    hash: "endpoints_api",
    page: "Sign In Sign On",
    label: "Endpoints da API – SSO",
    content:
      "endpoint POST token callback authorization code redirectUri JWT usuario provisionamento ativacao inativacao api token callback",
  },
  {
    path: paths.signInSignOn,
    hash: "fluxo_autenticacao",
    page: "Sign In Sign On",
    label: "Fluxo de Autenticação",
    content: "fluxo autenticacao authorization code Azure AD token JWT Single Sign-On SSO code troca",
  },
  {
    path: paths.signInSignOn,
    hash: "provisionamento_usuario",
    page: "Sign In Sign On",
    label: "Provisionamento de Usuário",
    content: "provisionamento usuario cadastro automatico SSO Azure AD criacao novo usuario",
  },
  {
    path: paths.signInSignOn,
    hash: "ativacao_inativacao_usuarios",
    page: "Sign In Sign On",
    label: "Ativação e Inativação de Usuários",
    content: "ativacao inativacao usuarios status ativo inativo gerenciamento",
  },
  {
    path: paths.signInSignOn,
    hash: "seguranca",
    page: "Sign In Sign On",
    label: "Segurança – SSO",
    content: "seguranca token JWT SSL HTTPS autorizacao protecao",
  },
  {
    path: paths.signInSignOn,
    hash: "erros_comuns",
    page: "Sign In Sign On",
    label: "Erros Comuns – SSO",
    content: "erros comuns 400 401 code invalido expirado usuario inativo erro autenticacao",
  },

  // Web API Cálculo de Frete
  {
    path: paths.webApiCalculoFrete,
    hash: "section_api_nader_contacao",
    page: "Web API Cálculo de Frete",
    label: "Cotação de Frete – Nader",
    content:
      "cotacao frete calcular frete origem destino peso volumes mercadoria modal rodoviario seguro coleta entrega JSON autenticacao chave Nader",
  },
  {
    path: paths.webApiCalculoFrete,
    hash: "visao_geral",
    page: "Web API Cálculo de Frete",
    label: "Visão Geral – Cálculo de Frete",
    content:
      "visao geral frete calculo tempo real peso volume valor mercadoria modal rodoviario servicos adicionais seguro",
  },
  {
    path: paths.webApiCalculoFrete,
    hash: "autenticacao",
    page: "Web API Cálculo de Frete",
    label: "Autenticação – Cálculo de Frete",
    content: "autenticacao chave API key header bearer token frete",
  },
  {
    path: paths.webApiCalculoFrete,
    hash: "endpoint",
    page: "Web API Cálculo de Frete",
    label: "Endpoint – Cotação de Frete",
    content: "endpoint URL cotacao frete POST parametros carga",
  },
  {
    path: paths.webApiCalculoFrete,
    hash: "exemplos_request",
    page: "Web API Cálculo de Frete",
    label: "Exemplos de Request – Frete",
    content: "exemplo request body JSON frete origem destino carga",
  },
  {
    path: paths.webApiCalculoFrete,
    hash: "exemplos_response",
    page: "Web API Cálculo de Frete",
    label: "Exemplos de Response – Frete",
    content: "exemplo response resposta frete valor total prazo",
  },
  {
    path: paths.webApiCalculoFrete,
    hash: "erros_comuns",
    page: "Web API Cálculo de Frete",
    label: "Erros Comuns – Frete",
    content: "erros comuns frete 400 401 500 parametros invalidos",
  },

  // Web API Conhecimento
  {
    path: paths.webApiConhecimento,
    hash: "section_api_difalux_baixa_cte",
    page: "Web API Conhecimento",
    label: "Baixa de CTe – Difalux",
    content:
      "baixa CTe conhecimento transporte eletronico CTE BaixarConhecimento ocorrencia Difalux registrar ocorrencia autenticacao usuario senha cnpj",
  },
  {
    path: paths.webApiConhecimento,
    hash: "endpoint",
    page: "Web API Conhecimento",
    label: "Endpoint – Baixa CTe",
    content: "endpoint POST CTE BaixarConhecimento URL API Difalux",
  },
  {
    path: paths.webApiConhecimento,
    hash: "request",
    page: "Web API Conhecimento",
    label: "Request – Baixa CTe",
    content: "request corpo JSON usuario senha CNPJ nr_chave ocorrencia tipo data CTe baixar",
  },
  {
    path: paths.webApiConhecimento,
    hash: "responses",
    page: "Web API Conhecimento",
    label: "Responses – Baixa CTe",
    content: "response resposta sucesso erro 200 400 500 mensagem processamento retorno",
  },
  {
    path: paths.webApiConhecimento,
    hash: "observacoes",
    page: "Web API Conhecimento",
    label: "Observações – Baixa CTe",
    content: "observacoes regras importantes CTe baixa ocorrencia",
  },

  // Mantran x RouteEasy (serviço privado)
  {
    path: paths.servicos.routeasy,
    hash: "section_routeasy_manifesto",
    page: "Mantran x RouteEasy",
    private: true,
    label: "Manifesto e Roteirização – RouteEasy",
    content:
      "RouteEasy manifesto roteirizacao webhook rota veiculo transportadora pedagio notas fiscais logistica Baixar_Manifesto processar",
  },
  {
    path: paths.servicos.routeasy,
    hash: "fluxo_geral",
    page: "Mantran x RouteEasy",
    private: true,
    label: "Fluxo Geral – RouteEasy",
    content: "fluxo routeasy webhook API Mantran rotas pendentes notas fiscais atualizacao processamento",
  },
  {
    path: paths.servicos.routeasy,
    hash: "routeasy",
    page: "Mantran x RouteEasy",
    private: true,
    label: "Disparo de Roteirização – RouteEasy",
    content: "roteirizacao RouteEasy plataforma disparo rota",
  },
  {
    path: paths.servicos.routeasy,
    hash: "webhook",
    page: "Mantran x RouteEasy",
    private: true,
    label: "Webhook – RouteEasy",
    content: "webhook routeasy configuracao endpoint POST receber rota",
  },
  {
    path: paths.servicos.routeasy,
    hash: "comprovei",
    page: "Mantran x RouteEasy",
    private: true,
    label: "Integração Comprovei",
    content: "Comprovei integracao comprovante entrega foto assinatura",
  },
  {
    path: paths.servicos.routeasy,
    hash: "testes_comprovei",
    page: "Mantran x RouteEasy",
    private: true,
    label: "Testes Comprovei",
    content: "testes ciclo Comprovei validacao entrega",
  },

  // Web API - Principal (Localize Cargas)
  {
    path: paths.webApi.localizeCargas,
    hash: "section_localize_cargas",
    page: "Web API - Principal",
    label: "Localize Cargas Rodoviário",
    content:
      "localize cargas rodoviario localizacao status CT-e CTE chave documento ocorrencias entrega remetente destinatario consulta rastreio",
  },
  {
    path: paths.webApi.localizeCargas,
    hash: "endpoint",
    page: "Web API - Principal",
    label: "Endpoint – Localize Cargas",
    content: "endpoint GET LocalizeCargas URL API CTE rodoviario",
  },
  {
    path: paths.webApi.localizeCargas,
    hash: "request",
    page: "Web API - Principal",
    label: "Request – Localize Cargas",
    content: "request usuario senha cnpj nr_chave chave CT-e consulta localizacao",
  },

  // WebAPIMobile
  {
    path: paths.webApi.mobile,
    hash: "resumo",
    page: "WebAPIMobile",
    label: "Web API Mobile – Resumo",
    content: "mobile app aplicativo Mantran login IMEI manifestos destinos documentos notas fiscais JWT token mobile",
  },
  {
    path: paths.webApi.mobile,
    hash: "login_token",
    page: "WebAPIMobile",
    label: "Login / Token – Web API Mobile",
    content: "login token JWT IMEI usuario senha IdFireBase LoginSalvo mobile endpoint autenticacao",
  },

  // Leo Madeiras - Serviços (privado)
  {
    path: paths.servicos.leoMadeiras.baixaNf,
    hash: "leo_nf",
    page: "Leo Madeiras",
    private: true,
    label: "Serviço – Baixa NF Leo Madeiras",
    content: "baixa NF nota fiscal Leo Madeiras Oracle banco dados inclusao notas fiscais servico windows service",
  },
  {
    path: paths.servicos.leoMadeiras.geracaoAutomatica,
    hash: "leo_auto",
    page: "Leo Madeiras",
    private: true,
    label: "Serviço – Geração Automática (Leo Madeiras)",
    content: "geracao automatica conhecimentos CTe NFs nao processadas Leo Madeiras servico windows",
  },

  // Shopee - Serviços (privado)
  {
    path: paths.servicos.shopee.gerarCte,
    hash: "shopee_cte",
    page: "Shopee",
    private: true,
    label: "Serviço – Gerar CTe Shopee",
    content: "gerar CTe Shopee First Mile Last Mile conhecimento transporte eletronico servico geracao",
  },
  {
    path: paths.servicos.shopee.multiCte,
    hash: "shopee_multi",
    page: "Shopee",
    private: true,
    label: "Serviço – MultiCTe Shopee",
    content: "MultiCTe baixa NF nota fiscal Shopee CNPJs CPFs inclusao multiplos",
  },
  {
    path: paths.servicos.shopee.envioDocumentos,
    hash: "shopee_envio",
    page: "Shopee",
    private: true,
    label: "Serviço – Geração e Envio de Documentos Shopee",
    content: "geracao manifesto First Mile Last Mile CTe Complementar Pre Fatura reenvio CTe Manifesto Shopee documentos",
  },

  // Bandeirantes - Serviços (privado)
  {
    path: paths.servicos.bandeirantes,
    hash: "bandeirantes_servico_mantran_vira_section",
    page: "Bandeirantes",
    private: true,
    label: "Serviço – Bandeirantes",
    content: "Bandeirantes fechamento DT inclusao coleta servico Mantran Vira integracao",
  },
];
