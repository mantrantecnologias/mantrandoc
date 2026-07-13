import GenericContent from "@shared/components/GenericContent";

function LeoMadeirasGeracaoAutomaticaPage() {
  const content = (
    <div className="conteudo-div">
      <section id="leoMadeiras_servico_geracaoAutomatica_section"><strong>Descrição:</strong> Geração de Conhecimentos baseados em NFs não processadas.</section>
    </div>
  );

  return (
    <GenericContent
      title="Serviços – Leo Madeiras"
      content={content}
    />
  );
}

export default LeoMadeirasGeracaoAutomaticaPage;
