import React, { useEffect } from 'react';
import GenericContent from '../GenericContent';
import { API_BASE_URL } from '../../config/apiConfig';

const MantranAPI_ModeloVeiculo = ({ scrollToSection, onNavigateToGerarToken }) => {

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

      <h4>Documentação Técnica — Modelo de Veículo (TMS Web)</h4>

      {/* 1. Visão Geral */}
      <section id="mantran_api_modelo_veiculo">
        <h3>1. Visão Geral</h3>
        <p>
          Os endpoints de <strong>Modelo de Veículo</strong> gerenciam o cadastro de modelos de veículos da plataforma TMS Web.
          Esta documentação é pública e detalha os endpoints disponíveis para a integração e manutenção dessas entidades.
          Todos os endpoints exigem autenticação baseada em token JWT com a role <code>tms_web</code> e utilizam o isolamento multi-tenant da plataforma.
          As respostas seguem o envelope padrão estruturado em JSON com as propriedades <code>sucesso</code>, <code>mensagem</code> e <code>data</code>.
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
              <td><code>POST</code></td>
              <td><code>/api/VeiculoModelo/buscar-lista-modelo</code></td>
              <td>Retorna a lista completa de modelos de veículos cadastrados</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/VeiculoModelo/incluir-modelo</code></td>
              <td>Inclui um novo modelo de veículo no sistema</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/VeiculoModelo/alterar-modelo</code></td>
              <td>Altera os dados de um modelo de veículo existente</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/api/VeiculoModelo/excluir-modelo</code></td>
              <td>Exclui um modelo de veículo do cadastro</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Autorização:</strong> todos os endpoints requerem o header <code>Authorization: Bearer {'{token_jwt}'}</code>.
          Requisições sem token válido retornarão status <strong>401 Unauthorized</strong>.
        </p>
      </section>

      {/* 2. Modelo de Dados */}
      <section id="modelo_veiculo_modelo">
        <h3>2. Modelo de Dados (JSON DTO)</h3>
        <p>
          Estrutura do modelo de dados JSON utilizada para representar as propriedades de um modelo de veículo (<code>Veiculo_Modelo_Transp</code>) tanto nas requisições como nas respostas.
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
              <td><code>CD_Modelo</code></td>
              <td>string</td>
              <td>Código identificador exclusivo do modelo de veículo. Chave principal para buscas, alterações e exclusões.</td>
            </tr>
            <tr>
              <td><code>Descricao</code></td>
              <td>string</td>
              <td>Descrição ou nome amigável do modelo do veículo.</td>
            </tr>
            <tr>
              <td><code>CD_Empresa</code></td>
              <td>string</td>
              <td>Código da empresa associada a este modelo de veículo.</td>
            </tr>
          </tbody>
        </table>

        <p><strong>Exemplo de objeto JSON completo:</strong></p>
        <pre className="code-block">{`{
  "CD_Modelo": "MOD001",
  "Descricao": "FH 540 Globetrotter 6x4",
  "CD_Empresa": "001"
}`}</pre>
      </section>

      {/* 3. POST buscar-lista-modelo */}
      <section id="modelo_veiculo_buscar_lista">
        <h3>3. POST — buscar-lista-modelo</h3>
        <p>
          Retorna a lista completa de todos os modelos de veículos cadastrados na base de dados do cliente ativo.
          Não requer parâmetros adicionais no corpo da requisição.
        </p>

        <h4>3.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/VeiculoModelo/buscar-lista-modelo
Authorization: Bearer {token_jwt}
Content-Type: application/json

{}`}</pre>

        <h4>3.2 Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": [],
  "data": [
    {
      "CD_Modelo": "MOD001",
      "Descricao": "FH 540 Globetrotter 6x4",
      "CD_Empresa": "001"
    },
    {
      "CD_Modelo": "MOD002",
      "Descricao": "Actros 2651 6x4",
      "CD_Empresa": "001"
    }
  ],
  "codigo": null
}`}</pre>
      </section>

      {/* 4. POST incluir-modelo */}
      <section id="modelo_veiculo_incluir">
        <h3>4. POST — incluir-modelo</h3>
        <p>
          Inclui um novo modelo de veículo no cadastro do sistema.
          Requer o envio do objeto JSON contendo as propriedades completas no corpo da requisição.
        </p>

        <h4>4.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/VeiculoModelo/incluir-modelo
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Modelo": "MOD002",
  "Descricao": "Actros 2651 6x4",
  "CD_Empresa": "001"
}`}</pre>

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
              <td>"Modelo de veículo incluído com sucesso"</td>
            </tr>
            <tr>
              <td>500</td>
              <td>false</td>
              <td>"Erro ao incluir modelo de veículo"</td>
            </tr>
          </tbody>
        </table>

        <pre className="code-block">{`// Sucesso
{
  "sucesso": true,
  "mensagem": ["Modelo de veículo incluído com sucesso"],
  "data": null,
  "codigo": null
}

// Erro
{
  "sucesso": false,
  "mensagem": ["Erro ao incluir modelo de veículo"],
  "data": null,
  "codigo": 500
}`}</pre>
      </section>

      {/* 5. POST alterar-modelo */}
      <section id="modelo_veiculo_alterar">
        <h3>5. POST — alterar-modelo</h3>
        <p>
          Altera os dados de um modelo de veículo já existente no sistema.
          O campo <code>CD_Modelo</code> identifica qual registro será alterado.
        </p>

        <h4>5.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/VeiculoModelo/alterar-modelo
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Modelo": "MOD002",
  "Descricao": "Actros 2651 6x4 Evolution",
  "CD_Empresa": "001"
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
              <td>"Veiculo alterado com sucesso"</td>
            </tr>
            <tr>
              <td>500</td>
              <td>false</td>
              <td>"Erro ao alterar Veiculo"</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 6. POST excluir-modelo */}
      <section id="modelo_veiculo_excluir">
        <h3>6. POST — excluir-modelo</h3>
        <p>
          Remove um modelo de veículo do cadastro.
          Deve ser enviado o objeto JSON com o campo <code>CD_Modelo</code> no corpo da requisição para identificar qual registro será excluído.
        </p>

        <h4>6.1 Requisição</h4>
        <pre className="code-block">{`POST ${API_BASE_URL}/api/VeiculoModelo/excluir-modelo
Authorization: Bearer {token_jwt}
Content-Type: application/json

{
  "CD_Modelo": "MOD002"
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
              <td>"Veiculo excluído com sucesso"</td>
            </tr>
            <tr>
              <td>500</td>
              <td>false</td>
              <td>"Erro ao excluir Veiculo"</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );

  return (
    <GenericContent
      title="Mantran.API — Modelo de Veículo"
      content={content}
    />
  );
};

export default MantranAPI_ModeloVeiculo;
