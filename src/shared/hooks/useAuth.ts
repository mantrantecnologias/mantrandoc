import { useCallback, useState } from "react";
import axios from "axios";

/** Único usuário técnico habilitado a liberar a seção "Serviços" do docs. */
export const SUPPORT_USERNAME = "suporte.mantran";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post(
        "/api/auth/login",
        { username: SUPPORT_USERNAME, password },
        { withCredentials: true },
      );
      setIsLoggedIn(true);
      return true;
    } catch {
      setError("Usuário ou senha inválidos.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    // Best-effort: derruba o cookie no servidor sem bloquear o logout local na resposta da rede.
    axios.post("/api/auth/logout", undefined, { withCredentials: true }).catch(() => {});
    setIsLoggedIn(false);
  }, []);

  return { isLoggedIn, isLoading, error, login, logout };
}
