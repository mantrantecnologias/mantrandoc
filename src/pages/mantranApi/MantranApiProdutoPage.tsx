import GenericContent from "@shared/components/GenericContent";
import { API_BASE_URL } from "@shared/config/apiConfig";
import TokenNotice from "@shared/components/TokenNotice";

function MantranApiProdutoPage() {
  const content = (
    <div className="conteudo-div">
      <TokenNotice />

      <h4>Documentação Técnica — Produto (TMS Web)</h4>

      {/* 1. Visão Geral */}
      <section id="mantran_api_produto">
        <h3>1. Visão Geral</h3>
        <p>
          Os endpoints de <strong>Produto</strong> gerenciam o cadastro de produtos da plataforma TMS Web.
          Esta documentação detalha os endpoints disponíveis para a integração e manutenção dessas entidades.
          Todos os endpoints exigem autenticação baseada em token JWT com a role <code>tms_web</code> e utilizam o isolamento multi-tenant da plataforma.
          As respostas seguem o envelope padrão estruturado em JSON com as propriedades <code>sucesso</code>, <code>mensagem</code> e <code>data</code>.
        </p>

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
              <td><code>GET</code></td>
              <td><code>/api/Produto/buscar-lista-produto</code></td>
              <td>Retorna a lista completa de produtos cadastrados</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/Produto/buscar-produto</code></td>
              <td>Retorna os dados detalhados de um produto específico</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/Produto/incluir-produto</code></td>
              <td>Inclui um novo produto no sistema</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/Produto/alterar-produto</code></td>
              <td>Altera os dados de um produto existente</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/Produto/excluir-produto</code></td>
              <td>Exclui um produto do cadastro</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Autorização:</strong> todos os endpoints requerem o header <code>Authorization: Bearer {'{token_jwt}'}</code>.
          Requisições sem token válido retornarão status <strong>401 Unauthorized</strong>.
        </p>
      </section>

      {/* 2. Modelo de Dados */}
      <section id="produto_modelo">
        <h3>2. Modelo de Dados (JSON DTO)</h3>
        <p>
          Estrutura do modelo de dados JSON utilizada para representar as propriedades de um produto (<code>Produto_Transp</code>) tanto nas requisições como nas respostas.
        </p>

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
              <td><code>CD_Produto</code></td>
              <td>string</td>
              <td>Código identificador exclusivo do produto. Chave principal para buscas, alterações e exclusões.</td>
            </tr>
            <tr>
              <td><code>Descricao</code></td>
              <td>string</td>
              <td>Descrição completa do produto.</td>
            </tr>
            <tr>
              <td><code>PC_Reducao_BC</code></td>
              <td>string</td>
              <td>Percentual de redução da base de cálculo.</td>
            </tr>
            <tr>
              <td><code>FL_ICMS</code></td>
              <td>string</td>
              <td>Flag indicativa de incidência de ICMS.</td>
            </tr>
            <tr>
              <td><code>CD_Empresa</code></td>
              <td>string</td>
              <td>Código da empresa associada ao produto.</td>
            </tr>
          </tbody>
        </table>

        <p><strong>Exemplo de objeto JSON completo:</strong></p>
        <pre className="code-block">{`{
  "CD_Produto": "P001",
  "Descricao": "PRODUTO TESTE SERVICO",
  "PC_Reducao_BC": "0.00",
  "FL_ICMS": "S",
  "CD_Empresa": "001"
}`}</pre>
      </section>

      {/* 3. GET buscar-lista-produto */}
      <section id="produto_buscar_lista">
        <h3>3. GET — buscar-lista-produto</h3>
        <p>
          Retorna a lista completa de todos os produtos cadastrados na base de dados do cliente ativo.
        </p>

        <h4>3.1 Requisição</h4>
        <pre className="code-block">{`GET ${API_BASE_URL}/api/Produto/buscar-lista-produto
Authorization: Bearer {token_jwt}`}</pre>

        <h4>3.2 Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": [],
  "data": [
    {
      "CD_Produto": "P001",
      "Descricao": "PRODUTO 1",
      "PC_Reducao_BC": "0.00",
      "FL_ICMS": "S",
      "CD_Empresa": "001"
    }
  ],
  "codigo": null
}`}</pre>
      </section>

      {/* 4. POST buscar-produto */}
      <section id="produto_buscar">
        <h3>4. POST — buscar-produto</h3>
        <p>
          Retorna os dados completos de um produto específico. Deve ser enviado o <code>CD_Produto</code> no corpo da requisição.
        </p>

        <h4>4.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/Produto/buscar-produto
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Produto": "P001"
}`}</pre>
      </section>

      {/* 5. POST incluir-produto */}
      <section id="produto_incluir">
        <h3>5. POST — incluir-produto</h3>
        <p>
          Inclui um novo produto no cadastro do sistema.
        </p>

        <h4>5.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/Produto/incluir-produto
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Produto": "P002",
  "Descricao": "NOVO PRODUTO",
  "PC_Reducao_BC": "0.00",
  "FL_ICMS": "N",
  "CD_Empresa": "001"
}`}</pre>
      </section>

      {/* 6. POST alterar-produto */}
      <section id="produto_alterar">
        <h3>6. POST — alterar-produto</h3>
        <p>
          Altera os dados de um produto existente. O campo <code>CD_Produto</code> é utilizado como identificador.
        </p>
      </section>

      {/* 7. POST excluir-produto */}
      <section id="produto_excluir">
        <h3>7. POST — excluir-produto</h3>
        <p>
          Remove permanentemente um produto do cadastro.
        </p>
      </section>
    </div>
  );

  return (
    <GenericContent
      title="Mantran.Applications - API — Produto"
      content={content}
    />
  );
}

export default MantranApiProdutoPage;
