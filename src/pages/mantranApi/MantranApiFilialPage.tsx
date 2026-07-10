import GenericContent from "@shared/components/GenericContent";
import { API_BASE_URL } from "@shared/config/apiConfig";
import TokenNotice from "@shared/components/TokenNotice";
import ApiErrorReference from "@shared/components/ApiErrorReference";

function MantranApiFilialPage() {
  const content = (
    <div className="conteudo-div">

      <TokenNotice />

      <h4>Documentação Técnica — FilialController / FilialParametroController (Mantran.Applications - API)</h4>

      {/* 1. Visão Geral */}
      <section id="mantran_api_filial">
        <h3>1. Visão Geral</h3>
        <p>
          O <code>FilialController</code> (rota <code>api/Filial</code>) gerencia o cadastro de filiais na
          nova <strong>Mantran.Applications - API</strong> (.NET 10). A listagem e a busca são escopadas
          automaticamente à empresa do usuário autenticado (resolvida a partir do JWT). Todos os endpoints
          exigem token JWT válido; as operações de escrita (criar, alterar, excluir) somam uma verificação de
          permissão de negócio independente — ver seção 2.
        </p>

        <p>
          <strong>
            O 403 da verificação de permissão de negócio (códigos 1152/1153/1154) tem um formato JSON
            diferente do restante da API
          </strong>{" "}
          — é o ponto de atenção mais importante desta página. Veja a seção 2. Não existe endpoint para
          consultar as filiais acessíveis a um usuário específico (ver seção 11).
        </p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Método</th>
              <th>Rota</th>
              <th>Descrição</th>
              <th>Sucesso</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>GET</code></td>
              <td><code>/api/Filial?page&amp;pageSize&amp;search&amp;orderBy&amp;descending</code></td>
              <td>Lista paginada de filiais da empresa do usuário autenticado</td>
              <td><code>200</code> — <code>ApiPagedResponse&lt;FilialEntity&gt;</code></td>
            </tr>
            <tr>
              <td><code>GET</code></td>
              <td><code>/api/Filial/{"{cdFilial}"}</code></td>
              <td>Retorna uma filial pelo código</td>
              <td><code>200</code> — <code>FilialEntity</code> (bare) / <code>404</code></td>
            </tr>
            <tr>
              <td><code>GET</code></td>
              <td><code>/api/Filial/hub/{"{cnpj}"}</code></td>
              <td>Consulta dados cadastrais de uma empresa por CNPJ na integração externa "Hub do Desenvolvedor"</td>
              <td><code>200</code> — <code>HubFilialResponse</code> / <code>404</code></td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/Filial/{"{cdFilial}"}</code></td>
              <td>Cria uma filial — o código vai na própria URL, não é gerado pelo servidor</td>
              <td><code>201</code> — <code>FilialEntity</code> (bare)</td>
            </tr>
            <tr>
              <td><code>PUT</code></td>
              <td><code>/api/Filial/{"{cdFilial}"}</code></td>
              <td>Atualiza uma filial existente</td>
              <td><code>200</code> — <code>FilialEntity</code> (bare)</td>
            </tr>
            <tr>
              <td><code>DELETE</code></td>
              <td><code>/api/Filial/{"{cdFilial}"}</code></td>
              <td>Exclui uma filial</td>
              <td><code>204</code> / <code>404</code></td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 2. Permissão extra / 403 não padrão */}
      <section id="filial_permissao">
        <h3>2. Verificação de Permissão Extra em Criar/Alterar/Excluir (403 não padrão)</h3>
        <p>
          Além da autenticação JWT, os endpoints de criação, alteração e exclusão de filial verificam uma
          permissão de negócio adicional (<code>IPermissaoService</code>), ligada ao operador logado —
          independente do papel exigido pelo token. Cada operação tem seu próprio código de permissão:
        </p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Código</th>
              <th>Mensagem quando negado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>POST /api/Filial/{"{cdFilial}"}</code> (criar)</td>
              <td><strong>1152</strong></td>
              <td><code>"1152 - Você não possui acesso para executar essa operação!!!"</code></td>
            </tr>
            <tr>
              <td><code>PUT /api/Filial/{"{cdFilial}"}</code> (alterar)</td>
              <td><strong>1153</strong></td>
              <td><code>"1153 - Você não possui acesso para executar essa operação!!!"</code></td>
            </tr>
            <tr>
              <td><code>DELETE /api/Filial/{"{cdFilial}"}</code> (excluir)</td>
              <td><strong>1154</strong></td>
              <td><code>"1154 - Você não possui acesso para executar essa operação!!!"</code></td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>⚠ Atenção — formato de corpo diferente do resto da API:</strong> esse 403 é emitido como{" "}
          <strong>RFC 7807 <code>ProblemDetails</code></strong>, não como o <code>ApiErrorResponse</code>{" "}
          (<code>{`{ message, errors }`}</code>) usado em todo o restante desta API — inclusive nos próprios
          401/403 de autenticação/papel deste mesmo controller. Um consumidor que só trate{" "}
          <code>ApiErrorResponse</code> vai falhar ao interpretar esse 403 específico.
        </p>

        <pre className="code-block">{`// 403 — permissão de negócio negada (ProblemDetails, RFC 7807)
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.3",
  "title": "Forbidden",
  "status": 403,
  "detail": "1152 - Você não possui acesso para executar essa operação!!!"
  // demais campos do ProblemDetails podem variar (traceId, instance, etc.)
}`}</pre>

        <p>
          Já o 401/403 comuns (token ausente/inválido, ou token válido sem o papel exigido) seguem o formato
          padrão descrito em <a href="#mantran_applications_api_erros_padrao">Respostas de Erro Padrão</a>.
        </p>
      </section>

      {/* 3. Modelo de Dados */}
      <section id="filial_modelo">
        <h3>3. Modelo de Dados — FilialRequest / FilialEntity</h3>
        <p>
          <code>FilialRequest</code> é o corpo usado em <code>POST</code> e <code>PUT</code>. Tem cerca de
          100 campos, quase todos opcionais — o único campo obrigatório é{" "}
          <code>FlLimpaTelaContasPagar</code> (<code>string</code>, máx. 1 caractere, padrão{" "}
          <code>"N"</code>). <code>FilialEntity</code> (retornado por todos os endpoints de leitura/escrita)
          tem os mesmos campos, acrescidos da chave primária composta <code>CdEmpresa</code> +{" "}
          <code>CdFilial</code>.
        </p>
        <p>
          <strong>ℹ</strong> A validação de negócio (FluentValidation) cobre apenas um subconjunto (~20) dos
          campos abaixo; os demais têm somente o limite de tamanho aplicado pelas DataAnnotations do
          request.
        </p>
        <p>
          <strong>ℹ</strong> São <strong>obrigatórios</strong> (400 se ausentes/vazios): <code>Nome</code>,{" "}
          <code>Endereco</code>, <code>NrEndereco</code>, <code>Bairro</code>, <code>Cep</code> e{" "}
          <code>Cgc</code>. Além disso, <code>CdFilial</code> (na URL) precisa ser{" "}
          <strong>numérico</strong>, e <code>Cgc</code> precisa ser um CNPJ com{" "}
          <strong>dígito verificador válido</strong> — ambos verificados pelo <code>FilialValidator</code>{" "}
          (paridade com o <code>Consiste_Filial</code> do sistema legado).
        </p>
        <p>
          <strong>ℹ</strong> Os nomes nas tabelas abaixo são as propriedades C# (PascalCase). No JSON
          trafegado pela API (request e response) esses mesmos campos aparecem em{" "}
          <strong>camelCase</strong> — por isso os exemplos de requisição/resposta desta página usam{" "}
          <code>cdFilial</code>, <code>flLimpaTelaContasPagar</code>, etc.
        </p>

        <h4>3.1 Identificação</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Tipo</th><th>Tamanho máx.</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Sigla</code></td><td>string?</td><td>3</td></tr>
            <tr><td><code>Cgc</code></td><td>string</td><td>14 — <strong>obrigatório</strong>, CNPJ com dígito verificador válido</td></tr>
            <tr><td><code>Ie</code></td><td>string?</td><td>18</td></tr>
            <tr><td><code>Nome</code></td><td>string</td><td>50 — <strong>obrigatório</strong></td></tr>
          </tbody>
        </table>

        <h4>3.2 Endereço / Contato</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Tipo</th><th>Tamanho máx.</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Endereco</code></td><td>string</td><td>100 — <strong>obrigatório</strong></td></tr>
            <tr><td><code>Numero</code></td><td>string?</td><td>10</td></tr>
            <tr><td><code>NrEndereco</code></td><td>string</td><td>10 — <strong>obrigatório</strong></td></tr>
            <tr><td><code>Bairro</code></td><td>string</td><td>80 — <strong>obrigatório</strong></td></tr>
            <tr><td><code>Cidade</code></td><td>string?</td><td>80</td></tr>
            <tr><td><code>Cep</code></td><td>string</td><td>8 — <strong>obrigatório</strong></td></tr>
            <tr><td><code>CepRef</code></td><td>string?</td><td>8</td></tr>
            <tr><td><code>Uf</code></td><td>string?</td><td>2</td></tr>
            <tr><td><code>Ddd</code></td><td>string?</td><td>4</td></tr>
            <tr><td><code>Fone</code></td><td>string?</td><td>9</td></tr>
            <tr><td><code>DddFax</code></td><td>string?</td><td>4</td></tr>
            <tr><td><code>Fax</code></td><td>string?</td><td>9</td></tr>
            <tr><td><code>Email</code></td><td>string?</td><td>80</td></tr>
            <tr><td><code>CaixaPostal</code></td><td>string?</td><td>5</td></tr>
          </tbody>
        </table>

        <h4>3.3 Contato de Ocorrência</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Tipo</th><th>Tamanho máx.</th></tr>
          </thead>
          <tbody>
            <tr><td><code>DddOcorrencia</code></td><td>string?</td><td>4</td></tr>
            <tr><td><code>FoneOcorrencia</code></td><td>string?</td><td>9</td></tr>
            <tr><td><code>DddFaxOcorrencia</code></td><td>string?</td><td>4</td></tr>
            <tr><td><code>FaxOcorrencia</code></td><td>string?</td><td>9</td></tr>
            <tr><td><code>EmailOcorrencia</code></td><td>string?</td><td>40</td></tr>
          </tbody>
        </table>

        <h4>3.4 Flags / Fiscal</h4>
        <p>
          A maioria é <code>string?</code> de 1 caractere no padrão legado <code>"S"</code>/<code>"N"</code>.
          Exceções indicadas na tabela.
        </p>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Tipo</th><th>Observação</th></tr>
          </thead>
          <tbody>
            <tr><td><code>FlSubstituicao</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlInformatizada</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlColeta</code></td><td>int?</td><td>—</td></tr>
            <tr><td><code>FlCtrc</code></td><td>int?</td><td>—</td></tr>
            <tr><td><code>FlIcmsNoFrete</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>OpSimplesNacional</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlIcmsIsento</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlNrCtrcAuto</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlFilialTerceiros</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlTabelaAgregado</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlBaixaPorNf</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlFaturaCtrcSemBaixa</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlNrViagemAuto</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlAcertoContasProtocolo</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlRateiaDivisao</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlNfServico</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlIniciaViagemColeta</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlFaturaMinuta</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlLimpaTelaCtE</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlOcorrNfCteEncerrado</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlIcmsIssMinuta</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlContingenciaCtE</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlIsencaoIcmsInterestadual</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlIniciaViagem</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlMostraApoliceCte</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlTaxaColetaSemColeta</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlBloqueiaDeSpSemSaldo</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>OpLucroReal</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>OpLucroPresumido</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlNumeracaoFaturaFilial</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlCompartilhaFilial</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlVeiculoMotoristaFilial</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlRateioColeta</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr><td><code>FlPlanilhaAgregadoPorPeso</code></td><td>string?</td><td>1 char, S/N</td></tr>
            <tr>
              <td><code>FlLimpaTelaContasPagar</code></td>
              <td>string</td>
              <td><strong>Obrigatório</strong>, 1 char, padrão <code>"N"</code></td>
            </tr>
          </tbody>
        </table>

        <h4>3.5 Numeração / Sequências</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Tipo</th><th>Tamanho máx.</th></tr>
          </thead>
          <tbody>
            <tr><td><code>NrCtrcControle</code></td><td>string?</td><td>9</td></tr>
            <tr><td><code>NrCtrcSerie</code></td><td>string?</td><td>3</td></tr>
            <tr><td><code>NrUltimoCtrc</code></td><td>string?</td><td>9</td></tr>
            <tr><td><code>NrUltimoManifesto</code></td><td>string?</td><td>6</td></tr>
            <tr><td><code>NrUltimaViagem</code></td><td>string?</td><td>6</td></tr>
            <tr><td><code>NrUltimaColeta</code></td><td>string?</td><td>6</td></tr>
            <tr><td><code>NrUltimaOcorrencia</code></td><td>string?</td><td>6</td></tr>
            <tr><td><code>NrUltimoRomaneio</code></td><td>string?</td><td>6</td></tr>
            <tr><td><code>NrUltimaAutorizacao</code></td><td>string?</td><td>6</td></tr>
            <tr><td><code>NrOs</code></td><td>string?</td><td>6</td></tr>
            <tr><td><code>NrUltimaNfMovimento</code></td><td>string?</td><td>6</td></tr>
            <tr><td><code>NrUltimaNfServico</code></td><td>string?</td><td>6</td></tr>
            <tr><td><code>NfServicoSerie</code></td><td>string?</td><td>3</td></tr>
            <tr><td><code>NrCtrcSerie2</code></td><td>string?</td><td>3</td></tr>
            <tr><td><code>NrUltimoCtrc2</code></td><td>string?</td><td>6</td></tr>
            <tr><td><code>NrCtrcControle2</code></td><td>string?</td><td>9</td></tr>
            <tr><td><code>NrUltimoMdfe</code></td><td>string?</td><td>6</td></tr>
            <tr><td><code>NrSerieMdfe</code></td><td>string?</td><td>3</td></tr>
            <tr><td><code>NrUltimaFatura</code></td><td>string?</td><td>6</td></tr>
            <tr><td><code>NrUltimaOsCarga</code></td><td>string?</td><td>6</td></tr>
          </tbody>
        </table>

        <h4>3.6 Monetário / Percentual</h4>
        <p>Todos <code>decimal?</code>.</p>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th></tr>
          </thead>
          <tbody>
            <tr><td><code>PcEntrega</code></td></tr>
            <tr><td><code>PcColeta</code></td></tr>
            <tr><td><code>PcFreteTerceiros</code></td></tr>
            <tr><td><code>VrFreteMinimoTerceiros</code></td></tr>
            <tr><td><code>VrKgColetado</code></td></tr>
            <tr><td><code>PcTributos</code></td></tr>
            <tr><td><code>AlPis</code></td></tr>
            <tr><td><code>AlCofins</code></td></tr>
            <tr><td><code>AlSestSenat</code></td></tr>
            <tr><td><code>AlIss</code></td></tr>
            <tr><td><code>AlCssl</code></td></tr>
            <tr><td><code>AlIr</code></td></tr>
            <tr><td><code>AlCbs</code></td></tr>
            <tr><td><code>VrColeta</code></td></tr>
          </tbody>
        </table>

        <h4>3.7 Outros</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Tipo</th><th>Tamanho máx. / Observação</th></tr>
          </thead>
          <tbody>
            <tr><td><code>CdLocal</code></td><td>string?</td><td>3</td></tr>
            <tr><td><code>CdUrbano</code></td><td>string?</td><td>3</td></tr>
            <tr><td><code>EstacaoImpressao</code></td><td>string?</td><td>15</td></tr>
            <tr><td><code>DiretorioRecebimento</code></td><td>string?</td><td>80</td></tr>
            <tr><td><code>DiretorioEnvio</code></td><td>string?</td><td>80</td></tr>
            <tr><td><code>DiretorioAutotrac</code></td><td>string?</td><td>80</td></tr>
            <tr><td><code>NrAntt</code></td><td>string?</td><td>15</td></tr>
            <tr><td><code>NrApolice</code></td><td>string?</td><td>200</td></tr>
            <tr><td><code>CdFilialSap</code></td><td>string?</td><td>10</td></tr>
            <tr><td><code>CdCst</code></td><td>string?</td><td>3</td></tr>
            <tr><td><code>DtVencAntt</code></td><td>date?</td><td>—</td></tr>
            <tr><td><code>CorFilial</code></td><td>string?</td><td>50</td></tr>
            <tr><td><code>IMunicipal</code></td><td>string?</td><td>9</td></tr>
            <tr><td><code>Cnae</code></td><td>string?</td><td>7</td></tr>
            <tr><td><code>CdBeneficiamentoFiscal</code></td><td>string?</td><td>9</td></tr>
            <tr><td><code>CdOtm</code></td><td>string?</td><td>9</td></tr>
            <tr><td><code>Pix</code></td><td>string?</td><td>100</td></tr>
            <tr><td><code>Rntrc</code></td><td>string?</td><td>15</td></tr>
          </tbody>
        </table>

        <p>
          <strong>Resposta (<code>FilialEntity</code>):</strong> todos os campos acima, mais{" "}
          <code>CdEmpresa</code> e <code>CdFilial</code> (chave primária composta).
        </p>
      </section>

      {/* 4. GET listar */}
      <section id="filial_buscar_lista">
        <h3>4. GET — Listar Filiais</h3>
        <p>
          Retorna uma página de filiais da empresa do usuário autenticado (resolvida pelo JWT, não por
          parâmetro de query). Suporta busca textual, ordenação e paginação.
        </p>

        <h4>Requisição</h4>
        <pre className="code-block">{`GET ${API_BASE_URL}/api/Filial?page=1&pageSize=20&search=curitiba&orderBy=Nome&descending=false
Authorization: Bearer {token}`}</pre>

        <h4>Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "hasNext": true,
  "page": 1,
  "pageSize": 20,
  "items": [
    {
      "cdEmpresa": "001",
      "cdFilial": "01",
      "nome": "Filial São Paulo",
      "sigla": "SP",
      "cgc": "00000000000100",
      "cidade": "São Paulo",
      "uf": "SP",
      "flLimpaTelaContasPagar": "N"
      // ... demais campos do FilialEntity
    }
  ]
}`}</pre>
      </section>

      {/* 5. GET por código */}
      <section id="filial_buscar">
        <h3>5. GET — Obter Filial por Código</h3>
        <p>Retorna os dados completos de uma filial específica.</p>

        <h4>Requisição</h4>
        <pre className="code-block">{`GET ${API_BASE_URL}/api/Filial/01
