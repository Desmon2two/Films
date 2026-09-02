import type { OperationStatus } from "../types/OperationStatusType";
import type { AuthState } from "./AuthTypes"

export type AuthContextValue = {
    state: AuthState;
    operationState: OperationStatus;
    logIn: (email: string, password: string)=>Promise<void>;
    logOut: ()=>Promise<void>;
    register: (email: string, password: string, username: string)=>Promise<void>;

}