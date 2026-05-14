import React from "react";
import GenericContent from "../pages/GenericContent";

const DocumentacaoCompleta = () => {
  const content = (
    <div className="conteudo-div">

      {/* ---------------------- 1º DOCUMENTO ---------------------- */}
      <h4>Documentação – Interfaces de Integração Mantran</h4>

      <h3>Sumário</h3>
      <ol>
        <li><strong>Objetivo</strong></li>
        <li><strong>1. Cadastrar Nota Fiscal</strong></li>
        <li><strong>2. Buscar Nota Fiscal</strong></li>
        <li><strong>3. Cadastro Cliente</strong></li>
        <li><strong>4. Cadastrar Fornecedor</strong></li>
        <li><strong>5. Contas Frete Retorno</strong></li>
        <li><strong>Conclusão</strong></li>
      </ol>

      {/* OBJETIVO */}
      <section id="section_interfaces_saas">
        <h3>Objetivo</h3>
        <p>
          Esta documentação apresenta o conjunto mínimo de interfaces necessárias para
          integrações com a API Mantran, incluindo cadastro de documentos, consultas,
          atualização de informações operacionais e transmissão de dados financeiros.
        </p>
      </section>

      {/* 1 – CADASTRAR NOTA FISCAL */}
      <section id="cadastrar_nf">
        <h3>1. Interface – Cadastrar Nota Fiscal</h3>

        <p><strong>URL API:</strong> http://138.59.144.69:35391/api/notasfiscais/nota-fiscal</p>
        <p><strong>Método:</strong> POST</p>
        <p><strong>Ação:</strong> INSERT</p>
        <p><strong>Autenticação:</strong> Bearer Token</p>

        <h4>Request:</h4>
        <pre>{`{
  "CD_Filial": "1015",
  "CD_Empresa": "001",
  "Nr_Nf": "786",
  "Nr_Nf_Serie": "8",
  "Nr_Chave": "31250961069373010095550010000034851641759360",
  "Nr_Pedido": "1923822431",
  "Uf_Origem": "MG",
  "Cep_Origem": "13277670",
  "Cgc_Cpf_Remetente": "61069373010095",
  "Cgc_Cpf_Destinatario": "21032344000152",
  "Razao_Social_Destinatario": "WANDERSON ALVES GONÇALVES 6793",
  "Endereco_Entrega": "RUA SILVANO GOZZER",
  "Bairro_Entrega": "bairro",
  "Cidade_Entrega": "SETE LAGOAS",
  "Uf_Entrega": "MG",
  "Cep_Destinatario": "35702385",
  "Dt_Emissao": "2025-09-30T00:00:00",
  "Qt_Volume": 10,
  "Peso_Nf": 40.5,
  ...
}`}</pre>
      </section>

      {/* 2 – BUSCAR NOTA FISCAL */}
      <section id="buscar_nf">
        <h3>2. Interface – Buscar Nota Fiscal</h3>

        <p><strong>URL API:</strong> http://138.59.144.69:35391/api/notasfiscais/nf-listagem</p>
        <p><strong>Método:</strong> POST</p>
        <p><strong>Ação:</strong> SELECT</p>
        <p><strong>Autenticação:</strong> Bearer Token</p>

        <h4>Request:</h4>
        <pre>{`{
  "Cd_Empresa": "001",
  "Cd_Filial": "001",
  "Nr_Nf_Serie": "8",
  "Nr_Nf": "732",
  "Cgc_Cpf_Remetente": "61069373010095",
  "Dt_Emissao_Inicio": "2025-09-30T00:00:00",
  "Dt_Emissao_Final": "2025-10-01T00:00:00"
}`}</pre>
      </section>

      {/* 3 – CADASTRO CLIENTE */}
      <section id="cadastro_cliente">
        <h3>3. Interface – Cadastro Cliente</h3>

        <p><strong>URL API:</strong> http://138.59.144.69:35391/api/cliente/cliente</p>
        <p><strong>Método:</strong> POST</p>
        <p><strong>Ação:</strong> INSERT</p>
        <p><strong>Autenticação:</strong> Bearer Token</p>

        <h4>Request:</h4>
        <pre>{`{
  "cgC_CPF": "12345678000197",
  "fantasia": "Comercial Ltda",
  "razao_Social": "Comercial Brasileira Ltda",
  "complemento": "Final da rua",
  "ddd": "011",
  "ramal": "2234",
  "ddD_Fax": "011",
  "fax": "34567890",
  "fax_Ramal": "5678",
  "e_Mail": "contato@comercial.com.br",
  "cD_Vendedor": "025",
  "tP_Operacao": "N",
  "cD_Corretora": "015",
  "fL_Entrega_Diferenciada": "N",
  "ie": "123456789012345678",
  "endereco": "Rua das Flores, Jardim Paulista",
  "bairro": "Centro",
  ...
}`}</pre>
      </section>

      {/* 4 – CADASTRAR FORNECEDOR */}
      <section id="fornecedor">
        <h3>4. Interface – Cadastrar Fornecedor</h3>

        <p><strong>URL API:</strong> http://138.59.144.69:35391/api/fornecedor/cadastro-fornecedor</p>
        <p><strong>Método:</strong> POST</p>
        <p><strong>Ação:</strong> INSERT / UPDATE</p>
        <p><strong>Autenticação:</strong> Bearer Token</p>

        <h4>Request:</h4>
        <pre>{`{
  "cgc_cpf": "35851778000199",
  "tp_documento": "YG12",
  "ie": "122253143116",
  "razao_social": "CAMPINAS COMÉRCIO DE MADEIRAS LTDA",
  "fantasia": "CCM MADEIRAS",
  "endereco": "RUA QUITANDAS",
  "nr_endereco": "247",
  "cidade": "CAMPINAS",
  "uf": "SP",
  ...
}`}</pre>
      </section>

      {/* 5 – CONTAS FRETE RETORNO */}
      <section id="contas_retorno">
        <h3>5. Interface – Contas Frete Retorno</h3>

        <p><strong>URL API:</strong> http://138.59.144.69:35391/api/Fatura/retorno</p>
        <p><strong>Método:</strong> POST</p>
        <p><strong>Ação:</strong> UPDATE</p>
        <p><strong>Autenticação:</strong> Bearer Token</p>

        <h4>Request:</h4>
        <pre>{`{
  "CGC_CPF_Transportador": "53274268000188",
  "NR_Docto": "000541",
  "NR_Docto_Serie": "001",
  "CGC_Fatura": "61069373006144",
  "TP_Docto": "CTE",
  "Controle_SAP": "A",
  "DT_Hora_SAP": "2025-10-21T14:30:00",
  "Desc_Erro": "Título processado corretamente",
  "Rateios": [
    {
      "CGC_CPF_Transportador": "53274268000188",
      "NR_Docto": "000541",
      "CD_Loja_Rateio": "1007",
      "Desc_Erro": "Sucesso"
    },
    ...
  ]
}`}</pre>
      </section>

      {/* CONCLUSÃO */}
      <section id="conclusao">
        <h3>Conclusão</h3>
        <p>
          Este documento consolida as interfaces essenciais de comunicação com a API Mantran,
          organizando cada endpoint, estrutura de requisição e campos obrigatórios.
        </p>
      </section>


      {/* ---------------------- 2º DOCUMENTO ---------------------- */}

      <hr />
      <h4>Documentação da API – Consulta de Notas Fiscais Leo Tech x Mantran</h4>

      <h3>Sumário</h3>
      <ol>
        <li><strong>Visão Geral</strong></li>
        <li><strong>Autenticação</strong></li>
        <li><strong>Consulta com Paginação</strong></li>
        <li><strong>Consulta sem Paginação</strong></li>
        <li><strong>Propriedades da Requisição</strong></li>
        <li><strong>Propriedades da Resposta</strong></li>
      </ol>

      {/* 1. Visão Geral */}
      <section id="section_consulta_pagina">
        <h3>1. Visão Geral</h3>
        <p>
          Endpoint desenvolvido para consulta de notas fiscais, com ou sem paginação,
          permitindo múltiplos filtros dinâmicos.
        </p>
      </section>

      {/* 2. Autenticação */}
      <section id="autenticacao">
        <h3>2. Autenticação</h3>

        <pre>{`POST http://138.59.144.69:35391/api/token`}</pre>

        <pre>{`{
  "Login": "client-leotech-leomadeiras-tst",
  "Senha": "VwhJ4ZJ48f97",
  "TipoUsuario": "aplicacao"
}`}</pre>
      </section>

      {/* 3 – com paginação */}
      <section>
        <h3>3. Buscar dados da nota fiscal – com paginação</h3>

        <pre>{`POST http://138.59.144.69:35391/api/notasfiscais/nf-consulta`}</pre>

        <pre>{`{
  "NR_NF": "",
  "nR_Remessa": "",
  "ativar_Paginacao": true,
  "pagina": 3,
  "itensPorPagina": 10,
  "dt_Emissao_Inicio": "2025-10-25",
  "dt_Emissao_Final": "2025-12-25"
}`}</pre>
      </section>

      {/* 4 – sem paginação */}
      <section>
        <h3>4. Buscar dados da nota fiscal – sem paginação</h3>

        <pre>{`{
  "NR_NF": "",
  "nR_Remessa": "",
  "ativar_Paginacao": false,
  "dt_Emissao_Inicio": "2025-10-25",
  "dt_Emissao_Final": "2025-12-25"
}`}</pre>
      </section>

      {/* 5 – Propriedades Request */}
      <section>
        <h3>5. Propriedades da Requisição</h3>
        <ul>
          <li><strong>NR_NF</strong> — obrigatório (pode ser vazio)</li>
          <li><strong>nR_Remessa</strong> — opcional</li>
          <li><strong>ativar_Paginacao</strong> — obrigatório</li>
          <li><strong>pagina</strong> — obrigatório se ativar_Paginacao = true</li>
          <li><strong>itensPorPagina</strong> — idem</li>
          <li><strong>dt_Emissao_Inicio</strong> — obrigatório</li>
          <li><strong>dt_Emissao_Final</strong> — obrigatório</li>
        </ul>
      </section>

      {/* 6 – Propriedades Response */}
      <section>
        <h3>6. Propriedades da Resposta</h3>
        <ul>
          <li>nR_NF</li>
          <li>nR_Pedido</li>
          <li>nR_Remessa</li>
          <li>vR_Frete</li>
          <li>nome_Transportadora</li>
          <li>nR_CTe</li>
          <li>peso_NF</li>
          <li>cabecalho</li>
          <li>loja</li>
          <li>placa</li>
          <li>cD_Rota</li>
          <li>dT_Emissao_NF</li>
          <li>dT_Emissao_CTe</li>
          <li>tipo_Veiculo</li>
          <li>observacao</li>
          <li>qT_KM</li>
        </ul>
      </section>

    </div>
  );

  return (
    <GenericContent
      title="Documentação – API Mantran Completa"
      content={content}
      attachments={[]}
    />
  );
};

export default DocumentacaoCompleta;
