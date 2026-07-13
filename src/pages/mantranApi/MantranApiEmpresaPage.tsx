import GenericContent from "@shared/components/GenericContent";
import { API_BASE_URL } from "@shared/config/apiConfig";
import TokenNotice from "@shared/components/TokenNotice";
import ApiErrorReference from "@shared/components/ApiErrorReference";

function MantranApiEmpresaPage() {
  const content = (
    <div className="conteudo-div">
      <TokenNotice />

      <h4>Documentação Técnica — EmpresaController e EmpresaParametroController</h4>

      {/* 1. Visão Geral */}
      <section id="mantran_api_empresa">
        <h3>1. Visão Geral</h3>
        <p>
          O <code>EmpresaController</code> (rota <code>api/Empresa</code>) gerencia o cadastro de empresas na
          Mantran.Applications - API. Todos os endpoints exigem um token JWT (Bearer) válido e uma role de
          autorização específica liberada para o usuário: requisições sem token retornam <strong>401</strong>;
          com token válido mas sem a role exigida retornam <strong>403</strong>. Detalhes do formato de erro
          estão na seção <a href="#mantran_applications_api_erros_padrao">Respostas de Erro Padrão</a>, ao
          final desta página.
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
              <td><code>/api/Empresa?page&amp;pageSize&amp;search&amp;orderBy&amp;descending</code></td>
              <td>Lista empresas, com paginação, busca e ordenação</td>
            </tr>
            <tr>
              <td><code>GET</code></td>
              <td><code>/api/Empresa/{"{cdEmpresa}"}</code></td>
              <td>Retorna os dados de uma empresa específica</td>
            </tr>
            <tr>
              <td><code>GET</code></td>
              <td><code>/api/Empresa/nextId</code></td>
              <td>Retorna o próximo código de empresa disponível (MAX + 1)</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/Empresa</code></td>
              <td>Cria uma nova empresa</td>
            </tr>
            <tr>
              <td><code>PUT</code></td>
              <td><code>/api/Empresa/{"{cdEmpresa}"}</code></td>
              <td>Atualiza uma empresa existente</td>
            </tr>
            <tr>
              <td><code>DELETE</code></td>
              <td><code>/api/Empresa/{"{cdEmpresa}"}</code></td>
              <td>Remove uma empresa</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 2. Modelo de Dados — Empresa */}
      <section id="empresa_modelo_dados">
        <h3>2. Modelo de Dados — Empresa</h3>
        <p>
          <code>EmpresaRequest</code> é o corpo usado tanto em <code>POST</code> quanto em{" "}
          <code>PUT</code>. <code>CdEmpresa</code> é <strong>sempre gerado pelo servidor</strong> (formatado
          com 3 dígitos, ex.: <code>"007"</code>) — o cliente nunca o informa na criação, e ele não existe
          como campo no corpo da requisição. A resposta (<code>EmpresaEntity</code>) é composta por todos os
          campos abaixo <strong>mais</strong> <code>CdEmpresa</code>.
        </p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Campo</th>
              <th>Tipo</th>
              <th>Observação</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>Sigla</code></td><td>string</td><td>Obrigatório, 1 a 3 caracteres.</td></tr>
            <tr><td><code>CgcCpf</code></td><td>string</td><td>Obrigatório, 1 a 14 caracteres.</td></tr>
            <tr><td><code>Ie</code></td><td>string?</td><td>Máximo 18 caracteres.</td></tr>
            <tr><td><code>RazaoSocial</code></td><td>string</td><td>Obrigatório, 1 a 100 caracteres.</td></tr>
            <tr><td><code>Fantasia</code></td><td>string?</td><td>Máximo 50 caracteres.</td></tr>
            <tr><td><code>Endereco</code></td><td>string?</td><td>Máximo 100 caracteres.</td></tr>
            <tr><td><code>Bairro</code></td><td>string?</td><td>Máximo 80 caracteres.</td></tr>
            <tr><td><code>Cidade</code></td><td>string?</td><td>Máximo 80 caracteres.</td></tr>
            <tr><td><code>Uf</code></td><td>string?</td><td>Máximo 2 caracteres.</td></tr>
            <tr><td><code>Cep</code></td><td>string?</td><td>Máximo 8 caracteres.</td></tr>
            <tr><td><code>Ddd</code></td><td>string?</td><td>Máximo 4 caracteres.</td></tr>
            <tr><td><code>Fone</code></td><td>string?</td><td>Máximo 8 caracteres.</td></tr>
            <tr><td><code>DddFax</code></td><td>string?</td><td>Máximo 4 caracteres.</td></tr>
            <tr><td><code>Fax</code></td><td>string?</td><td>Máximo 8 caracteres.</td></tr>
            <tr><td><code>EMail</code></td><td>string?</td><td>Máximo 40 caracteres; deve ser um e-mail válido quando informado.</td></tr>
            <tr><td><code>FlCooperativa</code></td><td>string?</td><td>Máximo 1 caractere — flag legada, valores <code>"S"</code>/<code>"N"</code> (string, não booleano).</td></tr>
            <tr><td><code>PcCooperativa</code></td><td>decimal?</td><td>—</td></tr>
            <tr><td><code>Site</code></td><td>string?</td><td>Máximo 50 caracteres.</td></tr>
            <tr><td><code>FlTrabalhaCidadeFilialAtendimento</code></td><td>string?</td><td>Máximo 1 caractere — flag legada, valores <code>"S"</code>/<code>"N"</code> (string, não booleano).</td></tr>
          </tbody>
        </table>

        <p>
          A API reforça as mesmas regras (obrigatoriedade e tamanho máximo) no servidor via FluentValidation;
          qualquer violação resulta em <strong>400</strong> com uma mensagem por campo (ver{" "}
          <a href="#mantran_applications_api_erros_padrao">Respostas de Erro Padrão</a>).
        </p>

        <p><strong>Exemplo — corpo de requisição (EmpresaRequest):</strong></p>
        <pre className="code-block">{`{
  "sigla": "MNT",
  "cgcCpf": "00000000000100",
  "ie": "123456789000",
  "razaoSocial": "Mantran Transportes Ltda",
  "fantasia": "Mantran",
  "endereco": "Rua das Transportadoras, 100",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "uf": "SP",
  "cep": "01000000",
  "ddd": "11",
  "fone": "99999999",
  "dddFax": "11",
  "fax": "33333333",
  "eMail": "contato@mantran.com.br",
  "flCooperativa": "N",
  "pcCooperativa": null,
  "site": "www.mantran.com.br",
  "flTrabalhaCidadeFilialAtendimento": "N"
}`}</pre>

        <p><strong>Exemplo — corpo de resposta (EmpresaEntity):</strong></p>
        <pre className="code-block">{`{
  "cdEmpresa": "007",
  "sigla": "MNT",
  "cgcCpf": "00000000000100",
  "ie": "123456789000",
  "razaoSocial": "Mantran Transportes Ltda",
  "fantasia": "Mantran",
  "endereco": "Rua das Transportadoras, 100",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "uf": "SP",
  "cep": "01000000",
  "ddd": "11",
  "fone": "99999999",
  "dddFax": "11",
  "fax": "33333333",
  "eMail": "contato@mantran.com.br",
  "flCooperativa": "N",
  "pcCooperativa": null,
  "site": "www.mantran.com.br",
  "flTrabalhaCidadeFilialAtendimento": "N"
}`}</pre>
      </section>

      {/* 4. GET listar (paginado) */}
      <section id="empresa_listar">
        <h3>3. GET — Listar Empresas (paginado)</h3>
        <p>
          Retorna a lista de empresas cadastradas, paginada. Não exige body — os parâmetros de paginação,
          busca e ordenação são enviados via querystring.
        </p>

        <table className="data-table">
          <thead>
            <tr><th>Parâmetro</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td><code>page</code></td><td>int</td><td>Página desejada.</td></tr>
            <tr><td><code>pageSize</code></td><td>int</td><td>Quantidade de itens por página.</td></tr>
            <tr><td><code>search</code></td><td>string?</td><td>Filtro textual de busca.</td></tr>
            <tr><td><code>orderBy</code></td><td>string?</td><td>Campo usado para ordenação.</td></tr>
            <tr><td><code>descending</code></td><td>bool?</td><td>Ordena de forma descendente quando <code>true</code>.</td></tr>
          </tbody>
        </table>

        <h4>4.1 Requisição</h4>
        <pre className="code-block">{`GET ${API_BASE_URL}/api/Empresa?page=1&pageSize=20&search=mantran&orderBy=razaoSocial&descending=false
Authorization: Bearer {token_jwt}`}</pre>

        <h4>4.2 Resposta — 200 OK</h4>
        <p>Corpo no formato <code>ApiPagedResponse&lt;EmpresaEntity&gt;</code>:</p>
        <pre className="code-block">{`{
  "hasNext": true,
  "page": 1,
  "pageSize": 20,
  "items": [
    {
      "cdEmpresa": "007",
      "sigla": "MNT",
      "cgcCpf": "00000000000100",
      "razaoSocial": "Mantran Transportes Ltda",
      "cidade": "São Paulo",
      "uf": "SP"
      // ... demais campos de EmpresaEntity
    }
  ]
}`}</pre>
      </section>

      {/* 5. GET obter por cdEmpresa */}
      <section id="empresa_obter">
        <h3>4. GET — Obter Empresa</h3>
        <p>
          Retorna os dados completos de uma empresa específica, identificada por <code>cdEmpresa</code> na
          rota.
        </p>

        <h4>5.1 Requisição</h4>
        <pre className="code-block">{`GET ${API_BASE_URL}/api/Empresa/007
Authorization: Bearer {token_jwt}`}</pre>

        <h4>5.2 Resposta — 200 OK</h4>
        <p>Corpo "nu" (sem envelope) — <code>EmpresaEntity</code>:</p>
        <pre className="code-block">{`{
  "cdEmpresa": "007",
  "sigla": "MNT",
  "cgcCpf": "00000000000100",
  "razaoSocial": "Mantran Transportes Ltda",
  "fantasia": "Mantran",
  "cidade": "São Paulo",
  "uf": "SP",
  "flCooperativa": "N"
  // ... demais campos de EmpresaEntity
}`}</pre>
        <p>Se <code>cdEmpresa</code> não existir, a resposta é <strong>404</strong>.</p>
      </section>

      {/* 6. GET nextId */}
      <section id="empresa_next_id">
        <h3>5. GET — Próximo Código de Empresa</h3>
        <p>
          Retorna o próximo código de empresa disponível (equivalente a <code>MAX + 1</code> na base). A
          resposta é um <strong>inteiro cru</strong> — sem envelope e sem qualquer wrapper de objeto.
        </p>

        <h4>6.1 Requisição</h4>
        <pre className="code-block">{`GET ${API_BASE_URL}/api/Empresa/nextId
Authorization: Bearer {token_jwt}`}</pre>

        <h4>6.2 Resposta — 200 OK</h4>
        <pre className="code-block">{`8`}</pre>
      </section>

      {/* 7. POST criar */}
      <section id="empresa_criar">
        <h3>6. POST — Criar Empresa</h3>
        <p>
          Cria uma nova empresa. O corpo é um <code>EmpresaRequest</code> — <strong>sem</strong>{" "}
          <code>cdEmpresa</code>, que é sempre gerado pelo servidor.
        </p>

        <h4>7.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/Empresa
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "sigla": "ABC",
  "cgcCpf": "11111111000111",
  "razaoSocial": "Transportes ABC Ltda",
  "fantasia": "ABC Trans",
  "cidade": "Campinas",
  "uf": "SP",
  "flCooperativa": "N",
  "flTrabalhaCidadeFilialAtendimento": "S"
}`}</pre>

        <h4>7.2 Resposta — 201 Created</h4>
        <p>
          Corpo "nu" com a entidade criada (<code>EmpresaEntity</code>, já com <code>cdEmpresa</code>
          preenchido) e header <code>Location</code> apontando para o novo recurso.
        </p>
        <pre className="code-block">{`Location: /api/Empresa/008

