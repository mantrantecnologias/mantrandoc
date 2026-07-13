import GenericContent from "@shared/components/GenericContent";

function WebApiMobilePage() {
  const content = (
    <div className="conteudo-div">
      <h4>Documentação da Web API – Mobile</h4>
      {
      //<h3>Sumário</h3>
      //<ol>
      //  <li><strong>Resumo</strong></li>
      //  <li><strong>Login / Token</strong></li>
      //  <li><strong>Lista de Manifestos</strong></li>
      //  <li><strong>Destinos do Manifesto</strong></li>
      //  <li><strong>Documentos do Manifesto</strong></li>
      //  <li><strong>Lista de Notas Fiscais</strong></li>
      //  <li><strong>Proposta: Login sem IMEI</strong></li>
      //</ol>
      }

      {/* 1. RESUMO */}
      <section id="resumo">
        <h3>1. Resumo</h3>
        <p>
          Esta documentação descreve os endpoints utilizados pelo aplicativo
          Mobile da Mantran. Todas as operações do app — login, consulta de
          manifestos, destinos, documentos e notas fiscais — dependem desta API.
          O novo projeto mobile continuará utilizando esta infraestrutura.
        </p>
      </section>

      {/* 2. LOGIN */}
      <section id="login_token">
        <h3>2. POST – Login / Token</h3>
        <p><strong>Endpoint:</strong></p>
        <code>http://w2022-0691.emartim.com.br:35398/token/mobile/login</code>

        <p><strong>Descrição:</strong> Valida o usuário, senha e IMEI do aparelho e retorna um token JWT para uso nas demais requisições.</p>

        <p><strong>Exemplo de Request:</strong></p>
        <pre>{`{
  "Usuario": "TESTE1",
  "Senha": "4321",
  "IMEI": "f46bd2cb8dde1f30",
  "IdFireBase": "",
  "LoginSalvo": false
}`}</pre>

        <p><strong>Exemplo de Response (Sucesso):</strong></p>
        <pre>{`{
  "usuario": "TESTE",
  "senha": null,
  "cdLicenca": "8",
  "qtMinutoRastreador": "0",
  "token": "<jwt_token>",
  "imeiNovo": false,
  "imeiDiferente": false,
  "erros": []
}`}</pre>

        <p><strong>Exemplo de Response (Erro):</strong></p>
        <pre>{`{
  "usuario": null,
  "senha": null,
  "cdLicenca": null,
  "qtMinutoRastreador": null,
  "token": null,
  "imeiNovo": false,
  "imeiDiferente": false,
  "erros": [
    { "descricao": "Usuário ou senha inválidos" }
  ]
}`}</pre>
      </section>

      {/* 3. LISTA DE MANIFESTOS */}
      <section id="section_mobile">
        <h3>3. GET – Lista de Manifestos</h3>

        <p><strong>Endpoint:</strong></p>
        <code>http://w2022-0691.emartim.com.br:35398/Manifesto/PorCNH</code>

        <p><strong>Descrição:</strong> Retorna os manifestos vigentes com base na CNH do motorista, identificada via token.</p>

        <p><strong>Request:</strong> Vazio (somente token no header).</p>

        <p><strong>Exemplo de Response:</strong></p>
        <pre>{`{
  "sucesso": true,
  "manifestos": [
    {
      "cD_Empresa": "001",
      "cD_Filial": "001",
      "nR_Manifesto": "043476",
      "nR_Viagem": "039147",
      "ceP_REF_Origem": "49040696",
      "cidade_Origem": "ARACAJU",
      "ceP_REF_Destino": "75460000",
      "cidade_Destino": "NEROPOLIS",
      "dT_Previsao_Entrega": "06/20/2025"
    }
  ],
  "erros": []
}`}</pre>
      </section>

      {/* 4. DESTINOS */}
      <section id="destinos_manifesto">
        <h3>4. GET – Destinos do Manifesto</h3>

        <p><strong>Endpoint:</strong></p>
        <code>
          http://w2022-0691.emartim.com.br:35398/Manifesto/Destino/{`{CodFilial}`}/{`{NR_Manifesto}`}
        </code>

        <p><strong>Descrição:</strong> Retorna os destinos do manifesto selecionado.</p>

        <p><strong>Request:</strong> Vazio (somente token + parâmetros na URL).</p>

        <p><strong>Exemplo de Response:</strong></p>
        <pre>{`{
  "sucesso": true,
  "manifestoDestinos": [
    {
      "razao_Social_Destino": "AMAZON CRISTAIS",
      "fantasia_Destino": "AMAZON CRISTAIS",
      "cgC_CPF": "15.436.940/0004-48",
      "endereco": "AVENIDA DOUTOR ANTONIO JOAO ABDALL",
      "endereco_Completo": "AV. DOUTOR ANTONIO JOAO ABDALL, 260 - CRISTAIS JORDANESIA - CAJAMAR/SP",
      "nR_Endereco": "260",
      "complemento": "",
      "bairro": "CRISTAIS JORDANESIA",
      "cidade": "CAJAMAR",
      "uf": "SP",
      "sQ_Entrega": "000"
    }
  ],
  "erros": []
}`}</pre>
      </section>

      {/* 5. DOCUMENTOS */}
      <section id="documentos_manifesto">
        <h3>5. GET – Documentos do Manifesto</h3>

        <p><strong>Endpoint:</strong></p>
        <code>
          http://w2022-0691.emartim.com.br:35398/manifesto/documento/
          {`{CodFilial}`}/{`{NR_Manifesto}`}/{`{CNPJ-CPF-Destino}`}
        </code>

        <p><strong>Descrição:</strong> Retorna os documentos (como CTe) associados ao destino selecionado.</p>

        <p><strong>Request:</strong> vazio (token + parâmetros na rota)</p>

        <p><strong>Exemplo de Response:</strong></p>
        <pre>{`{
  "sucesso": true,
  "manifestoDocumentos": [
    {
      "tP_Documento": "CT",
      "nR_Documento": "291081",
      "fantasia_Destino": "AMAZON CRISTAIS",
      "endereco": "AV. DOUTOR ANTONIO JOAO ABDALL",
      "cidade": "CAJAMAR",
      "uf": "SP",
      "sQ_Entrega": "000"
    }
  ],
  "erros": []
}`}</pre>
      </section>

      {/* 6. NOTAS FISCAIS */}
      <section id="lista_nf">
        <h3>6. GET – Lista de NFs do Documento</h3>

        <p><strong>Endpoint:</strong></p>
        <code>
          http://w2022-0691.emartim.com.br:35398/manifesto/nota/
          {`{TP_Doc}`}/{`{NR_Doc}`}/{`{NR_Manifesto}`}/{`{CNPJ-CPF}`}
        </code>

        <p><strong>Descrição:</strong> Retorna as Notas Fiscais relacionadas ao documento do manifesto.</p>

        <p><strong>Exemplo de Response:</strong></p>
        <pre>{`{
  "sucesso": true,
  "manifestoNotas": [
    {
      "nR_NF": "00415277",
      "nR_NF_Serie": "1",
      "cgC_CPF_Remetente": "08712193000115",
      "cD_Empresa": "001",
      "cD_CNH": "",
      "cD_Veiculo_Tracao": ""
    }
  ],
  "erros": []
}`}</pre>
      </section>

      {/* 7. PROPOSTA */}
      <section id="login_sem_imei">
        <h3>7. Proposta – Novo Login sem IMEI</h3>
        <p>
          A documentação sugere a possibilidade de um novo modelo de autenticação
          onde o uso do IMEI não seja obrigatório, permitindo maior flexibilidade no uso do app.
        </p>
      </section>
    </div>
  );

  return (
    <GenericContent
      title="Web API – Integração Mobile"
      content={content}
    />
  );
}

export default WebApiMobilePage;
