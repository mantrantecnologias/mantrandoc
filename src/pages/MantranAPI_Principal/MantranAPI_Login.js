import React, { useEffect } from 'react';
import GenericContent from '../GenericContent';

const MantranAPI_Login = ({ scrollToSection }) => {

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
      <h4>Documentação Técnica — Arquitetura da API Mantran (TMS Web)</h4>

      {/* 1. Retorno_Modelo_API_Transp */}
      <section id="mantran_api_login">
        <h3>1. Retorno_Modelo_API_Transp&lt;T&gt;</h3>
        <p>
          Classe genérica que define o envelope padrão de todas as respostas da API. Toda resposta —
          seja de sucesso ou erro — é serializada neste modelo, garantindo que o consumidor sempre
          receba a mesma estrutura JSON, independente do endpoint chamado.
        </p>

        <h4>1.1 Propriedades</h4>
        <p>O modelo expõe quatro propriedades:</p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Propriedade</th>
              <th>Tipo</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Sucesso</code></td>
              <td>bool</td>
              <td>Indica se a operação foi concluída com êxito. Sempre presente na resposta.</td>
            </tr>
            <tr>
              <td><code>Mensagem</code></td>
              <td>List&lt;string&gt;</td>
              <td>Lista de mensagens informativas ou de erro. Suporta múltiplas mensagens simultâneas (ex: erros de validação de formulário).</td>
            </tr>
            <tr>
              <td><code>Data</code></td>
              <td>T</td>
              <td>Payload de dados tipado genericamente. Será <code>null</code> em respostas de erro.</td>
            </tr>
            <tr>
              <td><code>Codigo</code></td>
              <td>int? (opcional)</td>
              <td>Código HTTP associado ao erro. Utilizado pelo BaseController para definir o StatusCode HTTP da resposta.</td>
            </tr>
          </tbody>
        </table>

        <h4>1.2 Métodos Estáticos de Fábrica</h4>
        <p>
          Os métodos estáticos <code>Ok()</code> e <code>Erro()</code> são a forma recomendada de instanciar o modelo.
          Eles encapsulam a criação do objeto e evitam boilerplate nos controllers.
        </p>
        <pre className="code-block">{`// Resposta de sucesso com dados e mensagem opcional
public static Retorno_Modelo_API_Transp<T> Ok( T data, string mensagem = null )

// Resposta de erro com mensagem e código HTTP opcional
public static Retorno_Modelo_API_Transp<T> Erro( string mensagem, int? codigo = null )

// Adicionar mensagem após instância criada
public void AdicionarMensagem( string mensagem )

// Adicionar coleção de mensagens (ex: erros de validação)
public void AdicionarMensagens( IEnumerable<string> mensagens )`}</pre>

        <h4>1.3 Exemplos de Resposta JSON</h4>

        <p><strong>HTTP 200 OK — sucesso com lista de dados:</strong></p>
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": ["Empresas carregadas com sucesso"],
  "data": [
    { "id": 1, "razaoSocial": "Empresa ABC Ltda",     "cnpj": "00.000.000/0001-00" },
    { "id": 2, "razaoSocial": "Transportes XYZ S/A",  "cnpj": "11.111.111/0001-11" }
  ],
  "codigo": null
}`}</pre>

        <p><strong>HTTP 200 OK — sucesso sem dados (inclusão, exclusão, alteração):</strong></p>
        <pre className="code-block">{`{
  "sucesso": true,
  "mensagem": ["Empresa incluída com sucesso"],
  "data": null,
  "codigo": null
}`}</pre>

        <p><strong>HTTP 422 Unprocessable Entity — erro de validação de negócio:</strong></p>
        <pre className="code-block">{`{
  "sucesso": false,
  "mensagem": ["CNPJ inválido", "Razão social é obrigatória"],
  "data": null,
  "codigo": 422
}`}</pre>

        <p><strong>HTTP 500 Internal Server Error — erro não tratado (ambiente produção):</strong></p>
        <pre className="code-block">{`{
  "sucesso": false,
  "mensagem": ["Erro interno do servidor"],
  "data": null,
  "codigo": 500
}`}</pre>
      </section>

      {/* 2. BaseController */}
      <section id="base_controller">
        <h3>2. BaseController</h3>
        <p>
          Classe abstrata herdada por todos os controllers da API. Centraliza dois comportamentos
          transversais: a serialização da resposta HTTP a partir do modelo padrão (<code>Resposta()</code>) e o
          acesso seguro a itens injetados no contexto da requisição (<code>GetItem()</code>).
        </p>
        <pre className="code-block">{`public abstract class BaseController : ControllerBase
{
    // Converte o modelo em IActionResult com StatusCode correto
    protected IActionResult Resposta<T>( Retorno_Modelo_API_Transp<T> retorno )
        where T : class
    {
        if( !retorno.Sucesso )
            return StatusCode( retorno.Codigo ?? 400, retorno );
        return Ok( retorno );
    }

    // Recupera objeto armazenado pelo middleware no HttpContext.Items
    protected T GetItem<T>( string key )
    {
        return HttpContext.Items.ContainsKey( key )
            ? ( T )HttpContext.Items[ key ]
            : default;
    }
}`}</pre>

        <h4>2.1 Método Resposta&lt;T&gt;()</h4>
        <p>
          Recebe um <code>Retorno_Modelo_API_Transp&lt;T&gt;</code> e retorna um <code>IActionResult</code>.
          A lógica de decisão é simples:
        </p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Condição</th>
              <th>Comportamento</th>
              <th>StatusCode HTTP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>retorno.Sucesso == false</code></td>
              <td>Retorna <code>StatusCode(retorno.Codigo ?? 400, retorno)</code></td>
              <td>400 ou o código definido em <code>Codigo</code></td>
            </tr>
            <tr>
              <td><code>retorno.Sucesso == true</code></td>
              <td>Retorna <code>Ok(retorno)</code></td>
              <td>200 OK</td>
            </tr>
          </tbody>
        </table>

        <h4>2.2 Método GetItem&lt;T&gt;(key)</h4>
        <p>
          Lê o dicionário <code>HttpContext.Items</code> que é populado pelo <code>ConexaoMiddleware</code> a cada
          requisição autenticada. Retorna o objeto tipado ou <code>default(T)</code> se a chave não existir —
          evitando exceção de <code>NullReferenceException</code>.
        </p>

        <h4>2.3 Uso em Controller Concreto</h4>
        <p>Exemplo de controller herdando BaseController e utilizando os dois métodos:</p>
        <pre className="code-block">{`[ApiController]
