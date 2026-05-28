import React, { useEffect } from 'react';
import GenericContent from '../GenericContent';
import { API_BASE_URL } from '../../config/apiConfig';

const MantranAPI_Empresa = ({ scrollToSection, onNavigateToGerarToken }) => {

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

      <h4>Documentação Técnica — EmpresaController (TMS Web)</h4>

      {/* 1. Visão Geral */}
      <section id="mantran_api_empresa">
        <h3>1. Visão Geral</h3>
        <p>
          O <code>EmpresaController</code> gerencia o cadastro de empresas da plataforma TMS Web.
          Todos os endpoints exigem autenticação com a role <code>tms_web</code> e utilizam a conexão
          multi-tenant injetada pelo <code>ConexaoMiddleware</code> via <code>HttpContext.Items["CONEXAO"]</code>.
          As respostas seguem o envelope padrão <code>Retorno_Modelo_API_Transp&lt;T&gt;</code>.
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
              <td><code>GET</code></td>
              <td><code>/api/empresa/buscar-lista-empresas</code></td>
              <td>Retorna a lista de todas as empresas cadastradas</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/empresa/buscar-empresa</code></td>
              <td>Retorna os dados de uma empresa específica</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/empresa/incluir-empresa</code></td>
              <td>Inclui uma nova empresa no cadastro</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/empresa/alterar-empresa</code></td>
              <td>Altera os dados de uma empresa existente</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/empresa/excluir-empresa</code></td>
              <td>Exclui uma empresa do cadastro</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/empresa/verifica-senha-empresa</code></td>
              <td>Verifica a senha de autorização para operações sensíveis</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Autorização:</strong> todos os endpoints requerem <code>[Authorize(Roles = "tms_web")]</code>.
          Requisições sem token válido retornam <strong>401</strong>; token válido sem a role retorna <strong>403</strong>.
        </p>
      </section>

      {/* 2. Modelo de Dados */}
      <section id="empresa_modelo">
        <h3>2. Modelo de Dados — Empresa_Transp</h3>
        <p>
          Classe de transporte utilizada como body nas requisições e como payload de retorno.
          Todos os campos são opcionais no envio, mas <code>CD_Empresa</code> é necessário para
          operações de busca, alteração e exclusão.
        </p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Campo</th>
              <th>Tipo</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>CD_Empresa</code></td>
              <td>string</td>
              <td>Código identificador da empresa. Chave principal para busca, alteração e exclusão.</td>
            </tr>
            <tr>
              <td><code>Sigla</code></td>
              <td>string</td>
              <td>Sigla abreviada da empresa.</td>
            </tr>
            <tr>
              <td><code>CGC_CPF</code></td>
              <td>string</td>
              <td>CNPJ ou CPF da empresa.</td>
            </tr>
            <tr>
              <td><code>IE</code></td>
              <td>string</td>
              <td>Inscrição Estadual.</td>
            </tr>
            <tr>
              <td><code>Razao_Social</code></td>
              <td>string</td>
              <td>Razão social completa da empresa.</td>
            </tr>
            <tr>
              <td><code>Fantasia</code></td>
              <td>string</td>
              <td>Nome fantasia.</td>
            </tr>
            <tr>
              <td><code>Endereco</code></td>
              <td>string</td>
              <td>Logradouro e número.</td>
            </tr>
            <tr>
              <td><code>Bairro</code></td>
              <td>string</td>
              <td>Bairro.</td>
            </tr>
            <tr>
              <td><code>Cidade</code></td>
              <td>string</td>
              <td>Cidade.</td>
            </tr>
            <tr>
              <td><code>UF</code></td>
              <td>string</td>
              <td>Unidade federativa (2 caracteres, ex: <code>SP</code>).</td>
            </tr>
            <tr>
              <td><code>CEP</code></td>
              <td>string</td>
              <td>CEP.</td>
            </tr>
            <tr>
              <td><code>DDD</code></td>
              <td>string</td>
              <td>DDD do telefone principal.</td>
            </tr>
            <tr>
              <td><code>Fone</code></td>
              <td>string</td>
              <td>Número do telefone principal.</td>
            </tr>
            <tr>
              <td><code>DDD_Fax</code></td>
              <td>string</td>
              <td>DDD do fax.</td>
            </tr>
            <tr>
              <td><code>FAX</code></td>
              <td>string</td>
              <td>Número do fax.</td>
            </tr>
            <tr>
              <td><code>E_Mail</code></td>
              <td>string</td>
              <td>Endereço de e-mail da empresa.</td>
            </tr>
            <tr>
              <td><code>FL_Cooperativa</code></td>
              <td>bool</td>
              <td>Indica se a empresa opera no modelo de cooperativa.</td>
            </tr>
            <tr>
              <td><code>PC_Cooperativa</code></td>
              <td>string</td>
              <td>Percentual da cooperativa (quando <code>FL_Cooperativa = true</code>).</td>
            </tr>
            <tr>
              <td><code>Site</code></td>
              <td>string</td>
              <td>URL do site da empresa.</td>
            </tr>
            <tr>
              <td><code>FL_Trabalha_Cidade_Filial_Atendimento</code></td>
              <td>bool</td>
              <td>Define se a empresa opera por cidade de filial de atendimento.</td>
            </tr>
          </tbody>
        </table>

        <p><strong>Exemplo de objeto JSON completo:</strong></p>
        <pre className="code-block">{`{
  "CD_Empresa": "001",
  "Sigla": "MNT",
  "CGC_CPF": "00.000.000/0001-00",
  "IE": "123.456.789.000",
  "Razao_Social": "Mantran Transportes Ltda",
  "Fantasia": "Mantran",
  "Endereco": "Rua das Transportadoras, 100",
  "Bairro": "Centro",
  "Cidade": "São Paulo",
  "UF": "SP",
  "CEP": "01000-000",
  "DDD": "11",
  "Fone": "99999-9999",
  "DDD_Fax": "11",
  "FAX": "3333-3333",
  "E_Mail": "contato@mantran.com.br",
  "FL_Cooperativa": false,
  "PC_Cooperativa": null,
  "Site": "www.mantran.com.br",
  "FL_Trabalha_Cidade_Filial_Atendimento": false
}`}</pre>
      </section>

      {/* 3. GET buscar-lista-empresas */}
      <section id="empresa_buscar_lista">
        <h3>3. GET — buscar-lista-empresas</h3>
        <p>
          Retorna a lista completa de empresas cadastradas na base do cliente autenticado.
          Não exige body na requisição.
        </p>

        <h4>3.1 Requisição</h4>
        <pre className="code-block">{`GET ${API_BASE_URL}/api/empresa/buscar-lista-empresas
Authorization: Bearer {token_jwt}`}</pre>

        <h4>3.2 Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": ["Empresas carregadas com sucesso"],
  "data": [
    {
      "CD_Empresa": "001",
      "Sigla": "MNT",
      "Razao_Social": "Mantran Transportes Ltda",
      "CGC_CPF": "00.000.000/0001-00",
      "Cidade": "São Paulo",
      "UF": "SP"
    }
  ],
  "codigo": null
}`}</pre>

        <h4>3.3 Implementação</h4>
        <pre className="code-block">{`[Authorize( Roles = "tms_web" )]
