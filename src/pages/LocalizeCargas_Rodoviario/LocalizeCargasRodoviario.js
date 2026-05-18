import React from "react";
import GenericContent from "../GenericContent";

const LocalizeCargasRodoviario = () => {
  const content = (
    <div className="conteudo-div">
      <h4>API – Localize Cargas (Rodoviário)</h4>
      {
        //     <h3>Sumário</h3>
        //    <ol>
        //     <li><strong>Objetivo</strong></li>
        //     <li><strong>Endpoint</strong></li>
        //    <li><strong>Request</strong></li>
        //    <li><strong>Response – Sucesso</strong></li>
        //    <li><strong>Response – Erro</strong></li>
        //    <li><strong>Observações Importantes</strong></li>
        //    <li><strong>Conclusão</strong></li>
        //  </ol>
      }
      {/* 1. OBJETIVO */}
      <section id="section_localize_cargas">
        <h3>1. Objetivo</h3>
        <p>
          Esta API permite consultar informações de localização, status e
          ocorrências relacionadas a um CT-e utilizando a chave do documento.
        </p>
        <p>
          O serviço retorna dados de remetente, destinatário, ocorrências e a
          descrição final da entrega.
        </p>
      </section>

      {/* 2. ENDPOINT */}
      <section id="endpoint">
        <h3>2. Endpoint</h3>

        <p><strong>GET:</strong></p>
        <pre>
          {`http://w2022-0691.emartim.com.br:35399/CTE/LocalizeCargas`}
        </pre>
      </section>

      {/* 3. REQUEST */}
      <section id="request">
        <h3>3. Request</h3>

        <p><strong>Exemplo de Request (JSON):</strong></p>

        <pre>
          {`{
  "usuario": "API-teste",
  "senha": "teste123",
  "cnpj": "06.369.673/0004-42",
  "nr_chave": "35250406369673000442550010001912581241148616"
}`}
        </pre>

        <p><strong>Parâmetros:</strong></p>
        <ul>
          <li><code>usuario</code> – Usuário fixo da integração</li>
          <li><code>senha</code> – Senha fixa da integração</li>
          <li><code>cnpj</code> – CNPJ do emissor da NF</li>
          <li><code>nr_chave</code> – Chave completa do CT-e</li>
        </ul>
      </section>

      {/* 4. RESPONSE SUCESSO */}
      <section id="response_sucesso">
        <h3>4. Response – Sucesso</h3>

        <pre>
          {`{
  "success": true,
  "message": "",
  "remetente": "06369673000442 L. A. V. DRESSLER & CIA LTDA",
  "destinatario": "08369119000148 MULTI POLI INDUSTRIA E COMERCIO",
  "lstOcorrencias": [
    {
      "tipo_ocorrencia": "Data Armazem",
      "data_hora_ocorrencia": "30/04/2025 23:28:20"
    },
    {
      "tipo_ocorrencia": "Data Embarque",
      "data_hora_ocorrencia": "05/05/2025 14:09:28"
    },
    {
      "tipo_ocorrencia": "Data Início Trânsito",
      "data_hora_ocorrencia": "05/05/2025 14:10:00"
    },
    {
      "tipo_ocorrencia": "Data Chegada Cliente",
      "data_hora_ocorrencia": "05/05/2025 00:00:00"
    },
    {
      "tipo_ocorrencia": "Data Entrega",
      "data_hora_ocorrencia": "05/05/2025 14:40:00"
    }
  ],
  "descricao_baixa": "ENTREGA REALIZADA NORMALMENTE"
}`}
        </pre>
      </section>

      {/* 5. RESPONSE ERRO */}
      <section id="response_erro">
        <h3>5. Response – Erro</h3>

        <pre>
          {`{
  "success": false,
  "message": "Nenhum registro encontrado para a chave informada.",
  "remetente": null,
  "destinatario": null,
  "lstOcorrencias": null,
  "descricao_baixa": null
}`}
        </pre>
      </section>

      {/* 6. OBSERVAÇÕES */}
      <section id="observacoes">
        <h3>6. Observações Importantes</h3>

        <ul>
          <li>O usuário (<strong>API-RODOVIARIO</strong>) e a senha são sempre os mesmos.</li>
          <li>O CNPJ informado deve corresponder ao mesmo que consta na Nota Fiscal.</li>
          <li>A chave do CT-e precisa ser enviada completa (44 dígitos).</li>
        </ul>
      </section>

      {/* 7. CONCLUSÃO */}
      <section id="conclusao">
        <h3>7. Conclusão</h3>
        <p>
          A API Localize Cargas (Rodoviário) permite acompanhar com precisão o
          ciclo completo da entrega, fornecendo informações essenciais de
          rastreio e status da operação.
        </p>
      </section>
    </div>
  );

  return (
    <GenericContent
      title="API – Localize Cargas (Rodoviário)"
      content={content}
      attachments={[]}
    />
  );
};

export default LocalizeCargasRodoviario;
