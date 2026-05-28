import React, { useEffect } from 'react';
import GenericContent from '../GenericContent';
import { API_BASE_URL } from '../../config/apiConfig';

const MantranAPI_RotaLivre = ({ scrollToSection, onNavigateToGerarToken }) => {

  useEffect(() => {
    if (scrollToSection) {
      const el = document.getElementById(scrollToSection);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    }
  }, [scrollToSection]);

  const content = (
    <div className="conteudo-div">

      <div style={{
        background: '#fef9c3', border: '1px solid #fbbf24', borderRadius: '8px',
        padding: '14px 18px', marginBottom: '24px', display: 'flex', alignItems: 'center',
        gap: '10px', fontSize: '0.92rem', color: '#78350f'
      }}>
        <span style={{ fontSize: '1.1rem' }}>⚠</span>
        <span>
          Para acessar os endpoints desta documentação é necessário um token de acesso.{' '}
          <button onClick={onNavigateToGerarToken} style={{
            background: 'none', border: 'none', padding: 0, color: '#b91c1c',
            fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', fontSize: 'inherit'
          }}>
            Clique aqui para ver como gerar o token
          </button>.
        </span>
      </div>

      <h4>Documentação Técnica — Rota Livre</h4>

      <section id="mantran_api_rota_livre">
        <h3>1. Visão Geral</h3>
        <p>
          Endpoints responsáveis por receber dados de <strong>roteirização</strong> e <strong>ocorrências</strong> enviados
          pela plataforma <strong>Rota Livre</strong> para o TMS Mantran.
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
              <td>/api/RotaLivre/incluir-roteirizacao-rotalivre</td>
              <td>Recebe e persiste dados de roteirização</td>
            </tr>
            <tr>
              <td><strong>POST</strong></td>
              <td>/api/RotaLivre/incluir-ocorrencia-rotalivre</td>
              <td>Recebe e persiste ocorrências de entrega</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="rota_livre_modelo_roteirizacao">
        <h3>2. Modelo de Dados — Roteirização</h3>
        <p>Corpo da requisição do endpoint de roteirização (<code>RoutingRequest</code>):</p>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>routing_code</td><td>string</td><td>Código único da roteirização</td></tr>
            <tr><td>route_number</td><td>string</td><td>Número da rota</td></tr>
            <tr><td>route_name</td><td>string</td><td>Nome da rota</td></tr>
            <tr><td>route_date</td><td>DateTime</td><td>Data da rota</td></tr>
            <tr><td>driver_document</td><td>string</td><td>CPF do motorista</td></tr>
            <tr><td>driver_name</td><td>string</td><td>Nome do motorista</td></tr>
            <tr><td>license_plate</td><td>string</td><td>Placa do veículo</td></tr>
            <tr><td>corporation_code</td><td>string</td><td>Código da empresa/filial</td></tr>
            <tr><td>station_number</td><td>string</td><td>Número da estação/base</td></tr>
            <tr><td>estimated_departure_at_date</td><td>DateTime</td><td>Data prevista de saída</td></tr>
            <tr><td>estimated_departure_at_time</td><td>TimeSpan</td><td>Hora prevista de saída (hh:mm:ss)</td></tr>
            <tr><td>routing_km</td><td>decimal</td><td>Quilometragem total da rota</td></tr>
            <tr><td>comments</td><td>string</td><td>Observações gerais</td></tr>
            <tr><td>routing_services</td><td>List&lt;RoutingService&gt;</td><td>Lista de serviços/paradas da rota</td></tr>
          </tbody>
        </table>

        <p style={{ marginTop: '20px' }}>Objeto <code>RoutingService</code> (cada item de <code>routing_services</code>):</p>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>position</td><td>int</td><td>Posição sequencial na rota</td></tr>
            <tr><td>order_number</td><td>string</td><td>Número do pedido</td></tr>
            <tr><td>service_id</td><td>string</td><td>Identificador do serviço</td></tr>
            <tr><td>service_date</td><td>DateTime</td><td>Data prevista do serviço</td></tr>
            <tr><td>sender_document</td><td>string</td><td>CNPJ/CPF do remetente</td></tr>
            <tr><td>destination_document</td><td>string</td><td>CNPJ/CPF do destinatário</td></tr>
            <tr><td>lat</td><td>decimal</td><td>Latitude do ponto de entrega</td></tr>
            <tr><td>long</td><td>decimal</td><td>Longitude do ponto de entrega</td></tr>
            <tr><td>rwb_key</td><td>string</td><td>Chave RWB</td></tr>
            <tr><td>invoice_key</td><td>List&lt;string&gt;</td><td>Lista de chaves de NF-e</td></tr>
            <tr><td>invoice_number</td><td>List&lt;string&gt;</td><td>Lista de números de NF</td></tr>
          </tbody>
        </table>
      </section>

      <section id="rota_livre_modelo_ocorrencia">
        <h3>3. Modelo de Dados — Ocorrência</h3>
        <p>Corpo da requisição do endpoint de ocorrência (<code>OcorrenciaRequest</code>):</p>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>id_status</td><td>long</td><td>ID do status da ocorrência</td></tr>
            <tr><td>order_number</td><td>int</td><td>Número do pedido</td></tr>
            <tr><td>service_id</td><td>int</td><td>ID do serviço</td></tr>
            <tr><td>service_type</td><td>string</td><td>Tipo do serviço (ex: ENTREGA)</td></tr>
            <tr><td>created_at</td><td>DateTime</td><td>Data/hora de criação do registro</td></tr>
            <tr><td>receiver</td><td>string</td><td>Nome do recebedor</td></tr>
            <tr><td>document_number</td><td>string</td><td>Documento do recebedor (CPF/RG)</td></tr>
            <tr><td>comments</td><td>string</td><td>Observações</td></tr>
            <tr><td>occurrence_at</td><td>DateTime</td><td>Data/hora da ocorrência</td></tr>
            <tr><td>invoice_key</td><td>string</td><td>Chave de NF-e</td></tr>
            <tr><td>invoice_number</td><td>string</td><td>Número da NF</td></tr>
            <tr><td>cte_key</td><td>string</td><td>Chave do CT-e</td></tr>
            <tr><td>cte_number</td><td>int</td><td>Número do CT-e</td></tr>
            <tr><td>draft_number</td><td>string</td><td>Número da minuta/romaneio</td></tr>
            <tr><td>occurrence_code</td><td>int</td><td>Código da ocorrência</td></tr>
            <tr><td>trigger</td><td>string</td><td>Gatilho que originou a ocorrência</td></tr>
            <tr><td>description</td><td>string</td><td>Descrição da ocorrência</td></tr>
            <tr><td>vehicle_license_plate</td><td>string</td><td>Placa do veículo</td></tr>
            <tr><td>service_date</td><td>DateTime</td><td>Data do serviço</td></tr>
            <tr><td>latitude</td><td>decimal</td><td>Latitude do evento</td></tr>
            <tr><td>longitude</td><td>decimal</td><td>Longitude do evento</td></tr>
            <tr><td>temperture</td><td>decimal</td><td>Temperatura registrada no momento</td></tr>
            <tr><td>route</td><td>string</td><td>Identificador da rota</td></tr>
            <tr><td>id_company</td><td>int</td><td>ID da empresa</td></tr>
            <tr><td>station_number</td><td>int</td><td>Número da estação/base</td></tr>
            <tr><td>pod_image</td><td>List&lt;PodImage&gt;</td><td>Lista de imagens de comprovante (POD)</td></tr>
          </tbody>
        </table>

        <p style={{ marginTop: '20px' }}>Objeto <code>PodImage</code>:</p>
        <table className="data-table">
          <thead>
            <tr><th>Campo JSON</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>image_link</td><td>string</td><td>URL da imagem de comprovante de entrega</td></tr>
          </tbody>
        </table>
      </section>

      <section id="rota_livre_endpoint_roteirizacao">
        <h3>4. Incluir Roteirização</h3>
        <p>Recebe e persiste os dados de uma roteirização enviada pela Rota Livre.</p>

        <h4>Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/RotaLivre/incluir-roteirizacao-rotalivre
Authorization: Bearer <token>
Content-Type: application/json

{
  "routing_code": "ROT-2025-001",
  "route_number": "R001",
  "route_name": "Rota Centro SP",
  "route_date": "2025-05-27T00:00:00",
  "driver_document": "12345678900",
  "driver_name": "João Silva",
  "license_plate": "ABC1D23",
  "corporation_code": "001",
  "station_number": "01",
  "estimated_departure_at_date": "2025-05-27T00:00:00",
  "estimated_departure_at_time": "06:30:00",
  "routing_km": 150.5,
  "comments": "Rota prioritária",
  "routing_services": [
    {
      "position": 1,
      "order_number": "PED-001",
      "service_id": "SRV-001",
      "service_date": "2025-05-27T00:00:00",
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
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": ["Roteirização incluída com sucesso"],
  "data": null,
  "codigo": 200
}`}</pre>

        <h4>Respostas de Erro</h4>
        <table className="data-table">
          <thead>
            <tr><th>Status</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>401</td><td>Token ausente ou inválido</td></tr>
            <tr><td>403</td><td>Sem permissão de acesso</td></tr>
            <tr><td>500</td><td>Erro ao incluir roteirização</td></tr>
          </tbody>
        </table>
      </section>

      <section id="rota_livre_endpoint_ocorrencia">
        <h3>5. Incluir Ocorrência</h3>
        <p>Recebe e persiste dados de ocorrência/evento de entrega enviados pela Rota Livre.</p>

        <h4>Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/RotaLivre/incluir-ocorrencia-rotalivre
Authorization: Bearer <token>
Content-Type: application/json

{
  "id_status": 1001,
  "order_number": 12345,
  "service_id": 9876,
  "service_type": "ENTREGA",
  "created_at": "2025-05-27T10:30:00",
  "receiver": "Maria Souza",
  "document_number": "98765432100",
  "comments": "Entrega realizada no portão",
  "occurrence_at": "2025-05-27T10:25:00",
  "invoice_key": "NFe35250512345678000199550010000001231234567890",
  "invoice_number": "123",
  "cte_key": "CTe35250512345678000199570010000000121234567890",
  "cte_number": 121,
  "draft_number": "MIN-001",
  "occurrence_code": 1,
  "trigger": "ENTREGA_REALIZADA",
  "description": "Entrega confirmada pelo destinatário",
  "vehicle_license_plate": "ABC1D23",
  "service_date": "2025-05-27T00:00:00",
  "latitude": -23.5505,
  "longitude": -46.6333,
  "temperture": 0,
  "route": "R001",
  "id_company": 1,
  "station_number": 1,
  "pod_image": [
    { "image_link": "https://storage.rotalivre.com.br/pod/img001.jpg" }
  ]
}`}</pre>

        <h4>Resposta de Sucesso (200)</h4>
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": ["Ocorrência incluída com sucesso"],
  "data": null,
  "codigo": 200
}`}</pre>

        <h4>Respostas de Erro</h4>
        <table className="data-table">
          <thead>
            <tr><th>Status</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td>401</td><td>Token ausente ou inválido</td></tr>
            <tr><td>403</td><td>Sem permissão de acesso</td></tr>
            <tr><td>500</td><td>Erro ao incluir ocorrência</td></tr>
          </tbody>
        </table>
      </section>

    </div>
  );

  return <GenericContent title="Mantran.API — Rota Livre" content={content} />;
};

export default MantranAPI_RotaLivre;
