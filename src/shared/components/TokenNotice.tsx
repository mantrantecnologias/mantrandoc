import { Link } from "react-router-dom";
import { paths } from "@shared/routes/paths";

/** Aviso de token — deve aparecer no topo de toda página de documentação, pública ou privada. */
function TokenNotice() {
  return (
    <div
      style={{
        background: "#fef9c3",
        border: "1px solid #fbbf24",
        borderRadius: "8px",
        padding: "14px 18px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "0.92rem",
        color: "#78350f",
      }}
    >
      <span style={{ fontSize: "1.1rem" }}>⚠</span>
      <span>
        Para acessar os endpoints desta documentação é necessário um token de acesso.{" "}
        <Link
          to={paths.mantranApi.gerarToken}
          style={{
            color: "#b91c1c",
            fontWeight: 700,
            textDecoration: "underline",
            fontSize: "inherit",
          }}
        >
          Clique aqui para ver como gerar o token
        </Link>
        .
      </span>
    </div>
  );
}

export default TokenNotice;