{
  "cdEmpresa": "008",
  "sigla": "ABC",
  "cgcCpf": "11111111000111",
  "razaoSocial": "Transportes ABC Ltda",
  "fantasia": "ABC Trans",
  "cidade": "Campinas",
  "uf": "SP",
  "flCooperativa": "N",
  "flTrabalhaCidadeFilialAtendimento": "S"
}`}</pre>
        <p>
          Violações de validação (campos obrigatórios ausentes, tamanho excedido, e-mail inválido) resultam
          em <strong>400</strong> — ver <a href="#mantran_applications_api_erros_padrao">Respostas de Erro Padrão</a>.
        </p>
      </section>

      {/* 8. PUT atualizar */}
      <section id="empresa_atualizar">
        <h3>7. PUT — Atualizar Empresa</h3>
        <p>
          Atualiza uma empresa existente, identificada por <code>cdEmpresa</code> na rota. O corpo é o mesmo{" "}
          <code>EmpresaRequest</code> usado na criação (também sem <code>cdEmpresa</code> no body).
        </p>

        <h4>8.1 Requisição</h4>
        <pre className="code-block">{`PUT ${API_BASE_URL}/api/Empresa/008
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "sigla": "ABC",
  "cgcCpf": "11111111000111",
  "razaoSocial": "Transportes ABC S/A",
  "fantasia": "ABC Transportes",
  "cidade": "Campinas",
  "uf": "SP",
  "eMail": "contato@abctrans.com.br",
  "site": "www.abctrans.com.br",
  "flCooperativa": "N",
  "flTrabalhaCidadeFilialAtendimento": "S"
}`}</pre>

        <h4>8.2 Resposta — 200 OK</h4>
        <p>Corpo "nu" com a entidade atualizada (<code>EmpresaEntity</code>).</p>
        <pre className="code-block">{`{
  "cdEmpresa": "008",
  "sigla": "ABC",
  "cgcCpf": "11111111000111",
  "razaoSocial": "Transportes ABC S/A",
  "fantasia": "ABC Transportes",
  "cidade": "Campinas",
  "uf": "SP",
  "eMail": "contato@abctrans.com.br",
  "site": "www.abctrans.com.br",
  "flCooperativa": "N",
  "flTrabalhaCidadeFilialAtendimento": "S"
}`}</pre>
        <p>Se <code>cdEmpresa</code> não existir, a resposta é <strong>404</strong>.</p>
      </section>

      {/* 9. DELETE excluir */}
      <section id="empresa_excluir">
        <h3>8. DELETE — Excluir Empresa</h3>
        <p>Remove uma empresa, identificada por <code>cdEmpresa</code> na rota. Não há body.</p>

        <h4>9.1 Requisição</h4>
        <pre className="code-block">{`DELETE ${API_BASE_URL}/api/Empresa/008
