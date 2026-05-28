import React, { useEffect } from 'react';
import GenericContent from '../GenericContent';
import { API_BASE_URL } from '../../config/apiConfig';

const MantranAPI_Filial = ({ scrollToSection, onNavigateToGerarToken }) => {

  useEffect(() => {
    if (scrollToSection) {
      const el = document.getElementById(scrollToSection);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, [scrollToSection]);

  const content = (
    <div className="conteudo-div">

      <div style={{
        background: '#fef9c3',
        border: '1px solid #fbbf24',
        borderRadius: '8px',
        padding: '14px 18px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '0.92rem',
        color: '#78350f'
      }}>
        <span style={{ fontSize: '1.1rem' }}>⚠</span>
        <span>
          Para acessar os endpoints desta documentação é necessário um token de acesso.{' '}
          <button
            onClick={onNavigateToGerarToken}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: '#b91c1c',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: 'inherit'
            }}
          >
            Clique aqui para ver como gerar o token
          </button>
          .
        </span>
      </div>

      <h4>Documentação Técnica — FilialController (TMS Web)</h4>

      {/* 1. Visão Geral */}
      <section id="mantran_api_filial">
        <h3>1. Visão Geral</h3>
        <p>
          O <code>FilialController</code> gerencia o cadastro e a configuração de filiais da plataforma TMS Web.
          Todos os endpoints exigem autenticação com a role <code>tms_web</code>. As operações de escrita
          (incluir, alterar, excluir) possuem uma camada adicional de controle via
          <code> Checar_Permissao_Processo</code>, podendo retornar <strong>403</strong> mesmo com token válido
          quando o usuário não tem a permissão específica liberada.
        </p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Método</th>
              <th>Rota</th>
              <th>Permissão Extra</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/filial/buscar-lista-filiais</code></td>
              <td>—</td>
              <td>Retorna lista de filiais com filtro opcional</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/filial/buscar-filial</code></td>
              <td>—</td>
              <td>Retorna dados completos de uma filial</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/filial/incluir-filial</code></td>
              <td>Código <strong>1152</strong></td>
              <td>Inclui uma nova filial</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/filial/alterar-filial</code></td>
              <td>Código <strong>1153</strong></td>
              <td>Altera dados de uma filial existente</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/filial/excluir-filial</code></td>
              <td>Código <strong>1154</strong></td>
              <td>Exclui uma filial</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/filial/buscar-filial-parametro</code></td>
              <td>—</td>
              <td>Retorna os parâmetros de configuração de uma filial</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/filial/alterar-filial-parametro</code></td>
              <td>—</td>
              <td>Altera os parâmetros de configuração de uma filial</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/filial/buscar-filial-hub-desenvolvedor</code></td>
              <td>—</td>
              <td>Busca filial por CGC (CNPJ) para integração Hub</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/filial/buscar-lista-filiais-acesso-usuario</code></td>
              <td>—</td>
              <td>Retorna filiais acessíveis para um usuário específico</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 2. Controle de Permissão */}
      <section id="filial_permissao">
        <h3>2. Controle de Permissão por Processo</h3>
        <p>
          As operações de escrita verificam, além do token JWT, se o usuário autenticado possui a permissão
          específica cadastrada na tabela de parâmetros do sistema. Essa verificação é feita pelo método
          estático <code>Funcao_Negocio.Checar_Permissao_Processo</code> antes da execução da operação.
        </p>
        <pre className="code-block">{`// Exemplo — incluir-filial (código 1152)
if( !await Funcao_Negocio.Checar_Permissao_Processo( "1152", "Incluir - Filial", "Parametro", obj_cn ) )
    return Resposta(
        Retorno_Modelo_API_Transp<object>.Erro( "1152 - Você não possui acesso para executar essa operação!!!", 403 )
    );`}</pre>

        <table className="data-table">
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Código de Permissão</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>incluir-filial</code></td>
              <td><strong>1152</strong></td>
              <td>Incluir - Filial</td>
            </tr>
            <tr>
              <td><code>alterar-filial</code></td>
              <td><strong>1153</strong></td>
              <td>Alterar - Filial</td>
            </tr>
            <tr>
              <td><code>excluir-filial</code></td>
              <td><strong>1154</strong></td>
              <td>Excluir - Filial</td>
            </tr>
          </tbody>
        </table>

        <p><strong>Resposta quando a permissão está negada — 403 Forbidden:</strong></p>
        <pre className="code-block">{`{
  "sucesso": false,
  "mensagem": ["1152 - Você não possui acesso para executar essa operação!!!"],
  "data": null,
  "codigo": 403
}`}</pre>
        <p>
          <strong>ℹ</strong> O 403 aqui difere do 403 de autorização JWT: o token é válido e a role está correta,
          mas o usuário não tem o código de permissão específico liberado no cadastro de parâmetros do sistema.
        </p>
      </section>

      {/* 3. Modelo de Dados */}
      <section id="filial_modelo">
        <h3>3. Modelo de Dados — Filial2_Transp</h3>
        <p>
          Classe de transporte principal do controller. Chaves primárias: <code>CD_Empresa</code> +
          <code> CD_Filial</code>. Os campos abaixo cobrem os dados de uso mais frequente, organizados
          por categoria. O modelo completo possui mais de 100 propriedades mapeadas para a tabela
          <code> ST_Filial</code>.
        </p>

        <h4>Identificação</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td><code>CD_Empresa</code></td><td>string</td><td>Código da empresa. Parte da chave primária.</td></tr>
            <tr><td><code>CD_Filial</code></td><td>string</td><td>Código da filial. Parte da chave primária.</td></tr>
            <tr><td><code>Sigla</code></td><td>string</td><td>Sigla abreviada da filial.</td></tr>
            <tr><td><code>Nome</code></td><td>string</td><td>Nome completo da filial.</td></tr>
            <tr><td><code>CGC</code></td><td>string</td><td>CNPJ da filial. Nos endpoints de Hub é limpo automaticamente (remove pontos e traços).</td></tr>
            <tr><td><code>IE</code></td><td>string</td><td>Inscrição Estadual.</td></tr>
            <tr><td><code>RNTRC</code></td><td>string</td><td>Registro Nacional de Transportadores Rodoviários de Cargas (ANTT).</td></tr>
            <tr><td><code>NR_ANTT</code></td><td>string</td><td>Número ANTT da filial.</td></tr>
            <tr><td><code>DT_Venc_ANTT</code></td><td>DateTime</td><td>Data de vencimento do registro ANTT.</td></tr>
            <tr><td><code>Cor_Filial</code></td><td>string</td><td>Cor de identificação visual da filial no sistema.</td></tr>
            <tr><td><code>CD_Filial_SAP</code></td><td>string</td><td>Código da filial no sistema SAP (integração).</td></tr>
            <tr><td><code>CD_OTM</code></td><td>string</td><td>Código no Oracle Transportation Management.</td></tr>
            <tr><td><code>Pix</code></td><td>string</td><td>Chave Pix da filial.</td></tr>
          </tbody>
        </table>

        <h4>Endereço e Contato</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Endereco</code></td><td>string</td><td>Logradouro.</td></tr>
            <tr><td><code>Numero / NR_Endereco</code></td><td>string</td><td>Número do endereço.</td></tr>
            <tr><td><code>Bairro</code></td><td>string</td><td>Bairro.</td></tr>
            <tr><td><code>Cidade</code></td><td>string</td><td>Cidade.</td></tr>
            <tr><td><code>UF</code></td><td>string</td><td>Unidade federativa (2 caracteres).</td></tr>
            <tr><td><code>CEP / CEP_REF</code></td><td>string</td><td>CEP principal e CEP de referência.</td></tr>
            <tr><td><code>DDD / Fone</code></td><td>string</td><td>Telefone principal.</td></tr>
            <tr><td><code>DDD_Fax / FAX</code></td><td>string</td><td>Fax.</td></tr>
            <tr><td><code>E_Mail</code></td><td>string</td><td>E-mail da filial.</td></tr>
            <tr><td><code>DDD_Ocorrencia / Fone_Ocorrencia</code></td><td>string</td><td>Contato específico para ocorrências.</td></tr>
            <tr><td><code>E_Mail_Ocorrencia</code></td><td>string</td><td>E-mail para ocorrências.</td></tr>
          </tbody>
        </table>

        <h4>Fiscal e Tributário</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td><code>FL_ICMS_no_Frete</code></td><td>string</td><td>Flag se ICMS incide no frete.</td></tr>
            <tr><td><code>FL_ICMS_Isento</code></td><td>string</td><td>Flag de isenção de ICMS.</td></tr>
            <tr><td><code>FL_Isencao_ICMS_Interestadual</code></td><td>string</td><td>Flag de isenção de ICMS interestadual.</td></tr>
            <tr><td><code>OP_Simples_Nacional</code></td><td>string</td><td>Indicador de enquadramento no Simples Nacional.</td></tr>
            <tr><td><code>OP_Lucro_Real / OP_Lucro_Presumido</code></td><td>string</td><td>Regime tributário.</td></tr>
            <tr><td><code>AL_Pis / AL_Cofins</code></td><td>decimal</td><td>Alíquotas PIS e COFINS.</td></tr>
            <tr><td><code>AL_ISS</code></td><td>decimal</td><td>Alíquota ISS.</td></tr>
            <tr><td><code>AL_CSSL / AL_IR</code></td><td>decimal</td><td>Alíquotas CSLL e IR.</td></tr>
            <tr><td><code>AL_Sest_Senat</code></td><td>decimal</td><td>Alíquota SEST/SENAT.</td></tr>
            <tr><td><code>PC_Tributos</code></td><td>decimal</td><td>Percentual total de tributos.</td></tr>
            <tr><td><code>I_Municipal / CNAE</code></td><td>string</td><td>Inscrição Municipal e CNAE.</td></tr>
            <tr><td><code>CD_CST</code></td><td>string</td><td>Código de Situação Tributária.</td></tr>
          </tbody>
        </table>

        <h4>Operacional</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td><code>FL_Coleta</code></td><td>int</td><td>Flag de habilitação de coleta.</td></tr>
            <tr><td><code>FL_CTRC</code></td><td>int</td><td>Flag de emissão de CTRC.</td></tr>
            <tr><td><code>PC_Entrega / PC_Coleta</code></td><td>decimal</td><td>Percentuais de entrega e coleta.</td></tr>
            <tr><td><code>VR_KG_Coletado</code></td><td>decimal</td><td>Valor por kg coletado.</td></tr>
            <tr><td><code>VR_Coleta</code></td><td>decimal</td><td>Valor fixo de coleta.</td></tr>
            <tr><td><code>FL_Rateio_Coleta</code></td><td>string</td><td>Flag de rateio de coleta.</td></tr>
            <tr><td><code>FL_Inicia_Viagem / FL_Inicia_Viagem_Coleta</code></td><td>string</td><td>Flags de controle de início de viagem.</td></tr>
            <tr><td><code>FL_Filial_Terceiros</code></td><td>string</td><td>Indica se a filial opera com frete de terceiros.</td></tr>
            <tr><td><code>PC_Frete_Terceiros / VR_Frete_Minimo_Terceiros</code></td><td>decimal</td><td>Parâmetros de frete terceirizado.</td></tr>
            <tr><td><code>FL_Compartilha_Filial</code></td><td>string</td><td>Permite compartilhar dados com outras filiais.</td></tr>
            <tr><td><code>NR_Apolice</code></td><td>string</td><td>Número da apólice de seguro.</td></tr>
          </tbody>
        </table>

        <h4>Sequências de Numeração</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td><code>NR_Ultimo_CTRC / NR_CTRC_Serie / NR_CTRC_Controle</code></td><td>string</td><td>Sequência de numeração do CT-e/CTRC.</td></tr>
            <tr><td><code>NR_Ultimo_Manifesto</code></td><td>string</td><td>Último número de manifesto emitido.</td></tr>
            <tr><td><code>NR_Ultimo_MDFe / NR_Serie_MDFe</code></td><td>string</td><td>Sequência do MDF-e.</td></tr>
            <tr><td><code>NR_Ultima_Fatura</code></td><td>string</td><td>Último número de fatura emitida.</td></tr>
            <tr><td><code>NR_Ultima_Viagem</code></td><td>string</td><td>Último número de viagem.</td></tr>
            <tr><td><code>NR_Ultima_Coleta</code></td><td>string</td><td>Último número de coleta.</td></tr>
          </tbody>
        </table>
      </section>

      {/* 4. buscar-lista-filiais */}
      <section id="filial_buscar_lista">
        <h3>4. POST — buscar-lista-filiais</h3>
        <p>
          Retorna a lista de filiais cadastradas. O objeto <code>Filial2_Transp</code> enviado no
          body serve como filtro — campos preenchidos são usados como critério de busca.
          Para retornar todas as filiais, envie um objeto vazio.
        </p>

        <h4>Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/filial/buscar-lista-filiais
Authorization: Bearer {token}
Content-Type: application/json

// Todas as filiais da empresa 001:
{
  "CD_Empresa": "001"
}

// Ou apenas filiais de uma UF:
{
  "CD_Empresa": "001",
  "UF": "SP"
}`}</pre>

        <h4>Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": [],
  "data": [
    {
      "CD_Empresa": "001",
      "CD_Filial": "01",
      "Nome": "Filial São Paulo",
      "CGC": "00.000.000/0001-00",
      "Cidade": "São Paulo",
      "UF": "SP"
    },
    {
      "CD_Empresa": "001",
      "CD_Filial": "02",
      "Nome": "Filial Campinas",
      "CGC": "00.000.000/0002-81",
      "Cidade": "Campinas",
      "UF": "SP"
    }
  ],
  "codigo": null
}`}</pre>
      </section>

      {/* 5. buscar-filial */}
      <section id="filial_buscar">
        <h3>5. POST — buscar-filial</h3>
        <p>
          Retorna os dados completos de uma filial específica. Informe <code>CD_Empresa</code> e
          <code> CD_Filial</code> para identificar o registro.
        </p>

        <h4>Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/filial/buscar-filial
