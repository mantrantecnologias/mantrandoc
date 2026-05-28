import React, { useEffect } from 'react';
import GenericContent from '../GenericContent';
import { API_BASE_URL } from '../../config/apiConfig';

const MantranAPI_VeiculoCarroceria = ({ scrollToSection, onNavigateToGerarToken }) => {

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

      <h4>Documentação Técnica — Carroceria</h4>

      {/* 1. Visão Geral */}
      <section id="mantran_api_veiculo_carroceria">
        <h3>1. Visão Geral</h3>
        <p>Este conjunto de endpoints gerencia o cadastro de tipos de carroceria de veículos.
          O tipo de carroceria é um dos dados associados ao cadastro de veículos.
          <br />A rota base comum a estes endpoints é <code>/api/VeiculoCarroceria</code>.</p>
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
              <td><code>POST</code></td>
              <td><code>/api/VeiculoCarroceria/buscar-lista-carroceria</code></td>
              <td>Retorna a lista de carrocerias cadastradas, com filtros opcionais</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/VeiculoCarroceria/incluir-carroceria</code></td>
              <td>Inclui um novo tipo de carroceria no cadastro</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/VeiculoCarroceria/alterar-carroceria</code></td>
              <td>Altera os dados de uma carroceria existente</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/VeiculoCarroceria/excluir-carroceria</code></td>
              <td>Exclui uma carroceria do cadastro</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Autorização:</strong> requisições sem token válido retornam <strong>401</strong>; token válido sem a role retorna <strong>403</strong>.
        </p>
      </section>

      {/* 2. Modelo de Dados */}
      <section id="veiculo_carroceria_modelo">
        <h3>2. Corpo de Requisição</h3>
        <p>
          O body das requisições e o payload de retorno seguem este mesmo padrão:
        </p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Campo</th>
              <th>Tipo</th>
              <th>Chave</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>CD_Carroceria</code></td>
              <td>string</td>
              <td>PK</td>
              <td>Código identificador da carroceria.</td>
            </tr>
            <tr>
              <td><code>Descricao</code></td>
              <td>string</td>
              <td>—</td>
              <td>Descrição do tipo de carroceria (ex: <code>Baú</code>, <code>Graneleiro</code>, <code>Sider</code>).</td>
            </tr>
            <tr>
              <td><code>CD_Empresa</code></td>
              <td>string</td>
              <td>PK</td>
              <td>Código da empresa proprietária do cadastro.</td>
            </tr>
          </tbody>
        </table>

        <p>Os campos <code>CD_Carroceria</code> e <code>CD_Empresa</code> são obrigatórios nas operações de
          alteração e exclusão. O campo <code>Descricao</code> é obrigatório na inclusão.</p>


        <p><strong>Exemplo de objeto JSON completo:</strong></p>
        <pre className="code-block">{`{
  "CD_Carroceria": "01",
  "Descricao": "Baú Fechado",
  "CD_Empresa": "001"
}`}</pre>
      </section>

      {/* 3. POST buscar-lista-carroceria */}
      <section id="veiculo_carroceria_buscar_lista">
        <h3>3. POST — buscar-lista-carroceria</h3>
        <p>
          Retorna a lista de carrocerias cadastradas para o cliente autenticado.
          O body aceita o objeto padrão com campos que podem opcionalmente serem preenchidos
          para aplicar filtros. Quando um objeto vazio (<code>{'{}'}</code>) é enviado,
          todos os registros são retornados.
        </p>

        <h4>3.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/VeiculoCarroceria/buscar-lista-carroceria
Authorization: Bearer {token_jwt}
Content-Type: application/json

// Sem filtro — retorna todas as carrocerias:
{}

// Com filtro por empresa:
{
  "CD_Empresa": "001"
}`}</pre>
        <br />
        <h4>3.2 Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": [],
  "data": [
    {
      "CD_Carroceria": "01",
      "Descricao": "Baú Fechado",
      "CD_Empresa": "001"
    },
    {
      "CD_Carroceria": "02",
      "Descricao": "Graneleiro",
      "CD_Empresa": "001"
    },
    {
      "CD_Carroceria": "03",
      "Descricao": "Sider",
      "CD_Empresa": "001"
    }
  ],
  "codigo": null
}`}</pre>

      </section>

      {/* 4. POST incluir-carroceria */}
      <section id="veiculo_carroceria_incluir">
        <h3>4. POST — incluir-carroceria</h3>
        <p>
          Inclui um novo tipo de carroceria para a relação do cliente. Os campos{' '}
          <code>CD_Carroceria</code>, <code>Descricao</code> e <code>CD_Empresa</code> são
          necessários.
        </p>

        <h4>4.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/VeiculoCarroceria/incluir-carroceria
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Carroceria": "01",
  "Descricao": "Plataforma",
  "CD_Empresa": "001"
}`}</pre>

        <br />
        <h4>4.2 Respostas</h4>
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
              <td>"Carroceria incluída com sucesso"</td>
            </tr>
            <tr>
              <td>500</td>
              <td>false</td>
              <td>"Erro ao incluir carroceria"</td>
            </tr>
          </tbody>
        </table>

        <pre className="code-block">{`// Sucesso
{
  "sucesso": true,
  "mensagem": ["Carroceria incluída com sucesso"],
  "data": null,
  "codigo": null
}

