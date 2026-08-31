import type { AuthState } from "./AuthTypes"

export type AuthContextValue = {
    state: AuthState;
    logIn: (email: string, password: string)=>Promise<void>;
    logOut: ()=>Promise<void>;

}