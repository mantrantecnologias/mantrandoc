import GenericContent from "@shared/components/GenericContent";

function ShopeeMultiCtePage() {
  const content = (
    <div className="conteudo-div">
      <section id="shopee_servico_multiCTe_section">
            <strong>Descrição:</strong> Baixa e inclusão da NF vinda da Shopee,
inclusão dos CNPJs e CPFs que vierem nas NFs.    </section>
    </div>
  );

  return (
    <GenericContent
      title="Serviços – Shopee"
      content={content}
    />
  );
}

export default ShopeeMultiCtePage;
