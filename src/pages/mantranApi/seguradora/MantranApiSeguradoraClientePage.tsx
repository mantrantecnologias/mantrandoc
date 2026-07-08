import GenericContent from "@shared/components/GenericContent";
import TokenNotice from "@shared/components/TokenNotice";
import LegacyNotice from "@shared/components/LegacyNotice";

function MantranApiSeguradoraClientePage() {
  const content = (
    <div className="conteudo-div">
      <TokenNotice />
      <LegacyNotice>
        Este submódulo (relação seguradora × cliente/grupo/percurso/produto/urbano) ainda documenta a API legada.
        O cadastro principal de seguradora foi migrado para <strong>Corretora</strong> na Mantran.Applications - API;
        esta relação ainda não tem equivalente lá.
      </LegacyNotice>


      <h4>Documentação Técnica — Seguradora Cliente</h4>

      <section id="seguradora_cliente">
        <h3>1. Visão Geral</h3>
        <p>
          Controla o cadastro de clientes vinculados a seguradoras.
          A rota base da API é <code>/api/SeguradoraCliente</code>.
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
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraCliente/buscar-lista-seguradora-cliente</code></td>
              <td>Retorna a lista de clientes de seguradora cadastrados.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraCliente/incluir-seguradora-cliente</code></td>
              <td>Inclui um cliente de seguradora.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraCliente/alterar-seguradora-cliente</code></td>
              <td>Altera os dados do cliente de seguradora.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraCliente/excluir-seguradora-cliente</code></td>
              <td>Exclui um cliente de seguradora.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="seguradora_cliente_modelo">
        <h3>2. Modelo de Dados</h3>
        <p>O payload é baseado no modelo <code>Seguradora_Cliente_Transp</code>.
          Ele apresenta as chaves primárias do cliente na corretora e o CNPJ/CPF do cliente.</p>
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
              <td><code>CD_Cliente_Corretora</code></td>
              <td>string</td>
              <td>Código do cliente na corretora.</td>
            </tr>
            <tr>
              <td><code>CD_Corretora</code></td>
              <td>string</td>
              <td>Código da corretora que atende o cliente.</td>
            </tr>
            <tr>
              <td><code>CGC_CPF_Cliente</code></td>
              <td>string</td>
              <td>CNPJ ou CPF do cliente da corretora.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="seguradora_cliente_buscar_lista">
        <h3>3. POST — buscar-lista-seguradora-cliente</h3>
        <p>Retorna os clientes vinculados às seguradoras.</p>
        <pre className="code-block">{`POST /api/SeguradoraCliente/buscar-lista-seguradora-cliente
Authorization: Bearer {token_jwt}
Content-Type: application/json

{}`}</pre>
      </section>

      <section id="seguradora_cliente_incluir">
        <h3>4. POST — incluir-seguradora-cliente</h3>
        <pre className="code-block">{`POST /api/SeguradoraCliente/incluir-seguradora-cliente
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Corretora": "001",
  "CD_Cliente_Corretora": "100",
  "CGC_CPF_Cliente": "12.345.678/0001-90"
}`}</pre>
      </section>

      <section id="seguradora_cliente_alterar">
        <h3>5. POST — alterar-seguradora-cliente</h3>
        <pre className="code-block">{`POST /api/SeguradoraCliente/alterar-seguradora-cliente
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Corretora": "001",
  "CD_Cliente_Corretora": "100",
  "CGC_CPF_Cliente": "12.345.678/0001-90"
}`}</pre>
      </section>

      <section id="seguradora_cliente_excluir">
        <h3>6. POST — excluir-seguradora-cliente</h3>
        <pre className="code-block">{`POST /api/SeguradoraCliente/excluir-seguradora-cliente
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Corretora": "001",
  "CD_Cliente_Corretora": "100"
}`}</pre>
      </section>
    </div>
  );

  return <GenericContent title="Seguradora Cliente" content={content} />;
}

export default MantranApiSeguradoraClientePage;
