import GenericContent from "@shared/components/GenericContent";
import TokenNotice from "@shared/components/TokenNotice";
import LegacyNotice from "@shared/components/LegacyNotice";

function MantranApiSeguradoraPercursoPage() {
  const content = (
    <div className="conteudo-div">
      <TokenNotice />
      <LegacyNotice>
        Este submódulo (relação seguradora × cliente/grupo/percurso/produto/urbano) ainda documenta a API legada.
        O cadastro principal de seguradora foi migrado para <strong>Corretora</strong> na Mantran.Applications - API;
        esta relação ainda não tem equivalente lá.
      </LegacyNotice>


      <h4>Documentação Técnica — Seguradora Percurso</h4>

      <section id="seguradora_percurso">
        <h3>1. Visão Geral</h3>
        <p>
          Faz o gerenciamento de percursos de seguradora. A rota base é <code>/api/SeguradoraPercurso</code>.
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
              <td><code>/api/SeguradoraPercurso/buscar-lista-seguradora-percurso</code></td>
              <td>Retorna os percursos cadastrados.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraPercurso/incluir-seguradora-percurso</code></td>
              <td>Inclui um novo percurso de seguradora.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraPercurso/alterar-seguradora-percurso</code></td>
              <td>Altera os dados de um percurso existente.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraPercurso/excluir-seguradora-percurso</code></td>
              <td>Exclui um percurso de seguradora.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="seguradora_percurso_modelo">
        <h3>2. Modelo de Dados</h3>
        <p>O modelo é <code>Seguradora_Percurso_Transp</code> e contém as taxas e chaves do percurso.</p>
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
              <td><code>CD_Corretora</code></td>
              <td>string</td>
              <td>Código da corretora (PK).</td>
            </tr>
            <tr>
              <td><code>UF_Origem</code></td>
              <td>string</td>
              <td>UF de origem (PK).</td>
            </tr>
            <tr>
              <td><code>UF_Destino</code></td>
              <td>string</td>
              <td>UF de destino (PK).</td>
            </tr>
            <tr>
              <td><code>TX_RCTRC</code></td>
              <td>decimal</td>
              <td>Taxa RCTRC aplicada ao percurso.</td>
            </tr>
            <tr>
              <td><code>TX_RCF_DC</code></td>
              <td>decimal</td>
              <td>Taxa RCF/DC aplicada ao percurso.</td>
            </tr>
            <tr>
              <td><code>TX_TN</code></td>
              <td>decimal</td>
              <td>Taxa por tonelada.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="seguradora_percurso_buscar_lista">
        <h3>3. POST — buscar-lista-seguradora-percurso</h3>
        <pre className="code-block">{`POST /api/SeguradoraPercurso/buscar-lista-seguradora-percurso
Authorization: Bearer {token_jwt}
Content-Type: application/json

{}`}</pre>
      </section>

      <section id="seguradora_percurso_incluir">
        <h3>4. POST — incluir-seguradora-percurso</h3>
        <pre className="code-block">{`POST /api/SeguradoraPercurso/incluir-seguradora-percurso
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Corretora": "001",
  "UF_Origem": "SP",
  "UF_Destino": "RJ",
  "TX_RCTRC": 0.75,
  "TX_RCF_DC": 0.20,
  "TX_TN": 10.5
}`}</pre>
      </section>

      <section id="seguradora_percurso_alterar">
        <h3>5. POST — alterar-seguradora-percurso</h3>
        <pre className="code-block">{`POST /api/SeguradoraPercurso/alterar-seguradora-percurso
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Corretora": "001",
  "UF_Origem": "SP",
  "UF_Destino": "RJ",
  "TX_RCTRC": 0.85,
  "TX_RCF_DC": 0.25,
  "TX_TN": 11.0
}`}</pre>
      </section>

      <section id="seguradora_percurso_excluir">
        <h3>6. POST — excluir-seguradora-percurso</h3>
        <pre className="code-block">{`POST /api/SeguradoraPercurso/excluir-seguradora-percurso
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Corretora": "001",
  "UF_Origem": "SP",
  "UF_Destino": "RJ"
}`}</pre>
      </section>
    </div>
  );

  return <GenericContent title="Seguradora Percurso" content={content} />;
}

export default MantranApiSeguradoraPercursoPage;