Authorization: Bearer {token}`}</pre>

        <h4>Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "cdEmpresa": "001",
  "cdFilial": "01",
  "nome": "Filial São Paulo",
  "sigla": "SP",
  "cgc": "00000000000100",
  "ie": "123456789000",
  "endereco": "Av. Paulista",
  "numero": "1000",
  "cidade": "São Paulo",
  "uf": "SP",
  "rntrc": "12345678",
  "flColeta": 1,
  "flCtrc": 1,
  "flLimpaTelaContasPagar": "N"
  // ... demais campos do FilialEntity
}`}</pre>

        <table className="data-table">
          <thead>
            <tr><th>Status</th><th>Condição</th></tr>
          </thead>
          <tbody>
            <tr><td><code>200</code></td><td>Filial encontrada — corpo é o <code>FilialEntity</code> puro</td></tr>
            <tr><td><code>404</code></td><td>Nenhuma filial com esse código na empresa do usuário</td></tr>
          </tbody>
        </table>
      </section>

      {/* 6. GET hub */}
      <section id="filial_hub_desenvolvedor">
        <h3>6. GET — Hub do Desenvolvedor (Consulta por CNPJ)</h3>
        <p>
          Consulta dados cadastrais de uma empresa por CNPJ através da integração externa "Hub do
          Desenvolvedor". <strong>Não é uma consulta ao cadastro de filial</strong> — é um lookup em base
          externa, útil para pré-preencher um formulário de cadastro. O corpo retornado (
          <code>HubFilialResponse</code>) tem um formato diferente de <code>FilialEntity</code>.
        </p>

        <h4>Requisição</h4>
        <pre className="code-block">{`GET ${API_BASE_URL}/api/Filial/hub/00000000000100
Authorization: Bearer {token}`}</pre>

        <h4>Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "cgc": "00000000000100",
  "nome": "Empresa Exemplo Ltda",
  "endereco": "Av. Paulista",
  "numero": "1000",
  "complemento": "Sala 10",
  "cep": "01310000",
  "bairro": "Bela Vista",
  "cidade": "São Paulo",
  "uf": "SP",
  "email": "contato@exemplo.com.br",
  "ddd": "11",
  "fone": "999999999",
  "cnae": "4930202",
  "situacao": "ATIVA"
}`}</pre>

        <h4>Campos de <code>HubFilialResponse</code></h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Tipo</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Cgc</code></td><td>string?</td></tr>
            <tr><td><code>Nome</code></td><td>string?</td></tr>
            <tr><td><code>Endereco</code></td><td>string?</td></tr>
            <tr><td><code>Numero</code></td><td>string?</td></tr>
            <tr><td><code>Complemento</code></td><td>string? — não existe em <code>FilialEntity</code></td></tr>
            <tr><td><code>Cep</code></td><td>string?</td></tr>
            <tr><td><code>Bairro</code></td><td>string?</td></tr>
            <tr><td><code>Cidade</code></td><td>string?</td></tr>
            <tr><td><code>Uf</code></td><td>string?</td></tr>
            <tr><td><code>Email</code></td><td>string?</td></tr>
            <tr><td><code>Ddd</code></td><td>string?</td></tr>
            <tr><td><code>Fone</code></td><td>string?</td></tr>
            <tr><td><code>Cnae</code></td><td>string?</td></tr>
            <tr><td><code>Situacao</code></td><td>string? — não existe em <code>FilialEntity</code></td></tr>
          </tbody>
        </table>

        <table className="data-table">
          <thead>
            <tr><th>Status</th><th>Condição</th></tr>
          </thead>
          <tbody>
            <tr><td><code>200</code></td><td>CNPJ encontrado na base do Hub</td></tr>
            <tr><td><code>404</code></td><td>CNPJ não encontrado</td></tr>
          </tbody>
        </table>
      </section>

      {/* 7. POST criar */}
      <section id="filial_incluir">
        <h3>7. POST — Criar Filial</h3>
        <p>
          Cria uma nova filial. Diferente de Empresa (código gerado pelo servidor), aqui{" "}
          <strong>o código da filial é fornecido pelo cliente na própria URL</strong>, não no body. O corpo
          da requisição é um <code>FilialRequest</code> (ver seção 3).
        </p>

        <h4>Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/Filial/03
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Filial Curitiba",
  "sigla": "CWB",
  "cgc": "11222333000181",
  "endereco": "Av. das Torres",
  "nrEndereco": "500",
  "bairro": "Centro",
  "cep": "80000000",
  "cidade": "Curitiba",
  "uf": "PR",
  "flColeta": 1,
  "flCtrc": 1,
  "flLimpaTelaContasPagar": "N"
}`}</pre>

        <h4>Resposta — 201 Created</h4>
        <pre className="code-block">{`{
  "cdEmpresa": "001",
  "cdFilial": "03",
  "nome": "Filial Curitiba",
  "sigla": "CWB",
  "cgc": "11222333000181",
  "endereco": "Av. das Torres",
  "nrEndereco": "500",
  "bairro": "Centro",
  "cep": "80000000",
  "cidade": "Curitiba",
  "uf": "PR",
  "flColeta": 1,
  "flCtrc": 1,
  "flLimpaTelaContasPagar": "N"
  // ... demais campos do FilialEntity
}`}</pre>

        <p>
          <strong>⚠</strong> Além do <code>400</code>/<code>401</code>/<code>403</code>/<code>500</code>{" "}
          padrão (ver <a href="#mantran_applications_api_erros_padrao">Respostas de Erro Padrão</a>), este
          endpoint pode retornar um <strong>403 em formato <code>ProblemDetails</code></strong> (não{" "}
          <code>ApiErrorResponse</code>) quando o operador não tem a permissão de processo{" "}
          <strong>1152</strong> liberada — ver seção 2.
        </p>

        <p>
          <strong>ℹ Efeitos colaterais (mesma transação, tudo ou nada — paridade com o legado
          Incluir_Registro_Filial):</strong> ao criar a filial, o backend também:
        </p>
        <ol>
          <li>
            concede acesso (<code>Usuario_Filial</code>) a todo usuário "power" que ainda não tenha acesso a
            uma filial com código <strong>menor que 100</strong> (não afeta a própria filial recém-criada
            quando o código dela é ≥ 100);
          </li>
          <li>
            cria automaticamente o <code>FilialParametro</code> da nova filial, com todas as flags de
            configuração (~47 campos <code>Fl*</code>, ver seção 10) já definidas como <code>"N"</code>;
          </li>
          <li>
            grava uma linha de auditoria (<code>Log_Transacao</code>, código de processo{" "}
            <strong>1152</strong>) identificando a filial criada e o operador.
          </li>
        </ol>
        <p>
          Se qualquer etapa falhar (inclusive a inclusão da própria filial), a transação inteira é desfeita
          — nenhum dos efeitos colaterais acima persiste.
        </p>
      </section>

      {/* 8. PUT atualizar */}
      <section id="filial_alterar">
        <h3>8. PUT — Atualizar Filial</h3>
        <p>Atualiza os dados de uma filial existente identificada pelo código na URL.</p>

        <h4>Requisição</h4>
        <pre className="code-block">{`PUT ${API_BASE_URL}/api/Filial/03
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Filial Curitiba - Matriz PR",
  "email": "curitiba@empresa.com.br",
  "pix": "00000000000362",
  "flLimpaTelaContasPagar": "N"
}`}</pre>

        <h4>Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "cdEmpresa": "001",
  "cdFilial": "03",
  "nome": "Filial Curitiba - Matriz PR",
  "email": "curitiba@empresa.com.br",
  "pix": "00000000000362",
  "flLimpaTelaContasPagar": "N"
  // ... demais campos do FilialEntity
}`}</pre>

        <p>
          <strong>⚠</strong> Mesmo alerta da seção anterior: 403 de permissão de processo (código{" "}
          <strong>1153</strong>) volta em formato <code>ProblemDetails</code>, diferente dos demais erros
          desta API — ver seção 2.
        </p>
      </section>

      {/* 9. DELETE excluir */}
      <section id="filial_excluir">
        <h3>9. DELETE — Excluir Filial</h3>
        <p>Exclui uma filial do cadastro.</p>

        <h4>Requisição</h4>
        <pre className="code-block">{`DELETE ${API_BASE_URL}/api/Filial/03
