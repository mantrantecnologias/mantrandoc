import GenericContent from "@shared/components/GenericContent";

function LeoMadeirasApiPage() {
  const content = (
    <div className="conteudo-div">
      <h4>Documentação da API – Consulta de Notas Fiscais e demais dados </h4>

      {/* <h3>Sumário</h3>
      <ol>
        <li><strong>Visão Geral</strong></li>
        <li><strong>Autenticação</strong></li>
        <li><strong>Consulta com Paginação</strong></li>
        <li><strong>Consulta sem Paginação</strong></li>
        <li><strong>Propriedades da Requisição</strong></li>
        <li><strong>Propriedades da Resposta</strong></li>
      </ol> */}

      {/* 1. Visão Geral */}
      <section id="section_consulta_pagina">
        <h3>1. Visão Geral</h3>
        <p>
          Endpoint desenvolvido para consulta de notas fiscais, com ou sem paginação, permitindo
          múltiplos filtros dinâmicos. O objetivo é possibilitar consultas otimizadas, com
          resultados segmentados ou completos, conforme a necessidade.
        </p>
        <ul>
          <li>Consulta paginada (opcional)</li>
          <li>Filtros dinâmicos e flexíveis</li>
          <li>Retorno estruturado com metadados</li>
        </ul>
      </section>

      {/* 2. Autenticação */}
      <section id="autenticacao">
        <h3>2. Autenticação</h3>

        <p><strong>Endpoint:</strong></p>
        <pre>{`POST http://138.59.144.69:35391/api/token`}</pre>

        <p><strong>Headers:</strong></p>
        <pre>{`Content-Type: application/json`}</pre>

        <p><strong>Exemplo de Request:</strong></p>
        <pre>{`{
  "Login": "teste-usuario",
  "Senha": "teste-senha-exemplo",
  "TipoUsuario": "aplicacao"
}`}</pre>

        <p><strong>Exemplo de Response (200):</strong></p>
        <pre>{`{
  "login": "teste-usuario",
  "tipoUsuario": "aplicacao",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "cnpj": "",
  "erros": []
}`}</pre>
      </section>

      {/* 3. Buscar NF com paginação */}
      <section id="section_consulta_pagina">
        <h3>3. Buscar dados da nota fiscal – com paginação</h3>

        <p>
          A paginação divide grandes volumes de dados em páginas menores, tornando as consultas
          mais rápidas e eficientes.
        </p>

        <p><strong>Endpoint:</strong></p>
        <pre>{`POST http://138.59.144.69:35391/api/notasfiscais/nf-consulta`}</pre>

        <p><strong>Headers:</strong></p>
        <pre>{`Authorization: Bearer <Token>
Content-Type: application/json`}</pre>

        <p><strong>Exemplo de Request:</strong></p>
        <pre>{`{
  "NR_NF": "",
  "nR_Remessa": "",
  "ativar_Paginacao": true,
  "pagina": 3,
  "itensPorPagina": 10,
  "dt_Emissao_Inicio": "2025-10-25",
  "dt_Emissao_Final": "2025-12-25"
}`}</pre>

        <p><strong>Exemplo de Response (200):</strong></p>
        <pre>{`{
  "data": {
    "notas_Fiscais": [
      {
        "nR_NF": "02549196",
        "nR_Pedido": "1924050552",
        "nR_Remessa": "8022683981",
        "vR_Frete": 0.14,
        "nome_Transportadora": "FIRE TRANSPORTE LTDA"
      }
    ],
    "totalRegistros": 25,
    "totalPaginas": 3,
    "paginaAtual": 3,
    "itensPorPagina": 10
  },
  "sucesso": true,
  "mensagem": null,
  "erros": []
}`}</pre>
      </section>

      {/* 4. Buscar NF sem paginação */}
      <section id="consulta_sem_paginacao">
        <h3>4. Buscar dados da nota fiscal – sem paginação</h3>

        <p>
          Retorna todos os registros encontrados sem segmentar por páginas. Adequado para
          pequenos volumes de dados.
        </p>

        <p><strong>Endpoint:</strong></p>
        <pre>{`POST http://138.59.144.69:35391/api/notasfiscais/nf-consulta`}</pre>

        <p><strong>Exemplo de Request:</strong></p>
        <pre>{`{
  "NR_NF": "",
  "nR_Remessa": "",
  "ativar_Paginacao": false,
  "dt_Emissao_Inicio": "2025-10-25",
  "dt_Emissao_Final": "2025-12-25"
}`}</pre>

        <p><strong>Exemplo de Response (200):</strong></p>
        <pre>{`{
  "data": {
    "notas_Fiscais": [
      {
        "nR_NF": "03881735",
        "nR_Pedido": "1924051352",
        "nR_Remessa": "8022684842",
        "vR_Frete": 1350.00,
        "nome_Transportadora": "FIRE TRANSPORTE LTDA"
      }
    ],
    "totalRegistros": 25,
    "totalPaginas": null,
    "paginaAtual": null,
    "itensPorPagina": null
  },
  "sucesso": true,
  "mensagem": null,
  "erros": []
}`}</pre>
      </section>

      {/* 5. Propriedades da requisição */}
      <section id="propriedades_requisicao">
        <h3>5. Propriedades da Requisição</h3>

        <ul>
          <li><strong>NR_NF</strong> — obrigatório mencionar (pode ser vazio)</li>
          <li><strong>nR_Remessa</strong> — opcional</li>
          <li><strong>ativar_Paginacao</strong> — obrigatório</li>
          <li><strong>pagina</strong> — obrigatório somente se ativar_Paginacao = true</li>
          <li><strong>itensPorPagina</strong> — obrigatório se ativar_Paginacao = true</li>
          <li><strong>dt_Emissao_Inicio</strong> — obrigatório</li>
          <li><strong>dt_Emissao_Final</strong> — obrigatório</li>
        </ul>
      </section>

      {/* 6. Propriedades da resposta */}
      <section id="propriedades_resposta">
        <h3>6. Propriedades da Resposta</h3>

        <ul>
          <li>nR_NF — Número da Nota Fiscal</li>
          <li>nR_Pedido — Número do Pedido</li>
          <li>nR_Remessa — Número da Remessa</li>
          <li>vR_Frete — Valor do Frete</li>
          <li>nome_Transportadora — Nome da Transportadora</li>
          <li>nR_CTe — Número do CTE</li>
          <li>peso_NF — Peso da Nota Fiscal</li>
          <li>cabecalho — Cabeçalho interno</li>
          <li>loja — Código da loja</li>
          <li>placa — Placa do veículo</li>
          <li>cD_Rota — Código da rota</li>
          <li>dT_Emissao_NF — Data emissão NF</li>
          <li>dT_Emissao_CTe — Data emissão CTe</li>
          <li>tipo_Veiculo — Tipo de veículo</li>
          <li>observacao — Observações adicionais</li>
          <li>qT_KM — Quilometragem</li>
        </ul>
      </section>
    </div>
  );

  return (
    <GenericContent
      title="Mantran – Consulta de Notas Fiscais"
      content={content}
    />
  );
}

export default LeoMadeirasApiPage;
