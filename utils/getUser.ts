import { jwtDecode } from "jwt-decode";

type TokenType = {
  id: string;
  email: string;
};

export const getUserFromToken = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenType>(token);
    return decoded;
  } catch {
    return null;
  }
};