Authorization: Bearer {token_jwt}`}</pre>

        <h4>9.2 Resposta — 204 No Content</h4>
        <p>Sem corpo. Se <code>cdEmpresa</code> não existir, a resposta é <strong>404</strong>.</p>
      </section>

      {/* 10. EmpresaParametro — Visão Geral */}
      <section id="empresa_parametro">
        <h3>9. EmpresaParametroController — Visão Geral</h3>
        <p>
          Sub-funcionalidade nova (rota <code>api/EmpresaParametro</code>), sem equivalente na documentação
          anterior. Mesmo requisito de autenticação do <code>EmpresaController</code>: token JWT válido e a
          mesma role de autorização.
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
              <td><code>/api/EmpresaParametro/{"{cdEmpresa}"}</code></td>
              <td>Retorna os parâmetros da empresa do usuário autenticado</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/EmpresaParametro/verify-password</code></td>
              <td>Verifica uma senha de administrador antes de permitir edição dos parâmetros</td>
            </tr>
            <tr>
              <td><code>PUT</code></td>
              <td><code>/api/EmpresaParametro/{"{cdEmpresa}"}</code></td>
              <td>Cria ou atualiza (upsert) os parâmetros da empresa do usuário autenticado</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Importante:</strong> nos três endpoints acima, o segmento <code>{"{cdEmpresa}"}</code> da
          rota é aceito mas <strong>ignorado</strong> — a empresa efetiva é sempre resolvida a partir do
          token JWT do chamador (claim de tenant), nunca a partir da URL. Ou seja, não é possível ler ou
          editar os parâmetros de outra empresa apenas trocando o valor de <code>cdEmpresa</code> na URL.
        </p>
      </section>

      {/* 11. Modelo de Dados — EmpresaParametro */}
      <section id="empresa_parametro_modelo_dados">
        <h3>10. Modelo de Dados — EmpresaParametro</h3>
        <p>
          <code>EmpresaParametroRequest</code> é o corpo usado no <code>PUT</code>. Todos os campos são
          opcionais e não há limite de tamanho aplicado pela API.
        </p>

        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Observação</th></tr>
          </thead>
          <tbody>
            <tr><td><code>FlReiniciaNumeracaoFatura</code></td><td>Flag legada — reinicia a numeração de fatura.</td></tr>
            <tr><td><code>FlNumeracaoTipoCliente</code></td><td>Flag legada — numeração de fatura por tipo de cliente.</td></tr>
            <tr><td><code>SqFaturaC</code></td><td>Sequência de numeração de fatura, tipo C.</td></tr>
            <tr><td><code>SqFaturaE</code></td><td>Sequência de numeração de fatura, tipo E.</td></tr>
            <tr><td><code>FlUsarFilialFaturamento</code></td><td>Flag legada — usa filial de faturamento.</td></tr>
            <tr><td><code>FlTemCiot</code></td><td>Flag legada — empresa opera com CIOT.</td></tr>
            <tr><td><code>FlTemAtm</code></td><td>Flag legada — empresa opera com ATM.</td></tr>
            <tr><td><code>FlRemetenteSolicitante</code></td><td>Flag legada — remetente é o solicitante.</td></tr>
            <tr><td><code>FlBaixaXmlNfe</code></td><td>Flag legada — baixa automática de XML de NF-e.</td></tr>
            <tr><td><code>FlTemMilkRun</code></td><td>Flag legada — empresa opera com Milk Run.</td></tr>
            <tr><td><code>FlTemIntelepost</code></td><td>Flag legada — integração com Intelepost.</td></tr>
            <tr><td><code>FlAtmWs</code></td><td>Flag legada — integração ATM via webservice.</td></tr>
            <tr><td><code>QtLicencaMobile</code></td><td><code>int?</code> — quantidade de licenças mobile.</td></tr>
            <tr><td><code>FlEmailCtrcApenasTomador</code></td><td>Flag legada — envio de e-mail de CT-e restrito ao tomador.</td></tr>
            <tr><td><code>NumeracaoViagem</code></td><td>Numeração de viagem.</td></tr>
            <tr><td><code>FlNumeracaoViagemEmpresa</code></td><td>Flag legada — numeração de viagem por empresa.</td></tr>
            <tr><td><code>PastaImportacaoXml</code></td><td>Caminho da pasta de importação de XML.</td></tr>
            <tr><td><code>FlBloqueado</code></td><td>Flag legada — empresa bloqueada.</td></tr>
            <tr><td><code>FlEnvioMensagem</code></td><td>Flag legada — envio de mensagens habilitado.</td></tr>
            <tr><td><code>EmailSac</code></td><td>E-mail do SAC.</td></tr>
            <tr><td><code>FlDrePadrao</code></td><td>Flag legada — DRE padrão.</td></tr>
          </tbody>
        </table>

        <p>
          A resposta (<code>EmpresaParametroEntity</code>, retornada no <code>GET</code> e no{" "}
          <code>PUT</code>) inclui também os campos abaixo, que são <strong>somente leitura por esta API</strong>{" "}
          — não existem no <code>EmpresaParametroRequest</code> e não podem ser definidos por este
          controller:
        </p>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Observação</th></tr>
          </thead>
          <tbody>
            <tr><td><code>PastaInstalacaoCertificado</code></td><td>Caminho de instalação do certificado.</td></tr>
            <tr><td><code>TpIntegracaoErpAutomatico</code></td><td>Tipo de integração ERP automática.</td></tr>
            <tr><td><code>FlIntegracaoAnttCiot</code></td><td>Flag — integração ANTT/CIOT.</td></tr>
            <tr><td><code>FlHabilitarUpload</code></td><td>Flag — habilita upload.</td></tr>
            <tr><td><code>LimiteUpload</code></td><td><code>long?</code> — limite de upload.</td></tr>
            <tr><td><code>ConsumoUpload</code></td><td><code>decimal?</code> — consumo de upload atual.</td></tr>
          </tbody>
        </table>
      </section>

      {/* 12. GET obter parâmetros */}
      <section id="empresa_parametro_obter">
        <h3>11. GET — Obter Parâmetros da Empresa</h3>
        <p>
          Retorna os parâmetros da empresa do usuário autenticado. Lembrando que{" "}
          <code>{"{cdEmpresa}"}</code> na rota é ignorado — a empresa é sempre a do token.
        </p>

        <h4>12.1 Requisição</h4>
        <pre className="code-block">{`GET ${API_BASE_URL}/api/EmpresaParametro/007
