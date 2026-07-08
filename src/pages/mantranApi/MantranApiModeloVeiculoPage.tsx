import GenericContent from "@shared/components/GenericContent";
import { API_BASE_URL } from "@shared/config/apiConfig";
import TokenNotice from "@shared/components/TokenNotice";
import ApiErrorReference from "@shared/components/ApiErrorReference";

function MantranApiModeloVeiculoPage() {
  const content = (
    <div className="conteudo-div">
      <TokenNotice />

      <h4>Documentação Técnica — Modelo de Veículo</h4>

      {/* 1. Visão Geral */}
      <section id="mantran_api_modelo_veiculo">
        <h3>1. Visão Geral</h3>
        <p>
          Os endpoints de <strong>Modelo de Veículo</strong> gerenciam o cadastro de modelos de veículos.
          A rota base é <code>/api/VeiculoModelo</code>.
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
              <td><code>/api/VeiculoModelo</code></td>
              <td>Lista os modelos de veículos, paginado</td>
            </tr>
            <tr>
              <td><code>GET</code></td>
              <td><code>/api/VeiculoModelo/{"{cdModelo}"}</code></td>
              <td>Obtém um modelo de veículo específico</td>
            </tr>
            <tr>
              <td><code>GET</code></td>
              <td><code>/api/VeiculoModelo/nextId</code></td>
              <td>Consulta o próximo código de modelo que será gerado</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/VeiculoModelo</code></td>
              <td>Cria um novo modelo de veículo</td>
            </tr>
            <tr>
              <td><code>PUT</code></td>
              <td><code>/api/VeiculoModelo/{"{cdModelo}"}</code></td>
              <td>Atualiza um modelo de veículo existente</td>
            </tr>
            <tr>
              <td><code>DELETE</code></td>
              <td><code>/api/VeiculoModelo/{"{cdModelo}"}</code></td>
              <td>Remove um modelo de veículo</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Autorização:</strong> requisições sem token válido retornam <strong>401</strong>; token
          válido sem permissão retorna <strong>403</strong>.
        </p>
      </section>

      {/* 2. Atenção — mudança de comportamento */}
      <section id="modelo_veiculo_codigo_gerado">
        <h3>2. Atenção: Código do Modelo Agora é Gerado pelo Servidor</h3>
        <p>
          <strong>
            O campo <code>CdModelo</code> agora é sempre gerado pelo servidor — o cliente nunca mais
            escolhe o código do modelo.
          </strong>{" "}
          O código é calculado como <code>MAX + 1</code> sobre os modelos já cadastrados na empresa e
          formatado com 3 dígitos (ex.: <code>"001"</code>, <code>"002"</code>).
        </p>
        <p>
          O <code>VeiculoModeloRequest</code> (corpo da requisição, tanto na criação quanto na atualização)
          <strong> não possui campo <code>CdModelo</code></strong> — o código não é definido pelo cliente;
          o valor gerado deve ser lido no corpo da resposta <code>201 Created</code>.
        </p>
      </section>

      {/* 3. Modelo de Dados */}
      <section id="modelo_veiculo_modelo">
        <h3>3. Modelo de Dados</h3>

        <h4>3.1 Corpo da Requisição — VeiculoModeloRequest</h4>
        <p>
          Usado tanto na criação (<code>POST</code>) quanto na atualização (<code>PUT</code>). É o único
          campo editável pelo cliente.
        </p>
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
              <td><code>descricao</code></td>
              <td>string</td>
              <td>Sim</td>
              <td>Descrição ou nome amigável do modelo. Entre 1 e 15 caracteres.</td>
            </tr>
          </tbody>
        </table>
        <p>
          A validação de <code>descricao</code> (obrigatório, máximo de 15 caracteres) é aplicada tanto no
          contrato do request quanto na regra de negócio do lado servidor. Os campos <code>cdEmpresa</code> e{" "}
          <code>cdModelo</code> são resolvidos internamente (empresa a partir do token, código pelo mecanismo
          descrito na seção 2) e não são aceitos no corpo da requisição.
        </p>

        <p><strong>Exemplo de corpo de requisição:</strong></p>
        <pre className="code-block">{`{
  "descricao": "FH 540 6x4"
}`}</pre>

        <h4>3.2 Corpo da Resposta — VeiculoModeloEntity</h4>
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
              <td><code>cdModelo</code></td>
              <td>string</td>
              <td>PK</td>
              <td>Código do modelo, gerado pelo servidor (ver seção 2).</td>
            </tr>
            <tr>
              <td><code>cdEmpresa</code></td>
              <td>string</td>
              <td>PK</td>
              <td>Código da empresa associada ao modelo.</td>
            </tr>
            <tr>
              <td><code>descricao</code></td>
              <td>string</td>
              <td>—</td>
              <td>Descrição do modelo.</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 4. GET listar */}
      <section id="modelo_veiculo_listar">
        <h3>4. GET — Listar Modelos de Veículos</h3>
        <p>
          Retorna a lista paginada de modelos de veículos cadastrados para a empresa do usuário
          autenticado. Aceita os parâmetros de query <code>page</code>, <code>pageSize</code>,{" "}
          <code>search</code>, <code>orderBy</code> e <code>descending</code>, todos opcionais.
        </p>

        <h4>4.1 Requisição</h4>
        <pre className="code-block">{`GET ${API_BASE_URL}/api/VeiculoModelo?page=1&pageSize=20
Authorization: Bearer {token_jwt}`}</pre>

        <h4>4.2 Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "hasNext": false,
  "page": 1,
  "pageSize": 20,
  "items": [
    {
      "cdModelo": "001",
      "cdEmpresa": "001",
      "descricao": "FH 540 6x4"
    },
    {
      "cdModelo": "002",
      "cdEmpresa": "001",
      "descricao": "Actros 2651"
    }
  ]
}`}</pre>
      </section>

      {/* 5. GET por id */}
      <section id="modelo_veiculo_obter">
        <h3>5. GET — Obter Modelo de Veículo</h3>
        <p>Retorna um único modelo de veículo pelo código.</p>

        <h4>5.1 Requisição</h4>
        <pre className="code-block">{`GET ${API_BASE_URL}/api/VeiculoModelo/001
