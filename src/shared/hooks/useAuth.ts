import { useCallback, useState } from "react";
import { authGetToken, clearToken, setToken } from "@repo/api-client";

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
      const { accessToken } = await authGetToken({ username: SUPPORT_USERNAME, password });
      setToken(accessToken);
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
    clearToken();
    setIsLoggedIn(false);
  }, []);

  return { isLoggedIn, isLoading, error, login, logout };
}
