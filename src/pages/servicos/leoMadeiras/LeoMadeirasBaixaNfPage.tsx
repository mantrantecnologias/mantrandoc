import GenericContent from "@shared/components/GenericContent";

function LeoMadeirasBaixaNfPage() {
  const content = (
    <div className="conteudo-div">
      <section id="leoMadeiras_servico_baixaNF_section">
      <strong>Descrição:</strong> Inclusão de Notas Fiscais do banco de dados do Oracle para nosso banco.
      </section>
    </div>
  );

  return (
    <GenericContent
      title="Serviços – Leo Madeiras"
      content={content}
    />
  );
}

export default LeoMadeirasBaixaNfPage;