Authorization: Bearer {token}
Content-Type: application/json

{
  "CD_Empresa": "001",
  "CD_Filial": "01"
}`}</pre>

        <h4>Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": [],
  "data": {
    "CD_Empresa": "001",
    "CD_Filial": "01",
    "Nome": "Filial São Paulo",
    "Sigla": "SP",
    "CGC": "00.000.000/0001-00",
    "IE": "123.456.789.000",
    "Endereco": "Av. Paulista",
    "Numero": "1000",
    "Cidade": "São Paulo",
    "UF": "SP",
    "RNTRC": "12345678",
    "FL_Coleta": 1,
    "FL_CTRC": 1
    // ... demais campos do modelo
  },
  "codigo": null
}`}</pre>
      </section>

      {/* 6. incluir-filial */}
      <section id="filial_incluir">
        <h3>6. POST — incluir-filial</h3>
        <p>
          Inclui uma nova filial. Requer, além do token com role <code>tms_web</code>, a permissão
          de processo <strong>1152</strong> liberada para o usuário. Retorna <code>data: null</code> em caso de sucesso.
        </p>

        <h4>Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/filial/incluir-filial
Authorization: Bearer {token}
Content-Type: application/json

{
  "CD_Empresa": "001",
  "CD_Filial": "03",
  "Nome": "Filial Curitiba",
  "Sigla": "CWB",
  "CGC": "00.000.000/0003-62",
  "Cidade": "Curitiba",
  "UF": "PR",
  "FL_Coleta": 1,
  "FL_CTRC": 1
}`}</pre>

        <h4>Respostas</h4>
        <table className="data-table">
          <thead>
            <tr><th>Status</th><th>sucesso</th><th>Condição</th></tr>
          </thead>
          <tbody>
            <tr><td>200 OK</td><td>true</td><td>Filial incluída com sucesso</td></tr>
            <tr><td>403 Forbidden</td><td>false</td><td>Usuário sem permissão 1152</td></tr>
            <tr><td>500</td><td>false</td><td>Erro ao incluir filial</td></tr>
          </tbody>
        </table>
      </section>

      {/* 7. alterar-filial */}
      <section id="filial_alterar">
        <h3>7. POST — alterar-filial</h3>
        <p>
          Atualiza dados de uma filial existente. Requer a permissão de processo <strong>1153</strong>.
          Informe <code>CD_Empresa</code> e <code>CD_Filial</code> para identificar o registro a alterar.
        </p>

        <h4>Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/filial/alterar-filial
Authorization: Bearer {token}
Content-Type: application/json

{
  "CD_Empresa": "001",
  "CD_Filial": "03",
  "Nome": "Filial Curitiba - Matriz PR",
  "E_Mail": "curitiba@empresa.com.br",
  "Pix": "00.000.000/0003-62"
}`}</pre>

        <h4>Respostas</h4>
        <table className="data-table">
          <thead>
            <tr><th>Status</th><th>sucesso</th><th>Condição</th></tr>
          </thead>
          <tbody>
            <tr><td>200 OK</td><td>true</td><td>Filial alterada com sucesso</td></tr>
            <tr><td>403 Forbidden</td><td>false</td><td>Usuário sem permissão 1153</td></tr>
            <tr><td>500</td><td>false</td><td>Erro ao alterar filial</td></tr>
          </tbody>
        </table>
      </section>

      {/* 8. excluir-filial */}
      <section id="filial_excluir">
        <h3>8. POST — excluir-filial</h3>
        <p>
          Exclui uma filial do cadastro. Requer a permissão de processo <strong>1154</strong>.
          Envie ao menos <code>CD_Empresa</code> e <code>CD_Filial</code> no body.
        </p>

        <h4>Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/filial/excluir-filial
