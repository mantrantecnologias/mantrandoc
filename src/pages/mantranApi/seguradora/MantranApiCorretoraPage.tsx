import GenericContent from "@shared/components/GenericContent";
import { API_BASE_URL } from "@shared/config/apiConfig";
import TokenNotice from "@shared/components/TokenNotice";
import ApiErrorReference from "@shared/components/ApiErrorReference";

function MantranApiCorretoraPage() {
  const content = (
    <div className="conteudo-div">
      <TokenNotice />

      <h4>Documentação Técnica — Corretora</h4>

      {/* 1. Visão Geral */}
      <section id="corretora">
        <h3>1. Visão Geral</h3>
        <p>
          Este conjunto de endpoints gerencia a consulta de corretoras/seguradoras vinculadas à empresa. A
          rota base é <code>/api/Corretora</code>.
        </p>

        <p>
          <strong>
            Criar, editar e excluir corretoras ainda não estão disponíveis nesta API — hoje só é possível
            consultar a lista.
          </strong>
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
              <td><code>/api/Corretora</code></td>
              <td>Retorna a lista paginada de corretoras da empresa logada, com filtros opcionais</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Autorização:</strong> requisições sem token válido retornam <strong>401</strong>; token
          válido sem permissão retorna <strong>403</strong>.
        </p>
      </section>

      {/* 2. Modelo de Dados */}
      <section id="corretora_modelo">
        <h3>2. Modelo de Dados</h3>
        <p>
          Não existe um DTO de requisição para esta feature — não há nada a ser enviado no corpo da
          requisição. Cada item retornado na listagem segue esta estrutura (<code>CorretoraEntity</code>):
        </p>

        <h4>2.1 Identificação</h4>
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
              <td><code>cdEmpresa</code></td>
              <td>string</td>
              <td>PK</td>
              <td>Código da empresa proprietária do cadastro.</td>
            </tr>
            <tr>
              <td><code>cdCorretora</code></td>
              <td>string</td>
              <td>PK</td>
              <td>Código identificador da corretora.</td>
            </tr>
            <tr>
              <td><code>nome</code></td>
              <td>string</td>
              <td>—</td>
              <td>Nome da corretora.</td>
            </tr>
            <tr>
              <td><code>cgcCpf</code></td>
              <td>string</td>
              <td>—</td>
              <td>CNPJ ou CPF da corretora.</td>
            </tr>
          </tbody>
        </table>

        <h4>2.2 Endereço e Contato</h4>
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
              <td><code>cidade</code></td>
              <td>string</td>
              <td>Cidade da corretora.</td>
            </tr>
            <tr>
              <td><code>uf</code></td>
              <td>string</td>
              <td>Estado da corretora.</td>
            </tr>
            <tr>
              <td><code>cep</code></td>
              <td>string</td>
              <td>CEP do endereço.</td>
            </tr>
            <tr>
              <td><code>ddd</code></td>
              <td>string</td>
              <td>DDD do telefone.</td>
            </tr>
            <tr>
              <td><code>fone</code></td>
              <td>string</td>
              <td>Telefone.</td>
            </tr>
          </tbody>
        </table>

        <h4>2.3 Apólices, Custos e Índices</h4>
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
              <td><code>apoliceRc</code></td>
              <td>string</td>
              <td>Número da apólice de responsabilidade civil.</td>
            </tr>
            <tr>
              <td><code>apoliceRr</code></td>
              <td>string</td>
              <td>Número da apólice de roubo e furto.</td>
            </tr>
            <tr>
              <td><code>apoliceAp</code></td>
              <td>string</td>
              <td>Número da apólice de acidentes pessoais.</td>
            </tr>
            <tr>
              <td><code>apoliceDc</code></td>
              <td>string</td>
              <td>Número da apólice de danos à carga.</td>
            </tr>
            <tr>
              <td><code>custoRc</code></td>
              <td>decimal</td>
              <td>Custo do seguro de responsabilidade civil.</td>
            </tr>
            <tr>
              <td><code>custoRr</code></td>
              <td>decimal</td>
              <td>Custo do seguro de roubo e furto.</td>
            </tr>
            <tr>
              <td><code>custoDc</code></td>
              <td>decimal</td>
              <td>Custo do seguro de danos à carga.</td>
            </tr>
            <tr>
              <td><code>indexador</code></td>
              <td>string</td>
              <td>Indexador aplicado aos valores da apólice.</td>
            </tr>
            <tr>
              <td><code>indiceFat</code></td>
              <td>decimal</td>
              <td>Índice de fatoração.</td>
            </tr>
            <tr>
              <td><code>indiceApm</code></td>
              <td>decimal</td>
              <td>Índice de apuração mensal.</td>
            </tr>
            <tr>
              <td><code>txRcfdc</code></td>
              <td>decimal</td>
              <td>Taxa de RCF-DC.</td>
            </tr>
            <tr>
              <td><code>rcfDcBas</code></td>
              <td>decimal</td>
              <td>Valor base do RCF-DC.</td>
            </tr>
            <tr>
              <td><code>rcfDcAss</code></td>
              <td>decimal</td>
              <td>Valor assegurado do RCF-DC.</td>
            </tr>
            <tr>
              <td><code>iofRctrc</code></td>
              <td>decimal</td>
              <td>IOF sobre o RCTR-C.</td>
            </tr>
            <tr>
              <td><code>iofRcfdc</code></td>
              <td>decimal</td>
              <td>IOF sobre o RCF-DC.</td>
            </tr>
            <tr>
              <td><code>iofApm</code></td>
              <td>decimal</td>
              <td>IOF sobre a apuração mensal.</td>
            </tr>
            <tr>
              <td><code>pisoApm</code></td>
              <td>decimal</td>
              <td>Valor piso da apuração mensal.</td>
            </tr>
            <tr>
              <td><code>percAgravacao</code></td>
              <td>decimal</td>
              <td>Percentual de agravamento do seguro.</td>
            </tr>
            <tr>
              <td><code>vrCobertura</code></td>
              <td>decimal</td>
              <td>Valor de cobertura do seguro.</td>
            </tr>
            <tr>
              <td><code>dtVencimento</code></td>
              <td>DateTime</td>
              <td>Data de vencimento da apólice.</td>
            </tr>
          </tbody>
        </table>

        <p>
          Todos os campos numéricos e a data de vencimento são anuláveis (<code>null</code> quando não
          preenchidos no cadastro).
        </p>
      </section>

      {/* 3. GET listar */}
      <section id="corretora_listar">
        <h3>3. GET — Listar Corretoras</h3>
        <p>
          Retorna a lista paginada de corretoras cadastradas para a empresa do usuário autenticado. O
          parâmetro <code>search</code> filtra por <code>cdCorretora</code> ou <code>nome</code>.
        </p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Parâmetro</th>
              <th>Tipo</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>page</code></td>
              <td>int</td>
              <td>Número da página (padrão: 1)</td>
            </tr>
            <tr>
              <td><code>pageSize</code></td>
              <td>int</td>
              <td>Quantidade de itens por página</td>
            </tr>
            <tr>
              <td><code>search</code></td>
              <td>string</td>
              <td>Texto livre de busca — aplicado em <code>cdCorretora</code> e <code>nome</code></td>
            </tr>
            <tr>
              <td><code>orderBy</code></td>
              <td>string</td>
              <td>Nome da coluna para ordenação</td>
            </tr>
            <tr>
              <td><code>descending</code></td>
              <td>bool</td>
              <td>Define se a ordenação é decrescente</td>
            </tr>
          </tbody>
        </table>

        <h4>3.1 Requisição</h4>
        <pre className="code-block">{`GET ${API_BASE_URL}/api/Corretora?page=1&pageSize=20
Authorization: Bearer {token_jwt}`}</pre>

        <h4>3.2 Resposta — 200 OK</h4>
        <pre className="code-block">{`{
  "hasNext": false,
  "page": 1,
  "pageSize": 20,
  "items": [
    {
      "cdEmpresa": "001",
      "cdCorretora": "001",
      "nome": "Corretora Exemplo",
      "cidade": "São Paulo",
      "uf": "SP",
      "cep": "01310-100",
      "ddd": "11",
      "fone": "12345678",
      "apoliceRc": "RC-2026-001",
      "apoliceRr": null,
      "apoliceAp": null,
      "apoliceDc": null,
      "custoRc": null,
      "custoRr": null,
      "custoDc": null,
      "indexador": null,
      "indiceFat": 1.25,
      "indiceApm": null,
      "txRcfdc": null,
      "rcfDcBas": null,
      "rcfDcAss": null,
      "iofRctrc": null,
      "iofRcfdc": null,
      "iofApm": null,
      "pisoApm": null,
      "percAgravacao": 5.5,
      "vrCobertura": 1000000.00,
      "cgcCpf": "12.345.678/0001-90",
      "dtVencimento": "2026-12-31T00:00:00"
    }
  ]
}`}</pre>
      </section>


      <ApiErrorReference />
    </div>
  );

  return <GenericContent title="Mantran.Applications - API — Corretora" content={content} />;
}

export default MantranApiCorretoraPage;
