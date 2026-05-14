import React from "react";
import GenericContent from "../GenericContent";

const APINaderCotacao = () => {
  const content = (
    <div className="conteudo-div">
      <h4>Documentação da API – Cotação de Frete Mantran</h4>

{ 
      //<h3>Sumário</h3>
      //<ol>
      //  <li><strong>Objetivo</strong></li>
      // <li><strong>Visão Geral</strong></li>
      // <li><strong>Autenticação</strong></li>
      //  <li><strong>Endpoint – Cotação de Frete</strong></li>
      // <li><strong>Exemplos de Requisição</strong></li>
      // <li><strong>Exemplos de Resposta</strong></li>
      //  <li><strong>Erros Comuns</strong></li>
      //  <li><strong>Conclusão</strong></li>
      //</ol>
}

      <section id="section_api_nader_contacao">
        <h3>1. Objetivo</h3>
        <p>
          Esta documentação apresenta o funcionamento da API de Cotação de Frete,
          integrando com a plataforma Mantran. O objetivo é permitir que sistemas externos realizem consultas de
          valores de frete conforme parâmetros de origem, destino, características da carga e opções adicionais.
        </p>
      </section>

      <section id="visao_geral">
        <h3>2. Visão Geral</h3>
        <p>
          A API permite que clientes consultem valores de frete em tempo real. O cálculo leva em consideração:
        </p>
        <ul>
          <li>Origem e destino</li>
          <li>Peso, volumes e valor da mercadoria</li>
          <li>Modal (rodoviário)</li>
          <li>Serviços adicionais (seguro, coleta, entrega, etc.)</li>
        </ul>
        <p>
          A API segue o formato JSON para entrada e saída e utiliza autenticação via chave.
        </p>
      </section>

      <section id="autenticacao">
        <h3>3. Autenticação</h3>
        <p>
          O acesso exige o envio do header:
        </p>
        <pre>{`Authorization: Basic <token>`}</pre>
    
      </section>

      <section id="endpoint">
        <h3>4. Endpoint – Cotação de Frete</h3>

        <h4>4.1 POST /client/api/cotacao</h4>
        <p><strong>Descrição:</strong> Permite consultar valores de frete com base nas informações enviadas.</p>

        <p><strong>Headers:</strong></p>
        <ul>
          <li><code>Authorization: Basic &lt;token&gt;</code></li>
          <li><code>Content-Type: application/json</code></li>
        </ul>
      </section>

      <section id="exemplos_request">
        <h3>5. Exemplos de Requisição</h3>

        <p><strong>5.1 Request – Cotação Simples</strong></p>
        <pre className="code-block">{`{
  "Origem": "SP",
  "Destino": "RJ",
  "Peso": 150.5,
  "ValorNF": 3500.90,
  "QuantidadeVolumes": 12,
  "EspecieVolume": "Caixa",
  "Cubagem": 0.5
}`}</pre>

        <p><strong>5.2 Request – Com Serviços Adicionais</strong></p>
        <pre className="code-block">{`{
  "Origem": "SP",
  "Destino": "MG",
  "Peso": 240,
  "ValorNF": 5200.00,
  "QuantidadeVolumes": 20,
  "EspecieVolume": "Caixa",
  "Cubagem": 0.65,
  "Coleta": true,
  "Entrega": true,
  "Seguro": true
}`}</pre>
      </section>

      <section id="exemplos_response">
        <h3>6. Exemplos de Resposta</h3>

        <p><strong>6.1 Response – Sucesso</strong></p>
        <pre className="code-block">{`{
  "Sucesso": true,
  "ValorFrete": 842.55,
  "PrazoEntrega": "3 dias úteis",
  "Detalhes": {
    "FretePeso": 520.00,
    "AdicionalColeta": 35.00,
    "AdicionalEntrega": 40.00,
    "Seguro": 15.25
  }
}`}</pre>

        <p><strong>6.2 Response – Erro de Validação</strong></p>
        <pre className="code-block">{`{
  "Sucesso": false,
  "Mensagem": "Peso inválido. Informe valor acima de 0."
}`}</pre>
      </section>

      <section id="erros_comuns">
        <h3>7. Erros Comuns</h3>

        <ul>
          <li>401 – Token inválido ou não informado</li>
          <li>400 – Campos obrigatórios não enviados</li>
          <li>422 – Dados inconsistentes (peso, cubagem, volumes)</li>
          <li>500 – Erro interno no cálculo da cotação</li>
        </ul>
      </section>

      <section id="conclusao">
        <h3>8. Conclusão</h3>
        <p>
          A API de Cotação fornece um meio rápido e eficiente para consultar valores de frete. Seguindo este
          padrão de documentação, o processo de integração se torna simples e padronizado entre os sistemas.
        </p>
      </section>
    </div>
  );

  return (
    <GenericContent
      title="API – Cotação de Frete Mantran"
      content={content}
      attachments={[]}
    />
  );
};

export default APINaderCotacao;