Authorization: Bearer {token}
Content-Type: application/json

{
  "CD_Empresa": "001",
  "CD_Filial": "03"
}`}</pre>

        <h4>Respostas</h4>
        <table className="data-table">
          <thead>
            <tr><th>Status</th><th>sucesso</th><th>Condição</th></tr>
          </thead>
          <tbody>
            <tr><td>200 OK</td><td>true</td><td>Filial excluída com sucesso</td></tr>
            <tr><td>403 Forbidden</td><td>false</td><td>Usuário sem permissão 1154</td></tr>
            <tr><td>500</td><td>false</td><td>Erro ao excluir filial</td></tr>
          </tbody>
        </table>
      </section>

      {/* 9. buscar-filial-parametro */}
      <section id="filial_buscar_parametro">
        <h3>9. POST — buscar-filial-parametro</h3>
        <p>
          Retorna o objeto de parâmetros de configuração (<code>Filial_Parametro_Transp</code>) da filial
          informada. Os parâmetros controlam comportamentos específicos do sistema para aquela filial
          (regras de faturamento, integrações, etc.).
        </p>

        <h4>Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/filial/buscar-filial-parametro
Authorization: Bearer {token}
Content-Type: application/json

{
  "CD_Empresa": "001",
  "CD_Filial": "01"
}`}</pre>

        <h4>Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": [],
  "data": {
    // campos do Filial_Parametro_Transp
  },
  "codigo": null
}`}</pre>
      </section>

      {/* 10. alterar-filial-parametro */}
      <section id="filial_alterar_parametro">
        <h3>10. POST — alterar-filial-parametro</h3>
        <p>
          Atualiza os parâmetros de configuração de uma filial. Recebe diretamente um objeto
          <code> Filial_Parametro_Transp</code> no body (não <code>Filial2_Transp</code>).
          Não exige permissão extra além do token com role <code>tms_web</code>.
        </p>

        <h4>Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/filial/alterar-filial-parametro
Authorization: Bearer {token}
Content-Type: application/json

{
  // campos do Filial_Parametro_Transp a alterar
}`}</pre>

        <h4>Respostas</h4>
        <table className="data-table">
          <thead>
            <tr><th>Status</th><th>sucesso</th><th>Mensagem</th></tr>
          </thead>
          <tbody>
            <tr><td>200 OK</td><td>true</td><td>"Filial parâmetro alterada com sucesso"</td></tr>
            <tr><td>500</td><td>false</td><td>"Erro ao alterar filial parâmetro"</td></tr>
          </tbody>
        </table>
      </section>

      {/* 11. buscar-filial-hub-desenvolvedor */}
      <section id="filial_hub_desenvolvedor">
        <h3>11. POST — buscar-filial-hub-desenvolvedor</h3>
        <p>
          Busca uma filial pelo campo <code>CGC</code> (CNPJ) para uso em integrações via Hub do
          Desenvolvedor. O CGC informado é normalizado automaticamente pela API
          (<code>Funcao.LimparCNPJ</code>) antes da consulta — pode ser enviado com ou sem
          formatação (<code>00.000.000/0001-00</code> ou <code>00000000000100</code>).
        </p>

        <h4>Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/filial/buscar-filial-hub-desenvolvedor
