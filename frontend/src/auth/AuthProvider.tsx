import { useEffect, useState, type PropsWithChildren } from "react";
import { AuthContext } from "./context";
import { getUserFromSession } from "../api/getUser";
import { type AuthState } from "./AuthTypes";
import loginUser from "../api/loginUser";
import logoutUser from "../api/logoutUser";
import registerUser from "../api/registerUser";
import type { OperationStatus } from "../types/OperationStatusType";
import normalizeError from "../utils/normalizeError";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthState>({ status: "unknown" });
  const [operationState, setOperationState] = useState<OperationStatus>({
    status: "idle",
  });

  async function logIn(email: string, password: string) {
    setOperationState({ status: "submitting" });
    try {
      const user = await loginUser(email, password);
      setAuthState({ status: "loggedIn", user });
      setOperationState({ status: "idle" });
    } catch (error) {
      setOperationState({status: "failure", error: normalizeError(error)})
    }
  }
  async function register(email: string, password: string, username: string) {
    setOperationState({ status: "submitting" });
   try {
     const user = await registerUser(email, password, username);
     setAuthState({ status: "loggedIn", user });
     setOperationState({ status: "idle" });
   } catch (error) {
    setOperationState({status: "failure", error: normalizeError(error)})
   }
  }

  async function logOut() {
    setOperationState({ status: "submitting" });
    try {
      await logoutUser();
      setAuthState({ status: "loggedOut" });
      setOperationState({ status: "idle" });
    } catch (error) {
      setOperationState({status: "failure", error: normalizeError(error)})
    }
  }
  useEffect(() => {
    async function initAuth() {
      try {
        const user = await getUserFromSession();
        setAuthState({ status: "loggedIn", user });
      } catch (error: unknown) {
        setAuthState({ status: "loggedOut" });
      }
    }
    initAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{ state: authState, operationState, logIn, logOut, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}
