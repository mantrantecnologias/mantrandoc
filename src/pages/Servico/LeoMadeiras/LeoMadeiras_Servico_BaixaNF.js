import GenericContent from "../../GenericContent";

export default function LeoMadeiras_Servico_BaixaNF() {
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
      attachments={[]}
    />
  );
}