Authorization: Bearer {token_jwt}`}</pre>

        <h4>5.2 Respostas</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Corpo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>200 OK</td>
              <td><code>VeiculoModeloEntity</code> (objeto bruto, sem envelope)</td>
            </tr>
            <tr>
              <td>404 Not Found</td>
              <td><code>ApiErrorResponse</code></td>
            </tr>
          </tbody>
        </table>
        <pre className="code-block">{`{
  "cdModelo": "001",
  "cdEmpresa": "001",
  "descricao": "FH 540 6x4"
}`}</pre>
      </section>

      {/* 6. GET nextId */}
      <section id="modelo_veiculo_next_id">
        <h3>6. GET — Consultar Próximo Código</h3>
        <p>
          Retorna o próximo código que seria atribuído a um novo modelo, sem criar nenhum registro. Útil
          para exibição prévia em telas — não deve ser usado para montar o corpo de um <code>POST</code>,
          já que o próprio <code>POST</code> gera e devolve o código definitivo.
        </p>

        <h4>6.1 Requisição</h4>
        <pre className="code-block">{`GET ${API_BASE_URL}/api/VeiculoModelo/nextId
Authorization: Bearer {token_jwt}`}</pre>

        <h4>6.2 Resposta — 200 OK</h4>
        <pre className="code-block">{`3`}</pre>
        <p>O valor retornado é um inteiro bruto (ainda não formatado com os 3 dígitos usados em <code>cdModelo</code>).</p>
      </section>

      {/* 7. POST criar */}
      <section id="modelo_veiculo_criar">
        <h3>7. POST — Criar Modelo de Veículo</h3>
        <p>
          Cria um novo modelo de veículo. O código (<code>cdModelo</code>) é gerado pelo servidor — ver
          seção 2.
        </p>

        <h4>7.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/VeiculoModelo
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "descricao": "FH 540 6x4"
}`}</pre>

        <h4>7.2 Resposta — 201 Created</h4>
        <p>
          Retorna o objeto criado (com o <code>cdModelo</code> gerado) e o header <code>Location</code>{" "}
          apontando para o novo recurso.
        </p>
        <pre className="code-block">{`Location: ${API_BASE_URL}/api/VeiculoModelo/003

{
  "cdModelo": "003",
  "cdEmpresa": "001",
  "descricao": "FH 540 6x4"
}`}</pre>
      </section>

      {/* 8. PUT atualizar */}
      <section id="modelo_veiculo_atualizar">
        <h3>8. PUT — Atualizar Modelo de Veículo</h3>
        <p>
          Atualiza a <code>descricao</code> de um modelo já existente, identificado pelo{" "}
          <code>cdModelo</code> na rota.
        </p>

        <h4>8.1 Requisição</h4>
        <pre className="code-block">{`PUT ${API_BASE_URL}/api/VeiculoModelo/003
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "descricao": "FH 540 6x4 Evolution"
}`}</pre>

        <h4>8.2 Respostas</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Corpo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>200 OK</td>
              <td><code>VeiculoModeloEntity</code> atualizado (objeto bruto, sem envelope)</td>
            </tr>
            <tr>
              <td>404 Not Found</td>
              <td><code>ApiErrorResponse</code></td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 9. DELETE remover */}
      <section id="modelo_veiculo_excluir">
        <h3>9. DELETE — Remover Modelo de Veículo</h3>
        <p>
          Remove um modelo de veículo, identificado pelo <code>cdModelo</code> na rota. A empresa é
          resolvida automaticamente a partir do token — não é necessário (nem possível) enviar{" "}
          <code>cdEmpresa</code> no corpo.
        </p>

        <h4>9.1 Requisição</h4>
        <pre className="code-block">{`DELETE ${API_BASE_URL}/api/VeiculoModelo/003
Authorization: Bearer {token_jwt}`}</pre>

        <h4>9.2 Respostas</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>204 No Content</td>
              <td>Modelo removido com sucesso — sem corpo de resposta</td>
            </tr>
            <tr>
              <td>404 Not Found</td>
              <td><code>ApiErrorResponse</code> — modelo não encontrado</td>
            </tr>
          </tbody>
        </table>
      </section>

      <ApiErrorReference />
    </div>
  );

  return (
    <GenericContent
      title="Mantran.Applications - API — Modelo de Veículo"
      content={content}
    />
  );
}

export default MantranApiModeloVeiculoPage;
