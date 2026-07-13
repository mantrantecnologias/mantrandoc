import type { ReactNode } from "react";

type LegacyNoticeProps = {
  children: ReactNode;
};

/** Aviso de conteúdo legado — usado em páginas que documentam algo ainda não migrado para a Mantran.Applications - API. */
function LegacyNotice({ children }: LegacyNoticeProps) {
  return (
    <div
      style={{
        background: "#eff6ff",
        border: "1px solid #93c5fd",
        borderRadius: "8px",
        padding: "14px 18px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "0.92rem",
        color: "#1e3a8a",
      }}
    >
      <span style={{ fontSize: "1.1rem" }}>ℹ</span>
      <span>{children}</span>
    </div>
  );
}

export default LegacyNotice;
