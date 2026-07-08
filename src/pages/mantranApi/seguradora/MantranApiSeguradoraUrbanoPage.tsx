import GenericContent from "@shared/components/GenericContent";
import TokenNotice from "@shared/components/TokenNotice";
import LegacyNotice from "@shared/components/LegacyNotice";

function MantranApiSeguradoraUrbanoPage() {
  const content = (
    <div className="conteudo-div">
      <TokenNotice />
      <LegacyNotice>
        Este submódulo (relação seguradora × cliente/grupo/percurso/produto/urbano) ainda documenta a API legada.
        O cadastro principal de seguradora foi migrado para <strong>Corretora</strong> na Mantran.Applications - API;
        esta relação ainda não tem equivalente lá.
      </LegacyNotice>


      <h4>Documentação Técnica — Seguradora Urbano</h4>

      <section id="seguradora_urbano">
        <h3>1. Visão Geral</h3>
        <p>
          Gerencia produtos e serviços de seguro urbano.
          A rota base é <code>/api/SeguradoraUrbano</code>.
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
              <td><code>/api/SeguradoraUrbano/buscar-lista-seguradora-urbano</code></td>
              <td>Retorna os registros de seguro urbano.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraUrbano/incluir-seguradora-urbano</code></td>
              <td>Inclui um novo produto de seguro urbano.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraUrbano/alterar-seguradora-urbano</code></td>
              <td>Altera um produto urbano existente.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/SeguradoraUrbano/excluir-seguradora-urbano</code></td>
              <td>Exclui um produto de seguro urbano.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="seguradora_urbano_modelo">
        <h3>2. Modelo de Dados</h3>
        <p>O modelo é <code>Seguro_Regiao_Urbana_Transp</code> e contém referências de CEP/município para regras urbanas.</p>
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
              <td><code>CEP_REF_Origem</code></td>
              <td>string</td>
              <td>CEP de referência de origem (PK).</td>
            </tr>
            <tr>
              <td><code>CEP_REF_Destino</code></td>
              <td>string</td>
              <td>CEP de referência de destino (PK).</td>
            </tr>
            <tr>
              <td><code>Cidade_Origem</code></td>
              <td>string</td>
              <td>Nome da cidade de origem.</td>
            </tr>
            <tr>
              <td><code>UF_Origem</code></td>
              <td>string</td>
              <td>UF de origem.</td>
            </tr>
            <tr>
              <td><code>Cidade_Destino</code></td>
              <td>string</td>
              <td>Nome da cidade de destino.</td>
            </tr>
            <tr>
              <td><code>UF_Destino</code></td>
              <td>string</td>
              <td>UF de destino.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="seguradora_urbano_buscar_lista">
        <h3>3. POST — buscar-lista-seguradora-urbano</h3>
        <pre className="code-block">{`POST /api/SeguradoraUrbano/buscar-lista-seguradora-urbano
Authorization: Bearer {token_jwt}
Content-Type: application/json

{}`}</pre>
      </section>

      <section id="seguradora_urbano_incluir">
        <h3>4. POST — incluir-seguradora-urbano</h3>
        <pre className="code-block">{`POST /api/SeguradoraUrbano/incluir-seguradora-urbano
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Corretora": "001",
  "CEP_REF_Origem": "01001000",
  "CEP_REF_Destino": "20020000",
  "Cidade_Origem": "São Paulo",
  "UF_Origem": "SP",
  "Cidade_Destino": "Rio de Janeiro",
  "UF_Destino": "RJ"
}`}</pre>
      </section>

      <section id="seguradora_urbano_alterar">
        <h3>5. POST — alterar-seguradora-urbano</h3>
        <pre className="code-block">{`POST /api/SeguradoraUrbano/alterar-seguradora-urbano
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Corretora": "001",
  "CEP_REF_Origem": "01001000",
  "CEP_REF_Destino": "20020000",
  "Cidade_Origem": "São Paulo",
  "UF_Origem": "SP",
  "Cidade_Destino": "Niterói",
  "UF_Destino": "RJ"
}`}</pre>
      </section>

      <section id="seguradora_urbano_excluir">
        <h3>6. POST — excluir-seguradora-urbano</h3>
        <pre className="code-block">{`POST /api/SeguradoraUrbano/excluir-seguradora-urbano
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Corretora": "001",
  "CEP_REF_Origem": "01001000",
  "CEP_REF_Destino": "20020000"
}`}</pre>
      </section>
    </div>
  );

  return <GenericContent title="Seguradora Urbano" content={content} />;
}

export default MantranApiSeguradoraUrbanoPage;
