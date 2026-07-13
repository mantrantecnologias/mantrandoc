import GenericContent from "@shared/components/GenericContent";
import { API_BASE_URL } from "@shared/config/apiConfig";
import TokenNotice from "@shared/components/TokenNotice";

function MantranApiDafitiPage() {
  const content = (
    <div className="conteudo-div">

      <TokenNotice />

      <h4>Documentação Técnica — Dafiti</h4>

      <section id="mantran_api_dafiti">
        <h3>1. Visão Geral</h3>
        <p>
          Endpoint responsável por receber os <strong>disparos de pedidos (remessas)</strong> enviados pela
          integração <strong>Dafiti</strong> para a Mantran.Applications - API (<code>apps/api</code>, rota{" "}
          <code>api/Dafiti</code>). Cada requisição pode conter uma ou mais entregas, processadas
          individualmente — o sucesso ou falha de uma entrega não afeta as demais do mesmo disparo.
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
              <td><strong>POST</strong></td>
              <td><code>/api/Dafiti/receber-pedido</code></td>
              <td>Valida, converte e inclui as notas fiscais EDI de um disparo de remessas Dafiti</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="dafiti_como_funciona">
        <h3>2. Como Funciona</h3>
        <p>
          Este endpoint responde <strong>sempre no formato do parceiro</strong> (bloco <code>RESPOSTA</code>),
          nunca no envelope padrão da API (<code>ApiErrorResponse</code>). Isso vale inclusive para corpo JSON
          malformado ou vazio — nenhuma exceção de processamento chega ao tratamento global de erros da API.
        </p>
        <p>
          O corpo é desserializado manualmente (não usa <code>[FromBody]</code>), justamente para que esses
          casos sejam tratados aqui, no formato esperado pelo parceiro, em vez de disparar a validação
          automática de model state da API.
        </p>
        <p>
          <strong>401/403 continuam padrão da API</strong> — a checagem de autenticação/role acontece antes do
          corpo do endpoint (pipeline JWT), então token ausente/inválido ou sem permissão retornam o formato
          padrão de erro da API, não o formato do parceiro.
        </p>
      </section>

      <section id="dafiti_modelo_requisicao">
        <h3>3. Modelo de Dados — Requisição</h3>
        <p>
          O payload usa chaves em <strong>UPPER_SNAKE_CASE</strong> (contrato definido pelo parceiro, não segue
          o padrão camelCase da API). Estrutura de alto nível:
        </p>
        <table className="data-table">
          <thead>
            <tr><th>Bloco</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td><code>DISPARO</code></td><td>objeto</td><td>Metadados do lote/disparo</td></tr>
            <tr><td><code>REMETENTE</code></td><td>objeto</td><td>Dados do remetente da carga</td></tr>
            <tr><td><code>TRANSPORTADORA</code></td><td>objeto</td><td>Dados da transportadora (Mantran)</td></tr>
            <tr><td><code>ENTREGA</code></td><td>array</td><td>Lista de entregas (remessas) do disparo — <strong>obrigatório, não pode ser vazio</strong></td></tr>
          </tbody>
        </table>

        <h4>DISPARO</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>DATA</td><td>Data do disparo — <strong>obrigatório</strong></td></tr>
            <tr><td>HORA</td><td>Hora do disparo — <strong>obrigatório</strong></td></tr>
            <tr><td>CARGA</td><td>Identificador da carga — <strong>obrigatório</strong>, ecoado na resposta</td></tr>
            <tr><td>QUANTIDADE_REMESSAS</td><td>Quantidade de remessas do disparo</td></tr>
          </tbody>
        </table>

        <h4>REMETENTE</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>RAZAO_SOCIAL</td><td>Razão social — <strong>obrigatório</strong></td></tr>
            <tr><td>CNPJ</td><td>CNPJ — <strong>obrigatório</strong></td></tr>
            <tr><td>INSCRICAO_ESTADUAL</td><td>Inscrição estadual</td></tr>
            <tr><td>ENDERECO / NUMERO / BAIRRO / CIDADE / UF / CEP</td><td>Endereço do remetente</td></tr>
            <tr><td>DATA_EMBARQUE</td><td>Data de embarque da carga</td></tr>
          </tbody>
        </table>

        <h4>TRANSPORTADORA</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>RAZAO_SOCIAL</td><td>Razão social — <strong>obrigatório</strong></td></tr>
            <tr><td>CNPJ</td><td>CNPJ — <strong>obrigatório</strong></td></tr>
          </tbody>
        </table>
      </section>

      <section id="dafiti_modelo_entrega">
        <h3>4. Modelo de Dados — ENTREGA</h3>
        <p>Cada item da lista <code>ENTREGA</code> representa uma remessa a ser convertida em nota fiscal EDI:</p>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>PEDIDO</td><td>Número do pedido — <strong>obrigatório</strong></td></tr>
            <tr><td>REMESSA</td><td>Número da remessa — <strong>obrigatório</strong>, chave usada no retorno</td></tr>
            <tr><td>LOJA</td><td>Código da loja de origem (marketplace) — <strong>obrigatório</strong>, usado para resolver a divisão (ver seção 6)</td></tr>
            <tr><td>PERIODO_ENTREGA / DATA_ENTREGA / HORA_ENTREGA</td><td>Janela prevista de entrega</td></tr>
            <tr><td>NATUREZA_NF / TIPO_ENTREGA / TIPO_CONTRATO / INDICADOR / CANAL_DE_VENDA / ORIGEM</td><td>Metadados fiscais/comerciais da entrega</td></tr>
            <tr><td>ALIQUOTA_ICMS / BASE_CALCULO_ICMS / CFOP_NF</td><td>Dados tributários da entrega</td></tr>
            <tr><td>CHAVE_DANFE</td><td>Chave da DANFE da entrega</td></tr>
            <tr><td>MERCADORIAS</td><td>Lista de mercadorias — aceita objeto único ou array</td></tr>
            <tr><td>VOLUMES_NF</td><td>Lista de volumes físicos — aceita objeto único ou array</td></tr>
            <tr><td>DESTINATARIO</td><td>Objeto — destinatário final da entrega</td></tr>
            <tr><td>ORIGEM_MARKET_PLACE</td><td>Lista de origens Milk Run — aceita objeto único ou array (ver seção 6)</td></tr>
            <tr><td>DADOS_DANFE</td><td>Objeto — dados fiscais/financeiros da DANFE</td></tr>
          </tbody>
        </table>

        <h4>DESTINATARIO</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>RAZAO_SOCIAL</td><td>Razão social — <strong>obrigatório</strong></td></tr>
            <tr><td>CPF_CNPJ</td><td>CPF ou CNPJ do destinatário</td></tr>
            <tr><td>INSCRICAO_ESTADUAL</td><td>Inscrição estadual</td></tr>
            <tr><td>ENDERECO</td><td>Endereço — <strong>obrigatório</strong></td></tr>
            <tr><td>NUMERO / COMPLEMENTO / BAIRRO</td><td>Complementos de endereço</td></tr>
            <tr><td>CIDADE</td><td>Cidade — <strong>obrigatório</strong></td></tr>
            <tr><td>CODIGO_MUNICIPIO</td><td>Código IBGE do município</td></tr>
            <tr><td>UF</td><td>UF — <strong>obrigatório</strong></td></tr>
            <tr><td>CEP</td><td>CEP — <strong>obrigatório</strong></td></tr>
            <tr><td>TELEFONE_1 / TELEFONE_2 / EMAIL</td><td>Contato do destinatário</td></tr>
            <tr><td>CONTRIBUINTE / PAIS</td><td>Indicador de contribuinte e país</td></tr>
          </tbody>
        </table>

        <h4>MERCADORIAS (cada item)</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>VOLUME</td><td>Identificação do volume</td></tr>
            <tr><td>ACONDICIONAMENTO</td><td>Tipo de acondicionamento</td></tr>
            <tr><td>MERCADORIA</td><td>Descrição da mercadoria</td></tr>
          </tbody>
        </table>

        <h4>VOLUMES_NF (cada item)</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>PESO / PESO_AFERIDO / PESO_CUBADO</td><td>Pesos declarado, aferido na coleta e cubado</td></tr>
            <tr><td>COMPRIMENTO / LARGURA / ALTURA</td><td>Dimensões do volume — usadas para calcular a cubagem</td></tr>
            <tr><td>AWB</td><td>Número de rastreamento do volume</td></tr>
          </tbody>
        </table>

        <h4>DADOS_DANFE</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>SERIE / NUMERO</td><td>Série e número da nota fiscal — se <code>NUMERO</code> vier vazio, a entrega é <strong>ignorada</strong> (ver seção 7)</td></tr>
            <tr><td>DATA_DE_EMISSAO</td><td>Data de emissão da nota fiscal</td></tr>
            <tr><td>MEIO_DE_TRANSPORTE / CONDICAO_DE_FRETE</td><td>Meio de transporte e condição de frete (CIF/FOB)</td></tr>
            <tr><td>NATUREZA_MERCADORIA / QUANTIDADE_VOLUMES / PESO_TOTAL / PESO_CUBAGEM</td><td>Dados gerais da carga</td></tr>
            <tr><td>VALOR_MERCADORIA / VALOR_TOTAL_FRETE / VALOR_FRETE_PESO_VOLUME / VALOR_ADVALOREM / VALOR_TOTAL_TAXAS</td><td>Valores financeiros do frete</td></tr>
            <tr><td>INCIDENCIA_ICMS / VALOR_ICMS / VALOR_ICMS_RETIDO_SUBST</td><td>Dados de ICMS, incluindo substituição tributária</td></tr>
            <tr><td>SEGURO_EFETUADO / VALOR_SEGURO / VALOR_COBRADO</td><td>Dados de seguro e valor cobrado</td></tr>
            <tr><td>PLACA / PLANO_CARGA_RAPIDA / BONIFICACAO</td><td>Placa do veículo, indicador de carga rápida e de bonificação</td></tr>
          </tbody>
        </table>
      </section>

      <section id="dafiti_modelo_resposta">
        <h3>5. Modelo de Dados — Resposta</h3>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>RESPOSTA.CARGA</td><td>Ecoa o identificador da carga informado no <code>DISPARO</code></td></tr>
            <tr><td>RESPOSTA.RETORNO</td><td>Lista com um item por remessa efetivamente processada</td></tr>
            <tr><td>RETORNO[].PROTOCOLO</td><td>Protocolo do processamento — mesmo valor para todas as remessas do mesmo disparo</td></tr>
            <tr><td>RETORNO[].REMESSA</td><td>Número da remessa a que este retorno se refere</td></tr>
            <tr><td>RETORNO[].CODIGO</td><td>Código do resultado — ver tabela abaixo</td></tr>
            <tr><td>RETORNO[].MENSAGEM</td><td>Mensagem descritiva do resultado</td></tr>
          </tbody>
        </table>

        <h4>Códigos de Retorno</h4>
        <table className="data-table">
          <thead>
            <tr><th>Código</th><th>Significado</th></tr>
          </thead>
          <tbody>
            <tr><td><code>700</code></td><td>Remessa processada com sucesso</td></tr>
            <tr><td><code>701</code></td><td>Erro ao processar aquela remessa especificamente (ex.: campo obrigatório da nota ausente, remessa já cadastrada, erro inesperado durante o processamento)</td></tr>
            <tr><td><code>705</code></td><td>Erro de validação do payload — corpo JSON malformado/vazio ou estrutura obrigatória ausente (ver seção 7)</td></tr>
            <tr><td><code>999</code></td><td>Erro interno não esperado</td></tr>
          </tbody>
        </table>
      </section>

      <section id="dafiti_validacoes">
        <h3>6. Validações do Payload (código 705)</h3>
        <p>
          Antes de processar qualquer entrega, a estrutura mínima do disparo é validada. A <strong>primeira</strong> falha
          encontrada interrompe a validação e é devolvida com código <code>705</code> — não há acúmulo de múltiplas
          mensagens de validação numa mesma resposta:
        </p>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Regra</th></tr>
          </thead>
          <tbody>
            <tr><td>Corpo da requisição</td><td>Deve ser um JSON válido e não vazio</td></tr>
            <tr><td>DISPARO</td><td>Bloco obrigatório, com CARGA, DATA e HORA preenchidos</td></tr>
            <tr><td>REMETENTE</td><td>Bloco obrigatório, com RAZAO_SOCIAL e CNPJ preenchidos</td></tr>
            <tr><td>TRANSPORTADORA</td><td>Bloco obrigatório, com RAZAO_SOCIAL e CNPJ preenchidos</td></tr>
            <tr><td>ENTREGA</td><td>Lista obrigatória, não pode ser vazia</td></tr>
            <tr><td>Cada item de ENTREGA</td><td>PEDIDO, REMESSA e LOJA preenchidos; bloco DESTINATARIO obrigatório com RAZAO_SOCIAL, ENDERECO, CIDADE, UF e CEP preenchidos</td></tr>
          </tbody>
        </table>
      </section>

      <section id="dafiti_comportamentos">
        <h3>7. Comportamentos Especiais</h3>
        <ul>
          <li>
            <strong>Entrega sem número de DANFE é ignorada silenciosamente.</strong> Se <code>DADOS_DANFE.NUMERO</code> vier
            vazio, aquela entrega não gera nota fiscal EDI e <strong>não aparece</strong> na lista <code>RETORNO</code> da
            resposta — não é tratada como erro.
          </li>
          <li>
            <strong>Remessa duplicada retorna código 701.</strong> Se já existir uma nota fiscal EDI com a mesma
            combinação de empresa/filial/CNPJ do remetente/número/série de NF, a remessa não é gravada novamente e o
            retorno traz a mensagem "Remessa já cadastrada".
          </li>
          <li>
            <strong>Milk Run (<code>ORIGEM_MARKET_PLACE</code>).</strong> Origens com <code>TIPO_ESTOQUE = "F"</code>{" "}
            (fulfillment, processado no Milk Run) geram uma nota fiscal EDI adicional por origem, antes da nota da
            própria entrega — usando a chave da DANFE/CT-e da origem em vez da entrega.
          </li>
          <li>
            <strong>Autocadastro de clientes.</strong> Remetente e destinatário são cadastrados automaticamente em{" "}
            <code>ST_Cliente</code> quando ainda não existem — primeiro com os dados do próprio payload Dafiti; se
            mesmo assim o cliente não existir, é feita uma tentativa de busca no Hub do Desenvolvedor por CNPJ (só
            cadastra se o Hub encontrar o CNPJ).
          </li>
          <li>
            <strong>Protocolo.</strong> Gerado no formato <code>TRANSPABC</code> + timestamp (<code>ddMMyyHHmmss</code>) —
            o mesmo protocolo é usado para todas as remessas de um mesmo disparo.
          </li>
          <li>
            <strong>Empresa e filial fixas.</strong> Todas as notas fiscais EDI geradas por esta integração usam código
            de empresa e filial fixos, independente do tenant — paridade com o comportamento da integração legada.
          </li>
        </ul>
      </section>

      <section id="dafiti_endpoint_receber_pedido">
        <h3>8. Receber Pedido</h3>
        <p>Recebe um disparo de remessas e inclui as notas fiscais EDI correspondentes.</p>

        <h4>Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/Dafiti/receber-pedido
Authorization: Bearer <token>
Content-Type: application/json

{
  "DISPARO": {
    "DATA": "2026-07-13",
    "HORA": "14:30",
    "CARGA": "CARGA-001",
    "QUANTIDADE_REMESSAS": "1"
  },
  "REMETENTE": {
    "RAZAO_SOCIAL": "Dafiti Comercio de Roupas Ltda",
    "CNPJ": "12345678000199",
    "ENDERECO": "Rua Exemplo",
    "NUMERO": "100",
    "BAIRRO": "Centro",
    "CIDADE": "Sao Paulo",
    "CEP": "01000-000",
    "UF": "SP"
  },
  "TRANSPORTADORA": {
    "RAZAO_SOCIAL": "Mantran Transportes",
    "CNPJ": "98765432000100"
  },
  "ENTREGA": [
    {
      "PEDIDO": "PED-001",
      "REMESSA": "REM-001",
      "LOJA": "Loja Dafiti SP",
      "DATA_ENTREGA": "2026-07-15",
      "DESTINATARIO": {
        "RAZAO_SOCIAL": "Cliente Final",
        "CPF_CNPJ": "12345678900",
        "ENDERECO": "Rua Destino",
        "NUMERO": "200",
        "BAIRRO": "Jardim",
        "CIDADE": "Campinas",
        "UF": "SP",
        "CEP": "13000-000"
      },
      "VOLUMES_NF": [
        { "PESO": "2.5", "COMPRIMENTO": "30", "LARGURA": "20", "ALTURA": "10", "AWB": "AWB-001" }
      ],
      "DADOS_DANFE": {
        "SERIE": "1",
        "NUMERO": "123456",
        "DATA_DE_EMISSAO": "2026-07-13",
        "QUANTIDADE_VOLUMES": "1",
        "VALOR_MERCADORIA": "150.00",
        "VALOR_TOTAL_FRETE": "25.00",
        "CONDICAO_DE_FRETE": "F"
      }
    }
  ]
}`}</pre>

        <h4>Resposta de Sucesso (200)</h4>
        <pre className="code-block">{`{
  "RESPOSTA": {
    "CARGA": "CARGA-001",
    "RETORNO": [
      {
        "PROTOCOLO": "TRANSPABC130726143015",
        "REMESSA": "REM-001",
        "CODIGO": "700",
        "MENSAGEM": "Remessa processada com sucesso"
      }
    ]
  }
}`}</pre>

        <h4>Resposta de Erro de Validação (400, código 705)</h4>
        <pre className="code-block">{`{
  "RESPOSTA": {
    "CARGA": "CARGA-001",
    "RETORNO": [
      {
        "PROTOCOLO": "TRANSPABC130726143015",
        "REMESSA": "REM-001",
        "CODIGO": "705",
        "MENSAGEM": "Informe o CEP do destinatário."
      }
    ]
  }
}`}</pre>

        <h4>Respostas de Erro</h4>
        <table className="data-table">
          <thead>
            <tr><th>Status</th><th>Causa</th><th>Formato</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>400</code></td>
              <td>JSON malformado/vazio, ou estrutura obrigatória ausente (código <code>705</code>)</td>
              <td>Formato do parceiro — <code>RESPOSTA</code></td>
            </tr>
            <tr>
              <td><code>401</code></td>
              <td>Token ausente, inválido ou expirado</td>
              <td>Padrão da API</td>
            </tr>
            <tr>
              <td><code>403</code></td>
              <td>Sem permissão de acesso a esta integração</td>
              <td>Padrão da API</td>
            </tr>
            <tr>
              <td><code>500</code></td>
              <td>Erro interno não esperado (código <code>999</code>)</td>
              <td>Formato do parceiro — <code>RESPOSTA</code></td>
            </tr>
          </tbody>
        </table>
      </section>

      <p>
        Se receber <strong>403</strong> mesmo com um token válido, entre em contato com o suporte Mantran para
        confirmar a liberação de acesso a esta integração.
      </p>

    </div>
  );

  return <GenericContent title="Mantran.Applications - API — Dafiti" content={content} />;
}

export default MantranApiDafitiPage;
