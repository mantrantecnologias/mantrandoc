import GenericContent from "@shared/components/GenericContent";

function WebApiConhecimentoPage() {
  const content = (
    <div className="conteudo-div">
      <h4>Documentação da API – Baixa de CTe ( Mantran )</h4>

{
      //<h3>Sumário</h3>
      //<ol>
        //<li><strong>Objetivo</strong></li>
        //<li><strong>Endpoint Principal</strong></li>
        //<li><strong>Exemplo de Request</strong></li>
        //<li><strong>Exemplos de Response</strong></li>
        //<li><strong>Regras e Observações Importantes</strong></li>
        //<li><strong>Conclusão</strong></li>
      //</ol>
}

      {/* 1. Objetivo */}
      <section id="section_api_difalux_baixa_cte">
        <h3>1. Objetivo</h3>
        <p>
          Documentar o endpoint de baixa de Conhecimento de Transporte Eletrônico (CT-e)
          utilizado para registrar ocorrência e efetuar a baixa de um conhecimento
          no sistema Mantran.
        </p>

        <p>
          A API recebe os dados de autenticação, informações do CTe e dados da ocorrência,
          retornando mensagens de sucesso ou erro conforme o processamento.
        </p>
      </section>

      {/* 2. Endpoint Principal */}
      <section id="endpoint">
        <h3>2. Endpoint Principal</h3>

        <p><strong>POST /CTE/BaixarConhecimento</strong></p>

        <pre>{`http://w2022-0691.emartim.com.br:35399/CTE/BaixarConhecimento`}</pre>
      </section>

      {/* 3. Request */}
      <section id="request">
        <h3>3. Exemplo de Request</h3>

        <pre>{`{
  "usuario": "API-TESTE",
  "senha": "teste",
  "cnpj": "04.086.814/0001-41",
  "nr_coleta": "191562",
  "cd_ocorrencia": "001",
  "dt_hr_chegada": "2025-01-07 10:00:00.000",
  "dt_hr_entrega": "2025-01-07 10:00:00.000",
  "nome_recebedor": "Nome Recebedor Teste",
  "rg_recebedor": "40978242x"
}`}</pre>
      </section>

      {/* 4. Responses */}
      <section id="responses">
        <h3>4. Exemplos de Response</h3>

        <h4>4.1. Response de Erro</h4>
        <pre>{`{
  "erro": true,
  "mensagens": [
    "Conhecimento já baixado."
  ],
  "cD_Empresa": "001",
  "cD_Filial": "003",
  "nR_Controle": "165080"
}`}</pre>

        <h4>4.2. Response de Sucesso</h4>
        <pre>{`{
  "erro": false,
  "mensagens": [
    "Conhecimento baixado com sucesso."
  ],
  "cD_Empresa": "001",
  "cD_Filial": "003",
  "nR_Controle": "165080"
}`}</pre>
      </section>

      {/* 5. Observações */}
      <section id="observacoes">
        <h3>5. Regras e Observações Importantes</h3>

        <ul>
          <li>
            <strong>Usuário e senha</strong> fornecidos no request são fixos e devem ser sempre os mesmos.
          </li>

          <li>
            <strong>O CNPJ</strong> enviado deve ser o mesmo da filial que emitiu o CTe.
          </li>

          <li>
            O <strong>código de ocorrência</strong> deve estar presente na lista oficial enviada junto
            com a documentação da API.
          </li>

          <li>
            A baixa só será realizada para ocorrências onde
            <strong> FL_Encerra = "S"</strong>.
            Caso contrário, a API apenas registra a ocorrência, mas não baixa o conhecimento.
          </li>
        </ul>
      </section>

      {/* 6. Conclusão */}
      <section id="conclusao">
        <h3>6. Conclusão</h3>
        <p>
          Esta API permite que sejam enviadas  informações de entrega e ocorrência para que
          o Mantran registre e finalize (quando permitido) a baixa do CTe.
          Seguir corretamente os campos obrigatórios garante o sucesso da operação.
        </p>
      </section>
    </div>
  );

  return (
    <GenericContent
      title="API – Baixa de CTe - Mantran"
      content={content}
    />
  );
}

export default WebApiConhecimentoPage;
