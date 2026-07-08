import GenericContent from "@shared/components/GenericContent";
import { API_BASE_URL } from "@shared/config/apiConfig";
import TokenNotice from "@shared/components/TokenNotice";

function MantranApiEmbalagemPage() {
  const content = (
    <div className="conteudo-div">
      <TokenNotice />

      <h4>Documentação Técnica — Embalagem</h4>

      {/* 1. Visão Geral */}
      <section id="mantran_api_embalagem">
        <h3>1. Visão Geral</h3>
        <p>Este conjunto de endpoints gerencia o cadastro de embalagens.
          <br />A rota base comum a estes endpoints é <code>/api/Embalagem</code>.</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Método</th>
              <th>Rota</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/Embalagem/buscar-lista-embalagem</code></td>
              <td>Retorna a lista de embalagens cadastradas, com filtros opcionais</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/Embalagem/incluir-embalagem</code></td>
              <td>Inclui uma nova embalagem no cadastro</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/Embalagem/alterar-embalagem</code></td>
              <td>Altera os dados de uma embalagem existente</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/Embalagem/excluir-embalagem</code></td>
              <td>Exclui uma embalagem do cadastro</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Autorização:</strong> requisições sem token válido retornam <strong>401</strong>; token válido sem a role adequada retorna <strong>403</strong>. A role necessária é <code>tms_web</code>.
        </p>
      </section>

      {/* 2. Modelo de Dados */}
      <section id="embalagem_modelo">
        <h3>2. Corpo de Requisição</h3>
        <p>
          O body das requisições e o payload de retorno seguem este mesmo padrão:
        </p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Campo</th>
              <th>Tipo</th>
              <th>Chave</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>CD_Embalagem</code></td>
              <td>string</td>
              <td>PK</td>
              <td>Código identificador da embalagem.</td>
            </tr>
            <tr>
              <td><code>CD_Empresa</code></td>
              <td>string</td>
              <td>PK</td>
              <td>Código da empresa proprietária do cadastro.</td>
            </tr>
            <tr>
              <td><code>Descricao</code></td>
              <td>string</td>
              <td>—</td>
              <td>Descrição da embalagem.</td>
            </tr>
            <tr>
              <td><code>Armazem</code></td>
              <td>string</td>
              <td>—</td>
              <td>Permite 'S' para sim ou 'N' para não.</td>
            </tr>
          </tbody>
        </table>

        <p>Os campos <code>CD_Embalagem</code> e <code>CD_Empresa</code> são obrigatórios nas operações de
          alteração e exclusão. O campo <code>Descricao</code> é obrigatório na inclusão.</p>


        <p><strong>Exemplo de objeto JSON completo:</strong></p>
        <pre className="code-block">{`{
  "CD_Embalagem": "01",
  "CD_Empresa": "001",
  "Descricao": "Caixa de Papelão",
  "Armazem": "S"
}`}</pre>
      </section>

      {/* 3. POST buscar-lista-embalagem */}
      <section id="embalagem_buscar_lista">
        <h3>3. POST — buscar-lista-embalagem</h3>
        <p>
          Retorna a lista de embalagens cadastradas.
          O body aceita o objeto padrão com campos que podem opcionalmente serem preenchidos
          para aplicar filtros. Quando um objeto vazio (<code>{'{}'}</code>) é enviado,
          todos os registros são retornados.
        </p>

        <h4>3.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/Embalagem/buscar-lista-embalagem
Authorization: Bearer {token_jwt}
Content-Type: application/json

// Sem filtro — retorna todas as embalagens:
{}

// Com filtro por empresa:
{
  "CD_Empresa": "001"
}`}</pre>
        <br />
        <h4>3.2 Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": [],
  "data": [
    {
      "CD_Embalagem": "01",
      "CD_Empresa": "001",
      "Descricao": "Caixa de Papelão",
      "Armazem": "S"
    },
    {
      "CD_Embalagem": "02",
      "CD_Empresa": "001",
      "Descricao": "Palete",
      "Armazem": "N"
    }
  ],
  "codigo": 200
}`}</pre>

      </section>

      {/* 4. POST incluir-embalagem */}
      <section id="embalagem_incluir">
        <h3>4. POST — incluir-embalagem</h3>
        <p>
          Inclui uma nova embalagem para a relação do cliente. Os campos{' '}
          <code>CD_Embalagem</code>, <code>Descricao</code> e <code>CD_Empresa</code> são
          necessários.
        </p>

        <h4>4.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/Embalagem/incluir-embalagem
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Embalagem": "03",
  "CD_Empresa": "001",
  "Descricao": "Saco Plástico",
  "Armazem": "S"
}`}</pre>

        <br />
        <h4>4.2 Respostas</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>sucesso</th>
              <th>Mensagem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>200 OK</td>
              <td>true</td>
              <td>"Embalagem incluída com sucesso"</td>
            </tr>
            <tr>
              <td>500</td>
              <td>false</td>
              <td>"Erro ao incluir embalagem"</td>
            </tr>
          </tbody>
        </table>

        <pre className="code-block">{`// Sucesso
{
  "sucesso": true,
  "mensagem": ["Embalagem incluída com sucesso"],
  "data": null,
  "codigo": 200
}

