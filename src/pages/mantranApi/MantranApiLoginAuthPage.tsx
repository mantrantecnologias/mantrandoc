import GenericContent from "@shared/components/GenericContent";
import ApiErrorReference from "@shared/components/ApiErrorReference";

function MantranApiLoginAuthPage() {
  const content = (
    <div className="conteudo-div">
      <h4>Documentação Técnica — Autenticação e Autorização (Mantran.Applications - API)</h4>

      <p>
        A autenticação usa <strong>JWT assinado ES256 (ECDSA P-256) e criptografado em JWE</strong>.
        Consulte também a página <strong>Arquitetura</strong> (seção "Autenticação e Autorização") para
        a visão geral do mecanismo; esta página aprofunda os endpoints e o passo a passo interno.
      </p>

      {/* 1. Visão Geral */}
      <section id="mantran_api_login_auth">
        <h3>1. Visão Geral</h3>
        <p>
          A autenticação é composta por duas etapas: <strong>login</strong> (validação de credenciais,
          resolução do tenant e emissão do token) e <strong>autorização</strong> (leitura das claims do
          token para liberar ou negar acesso a cada endpoint). Token: assinado com{" "}
          <strong>ES256 (ECDSA P-256)</strong> e depois criptografado em <strong>JWE</strong>{" "}
          (ECDH-ES+A256KW / A256GCM) — chave assimétrica, payload ilegível sem a chave privada.
        </p>

        <h4>Endpoints do AuthController (<code>api/auth</code>)</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Método</th>
              <th>Rota</th>
              <th>Retorno</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/auth/login</code></td>
              <td><code>LoginResponse</code></td>
              <td>Login para sessão de navegador — grava o token em cookie <code>HttpOnly</code></td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/auth/token</code></td>
              <td><code>TokenResponse</code></td>
              <td>Login para uso externo / integrações — token e validade no corpo da resposta, sem cookie e sem dados do usuário (<code>user</code>)</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/auth/logout</code></td>
              <td>—</td>
              <td>Sobrescreve os cookies de sessão com valor já expirado</td>
            </tr>
          </tbody>
        </table>
        <p>
          Todos os três endpoints são <code>[AllowAnonymous]</code> e ficam sob uma política de{" "}
          <strong>rate limiting</strong> mais restrita que o resto da API: 10 requisições por minuto por
          IP (contra 100/min no restante da API) — proteção contra força bruta de senha.
        </p>
      </section>

      {/* 2. Fluxo de login */}
      <section id="login_fluxo">
        <h3>2. Fluxo de Login (passo a passo)</h3>
        <p>
          <code>/api/auth/login</code> e <code>/api/auth/token</code> chamam exatamente o mesmo{" "}
          <code>AuthService.LoginAsync</code> — a diferença entre eles é onde o token acaba e quais dados
          são retornados junto com ele. O fluxo interno:
        </p>
        <pre className="code-block">{`1. Valida o corpo da requisição (usuário/senha obrigatórios)
2. Busca o usuário na base CENTRAL de login (tabela de usuários, só Ativo=1)
   → falha: credenciais inválidas
3. Compara a senha em TEMPO FIXO (CryptographicOperations.FixedTimeEquals)
   → hoje ainda em texto plano (restrição legada — base compartilhada com o app antigo)
   → falha: credenciais inválidas
4. Resolve, na base central, qual banco de dados (tenant) pertence a esse usuário
   → falha: base de dados do usuário não encontrada
5. Conecta uma vez no banco do tenant para confirmar que o usuário também existe lá
   → falha: usuário não encontrado na base do tenant
6. Monta as claims da sessão e gera o JWT (ver seção 4)`}</pre>
        <p>
          <strong>ℹ</strong> As falhas dos passos 2 a 5 retornam <strong>a mesma mensagem genérica</strong>{" "}
          ("Login ou senha inválida.") — de propósito, para não revelar em qual etapa a autenticação
          falhou (não dá para descobrir, por exemplo, se o usuário existe mas a senha está errada).
        </p>

        <h4>2.1 POST /api/auth/login — Resposta</h4>
        <pre className="code-block">{`POST /api/auth/login
Content-Type: application/json

{ "username": "joao.silva", "password": "minhasenha" }`}</pre>
        <p><strong>200 OK:</strong></p>
        <pre className="code-block">{`// Headers da resposta:
Set-Cookie: auth_token=eyJ...; HttpOnly; Path=/; Expires=...
Set-Cookie: XSRF-TOKEN=a1b2c3...; Path=/; Expires=...   (legível por JS — ver seção 5)

// Body — LoginResponse (dados do usuário, sem o token):
{
  "login": "joao.silva",
  "companyCode": "001",
  "branchCode": "01",
  "email": "joao.silva@mantran.com.br"
  // demais campos do usuário
}`}</pre>
        <p>
          É esse endpoint que este próprio site de documentação usa para o login do usuário{" "}
          <code>suporte.mantran</code> (sessão de navegador via cookie).
        </p>

        <h4>2.2 POST /api/auth/token — Resposta</h4>
        <pre className="code-block">{`POST /api/auth/token
Content-Type: application/json

{ "username": "joao.silva", "password": "minhasenha" }`}</pre>
        <p><strong>200 OK</strong> (sem cookie, sem dados do usuário — só o token e a validade):</p>
        <pre className="code-block">{`{
  "accessToken": "eyJhbGciOiJFQ0RILUVTK0EyNTZLVyIsImVuYyI6IkEyNTZHQ00i...", // JWE — 5 partes
  "expiresAt": "2026-07-03T18:00:00Z"
}`}</pre>
        <p>
          Use <code>accessToken</code> no header <code>Authorization: Bearer {"{accessToken}"}</code> das
          requisições seguintes. Indicado para <strong>integrações externas e sistemas de terceiros</strong>{" "}
          que precisam apenas do token JWT, sem necessidade dos dados de perfil do usuário.
        </p>

        <h4>2.3 POST /api/auth/logout</h4>
        <p>
          Sobrescreve o cookie <code>auth_token</code> e o cookie <code>XSRF-TOKEN</code> com valor vazio
          e expiração no passado (1 hora atrás), forçando o navegador a removê-los. Não invalida um
          Bearer token já emitido — ver nota na seção 7.
        </p>
      </section>

      {/* 3. Cookie */}
      <section id="cookie">
        <h3>3. O Cookie de Sessão</h3>
        <p>
          Usado apenas pelo fluxo <code>/api/auth/login</code> (sessão de navegador). Depois do login, o
          navegador reenvia o cookie automaticamente em toda requisição — o frontend não precisa
          gerenciar o token manualmente nesse fluxo.
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Flag</th>
              <th>Valor</th>
              <th>Por que importa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>HttpOnly</strong></td>
              <td>true</td>
              <td>JavaScript não consegue ler o cookie via <code>document.cookie</code> — principal defesa contra roubo de token por XSS</td>
            </tr>
            <tr>
              <td><strong>Secure</strong></td>
              <td>conforme ambiente</td>
              <td>Em produção, o navegador só envia o cookie em HTTPS</td>
            </tr>
            <tr>
              <td><strong>SameSite</strong></td>
              <td>conforme ambiente</td>
              <td>Controla em quais contextos cross-site o cookie é enviado</td>
            </tr>
            <tr>
              <td><strong>Path</strong></td>
              <td>/</td>
              <td>Enviado em toda requisição à API</td>
            </tr>
            <tr>
              <td><strong>Expires</strong></td>
              <td>igual à expiração do JWT</td>
              <td>Login e logout usam exatamente as mesmas opções de cookie — se divergissem, o logout poderia não remover o cookie certo</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>ℹ Cookie vs Bearer:</strong> o cookie <code>HttpOnly</code> é usado pelo fluxo de
          navegador (<code>/login</code>); o Bearer no header <code>Authorization</code> é usado por quem
          chama <code>/token</code> (Swagger, integrações, scripts). Os dois emitem o mesmo tipo de JWT —
          a diferença é só onde ele viaja.
        </p>
      </section>

      {/* 4. Geração do token */}
      <section id="geracao_token">
        <h3>4. Geração do Token — Assinatura ES256 + Criptografia JWE</h3>
        <p>
          O token é gerado em <strong>duas etapas</strong>: primeiro um JWT é <strong>assinado com
          ES256</strong> (ECDSA sobre a curva P-256) — chave assimétrica: a chave <strong>privada</strong>{" "}
          assina, a chave <strong>pública</strong> valida. Em seguida, esse JWS assinado é{" "}
          <strong>criptografado em JWE</strong> usando <strong>ECDH-ES+A256KW</strong> (acordo de chave
          efêmero, com Perfect Forward Secrecy — cada emissão usa um par de chaves descartável) para
          embrulhar uma chave de conteúdo <strong>AES-256-GCM</strong>, que cifra o JWS. O resultado final
          tem 5 partes (<code>header.encryptedKey.iv.ciphertext.tag</code>) — ninguém lê um claim sequer
          sem a chave privada, mesmo interceptando o token.
        </p>
        <pre className="code-block">{`// Simplificado — geração do token (jose-jwt: assina ES256, depois criptografa em JWE)
var payload = new Dictionary<string, object>
{
    ["iss"]                 = issuer,
    ["aud"]                 = audience,
    ["sub"]                 = usuario.Login,
    ["jti"]                 = Guid.NewGuid().ToString(),
    ["iat"]                 = DateTimeOffset.UtcNow.ToUnixTimeSeconds(),
    ["exp"]                 = DateTimeOffset.UtcNow.AddHours(8).ToUnixTimeSeconds(),
    ["id_base_referencia"]  = usuario.IdBaseReferencia,
    ["nome_base_dados"]     = usuario.NomeBaseDados,
    ["role"]                = usuario.GrupoAcesso,
    ["cd_empresa"]          = usuario.CdEmpresa,
};

// 1. Assina (JWS) com a chave privada ECDSA P-256
var signedToken = JWT.Encode(payload, chavePrivada, JwsAlgorithm.ES256);

// 2. Criptografa o JWS em JWE com a chave pública ECDSA P-256
var encryptedToken = JWT.Encode(
    signedToken, chavePublica,
    JweAlgorithm.ECDH_ES_A256KW, JweEncryption.A256GCM
);`}</pre>
        <p>
          Na validação, o handler do JWT Bearer descriptografa o JWE de volta ao JWS interno (com a chave
          privada) antes de validar a assinatura ES256 (com a chave pública) — o restante do pipeline
          (issuer/audience/expiração/roles) segue igual ao de qualquer JWT.
        </p>
      </section>

      {/* 5. CSRF */}
      <section id="csrf">
        <h3>5. Proteção CSRF</h3>
        <p>
          Como o fluxo de cookie por si só é vulnerável a CSRF (o navegador envia o cookie
          automaticamente mesmo em requisições disparadas por outro site), a API implementa o padrão{" "}
          <strong>double-submit cookie</strong>: no login, além do <code>auth_token</code>, é gravado um
          segundo cookie legível por JavaScript, <code>XSRF-TOKEN</code>. O frontend deve ler esse valor e
          reenviá-lo no header <code>X-XSRF-TOKEN</code> em toda requisição que não seja segura (POST,
          PUT, DELETE); o servidor compara os dois valores em tempo fixo.
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Situação</th>
              <th>Proteção CSRF entra em ação?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sessão de cookie (<code>/login</code>), método não-seguro (POST/PUT/DELETE)</td>
              <td>Sim — exige <code>X-XSRF-TOKEN</code> batendo com o cookie</td>
            </tr>
            <tr>
              <td>Bearer puro (<code>/token</code>), sem cookie <code>auth_token</code></td>
              <td>Não — é um no-op para quem não usa o fluxo de cookie</td>
            </tr>
            <tr>
              <td>Método seguro (GET)</td>
              <td>Não se aplica</td>
            </tr>
          </tbody>
        </table>
        <p>Header e cookie divergentes → <strong>403</strong> (<code>ApiErrorResponse</code>).</p>
      </section>

      {/* 6. Claims e autorização */}
      <section id="claims_token">
        <h3>6. Claims do Token e Resolução do Tenant</h3>
        <p>O payload do JWT carrega:</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Claim</th>
              <th>Finalidade</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>sub</code></td><td>Usuário autenticado (o login, não um ID numérico)</td></tr>
            <tr><td><code>jti</code></td><td>GUID único por emissão</td></tr>
            <tr><td><code>iat</code> / <code>exp</code></td><td>Emissão e expiração de validade (1h)</td></tr>
            <tr><td><code>iss</code> / <code>aud</code></td><td>Emissor e audiência configurados</td></tr>
            <tr><td><code>id_base_referencia</code></td><td>ID do usuário na base central</td></tr>
            <tr><td><code>nome_base_dados</code></td><td>Nome do banco do tenant — usado para resolver a connection string</td></tr>
            <tr><td><strong><code>role</code></strong></td><td>Grupo de acesso do usuário — mapeado como <code>RoleClaimType</code>, usado pelo <code>[Authorize(Roles = ...)]</code></td></tr>
            <tr><td><code>cd_empresa</code></td><td>Empresa do usuário</td></tr>
          </tbody>
        </table>
        <p>
          A cada requisição autenticada, um middleware (<code>TenantConnectionMiddleware</code>, depois de
          autenticação/autorização já resolvidas) lê <code>sub</code>/<code>id_base_referencia</code>/
          <code>nome_base_dados</code>, resolve a connection string do tenant e{" "}
          <strong>revalida o usuário direto no banco do tenant</strong> (pega desativação de usuário em
          meio à sessão). Qualquer falha nessa etapa vira 401. Ver página <strong>Arquitetura</strong>,
          seção "Roteamento Multi-Tenant", para o detalhe completo.
        </p>
      </section>

      {/* 7. Autorização */}
      <section id="autorizacao">
        <h3>7. Autorização — Dois Mecanismos</h3>
        <p>
          <strong>Papel (role) do JWT</strong> — todo endpoint exige autenticação por padrão; um endpoint
          libera acesso anônimo só com <code>[AllowAnonymous]</code> explícito (como os três endpoints
          desta página). Acima disso, <code>[Authorize(Roles = ...)]</code> restringe por papel, usando
          sempre uma constante de <code>Mantran.Api/Authorization/Roles.cs</code> — nunca a string
          literal no código.
        </p>
        <p>
          <strong>Permissão fina por operação</strong> — mecanismo independente do papel do JWT: algumas
          features (ex.: Filial) checam também uma permissão granular por usuário/operação numa tabela
          legada do tenant. Quando essa checagem falha, o formato do erro é{" "}
          <strong>diferente</strong> do 403 padrão — ver a página da feature correspondente para o
          detalhe.
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>401</td><td>Não autenticado — token ausente, expirado ou assinatura inválida</td></tr>
            <tr><td>403</td><td>Autenticado, mas sem o papel exigido pelo endpoint (ou sem a permissão fina, quando aplicável)</td></tr>
          </tbody>
        </table>
        <p>
          <strong>ℹ Sobre logout e Bearer:</strong> <code>/api/auth/logout</code> só limpa os cookies. Um
          token Bearer obtido via <code>/api/auth/token</code> continua
          válido até expirar — não existe hoje uma lista de revogação de tokens.
        </p>
      </section>

      <ApiErrorReference />
    </div>
  );

  return (
    <GenericContent
      title="Mantran.Applications - API — Login (Autenticação e Autorização)"
      content={content}
    />
  );
}

export default MantranApiLoginAuthPage;
