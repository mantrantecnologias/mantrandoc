/**
 * Tabela padrão de erros da Mantran.Applications - API (apps/api).
 * Reutilizada em toda página que documenta um endpoint dessa API — não existe
 * envelope de sucesso/erro único (`{sucesso, mensagem, data, codigo}`) como na
 * API legada: erros usam `ApiErrorResponse` (`{ message, errors }`); 401/403
 * de autenticação/role vêm do pipeline JWT com corpo fixo.
 */
function ApiErrorReference() {
  return (
    <section id="mantran_applications_api_erros_padrao">
      <h3>Respostas de Erro Padrão</h3>
      <p>
        Erros seguem o formato <code>ApiErrorResponse</code>: <code>{`{ "message": string, "errors": string[] | null }`}</code>.
        Não existe mais o envelope legado (<code>sucesso</code>/<code>mensagem</code>/<code>data</code>/<code>codigo</code>).
      </p>
      <table className="data-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Causa</th>
            <th>Corpo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>400</code></td>
            <td>Validação de forma (DataAnnotations no request) ou de negócio (FluentValidation na entidade)</td>
            <td><code>{`{ "message": "...", "errors": ["campo: mensagem", ...] }`}</code></td>
          </tr>
          <tr>
            <td><code>401</code></td>
            <td>Token ausente, inválido ou expirado</td>
            <td><code>{`{ "message": "Não autenticado.", "errors": null }`}</code></td>
          </tr>
          <tr>
            <td><code>403</code></td>
            <td>Autenticado, mas sem a role exigida pelo endpoint</td>
            <td><code>{`{ "message": "Acesso negado.", "errors": null }`}</code></td>
          </tr>
          <tr>
            <td><code>404</code></td>
            <td>Registro não encontrado</td>
            <td><code>ApiErrorResponse</code></td>
          </tr>
          <tr>
            <td><code>409</code> / <code>422</code></td>
            <td>Reservados pela plataforma (conflito / regra de negócio) — não usados pelos endpoints desta página hoje</td>
            <td>—</td>
          </tr>
          <tr>
            <td><code>500</code></td>
            <td>Erro não tratado</td>
            <td><code>ApiErrorResponse</code> (detalhe só em ambiente de desenvolvimento)</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default ApiErrorReference;