[Route("api/[controller]")]
public class EmpresaController : BaseController
{
    [Authorize( Roles = "tms_web" )]
    [HttpGet( "buscar-lista-empresas" )]
    public async Task<IActionResult> BuscarListaEmpresas()
    {
        // 1. Recupera conexao injetada pelo ConexaoMiddleware
        var obj_cn = GetItem<Conexao_Transp>( "CONEXAO" );

        // 2. Executa logica de negocio
        var lista = await _negocio.Carregar_Lista_Empresas( obj_cn );

        // 3. Retorna usando o padrao Mantran
        return Resposta(
            Retorno_Modelo_API_Transp<List<Empresa_Transp>>.Ok( lista, "Empresas carregadas com sucesso" )
        );
    }

    [Authorize( Roles = "tms_web" )]
    [HttpPost( "incluir-empresa" )]
    public async Task<IActionResult> IncluirEmpresa( [FromBody] Empresa_Transp empresa )
    {
        var obj_cn = GetItem<Conexao_Transp>( "CONEXAO" );

        var retorno = _negocio.Incluir_Registro_Empresa( empresa, obj_cn )
            ? Retorno_Modelo_API_Transp<object>.Ok( null, "Empresa incluida com sucesso" )
            : Retorno_Modelo_API_Transp<object>.Erro( "Erro ao incluir empresa", 500 );

        return Resposta( retorno );
    }
}`}</pre>
      </section>

      {/* 3. ExceptionMiddleware */}
      <section id="exception_middleware">
        <h3>3. ExceptionMiddleware</h3>
        <p>
          Middleware de tratamento global de exceções. Envolve todo o pipeline ASP.NET Core com um bloco
          try/catch, intercepta qualquer exceção não tratada e a converte em uma resposta JSON no padrão
          <code> Retorno_Modelo_API_Transp</code>, com o StatusCode HTTP correto. Impede que stack traces
          vazem para o cliente em produção.
        </p>
        <pre className="code-block">{`public async Task Invoke( HttpContext context )
{
    try
    {
        await _next( context ); // passa para o proximo middleware
    }
    catch( ValidacaoException ex )
    {
        await HandleException( context, ex.Message, 422 );
    }
    catch( InvalidOperationException ex )
    {
        await HandleException( context, ex.Message, 400 );
    }
    catch( Exception ex )
    {
        _logger.LogError( ex, "Erro nao tratado" );
        var mensagem = _env.IsDevelopment()
            ? ex.Message
            : "Erro interno do servidor";
        await HandleException( context, mensagem, 500 );
    }
}

