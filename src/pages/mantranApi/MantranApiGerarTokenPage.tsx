import GenericContent from "@shared/components/GenericContent";

function MantranApiGerarTokenPage() {
  const content = (
    <div className="conteudo-div">
      <h4>Como Gerar um Token de Acesso — Mantran.Applications API</h4>

      <section id="mantran_api_gerar_token">
        <h3>1. Visão Geral</h3>
        <p>
          Para acessar os endpoints protegidos da API, é necessário obter um token de acesso JWT.
          O endpoint <code>Gerar-Token</code> é destinado ao uso por <strong>integrações externas e
          sistemas de terceiros</strong> — retorna apenas o token e sua validade, sem dados de perfil
          do usuário.
        </p>
        <p>
          O token gerado tem validade de <strong>1 hora</strong> a partir do momento da geração.
          Após esse período será necessário gerar um novo token.
        </p>
      </section>

      <section id="gerar_token_endpoint">
        <h3>2. Endpoint de Geração de Token</h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>Campo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Método</strong></td>
              <td><code>POST</code></td>
            </tr>
            <tr>
              <td><strong>Rota</strong></td>
              <td><code>/api/auth/Gerar-Token</code></td>
            </tr>
            <tr>
              <td><strong>Content-Type</strong></td>
              <td><code>application/json</code></td>
            </tr>
            <tr>
              <td><strong>Autenticação</strong></td>
              <td>Não requer — endpoint público</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="gerar_token_request">
        <h3>3. Enviando a Requisição</h3>
        <p>
          Envie uma requisição <code>POST</code> com o corpo JSON contendo suas credenciais:
        </p>
        <pre className="code-block">{`POST /api/auth/Gerar-Token
Content-Type: application/json

{
  "username": "seu_usuario",
  "password": "sua_senha"
}`}</pre>

        <h4>Campos do Body</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Campo</th>
              <th>Tipo</th>
              <th>Obrigatório</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>username</code></td>
              <td>string</td>
              <td>Sim</td>
              <td>Nome de usuário de acesso à API (máx. 20 caracteres)</td>
            </tr>
            <tr>
              <td><code>password</code></td>
              <td>string</td>
              <td>Sim</td>
              <td>Senha de acesso à API (máx. 200 caracteres)</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="gerar_token_response">
        <h3>4. Resposta</h3>

        <h4>200 OK</h4>
        <pre className="code-block">{`{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2026-07-08T18:00:00Z"
}`}</pre>
        <table className="data-table">
          <thead>
            <tr>
              <th>Campo</th>
              <th>Tipo</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>accessToken</code></td>
              <td>string</td>
              <td>Token JWT assinado (HS256) — use no header <code>Authorization: Bearer</code></td>
            </tr>
            <tr>
              <td><code>expiresAt</code></td>
              <td>string (ISO 8601)</td>
              <td>Instante de expiração do token (UTC)</td>
            </tr>
          </tbody>
        </table>

        <h4>Respostas de Erro</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Causa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>401 Unauthorized</td>
              <td>Credenciais inválidas ou usuário não encontrado</td>
            </tr>
            <tr>
              <td>429 Too Many Requests</td>
              <td>Limite de 10 requisições por minuto por IP atingido — aguarde e tente novamente</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="gerar_token_uso">
        <h3>5. Usando o Token nas Requisições</h3>
        <p>
          Com o <code>accessToken</code> em mãos, inclua-o no cabeçalho <code>Authorization</code> de
          cada requisição aos endpoints protegidos:
        </p>
        <pre className="code-block">{`POST /api/SeuEndpoint
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  // corpo da sua requisição
}`}</pre>

        <h4>Ferramentas para Teste</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Ferramenta</th>
              <th>Como usar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Postman</strong></td>
              <td>Aba <em>Authorization</em> → tipo <em>Bearer Token</em> → cole o valor de <code>accessToken</code></td>
            </tr>
            <tr>
              <td><strong>Insomnia</strong></td>
              <td>Aba <em>Auth</em> → <em>Bearer Token</em> → cole o valor de <code>accessToken</code></td>
            </tr>
            <tr>
              <td><strong>curl</strong></td>
              <td><code>-H "Authorization: Bearer SEU_ACCESS_TOKEN"</code></td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="gerar_token_renovacao">
        <h3>6. Renovação do Token</h3>
        <p>
          O token expira após <strong>1 hora</strong> (campo <code>expiresAt</code>). Quando isso
          ocorrer, as requisições retornarão <strong>401 Unauthorized</strong>. Para continuar
          operando, basta repetir a chamada ao <code>Gerar-Token</code> com as suas credenciais.
        </p>
        <p>Não há endpoint de renovação — um novo token deve ser gerado a cada expiração.</p>
      </section>
    </div>
  );

  return <GenericContent title="Mantran API — Como Gerar um Token" content={content} />;
}

export default MantranApiGerarTokenPage;
