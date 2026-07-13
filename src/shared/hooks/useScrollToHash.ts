import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Rola suavemente até o elemento cujo id bate com o hash da URL (`#id-da-secao`). */
export function useScrollToHash(): void {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    const timeout = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);

    return () => clearTimeout(timeout);
  }, [hash]);
}