// Erro
{
  "sucesso": false,
  "mensagem": ["Erro ao incluir carroceria"],
  "data": null,
  "codigo": 500
}`}</pre>
      </section>

      {/* 5. POST alterar-carroceria */}
      <section id="veiculo_carroceria_alterar">
        <h3>5. POST — alterar-carroceria</h3>
        <p>
          Atualiza os dados de uma carroceria existente. Os campos <code>CD_Carroceria</code> e{' '}
          <code>CD_Empresa</code> identificam o registro a ser alterado. Envie juntamente com o campo descrição atualizado.
        </p>

        <br />
        <h4>5.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/VeiculoCarroceria/alterar-carroceria
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Carroceria": "PLT",
  "Descricao": "Plataforma Extensível",
  "CD_Empresa": "001"
}`}</pre>

        <br />
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
              <td>"Veiculo alterado com sucesso"</td>
            </tr>
            <tr>
              <td>500</td>
              <td>false</td>
              <td>"Erro ao alterar Veiculo"</td>
            </tr>
          </tbody>
        </table>

        <pre className="code-block">{`// Sucesso
{
  "sucesso": true,
  "mensagem": ["Veiculo alterado com sucesso"],
  "data": null,
  "codigo": null
}

// Erro
{
  "sucesso": false,
  "mensagem": ["Erro ao alterar Veiculo"],
  "data": null,
  "codigo": 500
}`}</pre>

      </section>

      {/* 6. POST excluir-carroceria */}
      <section id="veiculo_carroceria_excluir">
        <h3>6. POST — excluir-carroceria</h3>
        <p>
          Exclui uma carroceria do cadastro. Enviar ao menos <code>CD_Carroceria</code> e{' '}
          <code>CD_Empresa</code> no body para identificar o registro a ser removido.
        </p>

        <h4>6.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/VeiculoCarroceria/excluir-carroceria
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Carroceria": "01",
  "CD_Empresa": "001"
}`}</pre>

        <br />
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
              <td>"Veiculo excluído com sucesso"</td>
            </tr>
            <tr>
              <td>500</td>
              <td>false</td>
              <td>"Erro ao excluir Veiculo"</td>
            </tr>
          </tbody>
        </table>

        <pre className="code-block">{`// Sucesso
{
  "sucesso": true,
  "mensagem": ["Veiculo excluído com sucesso"],
  "data": null,
  "codigo": null
}

// Erro
{
  "sucesso": false,
  "mensagem": ["Erro ao excluir Veiculo"],
  "data": null,
  "codigo": 500
}`}</pre>

      </section>

      {/* 7. Respostas de erro comuns */}
      <section id="veiculo_carroceria_erros">
        <h3>7. Respostas de Erro Comuns</h3>
        <p>
          Além dos erros de negócio (código 500) documentados em cada endpoint, o pipeline
          da API pode retornar os seguintes status HTTP globais:
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>HTTP Status</th>
              <th>Situação</th>
              <th>Causa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>401 Unauthorized</strong></td>
              <td>Token ausente ou inválido</td>
              <td>Cookie <code>auth_token</code> não enviado ou expirado</td>
            </tr>
            <tr>
              <td><strong>403 Forbidden</strong></td>
              <td>Role insuficiente</td>
              <td>Token válido, mas o usuário não possui a role <code>tms_web</code></td>
            </tr>
            <tr>
              <td><strong>400 Bad Request</strong></td>
              <td>Body inválido</td>
              <td>JSON malformado ou ModelState inválido</td>
            </tr>
            <tr>
              <td><strong>500 Internal Server Error</strong></td>
              <td>Erro não tratado</td>
              <td>Exceção não capturada — detalhes no log do servidor</td>
            </tr>
          </tbody>
        </table>

      </section>

    </div >
  );

  return (
    <GenericContent
      title="Mantran.API — Veículo Carroceria"
      content={content}
    />
  );
};

export default MantranAPI_VeiculoCarroceria;