// Serializa a excecao no envelope padrao e escreve na response
private async Task HandleException( HttpContext context, string mensagem, int statusCode )
{
    context.Response.ContentType = "application/json";
    context.Response.StatusCode  = statusCode;
    var retorno = Retorno_Modelo_API_Transp<object>.Erro( mensagem, statusCode );
    await context.Response.WriteAsJsonAsync( retorno );
}`}</pre>

        <h4>3.1 Mapeamento Exceção → StatusCode HTTP</h4>
        <p>O middleware distingue três categorias de exceção:</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Exceção Capturada</th>
              <th>StatusCode</th>
              <th>Cenário de Uso</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>ValidacaoException</code></td>
              <td>422</td>
              <td>Violações de regra de negócio ou validação de dados de entrada. Lançada intencionalmente pela camada de Negócio.</td>
            </tr>
            <tr>
              <td><code>InvalidOperationException</code></td>
              <td>400</td>
              <td>Operação inválida. Utilizado pelo ConexaoMiddleware quando não consegue obter a conexão do usuário autenticado.</td>
            </tr>
            <tr>
              <td><code>Exception</code> (genérica)</td>
              <td>500</td>
              <td>Qualquer erro não previsto. Em Development: expõe a mensagem real. Em Production: retorna mensagem genérica.</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>⚠ Em ambiente de Production</strong>, erros genéricos retornam apenas <em>"Erro interno do servidor"</em>,
          protegendo detalhes da implementação. O erro completo é registrado via{' '}
          <code>ILogger&lt;ExceptionMiddleware&gt;</code> para rastreamento interno.
        </p>

        <h4>3.2 Lançando ValidacaoException na camada de negócio</h4>
        <p>
          Para retornar um erro 422 de qualquer ponto da aplicação, basta lançar <code>ValidacaoException</code>.
          O ExceptionMiddleware a captura e formata automaticamente:
        </p>
        <pre className="code-block">{`public void Validar_Empresa( Empresa_Transp empresa )
{
    if( string.IsNullOrWhiteSpace( empresa.RazaoSocial ) )
        throw new ValidacaoException( "Razao social e obrigatoria" );

    if( !CnpjValido( empresa.Cnpj ) )
        throw new ValidacaoException( "CNPJ invalido" );
}
// ExceptionMiddleware captura e retorna 422 automaticamente`}</pre>
      </section>

      {/* 4. ConexaoMiddleware */}
      <section id="conexao_middleware">
        <h3>4. ConexaoMiddleware</h3>
        <p>
          Responsável por carregar e injetar a conexão com o banco de dados do cliente autenticado,
          disponibilizando-a via <code>HttpContext.Items["CONEXAO"]</code> para todos os controllers. A conexão é
          criada por requisição, a partir das claims do token JWT do usuário, garantindo o isolamento
          multi-tenant da aplicação.
        </p>
        <pre className="code-block">{`public async Task Invoke( HttpContext context, Token_Servico tokenServico )
{
    var user = context.User;

    // So processa se o usuario estiver autenticado (token JWT valido)
    if( user?.Identity?.IsAuthenticated == true )
    {
        // Extrai claims do token para identificar o banco do cliente
        var obj_cn = await tokenServico.Carregar_Conexao_Usuario(
            Funcao.Chk_Nulo( user.FindFirst( JwtRegisteredClaimNames.Sub )?.Value, 1 ),
            user.FindFirst( "id_base_referencia" )?.Value,
            user.FindFirst( "nome_base_dados" )?.Value
        );

        // Falha critica: conexao nao pode ser nula
        if( obj_cn == null )
            throw new InvalidOperationException(
                "Erro ao obter conexao da base do usuario.[ConexaoMiddleware]"
            );

        // Disponibiliza para os controllers via HttpContext.Items
        context.Items[ "CONEXAO" ] = obj_cn;
    }

    await _next( context ); // continua o pipeline
}`}</pre>

        <h4>4.1 Claims do JWT Utilizadas</h4>
        <p>O middleware lê três claims do token para identificar o banco de dados do cliente:</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Claim</th>
              <th>Tipo</th>
              <th>Uso</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>sub</code></td>
              <td>JwtRegisteredClaimNames.Sub</td>
              <td>Identificador do usuário. Passado por <code>Funcao.Chk_Nulo()</code> para garantir valor não nulo.</td>
            </tr>
            <tr>
              <td><code>id_base_referencia</code></td>
              <td>string</td>
              <td>ID da base de referência do cliente no sistema multi-tenant.</td>
            </tr>
            <tr>
              <td><code>nome_base_dados</code></td>
              <td>string</td>
              <td>Nome do banco de dados do cliente. Utilizado para compor a connection string via tabela central protegida.</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>ℹ Rotas públicas</strong> (sem <code>[Authorize]</code>) não passam pelo bloco de criação de conexão —
          o middleware verifica <code>IsAuthenticated</code> antes de qualquer operação de banco.
          O pipeline continua normalmente para requisições anônimas.
        </p>

        <h4>4.2 Resposta de Erro — Falha na Conexão</h4>
        <p>
          Quando <code>obj_cn</code> retorna null, o middleware lança <code>InvalidOperationException</code>.
          O ExceptionMiddleware a captura e retorna automaticamente:
        </p>
        <pre className="code-block">{`{
  "sucesso": false,
  "mensagem": ["Erro ao obter conexao da base do usuario.[ConexaoMiddleware]"],
  "data": null,
  "codigo": 400
}`}</pre>
      </section>

      {/* 5. Pipeline */}
      <section id="pipeline_middlewares">
        <h3>5. Pipeline e Ordem dos Middlewares</h3>
        <p>
          A ordem de registro dos middlewares no pipeline do ASP.NET Core é determinística e crítica para
          o funcionamento correto da aplicação. O <code>ExceptionMiddleware</code> deve ser o primeiro middleware
          customizado, garantindo que qualquer exceção gerada nas camadas subsequentes seja interceptada
          e formatada corretamente.
        </p>
        <pre className="code-block">{`app.UseRouting();
app.UseCors( "CorsPolicy" );

app.UseMiddleware<ExceptionMiddleware>();   // captura qualquer excecao do pipeline

app.UseAuthentication();                   // valida o JWE/JWS e popula context.User
app.UseAuthorization();                    // verifica Roles/Policies

app.UseMiddleware<ConexaoMiddleware>();     // carrega conexao (user ja autenticado)

app.MapControllers();                      // roteia para o controller correto`}</pre>

        <h4>5.1 Justificativa da Ordem</h4>
        <p>A posição de cada middleware no pipeline não é arbitrária:</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Posição</th>
              <th>Middleware</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>①</td>
              <td><code>ExceptionMiddleware</code></td>
              <td>Precisa envolver todo o restante do pipeline. Se viesse depois, exceções geradas em UseAuthentication ou ConexaoMiddleware não seriam capturadas e retornariam como erro HTTP sem o envelope padrão.</td>
            </tr>
            <tr>
              <td>②③</td>
              <td>Authentication / Authorization</td>
              <td>Deve ocorrer antes do ConexaoMiddleware, pois este depende de <code>context.User.Identity.IsAuthenticated</code> e das claims do token para identificar o banco do cliente.</td>
            </tr>
            <tr>
              <td>④</td>
              <td><code>ConexaoMiddleware</code></td>
              <td>Executado após autenticação garantida. Injeta a conexão em HttpContext.Items antes de chegar ao controller, disponibilizando-a via <code>GetItem("CONEXAO")</code>.</td>
            </tr>
            <tr>
              <td>⑤</td>
              <td>MapControllers</td>
              <td>Recebe a requisição com usuário autenticado e conexão disponível em <code>HttpContext.Items["CONEXAO"]</code>.</td>
            </tr>
          </tbody>
        </table>
        <p>
          O <code>ExceptionMiddleware</code> também captura erros que ocorrem dentro do <code>ConexaoMiddleware</code>
          (como <code>InvalidOperationException</code> quando a conexão é nula), garantindo que mesmo falhas
          de infraestrutura retornem o envelope padrão <code>Retorno_Modelo_API_Transp</code>.
        </p>
      </section>

      {/* 6. StatusCodes */}
      <section id="statuscodes_referencia">
        <h3>6. Referência Rápida — StatusCodes</h3>
        <p>Tabela consolidada de todos os StatusCodes HTTP retornados pela API e suas origens:</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>HTTP Status</th>
              <th>sucesso</th>
              <th>Origem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>200 OK</td>
              <td>true</td>
              <td><code>BaseController.Resposta()</code> — retorno <code>Ok()</code></td>
            </tr>
            <tr>
              <td>400 Bad Request</td>
              <td>false</td>
              <td><code>BaseController</code> (Codigo=400) · <code>ExceptionMiddleware</code> (InvalidOperationException)</td>
            </tr>
            <tr>
              <td>401 Unauthorized</td>
              <td>false</td>
              <td>ASP.NET Authorization — token ausente, expirado ou assinatura inválida</td>
            </tr>
            <tr>
              <td>403 Forbidden</td>
              <td>false</td>
              <td>ASP.NET Authorization — token válido mas role não autorizada para o endpoint</td>
            </tr>
            <tr>
              <td>422 Unprocessable</td>
              <td>false</td>
              <td><code>ExceptionMiddleware</code> — ValidacaoException lançada pela camada de Negócio</td>
            </tr>
            <tr>
              <td>500 Server Error</td>
              <td>false</td>
              <td><code>ExceptionMiddleware</code> — Exception genérica não tratada</td>
            </tr>
          </tbody>
        </table>

        <h4>6.1 CRUD Padrão Mantran</h4>
        <p>Padrão de implementação para operações CRUD utilizando todos os componentes desta documentação:</p>
        <pre className="code-block">{`// BUSCA LISTA
var obj_cn = GetItem<Conexao_Transp>( "CONEXAO" );
var lista  = await _negocio.Carregar_Lista_Empresas( obj_cn );
return Resposta( Retorno_Modelo_API_Transp<List<Empresa_Transp>>.Ok( lista, "Lista carregada" ) );

// INCLUIR
var retorno = _negocio.Incluir_Registro_Empresa( empresa, obj_cn )
    ? Retorno_Modelo_API_Transp<object>.Ok( null, "Incluido com sucesso" )
    : Retorno_Modelo_API_Transp<object>.Erro( "Erro ao incluir", 500 );
return Resposta( retorno );

// ALTERAR
var retorno = _negocio.Alterar_Registro_Empresa( empresa, obj_cn )
    ? Retorno_Modelo_API_Transp<object>.Ok( null, "Alterado com sucesso" )
    : Retorno_Modelo_API_Transp<object>.Erro( "Erro ao alterar", 500 );
return Resposta( retorno );

// EXCLUIR
var retorno = _negocio.Excluir_Registro_Empresa( empresa, obj_cn )
    ? Retorno_Modelo_API_Transp<object>.Ok( null, "Excluido com sucesso" )
    : Retorno_Modelo_API_Transp<object>.Erro( "Erro ao excluir", 500 );
return Resposta( retorno );`}</pre>
        <p>
          <strong>ℹ</strong> Ao criar um novo controller, basta herdar <code>BaseController</code> e seguir o padrão acima.
          O envelope de retorno, o StatusCode HTTP e o tratamento de exceções são gerenciados automaticamente
          pela infraestrutura.
        </p>
      </section>
    </div>
  );

  return (
    <GenericContent
      title="Mantran.API — Principal"
      content={content}
    />
  );
};

export default MantranAPI_Login;