[HttpGet( "buscar-lista-empresas" )]
public async Task<IActionResult> BuscarListaEmpresas()
{
    var obj_cn = GetItem<Conexao_Transp>( "CONEXAO" );
    var lista  = await _negocio.Carregar_Lista_Empresas( obj_cn );
    return Resposta(
        Retorno_Modelo_API_Transp<List<Empresa_Transp>>.Ok( lista, "Empresas carregadas com sucesso" )
    );
}`}</pre>
      </section>

      {/* 4. POST buscar-empresa */}
      <section id="empresa_buscar">
        <h3>4. POST — buscar-empresa</h3>
        <p>
          Retorna os dados completos de uma empresa específica. O campo <code>CD_Empresa</code> deve
          ser informado no body para identificar o registro.
        </p>

        <h4>4.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/empresa/buscar-empresa
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Empresa": "001"
}`}</pre>

        <h4>4.2 Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": [],
  "data": {
    "CD_Empresa": "001",
    "Sigla": "MNT",
    "CGC_CPF": "00.000.000/0001-00",
    "Razao_Social": "Mantran Transportes Ltda",
    "Fantasia": "Mantran",
    "Endereco": "Rua das Transportadoras, 100",
    "Cidade": "São Paulo",
    "UF": "SP",
    "FL_Cooperativa": false
  },
  "codigo": null
}`}</pre>

        <h4>4.3 Implementação</h4>
        <pre className="code-block">{`[Authorize( Roles = "tms_web" )]
