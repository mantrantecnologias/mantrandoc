import GenericContent from "../../GenericContent";

export default function Shopee_Servico_GeracaoEnvioDocumentos() {
  const content = (
    <div className="conteudo-div">
      <section id="shopee_servico_geracaoEnvioDocumentos_section">
            <strong>Descrição:</strong> Geração de Manifesto para First Mile e Last Mile,
geração de Cte Complementar para Pré Fatura, e
reenvio de CTe e Manifesto para todos os processos da Shopee. 
</section>
    </div>
  );

  return (
    <GenericContent
      title="Serviços – Shopee"
      content={content}
      attachments={[]}
    />
  );
}
