import GenericContent from "../../GenericContent";

export default function Shopee_Servico_GerarCTe() {
  const content = (
    <div className="conteudo-div">
            <section id="shopee_servico_gerarCTe_section"><strong>Descrição:</strong> Geração de Cte para First Mile e Last Mile. </section>   
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
