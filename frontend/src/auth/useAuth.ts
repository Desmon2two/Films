import { useContext } from "react";
import { AuthContext } from "./context";

export default function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("UseAuth must be used inside the Provider");
    return context
}