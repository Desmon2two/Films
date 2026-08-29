import type { LoginCredentials } from "./LoginCredentialsType";
import type { AuthState } from "./AuthTypes"

export type AuthContextValue = {
    state: AuthState;
    logIn: (credentials: LoginCredentials)=>Promise<void>;
    logOut: ()=>Promise<void>;

}