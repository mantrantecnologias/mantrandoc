export const documentationIndex = [
  // Mantran.API - Principal
  {
    page: "Mantran.API - Principal",
    id: "mantran_api_gerar_token",
    label: "Gerar Token — Como Obter Token de Acesso",
    content: "gerar token acesso endpoint autenticacao usuario senha POST bearer authorization como usar API token JWE expirar 8 horas Postman Insomnia curl"
  },
  {
    page: "Mantran.API - Principal",
    id: "gerar_token_endpoint",
    label: "Gerar Token — Endpoint e URL de Produção",
    content: "endpoint URL producao POST Token gerar-token api.mantran.eti.br Content-Type application json"
  },
  {
    page: "Mantran.API - Principal",
    id: "gerar_token_uso",
    label: "Gerar Token — Usando o Token nas Requisições",
    content: "usar token requisicao Authorization Bearer header Postman Insomnia curl autenticar endpoints protegidos"
  },
  {
    page: "Mantran.API - Principal",
    id: "mantran_api_login",
    label: "Arquitetura — Retorno_Modelo_API_Transp e Envelope Padrão",
    content: "Retorno_Modelo_API_Transp envelope padrao resposta sucesso erro Sucesso Mensagem Data Codigo Ok Erro AdicionarMensagem JSON 200 422 500"
  },
  {
    page: "Mantran.API - Principal",
    id: "base_controller",
    label: "BaseController — Resposta e GetItem",
    content: "BaseController classe abstrata controller Resposta GetItem IActionResult StatusCode HttpContext Items conexao CONEXAO herdar"
  },
  {
    page: "Mantran.API - Principal",
    id: "exception_middleware",
    label: "ExceptionMiddleware — Tratamento Global de Exceções",
    content: "ExceptionMiddleware exception middleware excecao tratamento global ValidacaoException InvalidOperationException 422 400 500 pipeline try catch HandleException Production Development stack trace"
  },
  {
    page: "Mantran.API - Principal",
    id: "conexao_middleware",
    label: "ConexaoMiddleware — Injeção de Conexão Multi-Tenant",
    content: "ConexaoMiddleware conexao banco dados JWT claims sub id_base_referencia nome_base_dados multi-tenant IsAuthenticated HttpContext Items injetar"
  },
  {
    page: "Mantran.API - Principal",
    id: "pipeline_middlewares",
    label: "Pipeline e Ordem dos Middlewares",
    content: "pipeline ordem middlewares UseRouting UseCors UseAuthentication UseAuthorization MapControllers ASP.NET Core deterministica"
  },
  {
    page: "Mantran.API - Principal",
    id: "statuscodes_referencia",
    label: "Referência Rápida — StatusCodes e CRUD Padrão",
    content: "StatusCode 200 400 401 403 422 500 CRUD padrao Mantran busca lista incluir alterar excluir Retorno_Modelo_API_Transp BaseController"
  },

  {
    page: "Mantran.API - Principal",
    id: "mantran_api_login_auth",
    label: "Login — Visão Geral do Sistema de Autenticação",
    content: "autenticacao autorizacao login JWT JWE token cookie HttpOnly Secure SameSite multi-tenant usuario senha sistema seguranca visao geral"
  },
  {
    page: "Mantran.API - Principal",
    id: "login_multitenant",
    label: "Login — Arquitetura Multi-Tenant",
    content: "multi-tenant base dados tenant id_base_referencia nome_base_dados empresas isolamento dados CNPJ JWT claims"
  },
  {
    page: "Mantran.API - Principal",
    id: "login_fluxo",
    label: "Login — Fluxo de Autenticação",
    content: "fluxo login POST autenticar usuario senha validar gerar token JWE cookie retorno 200 401 422 pipeline"
  },
  {
    page: "Mantran.API - Principal",
    id: "login_cookie",
    label: "Login — Cookie HttpOnly e Segurança",
    content: "cookie HttpOnly Secure SameSite Strict None logout expirar token remover cookie seguranca XSS CSRF armazenamento"
  },
  {
    page: "Mantran.API - Principal",
    id: "login_jwe",
    label: "Login — Geração do Token JWE (ECDSA / P-256)",
    content: "JWE token gerar criptografia curva eliptica ECDSA ECDH-ES P-256 chave publica privada assimetrica cifrar assinar payload claims"
  },
  {
    page: "Mantran.API - Principal",
    id: "login_claims",
    label: "Login — Claims do Token JWT",
    content: "claims sub id_usuario nome_base_dados id_base_referencia role perfil permissao JWT payload token"
  },
  {
    page: "Mantran.API - Principal",
    id: "login_roles",
    label: "Login — Autorização por Roles e Perfis",
    content: "roles perfis autorizacao permissao admin usuario leitura escrita Authorize policy role controller endpoint restringir acesso"
  },
  {
    page: "Mantran.API - Principal",
    id: "login_middleware_validacao",
    label: "Login — Validação do Token no Middleware",
    content: "middleware validacao token JWT JWE IsAuthenticated HttpContext User claims pipeline interceptar request Authorization bearer"
  },
  {
    page: "Mantran.API - Principal",
    id: "config_jwt_bearer",
    label: "Login — Configuração JWT Bearer e Program.cs",
    content: "Program.cs JWT Bearer AddAuthentication AddJwtBearer TokenValidationParameters ECDsaSecurityKey ValidateIssuerSigningKey ClockSkew JwtSecurityTokenHandler DefaultInboundClaimTypeMap Clear AddScoped Token_Servico NameClaimType RoleClaimType"
  },
  {
    page: "Mantran.API - Principal",
    id: "config_cors",
    label: "Login — Configuração CORS",
    content: "CORS AddCors CorsPolicy WithOrigins AllowCredentials AllowAnyMethod AllowAnyHeader localhost vercel cookie cross-origin"
  },
  {
    page: "Mantran.API - Principal",
    id: "login_seguranca",
    label: "Login — Considerações de Segurança",
    content: "seguranca HTTPS SSL HSTS brute force rate limit token expiracao renovacao refresh token boas praticas OWASP"
  },
  {
    page: "Mantran.API - Principal",
    id: "mantran_api_empresa",
    label: "Empresa — Visão Geral dos Endpoints",
    content: "empresa EmpresaController endpoints buscar listar incluir alterar excluir verifica senha tms_web Authorize role API"
  },
  {
    page: "Mantran.API - Principal",
    id: "empresa_modelo",
    label: "Empresa — Modelo de Dados (Empresa_Transp)",
    content: "Empresa_Transp modelo dados CD_Empresa Sigla CGC_CPF CNPJ IE Razao_Social Fantasia Endereco Bairro Cidade UF CEP DDD Fone E_Mail FL_Cooperativa Site"
  },
  {
    page: "Mantran.API - Principal",
    id: "empresa_buscar_lista",
    label: "Empresa — GET buscar-lista-empresas",
    content: "buscar lista empresas GET endpoint retorno lista carregar empresas carregadas sucesso"
  },
  {
    page: "Mantran.API - Principal",
    id: "empresa_buscar",
    label: "Empresa — POST buscar-empresa",
    content: "buscar empresa POST CD_Empresa retorno dados completos consultar"
  },
  {
    page: "Mantran.API - Principal",
    id: "empresa_incluir",
    label: "Empresa — POST incluir-empresa",
    content: "incluir empresa POST cadastrar novo registro inclusao Incluir_Registro_Empresa"
  },
  {
    page: "Mantran.API - Principal",
    id: "empresa_alterar",
    label: "Empresa — POST alterar-empresa",
    content: "alterar empresa POST atualizar dados Alterar_Registro_Empresa editar"
  },
  {
    page: "Mantran.API - Principal",
    id: "empresa_excluir",
    label: "Empresa — POST excluir-empresa",
    content: "excluir empresa POST remover deletar Excluir_Registro_Empresa exclusao"
  },
  {
    page: "Mantran.API - Principal",
    id: "empresa_verifica_senha",
    label: "Empresa — POST verifica-senha-empresa",
    content: "verifica senha empresa POST autorizar senha mestra autorizacao operacao sensivel Autorizado Nao autorizado 401"
  },
  {
    page: "Mantran.API - Principal",
    id: "login_componentes",
    label: "Login — Resumo dos Componentes",
    content: "resumo componentes AuthController AuthService TokenService CookieHelper ConexaoMiddleware ExceptionMiddleware arquitetura login"
  },

  {
    page: "Mantran.API - Principal",
    id: "mantran_api_filial",
    label: "Filial — Visão Geral dos Endpoints",
    content: "filial FilialController endpoints buscar listar incluir alterar excluir parametro hub desenvolvedor acesso usuario tms_web permissao processo 1152 1153 1154"
  },
  {
    page: "Mantran.API - Principal",
    id: "filial_permissao",
    label: "Filial — Controle de Permissão por Processo",
    content: "permissao processo Checar_Permissao_Processo 1152 1153 1154 403 incluir alterar excluir acesso negado operacao"
  },
  {
    page: "Mantran.API - Principal",
    id: "filial_modelo",
    label: "Filial — Modelo de Dados (Filial2_Transp)",
    content: "Filial2_Transp modelo dados CD_Empresa CD_Filial Sigla CGC CNPJ IE Nome Endereco Cidade UF CEP DDD Fone RNTRC ANTT AL_Pis AL_Cofins AL_ISS PC_Tributos Pix Cor_Filial ST_Filial"
  },
  {
    page: "Mantran.API - Principal",
    id: "filial_buscar_lista",
    label: "Filial — POST buscar-lista-filiais",
    content: "buscar lista filiais POST filtro CD_Empresa UF retorno lista"
  },
  {
    page: "Mantran.API - Principal",
    id: "filial_buscar",
    label: "Filial — POST buscar-filial",
    content: "buscar filial POST CD_Filial dados completos consultar"
  },
  {
    page: "Mantran.API - Principal",
    id: "filial_incluir",
    label: "Filial — POST incluir-filial",
    content: "incluir filial POST novo registro permissao 1152 inclusao"
  },
  {
    page: "Mantran.API - Principal",
    id: "filial_alterar",
    label: "Filial — POST alterar-filial",
    content: "alterar filial POST atualizar dados permissao 1153 editar"
  },
  {
    page: "Mantran.API - Principal",
    id: "filial_excluir",
    label: "Filial — POST excluir-filial",
    content: "excluir filial POST remover permissao 1154 deletar"
  },
  {
    page: "Mantran.API - Principal",
    id: "filial_buscar_parametro",
    label: "Filial — POST buscar-filial-parametro",
    content: "buscar filial parametro POST Filial_Parametro_Transp configuracao regras faturamento"
  },
  {
    page: "Mantran.API - Principal",
    id: "filial_alterar_parametro",
    label: "Filial — POST alterar-filial-parametro",
    content: "alterar filial parametro POST Filial_Parametro_Transp configuracao atualizar"
  },
  {
    page: "Mantran.API - Principal",
    id: "filial_hub_desenvolvedor",
    label: "Filial — POST buscar-filial-hub-desenvolvedor",
    content: "buscar filial hub desenvolvedor POST CGC CNPJ LimparCNPJ integracao"
  },
  {
    page: "Mantran.API - Principal",
    id: "filial_acesso_usuario",
    label: "Filial — POST buscar-lista-filiais-acesso-usuario",
    content: "buscar lista filiais acesso usuario POST Usuario2_Transp Nome_Usuario permissoes"
  },

  // Mantran - SQL Views
  {
    page: "Mantran - SQL Views",
    id: "section_buscar_dados_view",
    label: "Autenticação e Busca de Dados (SQL Views)",
    content: "autenticacao token bearer JWT endpoint Token ReportData SQL Views paginacao filtros dinamicos usuario senha view buscar dados"
  },

  // Mantran.Leo_Madeiras.API
  {
    page: "Mantran.Leo_Madeiras.API",
    id: "section_consulta_pagina",
    label: "Consulta de Notas Fiscais com Paginação",
    content: "notas fiscais NF consulta paginacao filtros dinamicos retorno estruturado metadados Leo Madeiras API endpoint nf-consulta"
  },
  {
    page: "Mantran.Leo_Madeiras.API",
    id: "autenticacao",
    label: "Autenticação – Leo Madeiras API",
    content: "autenticacao token bearer JWT Login Senha TipoUsuario aplicacao endpoint api token CNPJ"
  },

  // Web API Interfaces
  {
    page: "Web API Interfaces",
    id: "section_interfaces_saas",
    label: "Interfaces de Integração Mantran (SaaS)",
    content: "interfaces integracao SaaS cadastrar nota fiscal NF buscar NF cadastro cliente fornecedor contas frete retorno bearer token POST INSERT"
  },
  {
    page: "Web API Interfaces",
    id: "section_consulta_pagina",
    label: "Consulta de NF e dados",
    content: "consulta nota fiscal NF dados paginacao bearer token API Mantran"
  },

  // Sign In Sign On
  {
    page: "Sign In Sign On",
    id: "section_tms_leo_web",
    label: "Integração SSO – Leo Madeiras x Mantran",
    content: "SSO Single Sign-On Azure AD Leo Madeiras TMSLeo authorization code JWT token callback frontend React .NET validar"
  },
  {
    page: "Sign In Sign On",
    id: "visao_geral",
    label: "Visão Geral da Arquitetura SSO",
    content: "arquitetura autenticacao autorizacao gerenciamento usuarios frontend React API backend .NET Azure AD JWT troca tokens"
  },
  {
    page: "Sign In Sign On",
    id: "endpoints_api",
    label: "Endpoints da API – SSO",
    content: "endpoint POST token callback authorization code redirectUri JWT usuario provisionamento ativacao inativacao api token callback"
  },
  {
    page: "Sign In Sign On",
    id: "fluxo_autenticacao",
    label: "Fluxo de Autenticação",
    content: "fluxo autenticacao authorization code Azure AD token JWT Single Sign-On SSO code troca"
  },
  {
    page: "Sign In Sign On",
    id: "provisionamento_usuario",
    label: "Provisionamento de Usuário",
    content: "provisionamento usuario cadastro automatico SSO Azure AD criacao novo usuario"
  },
  {
    page: "Sign In Sign On",
    id: "ativacao_inativacao_usuarios",
    label: "Ativação e Inativação de Usuários",
    content: "ativacao inativacao usuarios status ativo inativo gerenciamento"
  },
  {
    page: "Sign In Sign On",
    id: "seguranca",
    label: "Segurança – SSO",
    content: "seguranca token JWT SSL HTTPS autorizacao protecao"
  },
  {
    page: "Sign In Sign On",
    id: "erros_comuns",
    label: "Erros Comuns – SSO",
    content: "erros comuns 400 401 code invalido expirado usuario inativo erro autenticacao"
  },

  // Web API Cálculo de Frete
  {
    page: "Web API Cálculo de Frete",
    id: "section_api_nader_contacao",
    label: "Cotação de Frete – Nader",
    content: "cotacao frete calcular frete origem destino peso volumes mercadoria modal rodoviario seguro coleta entrega JSON autenticacao chave Nader"
  },
  {
    page: "Web API Cálculo de Frete",
    id: "visao_geral",
    label: "Visão Geral – Cálculo de Frete",
    content: "visao geral frete calculo tempo real peso volume valor mercadoria modal rodoviario servicos adicionais seguro"
  },
  {
    page: "Web API Cálculo de Frete",
    id: "autenticacao",
    label: "Autenticação – Cálculo de Frete",
    content: "autenticacao chave API key header bearer token frete"
  },
  {
    page: "Web API Cálculo de Frete",
    id: "endpoint",
    label: "Endpoint – Cotação de Frete",
    content: "endpoint URL cotacao frete POST parametros carga"
  },
  {
    page: "Web API Cálculo de Frete",
    id: "exemplos_request",
    label: "Exemplos de Request – Frete",
    content: "exemplo request body JSON frete origem destino carga"
  },
  {
    page: "Web API Cálculo de Frete",
    id: "exemplos_response",
    label: "Exemplos de Response – Frete",
    content: "exemplo response resposta frete valor total prazo"
  },
  {
    page: "Web API Cálculo de Frete",
    id: "erros_comuns",
    label: "Erros Comuns – Frete",
    content: "erros comuns frete 400 401 500 parametros invalidos"
  },

  // Web API Conhecimento
  {
    page: "Web API Conhecimento",
    id: "section_api_difalux_baixa_cte",
    label: "Baixa de CTe – Difalux",
    content: "baixa CTe conhecimento transporte eletronico CTE BaixarConhecimento ocorrencia Difalux registrar ocorrencia autenticacao usuario senha cnpj"
  },
  {
    page: "Web API Conhecimento",
    id: "endpoint",
    label: "Endpoint – Baixa CTe",
    content: "endpoint POST CTE BaixarConhecimento URL API Difalux"
  },
  {
    page: "Web API Conhecimento",
    id: "request",
    label: "Request – Baixa CTe",
    content: "request corpo JSON usuario senha CNPJ nr_chave ocorrencia tipo data CTe baixar"
  },
  {
    page: "Web API Conhecimento",
    id: "responses",
    label: "Responses – Baixa CTe",
    content: "response resposta sucesso erro 200 400 500 mensagem processamento retorno"
  },
  {
    page: "Web API Conhecimento",
    id: "observacoes",
    label: "Observações – Baixa CTe",
    content: "observacoes regras importantes CTe baixa ocorrencia"
  },

  // Mantran x RouteEasy
  {
    page: "Mantran x RouteEasy",
    id: "section_routeasy_manifesto",
    label: "Manifesto e Roteirização – RouteEasy",
    content: "RouteEasy manifesto roteirizacao webhook rota veiculo transportadora pedagio notas fiscais logistica Baixar_Manifesto processar"
  },
  {
    page: "Mantran x RouteEasy",
    id: "fluxo_geral",
    label: "Fluxo Geral – RouteEasy",
    content: "fluxo routeasy webhook API Mantran rotas pendentes notas fiscais atualizacao processamento"
  },
  {
    page: "Mantran x RouteEasy",
    id: "routeasy",
    label: "Disparo de Roteirização – RouteEasy",
    content: "roteirizacao RouteEasy plataforma disparo rota"
  },
  {
    page: "Mantran x RouteEasy",
    id: "webhook",
    label: "Webhook – RouteEasy",
    content: "webhook routeasy configuracao endpoint POST receber rota"
  },
  {
    page: "Mantran x RouteEasy",
    id: "comprovei",
    label: "Integração Comprovei",
    content: "Comprovei integracao comprovante entrega foto assinatura"
  },
  {
    page: "Mantran x RouteEasy",
    id: "testes_comprovei",
    label: "Testes Comprovei",
    content: "testes ciclo Comprovei validacao entrega"
  },

  // Web API - Principal (Localize Cargas)
  {
    page: "Web API - Principal",
    id: "section_localize_cargas",
    label: "Localize Cargas Rodoviário",
    content: "localize cargas rodoviario localizacao status CT-e CTE chave documento ocorrencias entrega remetente destinatario consulta rastreio"
  },
  {
    page: "Web API - Principal",
    id: "endpoint",
    label: "Endpoint – Localize Cargas",
    content: "endpoint GET LocalizeCargas URL API CTE rodoviario"
  },
  {
    page: "Web API - Principal",
    id: "request",
    label: "Request – Localize Cargas",
    content: "request usuario senha cnpj nr_chave chave CT-e consulta localizacao"
  },

  // WebAPIMobile
  {
    page: "WebAPIMobile",
    id: "resumo",
    label: "Web API Mobile – Resumo",
    content: "mobile app aplicativo Mantran login IMEI manifestos destinos documentos notas fiscais JWT token mobile"
  },
  {
    page: "WebAPIMobile",
    id: "login_token",
    label: "Login / Token – Web API Mobile",
    content: "login token JWT IMEI usuario senha IdFireBase LoginSalvo mobile endpoint autenticacao"
  },

  // Leo Madeiras - Serviços
  {
    page: "Leo Madeiras",
    id: "leo_nf",
    label: "Serviço – Baixa NF Leo Madeiras",
    content: "baixa NF nota fiscal Leo Madeiras Oracle banco dados inclusao notas fiscais servico windows service"
  },
  {
    page: "Leo Madeiras",
    id: "leo_auto",
    label: "Serviço – Geração Automática (Leo Madeiras)",
    content: "geracao automatica conhecimentos CTe NFs nao processadas Leo Madeiras servico windows"
  },

  // Shopee - Serviços
  {
    page: "Shopee",
    id: "shopee_cte",
    label: "Serviço – Gerar CTe Shopee",
    content: "gerar CTe Shopee First Mile Last Mile conhecimento transporte eletronico servico geracao"
  },
  {
    page: "Shopee",
    id: "shopee_multi",
    label: "Serviço – MultiCTe Shopee",
    content: "MultiCTe baixa NF nota fiscal Shopee CNPJs CPFs inclusao multiplos"
  },
  {
    page: "Shopee",
    id: "shopee_envio",
    label: "Serviço – Geração e Envio de Documentos Shopee",
    content: "geracao manifesto First Mile Last Mile CTe Complementar Pre Fatura reenvio CTe Manifesto Shopee documentos"
  },

  // Bandeirantes - Serviços
  {
    page: "Bandeirantes",
    id: "bandeirantes_servico_mantran_vira_section",
    label: "Serviço – Bandeirantes",
    content: "Bandeirantes fechamento DT inclusao coleta servico Mantran Vira integracao"
  }
];
