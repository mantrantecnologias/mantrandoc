import GenericContent from "@shared/components/GenericContent";
import TokenNotice from "@shared/components/TokenNotice";
import LegacyNotice from "@shared/components/LegacyNotice";

function MantranApiSeguradoraProdutoPage() {
  const content = (
    <div className="conteudo-div">
      <TokenNotice />
      <LegacyNotice>
        Este submódulo (relação seguradora × cliente/grupo/percurso/produto/urbano) ainda documenta a API legada.
        O cadastro principal de seguradora foi migrado para <strong>Corretora</strong> na Mantran.Applications - API;
        esta relação ainda não tem equivalente lá.
      </LegacyNotice>


      <h4>Documentação Técnica — Seguradora Produto</h4>

      <section id="seguradora_produto">
        <h3>1. Visão Geral</h3>
        <p>
          Administra produtos de seguro vinculados às seguradoras.
          A rota base é <code>/api/SeguradoraProduto</code>.
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
              <td><code>/api/SeguradoraProduto/buscar-lista-seguradora-produto</code></td>
              <td>Retorna os produtos de seguro cadastrados.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraProduto/incluir-seguradora-produto</code></td>
              <td>Inclui um novo produto de seguro.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraProduto/alterar-seguradora-produto</code></td>
              <td>Altera um produto já existente.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraProduto/excluir-seguradora-produto</code></td>
              <td>Exclui um produto de seguro.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="seguradora_produto_modelo">
        <h3>2. Modelo de Dados</h3>
        <p>O modelo é <code>Seguradora_Mercadoria_Transp</code> (produto/mercadoria de seguro).</p>
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
              <td><code>CD_Empresa</code></td>
              <td>string</td>
              <td>Código da empresa (PK).</td>
            </tr>
            <tr>
              <td><code>CD_Corretora</code></td>
              <td>string</td>
              <td>Código da corretora (PK).</td>
            </tr>
            <tr>
              <td><code>CD_Grupo</code></td>
              <td>string</td>
              <td>Código do grupo (PK).</td>
            </tr>
            <tr>
              <td><code>CD_Produto</code></td>
              <td>string</td>
              <td>Código do produto (PK).</td>
            </tr>
            <tr>
              <td><code>CD_Produto_Seguradora</code></td>
              <td>string</td>
              <td>Código do produto na seguradora (mapeamento externo).</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="seguradora_produto_buscar_lista">
        <h3>3. POST — buscar-lista-seguradora-produto</h3>
        <pre className="code-block">{`POST /api/SeguradoraProduto/buscar-lista-seguradora-produto
Authorization: Bearer {token_jwt}
Content-Type: application/json

{}`}</pre>
      </section>

      <section id="seguradora_produto_incluir">
        <h3>4. POST — incluir-seguradora-produto</h3>
        <pre className="code-block">{`POST /api/SeguradoraProduto/incluir-seguradora-produto
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Empresa": "001",
  "CD_Corretora": "001",
  "CD_Grupo": "G01",
  "CD_Produto": "PR01",
  "CD_Produto_Seguradora": "SEG-PR-001"
}`}</pre>
      </section>

      <section id="seguradora_produto_alterar">
        <h3>5. POST — alterar-seguradora-produto</h3>
        <pre className="code-block">{`POST /api/SeguradoraProduto/alterar-seguradora-produto
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Empresa": "001",
  "CD_Corretora": "001",
  "CD_Grupo": "G01",
  "CD_Produto": "PR01",
  "CD_Produto_Seguradora": "SEG-PR-001"
}`}</pre>
      </section>

      <section id="seguradora_produto_excluir">
        <h3>6. POST — excluir-seguradora-produto</h3>
        <pre className="code-block">{`POST /api/SeguradoraProduto/excluir-seguradora-produto
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Empresa": "001",
  "CD_Corretora": "001",
  "CD_Grupo": "G01",
  "CD_Produto": "PR01"
}`}</pre>
      </section>
    </div>
  );

  return <GenericContent title="Seguradora Produto" content={content} />;
}

export default MantranApiSeguradoraProdutoPage;