Authorization: Bearer {token}`}</pre>

        <table className="data-table">
          <thead>
            <tr><th>Status</th><th>Condição</th></tr>
          </thead>
          <tbody>
            <tr><td><code>204</code></td><td>Filial excluída com sucesso (sem corpo de resposta)</td></tr>
            <tr><td><code>404</code></td><td>Filial não encontrada</td></tr>
          </tbody>
        </table>

        <p>
          <strong>⚠</strong> Mesmo alerta das seções 7 e 8: 403 de permissão de processo (código{" "}
          <strong>1154</strong>) volta em formato <code>ProblemDetails</code>, diferente dos demais erros
          desta API — ver seção 2.
        </p>
      </section>

      {/* 10. FilialParametroController */}
      <section id="filial_parametro">
        <h3>10. FilialParametroController — <code>api/FilialParametro</code></h3>
        <p>
          Controller separado para os parâmetros de configuração da filial. A empresa é resolvida pelo JWT;{" "}
          <code>cdFilial</code> vem da rota (diferente de <code>EmpresaParametro</code>, que não usa o
          parâmetro de rota da mesma forma).
        </p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Método</th>
              <th>Rota</th>
              <th>Descrição</th>
              <th>Sucesso</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>GET</code></td>
              <td><code>/api/FilialParametro/{"{cdFilial}"}</code></td>
              <td>Retorna os parâmetros da filial</td>
              <td><code>200</code> — <code>FilialParametroEntity</code> (bare) / <code>404</code></td>
            </tr>
            <tr>
              <td><code>PUT</code></td>
              <td><code>/api/FilialParametro/{"{cdFilial}"}</code></td>
              <td>Cria ou atualiza os parâmetros da filial (upsert)</td>
              <td><code>200</code> — <code>FilialParametroEntity</code> (bare)</td>
            </tr>
          </tbody>
        </table>

        <p>
          <code>FilialParametroRequest</code> tem cerca de 150 campos opcionais, <strong>nenhum
          obrigatório</strong>, e <strong>sem FluentValidation dedicado para este parâmetro</strong> — só
          valem as anotações do próprio DTO. Amostra representativa (não exaustiva):
        </p>

        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Tipo / Observação</th></tr>
          </thead>
          <tbody>
            <tr><td><code>SenhaFilial</code></td><td>string?, máx. 20</td></tr>
            <tr><td><code>DtProcessamento</code></td><td>string? — <strong>não</strong> é um tipo data, apesar do nome</td></tr>
            <tr><td><code>VrBloqueio</code></td><td>decimal?</td></tr>
            <tr><td><code>VrAviso</code></td><td>decimal?</td></tr>
            <tr><td><code>CdTabelaPadrao</code></td><td>string?, máx. 3</td></tr>
            <tr><td><code>CdCondPagto</code></td><td>string?, máx. 3</td></tr>
            <tr><td><code>Moeda</code></td><td>string?, máx. 1</td></tr>
            <tr><td><code>SiglaMoeda</code></td><td>string?, máx. 3</td></tr>
            <tr><td><code>IndiceRedutor</code></td><td>decimal?</td></tr>
            <tr><td><code>MensBaseCalculo</code></td><td>string?, máx. 300</td></tr>
            <tr><td><code>MensSubstituicao</code></td><td>string?, máx. 300</td></tr>
            <tr><td><code>MensIcmsIsento</code></td><td>string?, máx. 300</td></tr>
            <tr><td><code>MensIssIsento</code></td><td>string?, máx. 300</td></tr>
            <tr><td><code>EdiEnvio</code></td><td>string?, máx. 80</td></tr>
            <tr><td><code>EdiRecebimento</code></td><td>string?, máx. 80</td></tr>
            <tr><td><code>PcJuros</code></td><td>decimal?</td></tr>
            <tr><td><code>IntegracaoEnvio</code></td><td>string?, máx. 80</td></tr>
            <tr><td><code>IntegracaoRecebimento</code></td><td>string?, máx. 80</td></tr>
            <tr><td><code>Servidor</code></td><td>string?, máx. 15</td></tr>
            <tr><td><code>TempoIntegracao</code></td><td>int?</td></tr>
            <tr><td><code>FlValidaGris</code></td><td>string?, máx. 1</td></tr>
            <tr><td><code>FlMotoristaVariasViagens</code></td><td>string?, máx. 1</td></tr>
            <tr><td><code>FlGerarCpFrota</code></td><td>string?, máx. 1</td></tr>
            <tr><td><code>TpAverba</code></td><td>string?, máx. 1</td></tr>
            <tr><td><code>VrLimiteCtGeracaoAutomatica</code></td><td>decimal?</td></tr>
            <tr><td><code>VrFreteMaximo</code></td><td>decimal?</td></tr>
            <tr><td><code>FlSemPeso</code></td><td>string?, máx. 1</td></tr>
            <tr><td><code>FlHistoricoDespesaObrigatorio</code></td><td>string?, máx. 1</td></tr>
            <tr><td><code>FlCst90SimplesNacional</code></td><td>string?, máx. 1</td></tr>
            <tr>
              <td colSpan={2}>
                ... mais campos de configuração fiscal/EDI/limites — consulte o backend
                (<code>Mantran.Application</code>, feature <code>Filial</code>) para a lista completa.
              </td>
            </tr>
          </tbody>
        </table>

        <h4>Requisição — GET</h4>
        <pre className="code-block">{`GET ${API_BASE_URL}/api/FilialParametro/01