// Erro
{
  "sucesso": false,
  "mensagem": ["Erro ao incluir embalagem"],
  "data": null,
  "codigo": 500
}`}</pre>
      </section>

      {/* 5. POST alterar-embalagem */}
      <section id="embalagem_alterar">
        <h3>5. POST — alterar-embalagem</h3>
        <p>
          Atualiza os dados de uma embalagem existente. Os campos <code>CD_Embalagem</code> e{' '}
          <code>CD_Empresa</code> identificam o registro a ser alterado. Envie juntamente com o campo descrição e/ou armazém atualizado.
        </p>

        <br />
        <h4>5.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/Embalagem/alterar-embalagem
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Embalagem": "03",
  "CD_Empresa": "001",
  "Descricao": "Caixa de Papelão Reforçada",
  "Armazem": "S"
}`}</pre>

        <br />
        <h4>5.2 Respostas</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>sucesso</th>
              <th>Mensagem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>200 OK</td>
              <td>true</td>
              <td>"Embalagem alterada com sucesso"</td>
            </tr>
            <tr>
              <td>500</td>
              <td>false</td>
              <td>"Erro ao alterar embalagem"</td>
            </tr>
          </tbody>
        </table>

        <pre className="code-block">{`// Sucesso
{
  "sucesso": true,
  "mensagem": ["Embalagem alterada com sucesso"],
  "data": null,
  "codigo": 200
}

// Erro
{
  "sucesso": false,
  "mensagem": ["Erro ao alterar embalagem"],
  "data": null,
  "codigo": 500
}`}</pre>

      </section>

      {/* 6. POST excluir-embalagem */}
      <section id="embalagem_excluir">
        <h3>6. POST — excluir-embalagem</h3>
        <p>
          Exclui uma embalagem do cadastro. Enviar ao menos <code>CD_Embalagem</code> e{' '}
          <code>CD_Empresa</code> no body para identificar o registro a ser removido.
        </p>

        <h4>6.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/Embalagem/excluir-embalagem
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Embalagem": "03",
  "CD_Empresa": "001"
}`}</pre>

        <br />
        <h4>6.2 Respostas</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>sucesso</th>
              <th>Mensagem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>200 OK</td>
              <td>true</td>
              <td>"Embalagem excluída com sucesso"</td>
            </tr>
            <tr>
              <td>500</td>
              <td>false</td>
              <td>"Erro ao excluir embalagem"</td>
            </tr>
          </tbody>
        </table>

        <pre className="code-block">{`// Sucesso
{
  "sucesso": true,
  "mensagem": ["Embalagem excluída com sucesso"],
  "data": null,
  "codigo": 200
}

// Erro
{
  "sucesso": false,
  "mensagem": ["Erro ao excluir embalagem"],
  "data": null,
  "codigo": 500
}`}</pre>

      </section>

      {/* 7. Respostas de erro comuns */}
      <section id="embalagem_erros">
        <h3>7. Respostas de Erro Comuns</h3>
        <p>
          Além dos erros de negócio (código 500) documentados em cada endpoint, o pipeline
          da API pode retornar os seguintes status HTTP globais:
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>HTTP Status</th>
              <th>Situação</th>
              <th>Causa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>401 Unauthorized</strong></td>
              <td>Token ausente ou inválido</td>
              <td>Cookie <code>auth_token</code> não enviado ou expirado</td>
            </tr>
            <tr>
              <td><strong>403 Forbidden</strong></td>
              <td>Role insuficiente</td>
              <td>Token válido, mas o usuário não possui a role <code>tms_web</code></td>
            </tr>
            <tr>
              <td><strong>400 Bad Request</strong></td>
              <td>Body inválido</td>
              <td>JSON malformado ou ModelState inválido</td>
            </tr>
            <tr>
              <td><strong>500 Internal Server Error</strong></td>
              <td>Erro não tratado</td>
              <td>Exceção não capturada — detalhes no log do servidor</td>
            </tr>
          </tbody>
        </table>

      </section>

    </div>
  );

  return (
    <GenericContent
      title="Mantran.Applications - API — Embalagem"
      content={content}
    />
  );
}

export default MantranApiEmbalagemPage;
