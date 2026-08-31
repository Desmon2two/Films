import { useEffect, useState, type PropsWithChildren } from "react";
import { AuthContext } from "./context";
import { getUserFromSession } from "./getUser";
import { type AuthState } from "./AuthTypes";
import { ApiError } from "../types/ApiErrorType";
import loginUser from "../api/loginUser";
import logoutUser from "../api/logoutUser";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthState>({ status: "unknown" });

  async function logIn(email: string, password: string) {
      const user = await loginUser(email, password);
      setAuthState({ status: "loggedIn", user });
    }
    
    async function logOut() {
      await logoutUser()
      setAuthState({ status: "loggedOut"});
  }
  useEffect(() => {
    async function initAuth() {
      try {
        const user = await getUserFromSession();
        setAuthState({ status: "loggedIn", user });
      } catch (error) {
        if (typeof error !== "ApiError") {
        }
        setAuthState({ status: "loggedOut" });
      }
    }
    initAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ state: authState, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
