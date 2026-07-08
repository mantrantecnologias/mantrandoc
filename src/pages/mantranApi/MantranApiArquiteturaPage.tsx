import GenericContent from "@shared/components/GenericContent";

function MantranApiArquiteturaPage() {
  const content = (
    <div className="conteudo-div">
      <h4>Documentação Técnica — Arquitetura da Mantran.Applications - API</h4>

      <p>
        Esta página documenta como a <strong>Mantran.Applications - API</strong> (.NET 10) é construída:
        camadas, acesso a dados, autenticação, multi-tenant, pipeline de requisição e contrato de erro. O
        objetivo é dar a qualquer programador novo uma visão completa e precisa de como o sistema é
        montado hoje.
      </p>

      {/* 1. Camadas */}
      <section id="arquitetura_camadas">
        <h3>1. Clean Architecture — Camadas e Dependências</h3>
        <p>
          A API é dividida em 4 projetos .NET, com dependências apontando sempre <strong>para dentro</strong>{" "}
          (a camada de domínio não conhece nada das demais):
        </p>
        <pre className="code-block">{`Mantran.Api  ──►  Mantran.Application  ──►  Mantran.Domain
                          ▲
   Mantran.Infrastructure ┘   (implementa as interfaces da Application; conhece o Domain)`}</pre>

        <table className="data-table">
          <thead>
            <tr>
              <th>Projeto</th>
              <th>Contém</th>
              <th>Conhece</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Mantran.Domain</code></td>
              <td>Entidades (<code>EntityBase</code> + atributos <code>[Table]</code>/<code>[Column]</code>/<code>[KeyColumn]</code>), exceções de domínio (<code>ExceptionBase</code>)</td>
              <td>nada — zero dependências</td>
            </tr>
            <tr>
              <td><code>Mantran.Application</code></td>
              <td>Services de caso de uso (<code>ServiceBase</code>/<code>LegacyServiceBase</code>), contratos de repositório, DTOs de request, validators FluentValidation, respostas (<code>ApiPagedResponse</code>, <code>ApiErrorResponse</code>)</td>
              <td>Domain</td>
            </tr>
            <tr>
              <td><code>Mantran.Infrastructure</code></td>
              <td>Repositórios Dapper (<code>RepositoryBase</code>), conexão/transação (<code>UnitOfWork</code>, <code>DbConnectionFactory</code>), resolução de conexão multi-tenant, SQL builders</td>
              <td>Application, Domain</td>
            </tr>
            <tr>
              <td><code>Mantran.Api</code></td>
              <td>Controllers, <code>Program.cs</code>, injeção de dependência, middlewares, exception handler, Swagger/OpenAPI, <code>Roles</code></td>
              <td>Application, Infrastructure, Domain</td>
            </tr>
          </tbody>
        </table>

        <h4>1.1 Exemplo ponta a ponta — Empresa</h4>
        <p>Para fixar o fluxo, acompanhe uma requisição de criação de empresa por todas as camadas:</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Camada</th>
              <th>Peça</th>
              <th>Responsabilidade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Domain</td>
              <td><code>EmpresaEntity</code></td>
              <td><code>[Table("ST_Empresa")]</code>, <code>[KeyColumn("CD_Empresa", KeyGeneration.Manual)]</code> — só dados e mapeamento, sem lógica de acesso</td>
            </tr>
            <tr>
              <td>Application</td>
              <td><code>EmpresaRequest</code></td>
              <td>DTO com DataAnnotations; <code>ApplyTo(entity)</code> copia os campos explicitamente (sem reflection/AutoMapper)</td>
            </tr>
            <tr>
              <td>Application</td>
              <td><code>EmpresaValidator</code></td>
              <td>FluentValidation sobre a <em>entidade</em> — chamado automaticamente pelo <code>ServiceBase</code> antes de persistir</td>
            </tr>
            <tr>
              <td>Application</td>
              <td><code>EmpresaService : LegacyServiceBase&lt;EmpresaEntity&gt;</code></td>
              <td>Sobrescreve só <code>PrepareCreateAsync</code> (gera <code>CdEmpresa</code> via <code>GetNextIdAsync</code>); todo o resto do CRUD vem da classe base</td>
            </tr>
            <tr>
              <td>Infrastructure</td>
              <td><code>EmpresaRepository</code></td>
              <td>SQL parametrizado (<code>SELECT * FROM ST_Empresa WHERE CD_Empresa=@CdEmpresa</code>), busca textual via <code>SqlSearchBuilder</code></td>
            </tr>
            <tr>
              <td>Api</td>
              <td><code>EmpresaController</code></td>
              <td><code>[Authorize(Roles = Roles.TmsWeb)]</code>, injeta só <code>ILegacyService&lt;EmpresaEntity&gt;</code>, delega — nunca toca em SQL ou regra de negócio</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>ℹ</strong> Existe uma pequena inconsistência real entre features: <code>EmpresaRepository</code>{" "}
          lê o <code>cd_empresa</code> do tenant internamente (filtro no repositório), enquanto{" "}
          <code>FilialController</code> resolve o tenant explicitamente no controller. As duas formas convivem
          hoje no código — não é um erro seu se encontrar as duas.
        </p>
      </section>

      {/* 2. Organização por feature */}
      <section id="arquitetura_features">
        <h3>2. Organização por Feature</h3>
        <p>
          Todo projeto tem só duas raízes: <code>Common/</code> (abstrações genéricas) e{" "}
          <code>Features/</code> (uma pasta por feature, de ponta a ponta). Em <code>Mantran.Api</code>, as
          pastas de infraestrutura do host (<code>Extensions</code>, <code>Handlers</code>,{" "}
          <code>Middlewares</code>, <code>Configurations</code>, <code>Authorization</code>) ficam fora de{" "}
          <code>Features/</code> por não serem domínio de negócio.
        </p>
        <p>Uma pasta de feature é nomeada de duas formas:</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Critério</th>
              <th>Quando usar</th>
              <th>Exemplo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Por área de domínio</td>
              <td>Caso de uso transversal, sem uma entidade dominante</td>
              <td><code>Authentication</code></td>
            </tr>
            <tr>
              <td>Por família de entidade</td>
              <td>Nomeada pelo <strong>primeiro nome</strong> da entidade, abrigando toda entidade com esse prefixo</td>
              <td><code>Veiculo/</code> abriga <code>VeiculoModeloEntity</code>, <code>VeiculoCarroceriaEntity</code>...</td>
            </tr>
          </tbody>
        </table>
        <p>
          Granularidade "flat com limite de promoção": arquivos ficam soltos na raiz da feature; uma
          subpasta só nasce quando um agrupamento (por papel, como <code>Models/</code>/<code>Services/</code>,
          ou por entidade) chega a 2+ arquivos. Toda entidade de domínio leva o sufixo{" "}
          <code>Entity</code> (<code>EmpresaEntity</code>, <code>FilialEntity</code>) justamente para não
          colidir com o namespace da própria feature.
        </p>
        <p>
          Features hoje: <code>Agregado</code>, <code>Authentication</code>, <code>Cidade</code>,{" "}
          <code>Cliente</code>, <code>Corretora</code>, <code>Empresa</code>, <code>Filial</code>,{" "}
          <code>Gris</code>, <code>Integracoes</code> (contém <code>RotaLivre</code>), <code>Permissao</code>{" "}
          (só Application — consumida por outros controllers, sem endpoint próprio), <code>Pm</code>,{" "}
          <code>Veiculo</code>.
        </p>
      </section>

      {/* 3. Acesso a dados */}
      <section id="arquitetura_dados_dapper">
        <h3>3. Acesso a Dados — Dapper (sem EF Core)</h3>
        <p>
          Não existe ORM. Todo acesso a dados é SQL parametrizado via Dapper sobre conexões ADO.NET puras.
        </p>
        <h4>3.1 Mapeamento de entidades</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Atributo</th>
              <th>Uso</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>[Table("ST_Empresa")]</code></td>
              <td>Nome da tabela (default: nome da classe)</td>
            </tr>
            <tr>
              <td><code>[Column("CGC_CPF")]</code></td>
              <td>Nome da coluna (default: nome da propriedade)</td>
            </tr>
            <tr>
              <td><code>[KeyColumn("CD_Empresa", KeyGeneration = ...)]</code></td>
              <td>
                Chave primária. <code>KeyGeneration</code>: <code>None</code> (app fornece o valor, participa do
                INSERT — default), <code>Manual</code> (app calcula antes de persistir, ex.: MAX+1 legado,
                participa do INSERT), <code>Database</code> (IDENTITY do SQL Server, excluída do INSERT)
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <code>EntityBase</code> reflete sobre cada tipo uma única vez (cache em{" "}
          <code>ConcurrentDictionary&lt;Type, EntityMetadata&gt;</code>), expondo nome de tabela, chaves e a
          lista de colunas permitidas. <code>DapperEntityMapping.Register()</code> (chamado uma vez no
          startup) registra um <code>CustomPropertyTypeMap</code> por entidade, para o Dapper resolver
          colunas via <code>[Column]</code> em vez de bater nome por convenção.
        </p>
        <h4>3.2 Repositórios</h4>
        <p>
          <code>RepositoryBase&lt;TEntity[, TFilter]&gt;</code> fornece <code>GetAsync</code>/
          <code>ExistsAsync</code>/<code>RemoveAsync</code> por chave, <code>CreateAsync</code>/
          <code>UpdateAsync</code> (INSERT/UPDATE montados por reflection sobre as colunas, excluindo chaves
          geradas pelo banco) e <code>QueryPageAsync</code> (paginação + <code>ORDER BY</code> obrigatório —
          lança exceção se não houver ordenação determinável). Repositórios de feature herdam isso e só
          acrescentam o que é específico da entidade.
        </p>
        <h4>3.3 Guard-rails de SQL</h4>
        <p>
          Valores sempre parametrizados (<code>@param</code> via <code>DynamicParameters</code> do Dapper).
          Identificadores (nome de coluna/<code>ORDER BY</code>) só vêm da allow-list de{" "}
          <code>EntityMetadata.Columns</code>, nunca de input do cliente — nome de coluna desconhecido lança{" "}
          <code>InvalidColumnException</code>. <code>SqlSearchBuilder</code> monta cláusulas{" "}
          <code>LIKE</code> parametrizadas com escape de wildcard; <code>SqlPaginationBuilder</code> valida{" "}
          <code>ORDER BY</code> contra a mesma allow-list e aplica <code>OFFSET/FETCH</code>.
        </p>
      </section>

      {/* 4. Autenticação */}
      <section id="arquitetura_autenticacao">
        <h3>4. Autenticação e Autorização</h3>
        <p>
          Token <strong>JWT assinado (JWS), algoritmo HS256</strong> (HMAC-SHA256, segredo simétrico) — não
          há ECDSA nem JWE nesta API (essa combinação foi avaliada e descartada em design; ver{" "}
          <code>.claude/specs/2026-06-11-autenticacao-jwt-design.md</code> no repositório da API).
        </p>
        <h4>4.1 Endpoints</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Uso</th>
              <th>Onde fica o token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>POST /api/auth/login</code></td>
              <td>Login para o navegador (sessão web)</td>
              <td>Cookie <code>HttpOnly</code> (<code>auth_token</code>) + cookie anti-CSRF legível (<code>XSRF-TOKEN</code>)</td>
            </tr>
            <tr>
              <td><code>POST /api/auth/token</code></td>
              <td>Login para consumo via Bearer (Swagger, integrações externas, este próprio site de docs)</td>
              <td>No corpo da resposta (<code>TokenResponse.AccessToken</code>) — sem cookie</td>
            </tr>
            <tr>
              <td><code>POST /api/auth/logout</code></td>
              <td>Encerra a sessão de cookie</td>
              <td>Sobrescreve os dois cookies já expirados</td>
            </tr>
          </tbody>
        </table>
        <h4>4.2 Fluxo de login</h4>
        <p>Os dois endpoints chamam o mesmo <code>AuthService.LoginAsync</code>:</p>
        <ol>
          <li>Valida usuário/senha (FluentValidation).</li>
          <li>Busca o usuário na base central de login (<code>ST_Usuario</code>, <code>Ativo=1</code>).</li>
          <li>Compara a senha em <strong>tempo fixo</strong> (<code>CryptographicOperations.FixedTimeEquals</code>) — hoje ainda em texto plano, restrição legada documentada e rastreada como dívida técnica (a base é compartilhada com o app antigo).</li>
          <li>Resolve o banco do tenant a partir da base central.</li>
          <li>Confirma que o usuário também existe no banco do tenant (conexão avulsa).</li>
          <li>Gera o JWT com as claims da sessão.</li>
        </ol>
        <p>
          Todas as falhas dos passos 2 a 5 retornam a mesma mensagem genérica ("Login ou senha inválida.")
          para não revelar em qual etapa a autenticação falhou.
        </p>
        <h4>4.3 Claims do token</h4>
        <p>
          <code>sub</code> (usuário — hoje é o login, não um ID numérico), <code>jti</code> (GUID por token),{" "}
          <code>iat</code>/<code>nbf</code>/<code>exp</code>, <code>iss</code>/<code>aud</code>,{" "}
          <code>id_base_referencia</code> (ID do usuário na base central), <code>nome_base_dados</code>{" "}
          (banco do tenant), <code>role</code> (grupo de acesso do usuário), <code>cd_empresa</code>.
        </p>
        <h4>4.4 Autorização — dois mecanismos independentes</h4>
        <p>
          <strong>Papel (role) do JWT</strong> — todo endpoint exige autenticação por padrão; um endpoint
          específico só libera acesso anônimo com <code>[AllowAnonymous]</code>. Acima disso,{" "}
          <code>[Authorize(Roles = Roles.TmsWeb)]</code> (ou outra constante de{" "}
          <code>Mantran.Api/Authorization/Roles.cs</code>) faz o gate grosso por papel. É proibido
          hardcodar a string do papel — sempre usar a constante.
        </p>
        <p>
          <strong>Permissão fina por operação</strong> — mecanismo <em>separado</em>, nada a ver com o papel
          do JWT: <code>IPermissaoService.CheckAsync(codigo, processo, modulo, usuario)</code> consulta uma
          tabela legada de permissão por usuário/operação no banco do <em>tenant</em>, auto-cadastrando
          códigos de processo ainda não vistos. Hoje só <code>FilialController</code> chama isso
          (criar/editar/excluir) — <code>EmpresaController</code>, por exemplo, não tem esse segundo
          controle. Ou seja: a granularidade de permissão varia por feature; o único controle universal é o
          papel do JWT.
        </p>
        <p>
          <strong>⚠ Atenção ao formato do erro:</strong> o 401/403 vindos do pipeline de autenticação (papel
          do JWT) usam o formato padrão <code>ApiErrorResponse</code> ("Não autenticado."/"Acesso negado.").
          Já o 403 do <code>IPermissaoService</code> em <code>FilialController</code> é emitido via{" "}
          <code>Problem(...)</code> — um corpo <strong>RFC 7807 ProblemDetails</strong>, com formato JSON
          diferente do <code>ApiErrorResponse</code>. São dois formatos de 403 coexistindo hoje; um
          consumidor da API precisa estar ciente dos dois.
        </p>
      </section>

      {/* 5. Multi-tenant */}
      <section id="arquitetura_multitenant">
        <h3>5. Roteamento Multi-Tenant</h3>
        <p>Existem duas conexões de banco distintas, nunca uma única conexão fixa:</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Banco</th>
              <th>Uso</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Central (login)</td>
              <td>Fixo, usado só para autenticação e para localizar o banco do tenant</td>
            </tr>
            <tr>
              <td>Tenant</td>
              <td>Resolvido dinamicamente <strong>a cada requisição autenticada</strong>, a partir das claims do JWT</td>
            </tr>
          </tbody>
        </table>
        <p>
          O <code>TenantConnectionMiddleware</code> roda <strong>depois</strong> de{" "}
          <code>UseAuthentication</code>/<code>UseAuthorization</code> e, para toda rota que não seja{" "}
          <code>[AllowAnonymous]</code>: lê as claims <code>sub</code>/<code>id_base_referencia</code>/
          <code>nome_base_dados</code>; resolve a string de conexão do tenant (
          <code>ITenantConnectionResolver</code>); revalida o usuário direto no banco do tenant (pega
          desativação de usuário em meio à sessão); e publica tudo em um <code>TenantContext</code> escopado
          por requisição, consumido pelo <code>UnitOfWork</code> e por controllers/repositórios via{" "}
          <code>RequireCdEmpresa()</code>/<code>RequireOperador()</code>. Qualquer falha nesse processo vira{" "}
          <code>InvalidSessionException</code> → 401. Não há cache — o banco central é consultado a cada
          requisição (risco de escala já documentado pelo time da API).
        </p>
      </section>

      {/* 6. Pipeline */}
      <section id="arquitetura_pipeline">
        <h3>6. Pipeline de Requisição</h3>
        <p>Ordem real de middlewares em <code>Program.cs</code>:</p>
        <pre className="code-block">{`UseExceptionHandler → UseStatusCodePages
(dev) MapOpenApi + SwaggerUI + Scalar   |   (prod) UseHsts
UseSecurityHeaders
UseHttpsRedirection
UseCors(MantranCorsPolicy)
UseRateLimiter
UseAuthentication → UseAuthorization
UseMiddleware<CsrfProtectionMiddleware>
UseMiddleware<TenantConnectionMiddleware>
MapControllers`}</pre>
        <table className="data-table">
          <thead>
            <tr>
              <th>Controle</th>
              <th>Regra</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rate limiting</td>
              <td>Global: 100 req/min por IP. Política <code>auth</code>: 10 req/min por IP, só em <code>login</code>/<code>token</code>. Excedeu → 429 <code>ApiErrorResponse</code>.</td>
            </tr>
            <tr>
              <td>CSRF</td>
              <td>Double-submit cookie. Só entra em ação em método não-seguro, rota autenticada e quando o cookie <code>auth_token</code> está presente — é um no-op para quem usa Bearer puro. Header <code>X-XSRF-TOKEN</code> precisa bater com o cookie <code>XSRF-TOKEN</code>.</td>
            </tr>
            <tr>
              <td>CORS</td>
              <td>Uma política nomeada, origens sempre vindas de config (<code>API_CORS_ALLOWED</code>) — nunca wildcard, nunca auto-detecção.</td>
            </tr>
            <tr>
              <td>Swagger/Scalar</td>
              <td>Registrados só em <code>IsDevelopment()</code> — sem superfície pública de documentação em produção.</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 7. Erros */}
      <section id="arquitetura_erros">
        <h3>7. Contrato de Resposta e Tratamento de Erros</h3>
        <p>
          <strong>Não existe envelope único de sucesso.</strong> Diferente da API legada
          (<code>Retorno_Modelo_API_Transp&lt;T&gt;</code>), aqui:
        </p>
        <ul>
          <li>Resposta de objeto único (GET por id, POST, PUT) → <strong>a entidade/DTO pura</strong>, sem wrapper.</li>
          <li>Resposta de lista → <code>ApiPagedResponse&lt;T&gt;</code>: <code>{`{ hasNext, page, pageSize, items }`}</code>.</li>
          <li>Erro → <code>ApiErrorResponse</code>: <code>{`{ message, errors }`}</code>.</li>
        </ul>
        <p>
          <code>GlobalExceptionHandler</code> mapeia qualquer <code>ExceptionBase</code> pelo seu{" "}
          <code>DomainErrorCode</code>:
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>DomainErrorCode</th>
              <th>HTTP</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Invalid</td><td>400</td></tr>
            <tr><td>Unauthorized</td><td>401</td></tr>
            <tr><td>Forbidden</td><td>403</td></tr>
            <tr><td>NotFound</td><td>404</td></tr>
            <tr><td>Conflict</td><td>409</td></tr>
            <tr><td>BusinessRule</td><td>422</td></tr>
          </tbody>
        </table>
        <p>
          <code>ValidationException</code> do FluentValidation vira 400 com mensagem por campo em{" "}
          <code>errors</code>; qualquer outra exceção não mapeada vira 500 (detalhe da exceção só aparece em
          Development).
        </p>
        <p>
          <strong>ℹ</strong> Hoje, das features cadastrais (Empresa, Filial, Veículo), nenhuma lança exceção de
          domínio além de <code>EntityNotFoundException</code> (404) — ou seja, <strong>409 e 422 estão
          reservados pela plataforma mas não são efetivamente usados</strong> nessas features ainda.
        </p>
      </section>

      {/* 8. Validação */}
      <section id="arquitetura_validacao">
        <h3>8. Validação</h3>
        <p>Dois mecanismos deliberadamente separados:</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Mecanismo</th>
              <th>Onde atua</th>
              <th>Quando dispara</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DataAnnotations</td>
              <td>DTO de request (<code>&lt;Entidade&gt;Request</code>) — <code>[Required]</code>/<code>[MinLength]</code>/<code>[MaxLength]</code>/<code>[EmailAddress]</code></td>
              <td>Model binding do ASP.NET (→ 400) — os mesmos atributos alimentam o schema OpenAPI, que por sua vez gera a validação Zod do frontend</td>
            </tr>
            <tr>
              <td>FluentValidation</td>
              <td>Entidade de domínio (<code>&lt;Entidade&gt;Validator</code>)</td>
              <td>Automaticamente dentro de <code>ServiceBase.CreateAsync</code>/<code>UpdateAsync</code>, depois do request já aplicado à entidade e antes de persistir (→ 400)</td>
            </tr>
          </tbody>
        </table>
        <p>
          Regra mental: forma inválida (campo obrigatório ausente, tamanho estourado) → 400, seja pela
          DataAnnotation na borda ou pelo FluentValidation na entidade. Violação de regra de negócio em
          request bem-formado → exceção de domínio tipada → 404/409/422/403 conforme o{" "}
          <code>DomainErrorCode</code>.
        </p>
      </section>

      {/* 9. OpenAPI / cliente TS */}
      <section id="arquitetura_openapi_client">
        <h3>9. Documentação da API e Geração do Cliente TypeScript</h3>
        <p>
          O contrato OpenAPI 3.1 é gerado nativamente pelo ASP.NET (<code>AddOpenApi</code>), enriquecido
          pelos comentários <code>&lt;summary&gt;</code> de todos os assemblies — por isso a convenção do
          time exige resumo em toda classe/método/propriedade pública. O schema deriva automaticamente
          401/403/404/409/422 por controller/verbo, adiciona o esquema de segurança Bearer, e força
          obrigatoriedade em propriedades não anuláveis.
        </p>
        <p>
          Esse contrato (<code>openapi/v1.json</code>) alimenta o <strong>Orval</strong>, em{" "}
          <code>packages/api-client</code>, que gera dois artefatos consumidos pelos frontends do monorepo:
          hooks React Query + cliente Axios tipado, e schemas Zod (usados para validar formulários com os
          mesmos <code>required</code>/<code>minLength</code>/<code>maxLength</code> vindos das
          DataAnnotations do backend).
        </p>
      </section>

      {/* 10. Segurança */}
      <section id="arquitetura_seguranca">
        <h3>10. Controles de Segurança</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Controle</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cabeçalhos de segurança</td>
              <td><code>X-Content-Type-Options: nosniff</code>, <code>X-Frame-Options: DENY</code>, <code>Referrer-Policy: no-referrer</code> em toda resposta; HSTS só em produção</td>
            </tr>
            <tr>
              <td>Proteção contra SQL Injection</td>
              <td>Valores sempre parametrizados; identificadores (coluna/ordenação) só vêm de allow-list interna, nunca de input do cliente</td>
            </tr>
            <tr>
              <td>Fail-fast no startup</td>
              <td>A aplicação recusa subir sem um segredo de JWT de pelo menos 256 bits, ou sem a connection string de login configurada</td>
            </tr>
            <tr>
              <td>Riscos conhecidos e aceitos</td>
              <td>Senha comparada em texto plano (base legada compartilhada com o app antigo); sem lista de revogação de token (logout só limpa o cookie — um Bearer emitido continua válido até expirar); possível corrida no MAX+1 legado sob concorrência alta</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );

  return <GenericContent title="Mantran.Applications - API — Arquitetura" content={content} />;
}

export default MantranApiArquiteturaPage;
