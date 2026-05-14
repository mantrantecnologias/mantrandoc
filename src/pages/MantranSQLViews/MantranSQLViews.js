import React, { useEffect } from 'react';
import GenericContent from '../GenericContent';

const MantranSQLViews = ({ scrollToSection }) => {

  // Rola até a section quando vindo da busca
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

      <section id="section_buscar_dados_view">
        <h3>1. Autenticação</h3>
        <p><strong>1.1. Endpoint de exemplo:</strong> <code>http://api.mantran.eti.br:35395/Token</code></p>
        <p><strong>Headers:</strong> <code>Content-Type: application/json</code></p>
        <p><strong>1.2. Exemplo de Request:</strong></p>

        {/* 
        <pre className="code-block">{`{
        "usuario": "TESTEAMALOG",
        "senha": "WIjEkqqNhmlfMhE"
        }`}</pre> */}
        
        <pre className="code-block">{`{
"usuario": "teste-exemplo",
"senha": "senha-exemplo"
}`}</pre>

        <p><strong>1.3. Exemplo de Response:</strong></p>
        <pre className="code-block">{`[HTTP Status 200]
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "erros": []
}`}</pre>
      </section>

      <section id="section_buscar_dados">
        <h3>2. Buscar Dados da View</h3>

        <p><strong>2.1. Endpoint de exemplo:</strong> <code>http://api.mantran.eti.br:35395/ReportData</code></p>
        <p><strong>Headers:</strong></p>
        <ul>
          <li><code>Authorization: Bearer &lt;Token&gt;</code></li>
          <li><code>Content-Type: application/json</code></li>
        </ul>

        
         <p><strong>2.2. Exemplo de Request:</strong></p>
        <a
          href='../sqlview/Payload_Request_View.json'
          download="Payload_Request_View.json"
          className="download-button"
        >
          Baixar Payload_Request_View.json
        </a> 

        <p><strong>2.3. Lista de Propriedades e Tipos:</strong></p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Campo</th>
              <th>Tipo de Dado</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>view</td><td>STRING</td></tr>
            <tr><td>filters</td><td>ARRAY</td></tr>
            <tr><td>filters.field</td><td>STRING</td></tr>
            <tr><td>filters.operator</td><td>STRING</td></tr>
            <tr><td>filters.value</td><td>STRING</td></tr>
            <tr><td>filters.values[]</td><td>ARRAY</td></tr>
            
          </tbody>
        </table>
                <p><strong>Tipos de Operadores:</strong> Equal, LessOrEqual, NotEqual, Between, Greater, In,
        GreaterOrEqual, Like e Less</p>

        

  <p><strong>Definição dos operadores:</strong></p>
  <ul>
          <li>  <div>Equal (=) → Igualdade exata. Ex: status = 'ativo' busca só os 'ativos'.</div>
</li>
          <li>  <div>NotEqual (!= ou &lt;&gt;) → Diferente. Ex: status != 'inativo' traz todos exceto os 'inativos'.</div>
</li>         
          <li>  <div>Greater (&gt;) → Maior que. Ex: preco &gt; 100 (só acima de 100).</div>
</li>
          <li>  <div>GreaterOrEqual (&gt;=) → Maior ou igual. Ex: idade &gt;= 18 (inclui quem tem 18).</div>
</li>
          <li>  <div>Less (&lt;) → Menor que. Ex: estoque &lt; 10 (só abaixo de 10).</div>
</li>
          <li>  <div>LessOrEqual (&lt;=) → Menor ou igual. Ex: desconto &lt;= 30 (inclui 30%).</div>
</li>

          <li>  <div>Between → Entre dois valores. Ex: preco BETWEEN 50 AND 100 (de 50 a 100).</div>
</li>
          <li>  <div>In → Dentro de uma lista. Ex: cidade IN ('SP', 'RJ', 'MG').</div>
</li>
          <li>  <div>Like → Busca por padrão/texto. Ex: nome LIKE 'João%' (começa com "João").</div>
</li>


  </ul>

        <p><strong>2.4. Exemplos de Response:</strong></p>
        <p><strong>2.4.1. Sucesso:</strong></p>
        <a
          href='../sqlview/Payload_Response_View.json'
          download="Payload_Response_View.json"
          className="download-button"
        >
        Baixar Payload_Response_View.json
        </a>
        <pre className="code-block">{`              [HTTP Status 200]
              {
                "view": "vw_PBID_Viagem_Analitico",
                "rowCount": 1,
                "columns": [
                  { "name": "CD_Filial", "sqlType": "STRING" },
                  { "name": "Viagem_Numero", "sqlType": "STRING" },
                  { "name": "Conhecimento_Controle", "sqlType": "STRING" }
                ],
                "data": [
                  { "CD_Filial": "001", "Viagem_Numero": "000036", "Conhecimento_Controle": null }
                ],
                "errors": []
              }`}</pre>
                      <p><strong>2.4.2. Falha:</strong></p>
                      <pre className="code-block">{`              [HTTP Status 200]
              {
                "view": "",
                "rowCount": 0,
                "columns": [],
                "data": [],
                "errors": [
                  { "description": "Token inválido" }
                ]
}`}</pre>
      </section>
    </div>
  );

  const attachments = [
    { name: 'Payload_Request_View.json', url: '../../assets/Payload_Request_View.json' }
  ];

  return (
    <GenericContent
      title="API Views x Mantran"
      content={content}
      attachments={attachments}
    />
  );
};

export default MantranSQLViews;
