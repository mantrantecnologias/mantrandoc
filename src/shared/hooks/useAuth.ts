import { useCallback, useState } from "react";
import axios from "axios";

/** Único usuário técnico habilitado a liberar a seção "Serviços" do docs. */
export const SUPPORT_USERNAME = "suporte.mantran";

const TOKEN_STORAGE_KEY = "accessToken";

const setToken = (token: string): void => localStorage.setItem(TOKEN_STORAGE_KEY, token);
const clearToken = (): void => localStorage.removeItem(TOKEN_STORAGE_KEY);

interface TokenResponse {
  accessToken: string;
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.post<TokenResponse>("/api/auth/token", {
        username: SUPPORT_USERNAME,
        password,
      });
      setToken(data.accessToken);
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
