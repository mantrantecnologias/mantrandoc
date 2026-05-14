import React, { useEffect } from 'react';
import GenericContent from '../GenericContent';

const MantranAPI_Login_Auth = ({ scrollToSection }) => {

  useEffect(() => {
    if (scrollToSection) {
      const el = document.getElementById(scrollToSection);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, [scrollToSection]);

  const content = (
    <div className="conteudo-div">
      <h4>Documentação Técnica — Sistema de Autenticação e Autorização (API TMS Web)</h4>

      {/* 1. Visão Geral */}
      <section id="mantran_api_login_auth">
        <h3>1. Visão Geral</h3>
        <p>
          Este documento descreve o funcionamento completo do sistema de autenticação e autorização da
          API TMS Web. O sistema cobre desde a validação das credenciais do usuário até o controle de
          acesso por roles em cada endpoint da API.
        </p>
        <p>O fluxo é composto por duas grandes etapas:</p>
        <ul>
          <li><strong>Autenticação:</strong> validação das credenciais, resolução do contexto multi-tenant e geração do token JWE criptografado</li>
          <li><strong>Autorização:</strong> leitura da role contida no token e controle de acesso por endpoint via <code>[Authorize(Roles = "...")]</code></li>
        </ul>

        <h4>Endpoints do TokenController</h4>
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
              <td><code>/api/token</code></td>
              <td><code>Usuario_Aplicao_API_DTo</code></td>
              <td>Login completo — retorna objeto do usuário e define cookie</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/token/gerar-token</code></td>
              <td><code>string</code> (token raw)</td>
              <td>Gera token e define cookie, retorna apenas o token em string</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/token/logout</code></td>
              <td><code>Retorno_Modelo_API_Transp</code></td>
              <td>Invalida o cookie no navegador</td>
            </tr>
          </tbody>
        </table>
        <p>
          O controller é marcado com <code>[AllowAnonymous]</code> — nenhum endpoint de autenticação
          exige token prévio.
        </p>
      </section>

      {/* 2. Arquitetura Multi-Tenant */}
      <section id="multi_tenant">
        <h3>2. Arquitetura Multi-Tenant</h3>
        <p>
          O sistema opera com múltiplas bases de dados, onde cada base representa um cliente distinto.
          A resolução do contexto do usuário segue três etapas sequenciais:
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Etapa</th>
              <th>Método</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><code>Identificar_Usuario_Base_Dados</code></td>
              <td>Valida usuário/senha na base central e retorna qual base de dados o usuário pertence</td>
            </tr>
            <tr>
              <td>2</td>
              <td><code>Buscar_Base_Dados_Contexto</code></td>
              <td>Consulta a tabela central de bases para obter DNS, porta e credenciais de conexão</td>
            </tr>
            <tr>
              <td>3</td>
              <td><code>Buscar_Usuario_Aplicacao</code></td>
              <td>Busca o perfil do usuário na base do cliente, incluindo empresa, filial e grupo de acesso</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>🔒</strong> A senha do banco de dados nunca trafega no token. O campo <code>nome_base_dados</code> é usado
          internamente para consultar a connection string numa tabela central protegida.
        </p>
      </section>

      {/* 3. Endpoints */}
      <section id="fluxo_login">
        <h3>3. Endpoints do TokenController</h3>

        <h4>3.1 POST /api/token — Login</h4>
        <p>
          Endpoint principal de autenticação. Recebe <code>Login_Request_Transp</code> no body,
          executa o fluxo multi-tenant completo, emite o cookie HttpOnly e retorna o objeto
          <code> Usuario_Aplicao_API_DTo</code> para o frontend montar a sessão.
        </p>
        <pre className="code-block">{`POST /api/token
Content-Type: application/json

{
  "Usuario": "joao.silva",
  "Senha": "minhasenha"
}

// Fluxo interno:
1. Valida ModelState
2. ContemCaracteresPerigosos(usuario) + ContemCaracteresPerigosos(senha)
3. Identificar_Usuario_Base_Dados(login)       → base central
4. Buscar_Base_Dados_Contexto(usuarioBase)     → resolve tenant
5. CarregarConexao(base_contexto)              → monta Conexao_Transp
6. Buscar_Usuario_Aplicacao(obj_cn, usuario)   → perfil no cliente
7. GerarAccessTokenCriptografado(usuarioBase)  → JWE P-256
8. Response.Cookies.Append("auth_token", token, CookieOpcoes(UtcNow + 8h))
9. return Ok(usuario_aplicacao)`}</pre>

        <p><strong>Resposta — 200 OK:</strong></p>
        <pre className="code-block">{`// Header da resposta:
Set-Cookie: auth_token=eyJ...; HttpOnly; SameSite=Lax; Path=/; Expires=...

// Body:
{
  "Nome_Usuario": "João Silva",
  "Grupo_Acesso": "tms_web",
  ...  // demais campos de Usuario_Aplicao_API_DTo
}`}</pre>

        <p><strong>Respostas de erro — todas retornam 400 Bad Request:</strong></p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Condição</th>
              <th>Mensagem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Caracteres perigosos detectados</td>
              <td>"Login ou senha inválida"</td>
            </tr>
            <tr>
              <td>Usuário não encontrado na base central</td>
              <td>"Login ou senha inválida"</td>
            </tr>
            <tr>
              <td>Base de dados do cliente não encontrada</td>
              <td>"Base de dados do usuário não encontrada"</td>
            </tr>
            <tr>
              <td>Usuário não encontrado na base do cliente</td>
              <td>"Usuário não encontrado na base de dados referente."</td>
            </tr>
            <tr>
              <td>Falha ao gerar token</td>
              <td>"Erro ao gerar o token"</td>
            </tr>
          </tbody>
        </table>

        <h4>3.2 POST /api/token/gerar-token</h4>
        <p>
          Executa o mesmo fluxo de autenticação do <code>Login</code>, mas difere no retorno:
          ao invés do objeto <code>Usuario_Aplicao_API_DTo</code>, retorna apenas o token JWE
          em string. Útil para integrações que precisam do token para montar o header
          <code> Authorization: Bearer</code> manualmente em vez de depender do cookie automático.
        </p>
        <pre className="code-block">{`POST /api/token/gerar-token
Content-Type: application/json

{
  "Usuario": "api_integracao",
  "Senha": "senha_integracao"
}

// Mesmas etapas 1-8 do Login
// Diferença no retorno:
return Ok(token);  // string raw do JWE`}</pre>

        <table className="data-table">
          <thead>
            <tr>
              <th>Característica</th>
              <th>POST /api/token</th>
              <th>POST /api/token/gerar-token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cookie emitido</td>
              <td>Sim</td>
              <td>Sim</td>
            </tr>
            <tr>
              <td>Retorno do body</td>
              <td><code>Usuario_Aplicao_API_DTo</code></td>
              <td><code>string</code> (token JWE)</td>
            </tr>
            <tr>
              <td>Uso principal</td>
              <td>Frontend React (TMS Web)</td>
              <td>Integrações externas e testes</td>
            </tr>
          </tbody>
        </table>

        <h4>3.3 POST /api/token/logout</h4>
        <p>
          Invalida o cookie no navegador sobrescrevendo-o com valor vazio e expiração no passado.
          Usa o mesmo método <code>CookieOpcoes</code> do login para garantir que todas as flags
          coincidam — se as opções diferirem, o navegador pode não remover o cookie correto.
        </p>
        <pre className="code-block">{`POST /api/token/logout
Authorization: (cookie enviado automaticamente pelo navegador)

// Implementação:
Response.Cookies.Append( "auth_token", "", CookieOpcoes(
    DateTimeOffset.UtcNow.AddHours( -1 )  // expiração no passado
) );
return Ok( new Retorno_Modelo_API_Transp<Usuario_Aplicao_API_DTo>( true, "Logout realizado com sucesso." ) );`}</pre>
        <p><strong>Resposta — 200 OK:</strong></p>
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": ["Logout realizado com sucesso."],
  "data": null,
  "codigo": null
}`}</pre>

        <h4>3.4 Proteção contra SQL Injection</h4>
        <p>
          Antes de qualquer consulta ao banco, o método <code>ContemCaracteresPerigosos</code> verifica se usuário ou
          senha contém caracteres ou palavras reservadas de SQL, como aspas, ponto-e-vírgula, comentários
          e comandos DDL/DML. Caso detectado, o request é rejeitado com <strong>400 Bad Request</strong> antes de
          tocar na base de dados.
        </p>
      </section>

      {/* 4. Cookie */}
      <section id="cookie">
        <h3>4. O que é um Cookie</h3>
        <p>
          Um cookie é um pequeno arquivo de texto que o servidor envia ao navegador do usuário junto com a
          resposta HTTP. O navegador armazena esse arquivo e o reenvia automaticamente ao servidor em
          todas as requisições subsequentes para aquele domínio. É o mecanismo mais antigo e consolidado
          para manter estado entre cliente e servidor na web, já que o protocolo HTTP é por natureza sem
          estado — cada requisição é independente e o servidor não sabe, por padrão, quem está fazendo a
          chamada.
        </p>
        <p>
          No contexto de autenticação, o cookie transporta o token do usuário de forma transparente: após o
          login bem-sucedido, o servidor grava o token no cookie e, dali em diante, o navegador o envia
          automaticamente em cada request sem que o frontend precise fazer nenhuma ação manual.
        </p>

        <h4>4.1 Como o Navegador Trata o Cookie</h4>
        <p>
          Quando o servidor responde com um cabeçalho <code>Set-Cookie</code>, o navegador registra o valor e passa a
          incluí-lo automaticamente no cabeçalho <code>Cookie</code> em toda requisição futura ao mesmo domínio e
          caminho. Esse comportamento é nativo dos navegadores e não exige nenhum código JavaScript para funcionar.
        </p>
        <pre className="code-block">{`// Resposta do servidor após login bem-sucedido:
Set-Cookie: auth_token=eyJhbGci...; HttpOnly; SameSite=Lax; Path=/; Expires=...

// Em toda requisição subsequente, o navegador envia automaticamente:
Cookie: auth_token=eyJhbGci...`}</pre>

        <h4>4.2 CookieOpcoes — Opções Centralizadas</h4>
        <p>
          As opções do cookie são definidas em um único método privado no controller. Isso garante que
          login e logout usem exatamente as mesmas flags — se as opções diferirem, o logout pode emitir
          um cookie diferente e o navegador não remove o original.
        </p>
        <pre className="code-block">{`private CookieOptions CookieOpcoes( DateTimeOffset expires ) => new CookieOptions
{
    HttpOnly = true,                      // JavaScript não consegue ler
    Secure   = false,                     // true em produção (exige HTTPS)
    SameSite = SameSiteMode.Lax,          // compatível com proxy Vite
    Path     = "/",                       // disponível para toda a API
    Expires  = expires
};

// Uso no Login (expira em 8h):
Response.Cookies.Append( "auth_token", token, CookieOpcoes( DateTimeOffset.UtcNow.AddHours( 8 ) ) );

// Uso no Logout (expiração no passado — força remoção):
Response.Cookies.Append( "auth_token", "", CookieOpcoes( DateTimeOffset.UtcNow.AddHours( -1 ) ) );`}</pre>

        <h4>4.3 Flags de Segurança do Cookie</h4>
        <p>As flags do cookie definem como ele se comporta e determinam seu nível de proteção:</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Flag</th>
              <th>Valor</th>
              <th>O que faz e por que importa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>HttpOnly</strong></td>
              <td>true</td>
              <td>Impede que JavaScript acesse o cookie via <code>document.cookie</code>. É a principal defesa contra ataques XSS, onde um script malicioso injetado na página tenta roubar o token do usuário.</td>
            </tr>
            <tr>
              <td><strong>Secure</strong></td>
              <td>false (dev) / true (prod)</td>
              <td>Quando ativo, o navegador só envia o cookie em conexões HTTPS. Em produção é obrigatório — sem essa flag o token pode ser capturado em texto puro por um atacante na mesma rede.</td>
            </tr>
            <tr>
              <td><strong>SameSite</strong></td>
              <td>Lax</td>
              <td>Controla em quais situações o cookie é enviado. Lax permite navegação normal e é compatível com o proxy do Vite em desenvolvimento.</td>
            </tr>
            <tr>
              <td><strong>Path</strong></td>
              <td>/</td>
              <td>Define para quais rotas o cookie é enviado. O valor <code>/</code> significa que ele acompanha todas as requisições para a API, independente do caminho.</td>
            </tr>
            <tr>
              <td><strong>Expires</strong></td>
              <td>UtcNow + 8h</td>
              <td>Define quando o cookie expira no navegador. É mantido sincronizado com a expiração do token JWT para que ambos expirem ao mesmo tempo.</td>
            </tr>
          </tbody>
        </table>

        <h4>4.4 Cookie vs. localStorage</h4>
        <p>
          Uma abordagem alternativa comum é armazenar o token no localStorage do navegador e enviá-lo
          manualmente no cabeçalho Authorization de cada requisição. A tabela abaixo compara as duas abordagens:
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Característica</th>
              <th>Cookie HttpOnly</th>
              <th>localStorage + Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Proteção contra XSS</td>
              <td>Alta — JS não acessa</td>
              <td>Baixa — JS acessa livremente</td>
            </tr>
            <tr>
              <td>Envio automático</td>
              <td>Sim — navegador envia sozinho</td>
              <td>Não — frontend precisa injetar o header</td>
            </tr>
            <tr>
              <td>Proteção contra CSRF</td>
              <td>Requer SameSite ou token CSRF</td>
              <td>Naturalmente imune</td>
            </tr>
            <tr>
              <td>Uso neste projeto</td>
              <td><strong>Sim — escolha adotada</strong></td>
              <td>Não utilizado</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>🔒</strong> O cookie HttpOnly foi escolhido por oferecer a melhor proteção contra XSS. O token nunca fica
          acessível ao JavaScript da página, mesmo que um script malicioso seja injetado.
        </p>
      </section>

      {/* 5. Geração do Token */}
      <section id="geracao_token">
        <h3>5. Geração do Token — GerarAccessTokenCriptografado</h3>
        <p>
          Este método é o núcleo da segurança do sistema. Ele produz um token JWE (JSON Web Encryption)
          passando por duas etapas sequenciais: <strong>assinatura (JWS)</strong> e <strong>criptografia (JWE)</strong>.
          As chaves ECDSA são lidas do <code>appsettings.json</code> via seção <code>Jwt</code>.
        </p>

        <h4>5.1 Carregamento das Chaves (Program.cs)</h4>
        <p>
          Na inicialização da API, as coordenadas da curva P-256 são lidas do <code>appsettings</code> e
          dois objetos ECDsa são instanciados: um com chave pública (para validação) e um com chave
          privada (para assinatura e descriptografia).
        </p>
        <pre className="code-block">{`var jwtSection = builder.Configuration.GetSection( "Jwt" );

// Chave pública — valida a assinatura do JWS
var ecdsaPublicKey = ECDsa.Create( new ECParameters
{
    Curve = ECCurve.NamedCurves.nistP256,
    Q = new ECPoint
    {
        X = Base64UrlEncoder.DecodeBytes( jwtSection[ "QX" ]! ),
        Y = Base64UrlEncoder.DecodeBytes( jwtSection[ "QY" ]! )
    }
} );

// Chave privada — assina o JWS e descriptografa o JWE
var ecdsaPrivateKey = ECDsa.Create( new ECParameters
{
    Curve = ECCurve.NamedCurves.nistP256,
    D  = Base64UrlEncoder.DecodeBytes( jwtSection[ "D"  ]! ),
    Q = new ECPoint
    {
        X = Base64UrlEncoder.DecodeBytes( jwtSection[ "QX" ]! ),
        Y = Base64UrlEncoder.DecodeBytes( jwtSection[ "QY" ]! )
    }
} );`}</pre>

        <p><strong>Estrutura esperada no appsettings.json:</strong></p>
        <pre className="code-block">{`{
  "Jwt": {
    "QX":       "base64url_da_coordenada_X_da_chave_publica",
    "QY":       "base64url_da_coordenada_Y_da_chave_publica",
    "D":        "base64url_da_chave_privada",
    "Issuer":   "Mantran",
    "Audience": "TMS-Web"
  }
}`}</pre>

        <h4>5.2 Processo de Geração — Duas Etapas</h4>
        <p>O <code>GerarAccessTokenCriptografado</code> executa internamente:</p>
        <pre className="code-block">{`// Etapa 1 — ASSINAR: produz um JWS com ECDSA P-256 (ES256)
// Claims incluídas: sub, jti, iat, exp (+8h), id_base_referencia, nome_base_dados, role
var jws = JWT.Encode(
    payload,
    ecdsaPrivateKey,      // chave privada D
    JwsAlgorithm.ES256    // ECDSA com SHA-256
);

// Etapa 2 — CRIPTOGRAFAR: envolve o JWS em um JWE com ECDH-ES + AES-256-GCM
var jwe = JWT.Encode(
    jws,
    ecdsaPublicKey,              // chave pública QX+QY
    JweAlgorithm.ECDH_ES_A256KW, // troca de chave com curva elíptica
    JweEncryption.A256GCM         // AES-256 no modo GCM
);

return jwe; // token final — 5 partes separadas por ponto`}</pre>

        <table className="data-table">
          <thead>
            <tr>
              <th>Etapa</th>
              <th>Algoritmo</th>
              <th>Chave usada</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 — Assinatura</td>
              <td>ECDSA ES256</td>
              <td>Privada (D)</td>
              <td>JWS — payload legível mas assinado</td>
            </tr>
            <tr>
              <td>2 — Criptografia</td>
              <td>ECDH-ES-A256KW + AES-256-GCM</td>
              <td>Pública (QX+QY)</td>
              <td>JWE — payload completamente cifrado</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 6. Criptografia de Curva Elíptica */}
      <section id="curva_eliptica">
        <h3>6. Criptografia de Curva Elíptica</h3>

        <h4>6.1 O que é uma Curva Elíptica</h4>
        <p>Uma curva elíptica é uma curva matemática definida pela equação:</p>
        <pre className="code-block">{`y² = x³ + ax + b`}</pre>
        <p>
          Apesar do nome, ela não tem relação com uma elipse geométrica. O que a torna útil para criptografia
          são suas propriedades algébricas: é possível definir uma operação de "soma" entre dois pontos da
          curva, e essa soma produz um terceiro ponto que também está na curva. Com isso, é possível
          multiplicar um ponto por um número inteiro somando-o repetidas vezes consigo mesmo.
        </p>
        <p>
          A propriedade central que garante a segurança é a <strong>assimetria computacional</strong>: dado um ponto P na
          curva e um número secreto k, calcular <code>k × P</code> é extremamente rápido. Porém, dado apenas P e o
          resultado <code>k × P</code>, descobrir k de volta é computacionalmente impossível com os recursos atuais.
          Esse problema é chamado de <strong>Problema do Logaritmo Discreto em Curvas Elípticas (ECDLP)</strong>.
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Operação fácil</th>
              <th>Operação impossível</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>k × P = Q</code> (chave privada × ponto gerador = chave pública)</td>
              <td><code>Q ÷ P = k</code> (descobrir a chave privada a partir da pública)</td>
            </tr>
          </tbody>
        </table>

        <h4>6.2 A Curva P-256 (nistP256)</h4>
        <p>
          A P-256 é uma curva elíptica específica padronizada pelo NIST (National Institute of Standards and
          Technology) dos Estados Unidos. Ela opera sobre um campo finito de números inteiros de 256 bits.
          Por ser uma curva padronizada e auditada internacionalmente, a P-256 é amplamente suportada por
          bibliotecas criptográficas, sistemas operacionais e protocolos como TLS.
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Curva</th>
              <th>Segurança</th>
              <th>Tamanho da chave</th>
              <th>Uso</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>P-256</strong></td>
              <td>128 bits</td>
              <td>256 bits</td>
              <td><strong>Adotado neste projeto</strong></td>
            </tr>
            <tr>
              <td>P-384</td>
              <td>192 bits</td>
              <td>384 bits</td>
              <td>Alta segurança</td>
            </tr>
            <tr>
              <td>P-521</td>
              <td>260 bits</td>
              <td>521 bits</td>
              <td>Máxima segurança</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>ℹ</strong> 128 bits de segurança significa que um atacante precisaria realizar aproximadamente 2¹²⁸ operações
          para quebrar a chave. Com os computadores mais rápidos existentes hoje, isso levaria bilhões de anos.
        </p>

        <h4>6.3 O Par de Chaves ECDSA</h4>
        <p>O ECDSA (Elliptic Curve Digital Signature Algorithm) é o algoritmo de assinatura digital construído sobre curvas elípticas. O par de chaves é gerado da seguinte forma:</p>
        <ul>
          <li>Escolhe-se um ponto fixo G na curva, chamado de ponto gerador (definido pela especificação P-256)</li>
          <li>Gera-se um número aleatório secreto k — este é a <strong>chave privada D</strong></li>
          <li>Calcula-se <code>Q = k × G</code> — este ponto Q na curva é a <strong>chave pública</strong>, representada pelas coordenadas QX e QY</li>
        </ul>
        <table className="data-table">
          <thead>
            <tr>
              <th>Chave</th>
              <th>Composta por</th>
              <th>Responsabilidade no sistema</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Privada (D)</strong></td>
              <td>D (32 bytes)</td>
              <td>Fica no servidor. Usada para <strong>ASSINAR</strong> o token (JWS) e <strong>DESCRIPTOGRAFAR</strong> tokens recebidos (JWE). Nunca sai do servidor.</td>
            </tr>
            <tr>
              <td><strong>Pública (Q)</strong></td>
              <td>QX + QY (32 + 32 bytes)</td>
              <td>Derivada da chave privada. Usada para <strong>VALIDAR</strong> assinaturas e <strong>CRIPTOGRAFAR</strong> tokens. Pode ser compartilhada com segurança.</td>
            </tr>
          </tbody>
        </table>

        <h4>6.4 ECDSA — Como Funciona a Assinatura Digital</h4>
        <p>Quando o servidor assina um token JWT com a chave privada D, ele está provando matematicamente que aquele token foi emitido por quem possui D. O processo funciona em duas fases:</p>
        <p><strong style={{color: '#b91c1c'}}>Assinatura (feita pelo servidor com D):</strong></p>
        <ul>
          <li>O conteúdo do token (payload) é transformado em um hash SHA-256</li>
          <li>Um número aleatório efêmero r é gerado para aquela assinatura específica</li>
          <li>A assinatura é calculada combinando o hash, o número r e a chave privada D em operações de multiplicação de pontos na curva</li>
          <li>O resultado são dois números (R, S) que formam a assinatura — diferentes a cada emissão mesmo para o mesmo payload</li>
        </ul>
        <p><strong style={{color: '#b91c1c'}}>Verificação (feita pelo middleware com QX e QY):</strong></p>
        <ul>
          <li>O middleware recebe o token e a assinatura (R, S)</li>
          <li>Usando apenas a chave pública Q (QX, QY), realiza operações matemáticas na curva com o hash do payload e os valores R e S</li>
          <li>Se o resultado coincidir com o ponto esperado na curva, a assinatura é válida — o token é autêntico e não foi adulterado</li>
          <li>Se qualquer bit do payload tiver sido alterado, o hash muda e a verificação falha automaticamente</li>
        </ul>
        <p>
          <strong>🔒</strong> É matematicamente impossível gerar uma assinatura válida sem ter a chave privada D, mesmo
          conhecendo a chave pública Q. Isso garante que nenhum atacante consegue forjar um token.
        </p>

        <h4>6.5 ECDH-ES — Como Funciona a Criptografia (JWE)</h4>
        <p>
          Após a assinatura, o JWS é criptografado usando ECDH-ES (Elliptic Curve Diffie-Hellman Ephemeral Static).
          O processo funciona em duas camadas:
        </p>
        <p><strong style={{color: '#b91c1c'}}>Camada 1 — Acordo de chave com ECDH (troca de segredo):</strong></p>
        <ul>
          <li>O servidor gera um par de chaves efêmeras temporárias apenas para aquela requisição específica</li>
          <li>Usando a chave privada efêmera e a chave pública do servidor (QX, QY), realiza uma operação de multiplicação de pontos na curva que produz um ponto compartilhado</li>
          <li>Esse ponto compartilhado é derivado em uma chave simétrica AES-256 usando HKDF (função de derivação de chave)</li>
          <li>A chave efêmera pública é incluída no cabeçalho do JWE para que o servidor possa reproduzir o mesmo ponto compartilhado no momento da descriptografia</li>
          <li>A chave efêmera privada é descartada imediatamente — cada token tem uma chave diferente (<strong>Perfect Forward Secrecy</strong>)</li>
        </ul>
        <p><strong style={{color: '#b91c1c'}}>Camada 2 — Criptografia do conteúdo com AES-256-GCM:</strong></p>
        <ul>
          <li>Com a chave AES-256 derivada, o JWS inteiro é criptografado usando AES-GCM (Advanced Encryption Standard no modo Galois/Counter Mode)</li>
          <li>O GCM gera um vetor de inicialização (IV) aleatório e uma tag de autenticação ao final</li>
          <li>A tag de autenticação garante integridade: qualquer adulteração no ciphertext invalida a tag e o token é rejeitado</li>
        </ul>
        <pre className="code-block">{`// Resultado final: token JWE com 5 partes separadas por ponto
header . encryptedKey . IV . ciphertext . tag

header       → algoritmos usados (ECDH-ES-A256KW + AES-256-GCM)
encryptedKey → chave efêmera pública do servidor
IV           → vetor de inicialização do AES-GCM
ciphertext   → JWS completamente criptografado
tag          → tag de autenticação — detecta adulteração`}</pre>

        <h4>6.6 Por que Curva Elíptica e não RSA</h4>
        <p>O RSA é outro algoritmo amplamente usado para o mesmo propósito. A principal diferença está no tamanho das chaves necessárias para o mesmo nível de segurança:</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Segurança</th>
              <th>RSA (tamanho da chave)</th>
              <th>ECDSA (tamanho da chave)</th>
              <th>Vantagem ECDSA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>80 bits</td>
              <td>1024 bits</td>
              <td>160 bits</td>
              <td>6× menor</td>
            </tr>
            <tr>
              <td>112 bits</td>
              <td>2048 bits</td>
              <td>224 bits</td>
              <td>9× menor</td>
            </tr>
            <tr>
              <td>128 bits</td>
              <td>3072 bits</td>
              <td><strong>256 bits — P-256</strong></td>
              <td>12× menor</td>
            </tr>
          </tbody>
        </table>
        <p>
          Chaves menores significam tokens JWT menores, operações criptográficas mais rápidas e menor
          consumo de CPU por request — vantagens relevantes para uma API que valida o token a cada requisição.
        </p>
      </section>

      {/* 7. Fluxo Visual */}
      <section id="fluxo_visual_token">
        <h3>7. Fluxo Visual do Token</h3>
        <p>O fluxo completo desde a montagem do payload até o token final criptografado:</p>
        <pre className="code-block">{`usuarioBase (Nome_Usuario, ID, Base_Empresa, Grupo_Acesso)
  |
  v
[ Claims: sub, jti, iat, exp, id_base_referencia, nome_base_dados, role ]
  |
  v
appsettings.json  →  Jwt:D, Jwt:QX, Jwt:QY
  |                             |
  v                             v
PrivateKey (D+QX+QY)    PublicKey (QX+QY apenas)
  |                             |
  v                             |
Assina com ES256                |
  |                             v
JWS (assinado)     Criptografa com ECDH-ES-A256KW + AES-256-GCM
  |_____________________________________________|
                        |
                        v
             JWE — token final criptografado
             (completamente ilegível sem a chave privada D)
                        |
                        v
             Cookie HttpOnly auth_token  →  enviado ao navegador`}</pre>
      </section>

      {/* 8. Validação do Token */}
      <section id="validacao_token">
        <h3>8. Validação do Token no Middleware (OnMessageReceived)</h3>
        <p>
          A cada request, o evento <code>OnMessageReceived</code> do JWT Bearer intercepta o pipeline
          antes de qualquer controller. O middleware não usa o comportamento padrão do ASP.NET
          (que esperaria um header <code>Authorization: Bearer</code>) — em vez disso, lê o cookie
          e executa a validação manualmente em sete etapas:
        </p>
        <pre className="code-block">{`OnMessageReceived = context =>
{
    var cookieToken = context.Request.Cookies[ "auth_token" ];

    if( !string.IsNullOrEmpty( cookieToken ) )
    {
        // Etapa 1 — Limpeza rigorosa de caracteres residuais
        var rawToken = cookieToken.Trim().Trim('"').Trim();

        // Etapa 2 — Descriptografa o JWE → extrai o JWS interno
        var jws = JWT.Decode(
            rawToken,
            ecdsaPrivateKey,
            JweAlgorithm.ECDH_ES_A256KW,
            JweEncryption.A256GCM
        );
        jws = jws.Trim().Trim('"').Trim();

        // Etapa 3 — Valida assinatura ECDSA do JWS (ES256) com chave pública
        var decodedPayloadJson = Jose.JWT.Decode( jws, ecdsaPublicKey, JwsAlgorithm.ES256 );

        // Etapa 4 — Deserializa claims do payload
        var payloadData = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>( decodedPayloadJson );

        // Etapa 5 — Valida expiração (exp) com tolerância de 5 minutos
        var expSeconds = payloadData["exp"].GetInt64();
        var expDate    = new DateTime(1970,1,1,0,0,0,DateTimeKind.Utc).AddSeconds(expSeconds);
        if( DateTime.UtcNow > expDate.AddMinutes(5) )
            throw new Exception("Token expirado.");

        // Etapa 6 — Constrói ClaimsPrincipal manualmente com todas as claims
        var claimsList = payloadData.Select( kvp => new Claim( kvp.Key, kvp.Value.ToString() ) );
        var identity   = new ClaimsIdentity( claimsList, "CookieAuth", "sub", "role" );
        context.Principal = new ClaimsPrincipal( identity );

        // Etapa 7 — Marca o request como autenticado
        context.Success();
    }
    // Sem cookie → sem context.Success() → 401 em rotas protegidas
}`}</pre>

        <table className="data-table">
          <thead>
            <tr>
              <th>Etapa</th>
              <th>O que faz</th>
              <th>Falha se</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 — Limpeza</td>
              <td>Remove aspas e espaços residuais do valor do cookie</td>
              <td>—</td>
            </tr>
            <tr>
              <td>2 — Descriptografia JWE</td>
              <td>Usa chave privada D para extrair o JWS interno</td>
              <td>Token adulterado, chave errada ou formato inválido</td>
            </tr>
            <tr>
              <td>3 — Validação JWS</td>
              <td>Usa chave pública QX+QY para confirmar assinatura ES256</td>
              <td>Payload foi alterado após a assinatura</td>
            </tr>
            <tr>
              <td>4 — Deserialização</td>
              <td>Lê o JSON das claims do payload</td>
              <td>Payload malformado</td>
            </tr>
            <tr>
              <td>5 — Expiração</td>
              <td>Compara <code>exp</code> com <code>UtcNow</code> (tolerância de 5 min)</td>
              <td>Token expirado</td>
            </tr>
            <tr>
              <td>6 — ClaimsPrincipal</td>
              <td>Constrói a identidade com <code>nameType=sub</code> e <code>roleType=role</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td>7 — context.Success()</td>
              <td>Sinaliza ao pipeline que o request está autenticado</td>
              <td>Não chamado se qualquer etapa anterior falhar → 401</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>❌</strong> Qualquer exceção nas etapas 2 a 5 é capturada silenciosamente (<code>catch{'{}'}</code>).
          O <code>context.Success()</code> não é chamado e o ASP.NET retorna <strong>401 Unauthorized</strong> para rotas protegidas.
        </p>
      </section>

      {/* 9. Claims do Token */}
      <section id="claims_token">
        <h3>9. Claims do Token</h3>
        <p>O payload do token contém as seguintes informações do usuário autenticado:</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Claim</th>
              <th>Finalidade</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>sub</code></td><td>Nome do usuário autenticado (subject) — mapeado como <code>NameClaimType</code></td></tr>
            <tr><td><code>jti</code></td><td>GUID único por emissão — impede reuso do token</td></tr>
            <tr><td><code>iat</code></td><td>Timestamp Unix de emissão do token</td></tr>
            <tr><td><code>exp</code></td><td>Timestamp Unix de expiração (iat + 8 horas)</td></tr>
            <tr><td><code>id_base_referencia</code></td><td>ID do tenant — identifica a base de dados do cliente</td></tr>
            <tr><td><code>nome_base_dados</code></td><td>Nome da base do cliente para resolução da connection string</td></tr>
            <tr><td><strong><code>role</code></strong></td><td><strong>Grupo de acesso do usuário — mapeado como <code>RoleClaimType</code>, determina quais endpoints ele pode acessar</strong></td></tr>
          </tbody>
        </table>
        <p>
          O mapeamento <code>NameClaimType = "sub"</code> e <code>RoleClaimType = "role"</code> é
          configurado tanto no <code>TokenValidationParameters</code> (Program.cs) quanto na
          construção do <code>ClaimsIdentity</code> no <code>OnMessageReceived</code>.
        </p>
      </section>

      {/* 10. Autorização por Roles */}
      <section id="autorizacao_roles">
        <h3>10. Autorização por Roles</h3>

        <h4>10.1 Grupos de Acesso</h4>
        <p>O campo <code>role</code> no token determina o nível de acesso do usuário. Os grupos existentes são:</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Origem</th>
              <th>Nível de Acesso</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>tms_web</code></td>
              <td>Usuários do frontend React</td>
              <td>Acesso total a todos os endpoints</td>
            </tr>
            <tr>
              <td><code>api_externa / nome_cliente</code></td>
              <td>Integrações de terceiros (ex: Amalog)</td>
              <td>Acesso restrito aos endpoints autorizados</td>
            </tr>
          </tbody>
        </table>

        <h4>10.2 Como Definir Acesso por Endpoint</h4>
        <p>Com a role presente no token, basta decorar os controllers ou actions com o atributo <code>[Authorize(Roles = "...")]</code>:</p>
        <pre className="code-block">{`// Qualquer usuário autenticado (sem restrição de role)
[Authorize]
[HttpGet("clientes")]
public IActionResult ListarClientes() { ... }

// Somente usuários do TMS Web
[Authorize(Roles = "tms_web")]
[HttpDelete("cliente/{id}")]
public IActionResult DeletarCliente(int id) { ... }

// Acesso compartilhado entre grupos
[Authorize(Roles = "tms_web,amalog")]
[HttpGet("cte/{id}")]
public IActionResult BuscarCte(int id) { ... }

// Exclusivo para integração da Amalog
[Authorize(Roles = "amalog")]
[HttpPost("cte/importar")]
public IActionResult ImportarCte() { ... }`}</pre>

        <h4>10.3 Respostas HTTP de Autorização</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Situação</th>
              <th>Causa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>200 OK</td>
              <td>Autenticado e autorizado</td>
              <td>Token válido e role correta para o endpoint</td>
            </tr>
            <tr>
              <td>401 Unauthorized</td>
              <td>Não autenticado</td>
              <td>Token ausente, expirado ou assinatura inválida</td>
            </tr>
            <tr>
              <td>403 Forbidden</td>
              <td>Autenticado mas sem permissão</td>
              <td>Token válido porém role não autorizada para o endpoint</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>ℹ 401 vs 403:</strong> o 401 significa que o usuário não está identificado. O 403 significa que ele
          está identificado mas não tem permissão. São respostas distintas e importantes para o frontend tratar corretamente.
        </p>
      </section>

      {/* 11. Configuração JWT Bearer (Program.cs) */}
      <section id="config_jwt_bearer">
        <h3>11. Configuração JWT Bearer (Program.cs)</h3>
        <p>
          O JWT Bearer é configurado no <code>Program.cs</code> com parâmetros de validação que
          complementam a validação manual do <code>OnMessageReceived</code>. Como o token é lido do
          cookie (e não do header <code>Authorization</code>), o comportamento padrão é substituído pelo
          evento, mas os parâmetros de validação do <code>TokenValidationParameters</code> ainda definem
          o comportamento de fallback e o mapeamento de claims.
        </p>
        <pre className="code-block">{`builder.Services.AddAuthentication( options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme    = JwtBearerDefaults.AuthenticationScheme;
} )
.AddJwtBearer( options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        // Valida assinatura com chave pública ECDSA
        ValidateIssuerSigningKey = true,
        IssuerSigningKey         = new ECDsaSecurityKey( ecdsaPublicKey ),

        // Issuer/Audience desabilitados — segurança garantida pela assinatura ECDSA
        ValidateIssuer   = false,
        ValidateAudience = false,

        // Valida expiração com tolerância de 5 min para dessincronia de relógio
        ValidateLifetime = true,
        ClockSkew        = TimeSpan.FromMinutes( 5 ),

        // Mapeamento correto das claims para ClaimsPrincipal
        NameClaimType = "sub",
        RoleClaimType = "role"
    };
} );

// Registro do Token_Servico para injeção de dependência
builder.Services.AddScoped<Token_Servico>();`}</pre>

        <h4>11.1 JwtSecurityTokenHandler — Desabilitando Mapeamento Padrão</h4>
        <p>
          O .NET mapeia automaticamente algumas claims para nomes longos do namespace do WS-Federation.
          Por exemplo, <code>sub</code> vira <code>http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier</code>.
          A linha abaixo desabilita esse mapeamento para que as claims mantenham seus nomes originais do JWT:
        </p>
        <pre className="code-block">{`// No topo do Program.cs — antes de qualquer builder
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();`}</pre>
        <p>
          Sem essa linha, <code>context.User.FindFirst("sub")</code> retornaria <code>null</code>
          e o <code>ConexaoMiddleware</code> não conseguiria ler o ID do usuário do token.
        </p>
      </section>

      {/* 12. CORS */}
      <section id="config_cors">
        <h3>12. Configuração CORS</h3>
        <p>
          O CORS (Cross-Origin Resource Sharing) é configurado explicitamente para permitir apenas
          origens conhecidas. O <code>AllowCredentials()</code> é obrigatório para que o navegador
          envie o cookie HttpOnly em requisições cross-origin.
        </p>
        <pre className="code-block">{`builder.Services.AddCors( options =>
{
    options.AddPolicy( "CorsPolicy", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5174",          // frontend Vite em desenvolvimento
                "https://mantranweb.vercel.app"  // frontend em produção
              )
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();               // obrigatório para cookies cross-origin
    } );
} );

// No pipeline (deve vir depois de UseRouting e antes de UseAuthentication):
app.UseCors( "CorsPolicy" );`}</pre>

        <table className="data-table">
          <thead>
            <tr>
              <th>Configuração</th>
              <th>Por que é necessária</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>WithOrigins(...)</code></td>
              <td>Restringe o CORS a origens específicas. Obrigatório com <code>AllowCredentials</code> — <code>AllowAnyOrigin</code> é incompatível com cookies.</td>
            </tr>
            <tr>
              <td><code>AllowCredentials()</code></td>
              <td>Permite que o navegador envie cookies em requisições cross-origin. Sem isso o cookie nunca chega à API.</td>
            </tr>
            <tr>
              <td><code>AllowAnyMethod()</code></td>
              <td>Permite GET, POST, PUT, DELETE etc. sem necessidade de listar cada um.</td>
            </tr>
            <tr>
              <td><code>AllowAnyHeader()</code></td>
              <td>Permite <code>Content-Type</code>, <code>Authorization</code> e demais headers personalizados.</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 13. Configuração do Banco */}
      <section id="config_banco">
        <h3>13. Configuração do Banco de Dados</h3>
        <p>
          Para suportar múltiplos grupos de acesso, a tabela de usuários da base central deve conter a coluna
          <code> grupo_acesso</code>. Esta coluna é lida durante o login e incluída no token.
        </p>
        <pre className="code-block">{`-- Adicionando a coluna de grupo na tabela de usuários da base central
ALTER TABLE usuarios ADD grupo_acesso VARCHAR(50) NOT NULL DEFAULT 'tms_web';

-- Usuário do sistema web (acesso total)
UPDATE usuarios SET grupo_acesso = 'tms_web' WHERE nome = 'joao.silva';

-- Usuário de integração da Amalog (acesso restrito)
UPDATE usuarios SET grupo_acesso = 'amalog' WHERE nome = 'api_amalog';`}</pre>
      </section>

      {/* 14. Considerações de Segurança */}
      <section id="seguranca_consideracoes">
        <h3>14. Considerações de Segurança</h3>

        <h4>14.1 Proteções Implementadas</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Ameaça</th>
              <th>Proteção</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SQL Injection</td>
              <td>Validação de caracteres perigosos antes de qualquer consulta</td>
            </tr>
            <tr>
              <td>Leitura do token pelo cliente</td>
              <td>JWE com AES-256-GCM — conteúdo ilegível sem a chave privada D</td>
            </tr>
            <tr>
              <td>Falsificação de token</td>
              <td>Assinatura ECDSA P-256 — impossível forjar sem a chave privada</td>
            </tr>
            <tr>
              <td>Adulteração do token</td>
              <td>Tag de autenticação GCM detecta qualquer alteração no ciphertext</td>
            </tr>
            <tr>
              <td>Roubo via JavaScript (XSS)</td>
              <td>Cookie com flag HttpOnly — JavaScript não consegue ler</td>
            </tr>
            <tr>
              <td>Interceptação na rede</td>
              <td>Cookie com flag Secure em produção — exige HTTPS</td>
            </tr>
            <tr>
              <td>Acesso não autorizado a endpoints</td>
              <td>Autorização por roles via <code>[Authorize(Roles)]</code> — retorna 403 Forbidden</td>
            </tr>
            <tr>
              <td>Reuso após logout</td>
              <td>Jti único por emissão — pode ser adicionado a blacklist futuramente</td>
            </tr>
            <tr>
              <td>Claims adulteradas no payload</td>
              <td>Validação dupla: descriptografia JWE + verificação de assinatura JWS no OnMessageReceived</td>
            </tr>
          </tbody>
        </table>

        <h4>14.2 Recomendação — Chaves no appsettings</h4>
        <p>
          <strong>⚠</strong> As chaves ECDSA (D, QX, QY) estão armazenadas no <code>appsettings.json</code>. Em produção
          recomenda-se mover essas chaves para um cofre de segredos como <strong>Azure Key Vault</strong>,
          <strong> AWS Secrets Manager</strong> ou variáveis de ambiente protegidas. Se o appsettings vazar, quem
          tiver D pode assinar e descriptografar tokens.
        </p>
      </section>

      {/* 15. Resumo dos Componentes */}
      <section id="resumo_componentes">
        <h3>15. Resumo dos Componentes</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Componente</th>
              <th>Responsabilidade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>TokenController</code></td>
              <td>Expõe os endpoints <code>/login</code>, <code>/gerar-token</code> e <code>/logout</code>. Coordena as etapas de autenticação e emite/invalida o cookie.</td>
            </tr>
            <tr>
              <td><code>CookieOpcoes()</code></td>
              <td>Método privado que centraliza as flags do cookie — garante que login e logout usem exatamente as mesmas opções.</td>
            </tr>
            <tr>
              <td><code>Token_Servico</code></td>
              <td>Gera o token JWE, valida caracteres perigosos e resolve a conexão multi-tenant por request.</td>
            </tr>
            <tr>
              <td><code>Autenticacao_Negocio</code></td>
              <td>Acessa as bases de dados para identificar usuário e contexto (3 etapas multi-tenant).</td>
            </tr>
            <tr>
              <td><code>OnMessageReceived (Program.cs)</code></td>
              <td>Intercepta cada request, descriptografa o JWE, valida a assinatura JWS, verifica expiração e constrói o <code>ClaimsPrincipal</code> manualmente.</td>
            </tr>
            <tr>
              <td><code>JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear()</code></td>
              <td>Desabilita remapeamento automático de claims — garante que <code>sub</code> e <code>role</code> mantenham seus nomes originais.</td>
            </tr>
            <tr>
              <td><code>[Authorize(Roles)]</code></td>
              <td>Atributo nos endpoints que restringe acesso por grupo de usuário.</td>
            </tr>
            <tr>
              <td><code>ConexaoMiddleware</code></td>
              <td>Usa as claims do token (<code>sub</code>, <code>id_base_referencia</code>, <code>nome_base_dados</code>) para carregar a conexão do cliente após autenticação.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );

  return (
    <GenericContent
      title="Mantran.API — Login (Autenticação e Autorização)"
      content={content}
    />
  );
};

export default MantranAPI_Login_Auth;