[HttpPost( "buscar-empresa" )]
public async Task<IActionResult> BuscarEmpresa( [FromBody] Empresa_Transp empresa )
{
    var obj_cn = GetItem<Conexao_Transp>( "CONEXAO" );
    empresa    = await _negocio.Buscar_Empresa( empresa, obj_cn );
    return Resposta(
        Retorno_Modelo_API_Transp<Empresa_Transp>.Ok( empresa )
    );
}`}</pre>
      </section>

      {/* 5. POST incluir-empresa */}
      <section id="empresa_incluir">
        <h3>5. POST — incluir-empresa</h3>
        <p>
          Inclui uma nova empresa na base do cliente. Envia o objeto <code>Empresa_Transp</code>
          completo no body. Retorna <code>data: null</code> em caso de sucesso.
        </p>

        <h4>5.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/empresa/incluir-empresa
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Empresa": "002",
  "Sigla": "ABC",
  "CGC_CPF": "11.111.111/0001-11",
  "Razao_Social": "Transportes ABC Ltda",
  "Fantasia": "ABC Trans",
  "Cidade": "Campinas",
  "UF": "SP",
  "FL_Cooperativa": false,
  "FL_Trabalha_Cidade_Filial_Atendimento": true
}`}</pre>

        <h4>5.2 Respostas</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>sucesso</th>
              <th>Mensagem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>200 OK</td>
              <td>true</td>
              <td>"Empresa incluída com sucesso"</td>
            </tr>
            <tr>
              <td>500</td>
              <td>false</td>
              <td>"Erro ao incluir empresa"</td>
            </tr>
          </tbody>
        </table>

        <pre className="code-block">{`// Sucesso
{
  "sucesso": true,
  "mensagem": ["Empresa incluída com sucesso"],
  "data": null,
  "codigo": null
}

// Erro
{
  "sucesso": false,
  "mensagem": ["Erro ao incluir empresa"],
  "data": null,
  "codigo": 500
}`}</pre>

        <h4>5.3 Implementação</h4>
        <pre className="code-block">{`[Authorize( Roles = "tms_web" )]
[HttpPost( "incluir-empresa" )]
public async Task<IActionResult> IncluirEmpresa( [FromBody] Empresa_Transp empresa )
{
    var obj_cn = GetItem<Conexao_Transp>( "CONEXAO" );

    var retorno = _negocio.Incluir_Registro_Empresa( empresa, obj_cn )
        ? Retorno_Modelo_API_Transp<object>.Ok( null, "Empresa incluída com sucesso" )
        : Retorno_Modelo_API_Transp<object>.Erro( "Erro ao incluir empresa", 500 );

    return Resposta( retorno );
}`}</pre>
      </section>

      {/* 6. POST alterar-empresa */}
      <section id="empresa_alterar">
        <h3>6. POST — alterar-empresa</h3>
        <p>
          Atualiza os dados de uma empresa existente. O campo <code>CD_Empresa</code> identifica
          o registro a ser alterado. Envia o objeto <code>Empresa_Transp</code> completo com os
          campos atualizados.
        </p>

        <h4>6.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/empresa/alterar-empresa
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Empresa": "002",
  "Razao_Social": "Transportes ABC S/A",
  "Fantasia": "ABC Transportes",
  "E_Mail": "contato@abctrans.com.br",
  "Site": "www.abctrans.com.br"
}`}</pre>

        <h4>6.2 Respostas</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>sucesso</th>
              <th>Mensagem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>200 OK</td>
              <td>true</td>
              <td>"Empresa alterada com sucesso"</td>
            </tr>
            <tr>
              <td>500</td>
              <td>false</td>
              <td>"Erro ao alterar empresa"</td>
            </tr>
          </tbody>
        </table>

        <h4>6.3 Implementação</h4>
        <pre className="code-block">{`[Authorize( Roles = "tms_web" )]
