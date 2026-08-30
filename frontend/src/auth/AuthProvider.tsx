import { useEffect, useState, type PropsWithChildren } from "react";
import { AuthContext } from "./context";
import { getUserFromSession } from "./getUser";
import { type AuthState } from "./AuthTypes";

export function AuthProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthState>({ status: "unknown" });
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
