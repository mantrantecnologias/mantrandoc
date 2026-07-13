import GenericContent from "@shared/components/GenericContent";

function RouteasyPage() {
  const content = (
    <div className="conteudo-div">
      <h4>Documentação – Routeasy x Mantran</h4>

{
      //<h3>Sumário</h3>
      //<ol>
       // <li><strong>Objetivo</strong></li>
       // <li><strong>Fluxo Geral</strong></li>
       // <li><strong>Disparo de Roteirização – Routeasy</strong></li>
       // <li><strong>Webhook Routeasy</strong></li>
       // <li><strong>Cenários de Processamento (Routeasy)</strong></li>
       // <li><strong>Integração Comprovei</strong></li>
       // <li><strong>Ciclo de Testes (Comprovei)</strong></li>
       // <li><strong>Conclusão</strong></li>
     // </ol>
}
      {/* 1. Objetivo */}
      <section id="section_routeasy_manifesto">
        <h3>1. Objetivo</h3>
        <p>
          Este documento tem como objetivo explicar o funcionamento do serviço
          <strong> Baixar_Manifesto</strong>, responsável por processar as informações de rota
          recebidas da plataforma Routeasy e atualizar as Notas Fiscais no sistema Mantran.
        </p>

        <p>O serviço:</p>
        <ul>
          <li>Recebe as roteirizações enviadas via Webhook da Routeasy</li>
          <li>Processa informações de rota, veículo, transportadora e pedágio</li>
          <li>Atualiza NFs com dados logísticos</li>
          <li>Complementa informações a partir da integração com a Comprovei</li>
        </ul>
      </section>

      {/* 2. Fluxo Geral */}
      <section id="fluxo_geral">
        <h3>2. Fluxo Geral</h3>

        <ol>
          <li>Usuário dispara a roteirização pela plataforma Routeasy</li>
          <li>Routeasy envia Webhook configurado → API Mantran recebe a rota</li>
          <li>As informações são armazenadas para processamento</li>
          <li>
            O serviço <strong>Baixar_Manifesto</strong> processa as rotas pendentes, atualizando
            as Notas Fiscais
          </li>
        </ol>
      </section>

      {/* 3. Routeasy */}
      <section id="routeasy">
        <h3>3. Disparo de Roteirização – Routeasy</h3>

        <p><strong>Documentação Routeasy:</strong></p>
        <ul>
          <li>https://routeasy.readme.io/reference/o-objeto-version</li>
        </ul>

        <p><strong>Dashboard homologação:</strong> www.homolog.routeasy.com.br</p>
        <p><strong>Usuário:</strong>teste_1</p>
        <p><strong>Senha:</strong> senha_1</p>

        <p>
          Cada filial possui sua configuração de Webhook, que deve estar definida como
          <strong> Routeasy v3</strong>.
        </p>
      </section>

      {/* 4. Webhook */}
      <section id="webhook">
        <h3>4. Webhook Routeasy</h3>

        <p><strong>Homologação:</strong></p>
        <pre>{`http://w2022-0691.emartim.com.br:35398/NotaFiscal/Baixa/Routeasy/LeoMadeiras/Rota/Teste`}</pre>

        <p><strong>Produção:</strong></p>
        <pre>{`http://w2022-0691.emartim.com.br:35398/NotaFiscal/Baixa/Routeasy/LeoMadeiras/Rota`}</pre>

        <p>
          Este endpoint recebe a roteirização contendo rota, veículo, transportadora,
          quilometragem, pedágio e outras informações.
        </p>
      </section>

      {/* 5. Cenários */}
      <section id="cenarios">
        <h3>5. Cenários de Processamento (Routeasy)</h3>

        <h4>Cenário 01 – CD_Filial_SAP = Filial da Nota</h4>
        <p>Mantran atualiza:</p>
        <ul>
          <li>CD_Rota</li>
          <li>VR_Pedagio</li>
          <li>CD_Veiculo</li>
          <li>CD_Classe</li>
          <li>CGC_CPF_Transportador</li>
        </ul>

        <h4>Cenário 02 – CD_Filial_SAP ≠ Filial da Nota</h4>
        <p>
          Se <strong>FL_Processado = N</strong>:
        </p>
        <ul>
          <li>Atualiza CD_Empresa, CD_Filial, CD_Rota, VR_Pedagio, CD_Veiculo, CD_Classe</li>
        </ul>

        <p>
          Se <strong>FL_Processado = S</strong>:
          Mantran não processa novamente.
        </p>

        <h4>Cenário 03 – Filial correta + Reentrega</h4>
        <p>Mantran atualiza:</p>
        <ul>
          <li>TP_Situacao_NF = 'R'</li>
          <li>Campos de rota e veículo</li>
          <li>Zera NR_CTRC_Controle e NR_CTRC_Impresso</li>
        </ul>

        <h4>Cenário 04 – Filial divergente + Reentrega</h4>
        <p>Mantran insere novo registro em ST_Nota_Fiscal_EDI com:</p>
        <ul>
          <li>CD_Empresa</li>
          <li>CD_Filial</li>
          <li>TP_Situacao_NF = 'R'</li>
          <li>Informações de rota e veículo</li>
          <li>FL_Processado = N</li>
        </ul>
      </section>

      {/* 6. Integração Comprovei */}
      <section id="comprovei">
        <h3>6. Integração Comprovei</h3>

        <p><strong>Documentação Comprovei:</strong></p>
        <ul>
          <li>https://dev.comprovei.com/soap-methods/exp/v2/ws113.html</li>
          <li>https://dev.comprovei.com/soap-methods/exp/v2/ws502.html</li>
        </ul>

        <p><strong>Usuário:</strong> cliente_teste</p>
        <p><strong>Senha:</strong> senha_teste</p>

        <p>Fluxo da integração:</p>
        <ol>
          <li>Enviar WS113 informando usuário, senha e quantidade de documentos</li>
          <li>Receber número de protocolo</li>
          <li>Consultar WS502 com o protocolo → retorna status e URL</li>
          <li>Baixar arquivo XML via URL</li>
          <li>Processar entregas no Mantran</li>
        </ol>
      </section>

      {/* 7. Testes Comprovei */}
      <section id="testes_comprovei">
        <h3>7. Ciclo de Testes – Comprovei</h3>

        <p>Exemplos de testes realizados:</p>
        <ul>
          <li>Baixa individual de documentos</li>
          <li>Baixa em massa com múltiplos pedidos e ocorrências</li>
          <li>Baixa de documento sem CTe (não processa)</li>
          <li>
            Documento entregue por transportadora divergente da roteirizada (registro EDI
            pendente)
          </li>
        </ul>

        <p>
          Cada cenário gerou evidências de “antes” e “depois” demonstrando que o serviço Baixar
          Manifesto processa corretamente mudanças de rota, entregas e situações pendentes.
        </p>
      </section>

      {/* 8. Conclusão */}
      <section id="conclusao">
        <h3>8. Conclusão</h3>
        <p>
          O Serviço Baixar_Manifesto centraliza o processamento das rotas enviadas via Routeasy
          e das baixas provenientes da Comprovei.
          Ele é responsável por atualizar as Notas Fiscais com informações completas de rota,
          veículo, transportadora, pedágio, classe, entregas e reentregas.
        </p>

        <p>
          A documentação acima padroniza o processo completo, descrevendo regras,
          cenários e integrações envolvidas.
        </p>
      </section>
    </div>
  );

  return (
    <GenericContent
      title="Routeasy x Mantran"
      content={content}
    />
  );
}

export default RouteasyPage;