[HttpPost( "alterar-empresa" )]
public async Task<IActionResult> AlterarEmpresa( [FromBody] Empresa_Transp empresa )
{
    var obj_cn = GetItem<Conexao_Transp>( "CONEXAO" );

    var retorno = _negocio.Alterar_Registro_Empresa( empresa, obj_cn )
        ? Retorno_Modelo_API_Transp<object>.Ok( null, "Empresa alterada com sucesso" )
        : Retorno_Modelo_API_Transp<object>.Erro( "Erro ao alterar empresa", 500 );

    return Resposta( retorno );
}`}</pre>
      </section>

      {/* 7. POST excluir-empresa */}
      <section id="empresa_excluir">
        <h3>7. POST — excluir-empresa</h3>
        <p>
          Exclui uma empresa do cadastro. Enviar ao menos <code>CD_Empresa</code> no body
          para identificar o registro a ser removido.
        </p>

        <h4>7.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/empresa/excluir-empresa
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Empresa": "002"
}`}</pre>

        <h4>7.2 Respostas</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>sucesso</th>
              <th>Mensagem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>200 OK</td>
              <td>true</td>
              <td>"Empresa excluída com sucesso"</td>
            </tr>
            <tr>
              <td>500</td>
              <td>false</td>
              <td>"Erro ao excluir empresa"</td>
            </tr>
          </tbody>
        </table>

        <h4>7.3 Implementação</h4>
        <pre className="code-block">{`[Authorize( Roles = "tms_web" )]
[HttpPost( "excluir-empresa" )]
public async Task<IActionResult> ExcluirEmpresa( [FromBody] Empresa_Transp empresa )
{
    var obj_cn = GetItem<Conexao_Transp>( "CONEXAO" );

    var retorno = _negocio.Excluir_Registro_Empresa( empresa, obj_cn )
        ? Retorno_Modelo_API_Transp<object>.Ok( null, "Empresa excluída com sucesso" )
        : Retorno_Modelo_API_Transp<object>.Erro( "Erro ao excluir empresa", 500 );

    return Resposta( retorno );
}`}</pre>
      </section>

      {/* 8. POST verifica-senha-empresa */}
      <section id="empresa_verifica_senha">
        <h3>8. POST — verifica-senha-empresa</h3>
        <p>
          Endpoint de autorização extra para operações sensíveis de configuração de empresa.
          Recebe uma <code>string</code> diretamente no body (não um objeto JSON) e verifica
          contra a senha mestra da plataforma. Não depende da conexão multi-tenant.
        </p>

        <h4>8.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/empresa/verifica-senha-empresa
Authorization: Bearer {token_jwt}
Content-Type: application/json

"minha_senha"`}</pre>

        <h4>8.2 Respostas</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>sucesso</th>
              <th>Mensagem</th>
              <th>Condição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>200 OK</td>
              <td>true</td>
              <td>"Autorizado"</td>
              <td>Senha correta (após <code>ToUpper().Trim()</code>)</td>
            </tr>
            <tr>
              <td>401</td>
              <td>false</td>
              <td>"Não autorizado"</td>
              <td>Senha incorreta</td>
            </tr>
          </tbody>
        </table>

        <pre className="code-block">{`// Autorizado
{
  "sucesso": true,
  "mensagem": ["Autorizado"],
  "data": null,
  "codigo": null
}

// Não autorizado
{
  "sucesso": false,
  "mensagem": ["Não autorizado"],
  "data": null,
  "codigo": 401
}`}</pre>

        <h4>8.3 Implementação</h4>
        <pre className="code-block">{`[Authorize( Roles = "tms_web" )]
[HttpPost( "verifica-senha-empresa" )]
public async Task<IActionResult> VerificaSenhaEmpresa( [FromBody] string senha )
{
    var retorno = senha.ToUpper().Trim() == "@@M4NTR4N##"
        ? Retorno_Modelo_API_Transp<object>.Ok( null, "Autorizado" )
        : Retorno_Modelo_API_Transp<object>.Erro( "Não autorizado", 401 );

    return Resposta( retorno );
}`}</pre>
      </section>

    </div>
  );

  return (
    <GenericContent
      title="Mantran.API — Empresa"
      content={content}
    />
  );
};

export default MantranAPI_Empresa;
