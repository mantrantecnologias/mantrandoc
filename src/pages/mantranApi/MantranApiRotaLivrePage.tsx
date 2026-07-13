import GenericContent from "@shared/components/GenericContent";
import { API_BASE_URL } from "@shared/config/apiConfig";
import TokenNotice from "@shared/components/TokenNotice";
import ApiErrorReference from "@shared/components/ApiErrorReference";

function MantranApiRotaLivrePage() {
  const content = (
    <div className="conteudo-div">

      <TokenNotice />

      <h4>Documentação Técnica — Rota Livre</h4>

      <section id="mantran_api_rota_livre">
        <h3>1. Visão Geral</h3>
        <p>
          Endpoints responsáveis por receber dados de <strong>roteirização</strong> e <strong>ocorrências</strong> enviados
          pela plataforma <strong>Rota Livre</strong> para a Mantran.Applications - API (<code>apps/api</code>, rota <code>api/RotaLivre</code>).
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
              <td><code>/api/RotaLivre/incluir-roteirizacao-rotalivre</code></td>
              <td>Valida e registra um payload de roteirização para processamento posterior</td>
            </tr>
            <tr>
              <td><strong>POST</strong></td>
              <td><code>/api/RotaLivre/incluir-ocorrencia-rotalivre</code></td>
              <td>Valida e registra um payload de ocorrência para processamento posterior</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="rota_livre_arquitetura_processamento">
        <h3>2. Como o Processamento Funciona</h3>
        <p>
          O processamento não é imediato: a API valida a <strong>forma</strong> do payload recebido (campos
          obrigatórios, formatos, tamanhos) e registra o envio para processamento posterior.{" "}
          <strong>Uma resposta 200 significa "recebido para processamento", não "já refletido nos dados de
          viagem/ocorrência".</strong> Quem integra com estes endpoints não deve assumir efeito imediato.
        </p>
      </section>

      <section id="rota_livre_modelo_roteirizacao">
        <h3>3. Modelo de Dados — Roteirização (<code>RotaLivreRoteirizacaoRequest</code>)</h3>
        <p>
          O objeto inteiro aceita campos numéricos enviados também como string entre aspas (ex.: <code>"12.5"</code>
          além de <code>12.5</code>) — o próprio cliente da Rota Livre às vezes envia números entre aspas.
        </p>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>routing_code</td><td>string?</td><td>Código único da roteirização</td></tr>
            <tr><td>route_number</td><td>string? — <strong>obrigatório</strong></td><td>Número da rota</td></tr>
            <tr><td>route_name</td><td>string?</td><td>Nome da rota</td></tr>
            <tr><td>route_date</td><td>string?</td><td>Data da rota — <strong>texto livre, não é data tipada/parseada</strong></td></tr>
            <tr><td>driver_document</td><td>string?</td><td>Documento do motorista</td></tr>
            <tr><td>driver_name</td><td>string?</td><td>Nome do motorista</td></tr>
            <tr><td>license_plate</td><td>string? — <strong>obrigatório</strong></td><td>Placa do veículo</td></tr>
            <tr><td>corporation_code</td><td>string?</td><td>Código da empresa/filial</td></tr>
            <tr><td>station_number</td><td>string?</td><td>Número da estação/base</td></tr>
            <tr><td>estimated_departure_at_date</td><td>string?</td><td>Data prevista de saída — <strong>texto livre, não parseada</strong></td></tr>
            <tr><td>estimated_departure_at_time</td><td>string?</td><td>Hora prevista de saída — <strong>texto livre, não parseada</strong></td></tr>
            <tr><td>routing_km</td><td>decimal</td><td>Quilometragem total da rota</td></tr>
            <tr><td>comments</td><td>string?</td><td>Observações gerais</td></tr>
            <tr><td>routing_services</td><td>array — <strong>obrigatório, não pode ser vazio</strong></td><td>Lista de serviços/paradas da rota</td></tr>
          </tbody>
        </table>

        <p style={{ marginTop: '20px' }}>Cada item de <code>routing_services</code>:</p>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>position</td><td>int</td><td>Posição sequencial na rota</td></tr>
            <tr><td>order_number</td><td>string? — <strong>obrigatório, apenas letras/dígitos</strong></td><td>Número do pedido — validação alfanumérica indica a <code>position</code> do item em caso de falha</td></tr>
            <tr><td>service_id</td><td>string?</td><td>Identificador do serviço</td></tr>
            <tr><td>service_date</td><td>string?</td><td>Data prevista do serviço — <strong>texto livre, não parseada</strong></td></tr>
            <tr><td>sender_document</td><td>string?</td><td>Documento do remetente</td></tr>
            <tr><td>destination_document</td><td>string?</td><td>Documento do destinatário</td></tr>
            <tr><td>lat</td><td>decimal</td><td>Latitude do ponto de entrega (chave JSON <code>"lat"</code>)</td></tr>
            <tr><td>long</td><td>decimal</td><td>Longitude do ponto de entrega (chave JSON <code>"long"</code>)</td></tr>
            <tr><td>rwb_key</td><td>string?</td><td>Chave RWB</td></tr>
            <tr><td>invoice_key</td><td>string[]?</td><td>Lista de chaves de NF-e</td></tr>
            <tr><td>invoice_number</td><td>string[]?</td><td>Lista de números de NF</td></tr>
          </tbody>
        </table>
        <p>
          Falhas de validação retornam <strong>400</strong> com uma mensagem por campo.
        </p>
      </section>

      <section id="rota_livre_modelo_ocorrencia">
        <h3>4. Modelo de Dados — Ocorrência (<code>RotaLivreOcorrenciaRequest</code>)</h3>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>id_event</td><td>string? — <strong>obrigatório</strong></td><td>Identificador do evento</td></tr>
            <tr><td>order_number</td><td>string? — <strong>obrigatório</strong></td><td>Número do pedido</td></tr>
            <tr><td>service_id</td><td>string?</td><td>Identificador do serviço — presente no contrato, mas <strong>não validado</strong> (a pedido da própria Rota Livre)</td></tr>
            <tr><td>invoice_key</td><td>string[]? — <strong>obrigatório, não vazio</strong></td><td>Chaves de NF-e — cada item deve ter exatamente <strong>44 caracteres</strong></td></tr>
            <tr><td>occurrence_code</td><td>string? — <strong>obrigatório</strong></td><td>Código da ocorrência — string numérica, faixa válida <strong>0–213</strong></td></tr>
            <tr><td>occurrence_description</td><td>string? — <strong>obrigatório</strong></td><td>Descrição da ocorrência</td></tr>
            <tr><td>occurrence_date</td><td>string? — <strong>obrigatório</strong></td><td>Data da ocorrência — formato <code>yyyy-MM-dd</code></td></tr>
            <tr><td>occurrence_hour</td><td>string? — <strong>obrigatório</strong></td><td>Hora da ocorrência — formato <code>HH:mm</code></td></tr>
            <tr><td>receiver_name</td><td>string?</td><td>Nome do recebedor</td></tr>
            <tr><td>receiver_document_number</td><td>string?</td><td>Documento do recebedor</td></tr>
            <tr><td>draft_rwb_number</td><td>string?</td><td>Número da minuta/RWB</td></tr>
            <tr><td>rwb_number</td><td>string?</td><td>Número do RWB — presente, mas <strong>não validado</strong></td></tr>
            <tr><td>rwb_key</td><td>string?</td><td>Chave do RWB — presente, mas <strong>não validada</strong></td></tr>
            <tr><td>delivery_prediction_date</td><td>string?</td><td>Data prevista de entrega</td></tr>
            <tr><td>vehicle_license_plate</td><td>string?</td><td>Placa do veículo</td></tr>
            <tr><td>route</td><td>string?</td><td>Identificador da rota</td></tr>
            <tr><td>returned_items</td><td>array?</td><td>Itens devolvidos — presente no contrato, mas <strong>não validado</strong></td></tr>
            <tr><td>pod_image</td><td>array?</td><td>Lista de imagens de comprovante (POD)</td></tr>
          </tbody>
        </table>

        <p style={{ marginTop: '20px' }}>Cada item de <code>returned_items</code> (não validado):</p>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>invoice</td><td>string?</td><td>Identificador da nota fiscal</td></tr>
            <tr><td>product</td><td>string?</td><td>Identificador do produto</td></tr>
            <tr><td>quantity</td><td>string?</td><td>Quantidade devolvida</td></tr>
          </tbody>
        </table>

        <p style={{ marginTop: '20px' }}>Cada item de <code>pod_image</code>:</p>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>image_link</td><td>string?</td><td>URL da imagem de comprovante de entrega</td></tr>
          </tbody>
        </table>
        <p>
          Falhas de validação retornam <strong>400</strong> com uma mensagem por campo — apenas os campos marcados
          como obrigatórios/com formato acima são de fato verificados.
        </p>
      </section>

      <section id="rota_livre_endpoint_roteirizacao">
        <h3>5. Incluir Roteirização</h3>
        <p>Valida e registra os dados de uma roteirização enviada pela Rota Livre para processamento posterior (ver seção 4).</p>

        <h4>Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/RotaLivre/incluir-roteirizacao-rotalivre
Authorization: Bearer <token>
Content-Type: application/json

{
  "routing_code": "ROT-2025-001",
  "route_number": "R001",
  "route_name": "Rota Centro SP",
  "route_date": "27/05/2025",
  "driver_document": "12345678900",
  "driver_name": "João Silva",
  "license_plate": "ABC1D23",
  "corporation_code": "001",
  "station_number": "01",
  "estimated_departure_at_date": "27/05/2025",
  "estimated_departure_at_time": "06:30",
  "routing_km": "150.5",
  "comments": "Rota prioritária",
  "routing_services": [
    {
      "position": 1,
      "order_number": "PED001",
      "service_id": "SRV-001",
      "service_date": "27/05/2025",
      "sender_document": "12345678000199",
      "destination_document": "98765432000100",
      "lat": -23.5505,
      "long": -46.6333,
      "rwb_key": "RWB-001",
      "invoice_key": ["NFe35250512345678000199550010000001231234567890"],
      "invoice_number": ["123"]
    }
  ]
}`}</pre>

        <h4>Resposta de Sucesso (200)</h4>
        <pre className="code-block">{`"Roteirização incluída com sucesso."`}</pre>
        <p>Resposta bare — uma string simples, sem envelope JSON.</p>
      </section>

      <section id="rota_livre_endpoint_ocorrencia">
        <h3>6. Incluir Ocorrência</h3>
        <p>Valida e registra dados de ocorrência/evento de entrega enviados pela Rota Livre para processamento posterior (ver seção 4).</p>

        <h4>Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/RotaLivre/incluir-ocorrencia-rotalivre
Authorization: Bearer <token>
Content-Type: application/json

{
  "id_event": "EVT-001",
  "order_number": "PED001",
  "service_id": "SRV-001",
  "invoice_key": ["NFe35250512345678000199550010000001231234567890"],
  "occurrence_code": "1",
  "occurrence_description": "Entrega realizada",
  "occurrence_date": "2025-05-27",
  "occurrence_hour": "10:25",
  "receiver_name": "Maria Souza",
  "receiver_document_number": "98765432100",
  "draft_rwb_number": "MIN-001",
  "rwb_number": "RWB-001",
  "rwb_key": "RWB-KEY-001",
  "delivery_prediction_date": "2025-05-27",
  "vehicle_license_plate": "ABC1D23",
  "route": "R001",
  "returned_items": [
    { "invoice": "123", "product": "PROD-01", "quantity": "1" }
  ],
  "pod_image": [
    { "image_link": "https://storage.rotalivre.com.br/pod/img001.jpg" }
  ]
}`}</pre>

        <h4>Resposta de Sucesso (200)</h4>
        <pre className="code-block">{`"Ocorrência incluída com sucesso."`}</pre>
        <p>Resposta bare — uma string simples, sem envelope JSON.</p>
      </section>

      <p>
        Se receber <strong>403</strong> mesmo com um token válido, entre em contato com o suporte Mantran
        para confirmar a liberação de acesso a esta integração.
      </p>

      <ApiErrorReference />

    </div>
  );

  return <GenericContent title="Mantran.Applications - API — Rota Livre" content={content} />;
}

export default MantranApiRotaLivrePage;