Authorization: Bearer {token}
Content-Type: application/json

{
  "CGC": "00.000.000/0001-00"
}

// Ou sem formatação — a API limpa automaticamente:
{
  "CGC": "00000000000100"
}`}</pre>

        <h4>Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": [],
  "data": {
    "CD_Empresa": "001",
    "CD_Filial": "01",
    "Nome": "Filial São Paulo",
    "CGC": "00000000000100"
    // ... demais campos
  },
  "codigo": null
}`}</pre>
      </section>

      {/* 12. buscar-lista-filiais-acesso-usuario */}
      <section id="filial_acesso_usuario">
        <h3>12. POST — buscar-lista-filiais-acesso-usuario</h3>
        <p>
          Retorna a lista de filiais às quais um usuário específico tem acesso, conforme o cadastro
          de permissões. Recebe um objeto <code>Usuario2_Transp</code> no body com o identificador
          do usuário.
        </p>

        <h4>Modelo do Body — Usuario2_Transp (campos principais)</h4>
        <table className="data-table">
          <thead>
            <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Nome_Usuario</code></td><td>string</td><td>Login do usuário. Chave primária para consulta.</td></tr>
            <tr><td><code>Codigo_Empresa</code></td><td>string</td><td>Código da empresa do usuário.</td></tr>
            <tr><td><code>Codigo_Filial</code></td><td>string</td><td>Filial padrão do usuário.</td></tr>
            <tr><td><code>Codigo_Grupo</code></td><td>string</td><td>Grupo de acesso do usuário.</td></tr>
            <tr><td><code>Ativo</code></td><td>string</td><td>Status do usuário (<code>S</code> = ativo).</td></tr>
          </tbody>
        </table>

        <h4>Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/filial/buscar-lista-filiais-acesso-usuario
Authorization: Bearer {token}
Content-Type: application/json

{
  "Nome_Usuario": "joao.silva"
}`}</pre>

        <h4>Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": [],
  "data": [
    { "CD_Empresa": "001", "CD_Filial": "01", "Nome": "Filial São Paulo" },
    { "CD_Empresa": "001", "CD_Filial": "02", "Nome": "Filial Campinas" }
  ],
  "codigo": null
}`}</pre>
      </section>

    </div>
  );

  return (
    <GenericContent
      title="Mantran.API — Filial"
      content={content}
    />
  );
};

export default MantranAPI_Filial;
