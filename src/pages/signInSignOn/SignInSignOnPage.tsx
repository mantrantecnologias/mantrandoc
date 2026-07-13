import GenericContent from "@shared/components/GenericContent";

function SignInSignOnPage() {
  const content = (
    <div className="conteudo-div">
      <h4>Documentação da Web API – Integração SSO Leo Madeiras x Mantran</h4>


{

/*
<h3>Sumário</h3>
      <ol>
        <li><strong>Objetivo</strong></li>
        <li><strong>Visão Geral da Arquitetura</strong></li>
        <li><strong>Endpoints da API</strong></li>
        <li><strong>Fluxo de Autenticação (Authorization Code Flow)</strong></li>
        <li><strong>Provisionamento de Usuários</strong></li>
        <li><strong>Ativação e Inativação de Usuários</strong></li>
        <li><strong>Segurança</strong></li>
        <li><strong>Erros Comuns</strong></li>
        <li><strong>Conclusão</strong></li>
      </ol>
*/}


     <section id="section_tms_leo_web">
        <h3>1. Objetivo</h3>
        <p>
          Documentar os endpoints utilizados pela API da Mantran no fluxo de Single Sign-On entre o Azure AD da Leo Madeiras e o sistema TMSLeo Web. Esta API é responsável por:
        </p>
        <ul>
          <li>Validar o authorization code enviado pelo frontend</li>
          <li>Trocar o code por tokens no Azure AD</li>
          <li>Realizar cadastro automático de usuários</li>
          <li>Gerar o JWT interno utilizado pelo TMSLeo Web</li>
        </ul>
      </section>

      <section id="visao_geral">
        <h3>2. Visão Geral da Arquitetura</h3>
        <p>
          A API backend em .NET realiza toda a ponte entre o Azure AD e o TMSLeo Web. Ela possui funções de autenticação, autorização e gerenciamento de usuários. O fluxo geral inclui:
        </p>
        <ul>
          <li>Frontend React → envia authorization code para API</li>
          <li>API → troca code por tokens no Azure AD</li>
          <li>API → cria ou valida usuário interno</li>
          <li>API → devolve JWT para o frontend</li>
        </ul>
      </section>

      <section id="endpoints_api">
        <h3>3. Endpoints da API</h3>

        <h4>3.1 POST /api/token/callback</h4>
        <p><strong>Descrição:</strong> Recebe o authorization code enviado pelo frontend e solicita ao Azure AD a troca por tokens.</p>

        <p><strong>Body (JSON):</strong></p>
        <pre>{`{
  "code": "<authorization-code recebido no callback>",
  "redirectUri": "https://tmsleoh.vercel.app/auth/callback"
}`}</pre>

        <p><strong>Resposta (200):</strong></p>
        <pre>{`{
  "jwt": "<token interno>",
  "user": {
    "id": 123,
    "nome": "João Silva",
    "email": "joao.silva@leomadeiras.com.br",
    "status": "ativo"
  }
}`}</pre>

        <p><strong>Erros possíveis:</strong></p>
        <ul>
          <li>400 – Code inválido ou expirado</li>
          <li>401 – Usuário inativo no sistema</li>
          <li>500 – Erro ao comunicar com Azure AD</li>
        </ul>

        <h4>3.2 PATCH /api/usuarios/{`{id}`}/status</h4>
        <p><strong>Descrição:</strong> Endpoint utilizado pela Leo Madeiras para ativar ou desativar usuários.</p>

        <p><strong>Body:</strong></p>
        <pre>{`{
  "ativo": true
}`}</pre>

        <p><strong>Resposta (200):</strong> Confirmação da alteração de status.</p>
      </section>

      <section id="fluxo_autenticacao">
        <h3>4. Fluxo de Autenticação</h3>
        <ol>
          <li>Usuário acessa <strong>https://tmsleoh.vercel.app/auth</strong></li>
          <li>É redirecionado ao Azure AD</li>
          <li>Faz login corporativo</li>
          <li>Azure retorna <strong>?code=XXXXX</strong> para /auth/callback</li>
          <li>Frontend envia code → <strong>POST /api/token/callback</strong></li>
          <li>API troca code por tokens no Azure AD</li>
          <li>API cria ou valida usuário interno</li>
          <li>API gera e devolve JWT → Frontend libera acesso</li>
        </ol>
      </section>

      <section id="provisionamento_usuario">
        <h3>5. Provisionamento de Usuários</h3>
        <p>O cadastro automático ocorre no primeiro login via SSO. Dados utilizados:</p>
        <ul>
          <li>Nome</li>
          <li>Email</li>
          <li>Tipo = Embarcador</li>
          <li>Status padrão = Ativo</li>
        </ul>
      </section>

      <section id="ativacao_inativacao_usuarios">
        <h3>6. Ativação e Inativação de Usuários</h3>
        <p>O controle de acesso é feito pela própria Leo Madeiras através da API:</p>
        <ul>
          <li>Usuários inativos não conseguem gerar JWT</li>
          <li>Mesmo com autenticação válida no Azure AD, o acesso será bloqueado</li>
        </ul>
      </section>

      <section id="seguranca">
        <h3>7. Segurança</h3>
        <ul>
          <li>O client secret nunca é exposto ao frontend</li>
          <li>A comunicação Azure AD ↔ API ocorre apenas no backend</li>
          <li>JWT possui expiração configurada</li>
          <li>Somente usuários ativos podem prosseguir no fluxo</li>
        </ul>
      </section>

      <section id="erros_comuns">
        <h3>8. Erros Comuns</h3>
        <ul>
          <li>invalid_grant — código expirado</li>
          <li>invalid_client — client_id ou secret incorreto</li>
          <li>unauthorized_client — redirect URI não cadastrada</li>
          <li>access_denied — usuário cancelou o login ou não tem permissão no Azure AD</li>
        </ul>
      </section>

      <section id="conclusao">
        <h3>9. Conclusão</h3>
        <p>
          Esta documentação padroniza o uso da Web API responsável pelo fluxo de SSO da Leo Madeiras com o TMSLeo Web. A API continua sendo o ponto central para autorização, validação e segurança dos usuários.
        </p>
      </section>
    </div>
  );

  return (
    <GenericContent
      title="Web API – Integração SSO TMSLeo Web"
      content={content}
    />
  );
}

export default SignInSignOnPage;
