import React, { useEffect } from 'react';
import GenericContent from '../GenericContent';

const MantranAPI_GerarToken = ({ scrollToSection }) => {

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
      <h4>Como Gerar um Token de Acesso — Mantran API</h4>

      {/* 1. Visão Geral */}
      <section id="mantran_api_gerar_token">
        <h3>1. Visão Geral</h3>
        <p>
          Para acessar os endpoints protegidos da Mantran API, é necessário obter um token de acesso.
          O token é gerado através de um endpoint de autenticação que recebe suas credenciais e retorna
          um token que deve ser utilizado nas requisições seguintes.
        </p>
        <p>
          O token gerado tem validade de <strong>8 horas</strong> a partir do momento da geração.
          Após esse período será necessário gerar um novo token.
        </p>
      </section>

      {/* 2. Endpoint */}
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
              <td><strong>URL</strong></td>
              <td><code>http://api.mantran.eti.br:35390/api/Token/gerar-token</code></td>
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

      {/* 3. Enviando a Requisição */}
      <section id="gerar_token_request">
        <h3>3. Enviando a Requisição</h3>
        <p>
          Envie uma requisição <code>POST</code> para o endpoint acima com o seguinte corpo JSON
          contendo seu usuário e senha:
        </p>
        <pre className="code-block">{`POST http://api.mantran.eti.br:35390/api/Token/gerar-token
Content-Type: application/json

{
  "usuario": "seu_usuario",
  "senha": "sua_senha"
}`}</pre>

        <h4>Campos do Body</h4>
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
              <td><code>usuario</code></td>
              <td>string</td>
              <td>Seu nome de usuário de acesso à API</td>
            </tr>
            <tr>
              <td><code>senha</code></td>
              <td>string</td>
              <td>Sua senha de acesso à API</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 4. Resposta */}
      <section id="gerar_token_response">
        <h3>4. Resposta</h3>
        <p>
          Em caso de sucesso, a API retorna o token diretamente como texto. Esse token é o que
          você utilizará para autenticar as próximas requisições.
        </p>

        <h4>Resposta — 200 OK</h4>
        <pre className="code-block">{`"eyJhbGciOiJFQ0RILUVTLUEyNTZLVyIsImVuYyI6IkEyNTZHQ00iLCJlcGsiOnsiY..."`}</pre>
        <p>
          O token retornado é uma string longa no formato <strong>JWE</strong> (JSON Web Encryption).
          Copie o valor completo — ele será utilizado no header das requisições.
        </p>

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
              <td>400 Bad Request</td>
              <td>Usuário ou senha incorretos, ou usuário não encontrado</td>
            </tr>
            <tr>
              <td>500 Internal Server Error</td>
              <td>Erro interno — entre em contato com o suporte Mantran</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 5. Usando o Token */}
      <section id="gerar_token_uso">
        <h3>5. Usando o Token nas Requisições</h3>
        <p>
          Com o token em mãos, inclua-o no cabeçalho <code>Authorization</code> de cada requisição
          aos endpoints protegidos, no formato <code>Bearer {'{token}'}</code>:
        </p>
        <pre className="code-block">{`POST http://api.mantran.eti.br:35390/api/SeuEndpoint
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJFQ0RILUVTLUEyNTZLVyIsImVuYyI6IkEyNTZHQ00...

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
              <td>Aba <em>Authorization</em> → tipo <em>Bearer Token</em> → cole o token no campo</td>
            </tr>
            <tr>
              <td><strong>Insomnia</strong></td>
              <td>Aba <em>Auth</em> → <em>Bearer Token</em> → cole o token</td>
            </tr>
            <tr>
              <td><strong>curl</strong></td>
              <td><code>-H "Authorization: Bearer SEU_TOKEN"</code></td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 6. Renovação */}
      <section id="gerar_token_renovacao">
        <h3>6. Renovação do Token</h3>
        <p>
          O token expira após <strong>8 horas</strong>. Quando isso ocorrer, as requisições retornarão
          o status <strong>401 Unauthorized</strong>. Para continuar operando, basta repetir o processo
          de geração de token com as suas credenciais.
        </p>
        <p>
          Não há endpoint de renovação — um novo token deve ser gerado a cada expiração.
        </p>
      </section>
    </div>
  );

  return (
    <GenericContent
      title="Mantran API — Como Gerar um Token"
      content={content}
    />
  );
};

export default MantranAPI_GerarToken;
