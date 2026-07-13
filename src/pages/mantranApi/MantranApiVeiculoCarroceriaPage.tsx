import GenericContent from "@shared/components/GenericContent";
import { API_BASE_URL } from "@shared/config/apiConfig";
import TokenNotice from "@shared/components/TokenNotice";
import ApiErrorReference from "@shared/components/ApiErrorReference";

function MantranApiVeiculoCarroceriaPage() {
  const content = (
    <div className="conteudo-div">
      <TokenNotice />

      <h4>Documentação Técnica — Carroceria</h4>

      {/* 1. Visão Geral */}
      <section id="mantran_api_veiculo_carroceria">
        <h3>1. Visão Geral</h3>
        <p>
          Este conjunto de endpoints gerencia a consulta dos tipos de carroceria de veículos.
          O tipo de carroceria é um dos dados associados ao cadastro de veículos.
          <br />A rota base destes endpoints é <code>/api/VeiculoCarroceria</code>.
        </p>

        <p>
          <strong>
            Criar, editar e excluir carrocerias ainda não estão disponíveis nesta API — hoje só é
            possível consultar a lista.
          </strong>
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
              <td><code>/api/VeiculoCarroceria</code></td>
              <td>Retorna a lista paginada de carrocerias cadastradas, com filtros opcionais</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Autorização:</strong> requisições sem token válido retornam <strong>401</strong>; token
          válido sem permissão retorna <strong>403</strong>.
        </p>
      </section>

      {/* 2. Modelo de Dados */}
      <section id="veiculo_carroceria_modelo">
        <h3>2. Modelo de Dados</h3>
        <p>
          Não existe um DTO de requisição para esta feature — não há nada a ser enviado no corpo da
          requisição. Cada item retornado na listagem segue esta estrutura:
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
              <td><code>CdCarroceria</code></td>
              <td>string</td>
              <td>PK</td>
              <td>Código identificador da carroceria (gerado pelo sistema legado).</td>
            </tr>
            <tr>
              <td><code>Descricao</code></td>
              <td>string</td>
              <td>—</td>
              <td>Descrição do tipo de carroceria (ex: <code>Baú</code>, <code>Graneleiro</code>, <code>Sider</code>).</td>
            </tr>
            <tr>
              <td><code>CdEmpresa</code></td>
              <td>string</td>
              <td>PK</td>
              <td>Código da empresa proprietária do cadastro.</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 3. GET /api/VeiculoCarroceria */}
      <section id="veiculo_carroceria_listar">
        <h3>3. GET — Listar Carrocerias</h3>
        <p>
          Retorna a lista paginada de carrocerias cadastradas para a empresa do usuário autenticado.
          Todos os parâmetros de query são opcionais.
        </p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Parâmetro</th>
              <th>Tipo</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>page</code></td>
              <td>int</td>
              <td>Número da página (padrão: 1)</td>
            </tr>
            <tr>
              <td><code>pageSize</code></td>
              <td>int</td>
              <td>Quantidade de itens por página</td>
            </tr>
            <tr>
              <td><code>search</code></td>
              <td>string</td>
              <td>Texto livre de busca</td>
            </tr>
            <tr>
              <td><code>orderBy</code></td>
              <td>string</td>
              <td>Nome da coluna para ordenação</td>
            </tr>
            <tr>
              <td><code>descending</code></td>
              <td>bool</td>
              <td>Define se a ordenação é decrescente</td>
            </tr>
          </tbody>
        </table>

        <h4>3.1 Requisição</h4>
        <pre className="code-block">{`GET ${API_BASE_URL}/api/VeiculoCarroceria?page=1&pageSize=20
Authorization: Bearer {token_jwt}`}</pre>

        <h4>3.2 Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "hasNext": false,
  "page": 1,
  "pageSize": 20,
  "items": [
    {
      "cdCarroceria": "01",
      "descricao": "Baú Fechado",
      "cdEmpresa": "001"
    },
    {
      "cdCarroceria": "02",
      "descricao": "Graneleiro",
      "cdEmpresa": "001"
    },
    {
      "cdCarroceria": "03",
      "descricao": "Sider",
      "cdEmpresa": "001"
    }
  ]
}`}</pre>
      </section>

      <ApiErrorReference />
    </div>
  );

  return (
    <GenericContent
      title="Mantran.Applications - API — Veículo Carroceria"
      content={content}
    />
  );
}

export default MantranApiVeiculoCarroceriaPage;
