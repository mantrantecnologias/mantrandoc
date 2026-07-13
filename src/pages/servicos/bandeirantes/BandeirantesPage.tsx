import GenericContent from "@shared/components/GenericContent";

function BandeirantesPage() {
  const content = (
    <div className="conteudo-div">
      <section id="bandeirantes_servico_mantran_vira_section">
     <strong>Descrição:</strong> Integra Fechamento DT - Inclusão de Coleta</section>
    </div>
  );

  return (
    <GenericContent
      title="Serviços – Bandeirantes"
      content={content}
    />
  );
}

export default BandeirantesPage;