Authorization: Bearer {token}`}</pre>

        <h4>Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "cdEmpresa": "001",
  "cdFilial": "01",
  "cdTabelaPadrao": "001",
  "moeda": "R",
  "siglaMoeda": "BRL"
  // ... demais campos do FilialParametroEntity
}`}</pre>

        <h4>Requisição — PUT (upsert)</h4>
        <pre className="code-block">{`PUT ${API_BASE_URL}/api/FilialParametro/01
Authorization: Bearer {token}
Content-Type: application/json

{
  "cdTabelaPadrao": "001",
  "moeda": "R",
  "siglaMoeda": "BRL",
  "pcJuros": 2.5
}`}</pre>
      </section>

      {/* 11. Não migrado */}
      <section id="filial_acesso_usuario">
        <h3>11. Funcionalidade Não Migrada</h3>
        <p>
          A rota legada <code>buscar-lista-filiais-acesso-usuario</code> (filiais acessíveis a um usuário
          específico) <strong>não tem equivalente na API nova hoje</strong>. Não há endpoint substituto —
          se essa funcionalidade for necessária, é preciso confirmar com o time da API se/quando ela será
          migrada.
        </p>
      </section>

      <ApiErrorReference />

    </div>
  );

  return (
    <GenericContent
      title="Mantran.Applications - API — Filial"
      content={content}
    />
  );
}

export default MantranApiFilialPage;
