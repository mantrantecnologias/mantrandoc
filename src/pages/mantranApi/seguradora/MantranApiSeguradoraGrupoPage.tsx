import GenericContent from "@shared/components/GenericContent";
import TokenNotice from "@shared/components/TokenNotice";
import LegacyNotice from "@shared/components/LegacyNotice";

function MantranApiSeguradoraGrupoPage() {
  const content = (
    <div className="conteudo-div">
      <TokenNotice />
      <LegacyNotice>
        Este submódulo (relação seguradora × cliente/grupo/percurso/produto/urbano) ainda documenta a API legada.
        O cadastro principal de seguradora foi migrado para <strong>Corretora</strong> na Mantran.Applications - API;
        esta relação ainda não tem equivalente lá.
      </LegacyNotice>


      <h4>Documentação Técnica — Seguradora Grupo</h4>

      <section id="seguradora_grupo">
        <h3>1. Visão Geral</h3>
        <p>
          Controla o cadastro de grupos de seguradora, permitindo segmentar produtos e clientes.
          A rota base é <code>/api/SeguradoraGrupo</code>.
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
              <td><code>/api/SeguradoraGrupo/buscar-lista-seguradora-grupo</code></td>
              <td>Retorna os grupos de seguradora cadastrados.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraGrupo/incluir-seguradora-grupo</code></td>
              <td>Inclui novo grupo de seguradora.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraGrupo/alterar-seguradora-grupo</code></td>
              <td>Altera um grupo de seguradora existente.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraGrupo/excluir-seguradora-grupo</code></td>
              <td>Exclui um grupo de seguradora.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="seguradora_grupo_modelo">
        <h3>2. Modelo de Dados</h3>
        <p>O modelo é <code>Seguradora_Grupo_Mercadoria_Transp</code> e contém metadados e campos do grupo.</p>
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
              <td>Código da empresa (parte da PK).</td>
            </tr>
            <tr>
              <td><code>CD_Corretora</code></td>
              <td>string</td>
              <td>Código da corretora (parte da PK).</td>
            </tr>
            <tr>
              <td><code>CD_Grupo</code></td>
              <td>string</td>
              <td>Código do grupo (parte da PK).</td>
            </tr>
            <tr>
              <td><code>Descricao_Grupo</code></td>
              <td>string</td>
              <td>Descrição do grupo.</td>
            </tr>
            <tr>
              <td><code>VR_Indenizacao</code></td>
              <td>decimal?</td>
              <td>Valor de indenização (pode ser nulo).</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="seguradora_grupo_buscar_lista">
        <h3>3. POST — buscar-lista-seguradora-grupo</h3>
        <pre className="code-block">{`POST /api/SeguradoraGrupo/buscar-lista-seguradora-grupo
Authorization: Bearer {token_jwt}
Content-Type: application/json

{}`}</pre>
      </section>

      <section id="seguradora_grupo_incluir">
        <h3>4. POST — incluir-seguradora-grupo</h3>
        <pre className="code-block">{`POST /api/SeguradoraGrupo/incluir-seguradora-grupo
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Empresa": "001",
  "CD_Corretora": "001",
  "CD_Grupo": "G01",
  "Descricao_Grupo": "Grupo Comercial",
  "VR_Indenizacao": 50000.00
}`}</pre>
      </section>

      <section id="seguradora_grupo_alterar">
        <h3>5. POST — alterar-seguradora-grupo</h3>
        <pre className="code-block">{`POST /api/SeguradoraGrupo/alterar-seguradora-grupo
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Empresa": "001",
  "CD_Corretora": "001",
  "CD_Grupo": "G01",
  "Descricao_Grupo": "Grupo Comercial Atualizado",
  "VR_Indenizacao": 75000.00
}`}</pre>
      </section>

      <section id="seguradora_grupo_excluir">
        <h3>6. POST — excluir-seguradora-grupo</h3>
        <pre className="code-block">{`POST /api/SeguradoraGrupo/excluir-seguradora-grupo
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Empresa": "001",
  "CD_Corretora": "001",
  "CD_Grupo": "G01"
}`}</pre>
      </section>
    </div>
  );

  return <GenericContent title="Seguradora Grupo" content={content} />;
}

export default MantranApiSeguradoraGrupoPage;