Authorization: Bearer {token_jwt}`}</pre>

        <h4>12.2 Resposta — 200 OK</h4>
        <p>Corpo "nu" — <code>EmpresaParametroEntity</code>:</p>
        <pre className="code-block">{`{
  "flReiniciaNumeracaoFatura": "N",
  "flTemCiot": "S",
  "qtLicencaMobile": 10,
  "flBloqueado": "N",
  "emailSac": "sac@mantran.com.br",
  "flHabilitarUpload": "S",
  "limiteUpload": 5368709120,
  "consumoUpload": 128.5
  // ... demais campos de EmpresaParametroEntity
}`}</pre>
        <p>Se a empresa do token não tiver parâmetros cadastrados, a resposta é <strong>404</strong>.</p>
      </section>

      {/* 13. POST verify-password */}
      <section id="empresa_parametro_verify_password">
        <h3>12. POST — Verificar Senha</h3>
        <p>
          Verifica uma senha de administrador antes de permitir a edição dos parâmetros da empresa. A senha
          esperada vem de configuração do servidor (variável de ambiente) — não há valor fixo no código. A
          comparação é feita por igualdade exata, sem normalização de maiúsculas/minúsculas ou espaços.
        </p>

        <h4>13.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/EmpresaParametro/verify-password
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "password": "senha_do_administrador"
}`}</pre>

        <h4>13.2 Respostas</h4>
        <table className="data-table">
          <thead>
            <tr><th>Status</th><th>Condição</th><th>Corpo</th></tr>
          </thead>
          <tbody>
            <tr><td>200 OK</td><td>Senha confere</td><td>Vazio</td></tr>
            <tr><td>401</td><td>Senha não confere</td><td>Ver <a href="#mantran_applications_api_erros_padrao">Respostas de Erro Padrão</a></td></tr>
          </tbody>
        </table>
      </section>

      {/* 14. PUT upsert parâmetros */}
      <section id="empresa_parametro_upsert">
        <h3>13. PUT — Criar ou Atualizar Parâmetros (Upsert)</h3>
        <p>
          Cria os parâmetros da empresa do usuário autenticado caso ainda não existam, ou atualiza os
          existentes. Assim como no <code>GET</code>, <code>{"{cdEmpresa}"}</code> na rota é ignorado — a
          empresa é sempre resolvida pelo token.
        </p>

        <h4>14.1 Requisição</h4>
        <pre className="code-block">{`PUT ${API_BASE_URL}/api/EmpresaParametro/007
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "flReiniciaNumeracaoFatura": "N",
  "flTemCiot": "S",
  "qtLicencaMobile": 10,
  "flBloqueado": "N",
  "emailSac": "sac@mantran.com.br"
}`}</pre>

        <h4>14.2 Resposta — 200 OK</h4>
        <p>Corpo "nu" com a entidade resultante (<code>EmpresaParametroEntity</code>), incluindo os campos
          somente leitura calculados pelo servidor.</p>
        <pre className="code-block">{`{
  "flReiniciaNumeracaoFatura": "N",
  "flTemCiot": "S",
  "qtLicencaMobile": 10,
  "flBloqueado": "N",
  "emailSac": "sac@mantran.com.br",
  "flHabilitarUpload": "S",
  "limiteUpload": 5368709120,
  "consumoUpload": 128.5
  // ... demais campos de EmpresaParametroEntity
}`}</pre>
      </section>

      <ApiErrorReference />
    </div>
  );

  return (
    <GenericContent
      title="Mantran.Applications - API — Empresa"
      content={content}
    />
  );
}

export default MantranApiEmpresaPage;
