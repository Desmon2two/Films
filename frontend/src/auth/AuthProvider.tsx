import { useState } from "react";
import type { AuthState } from "./AuthTypes";

export default async function AuthProvider() {
    const [status, setStatus] = useState<AuthState>({status: 'unknown'})
    const response = await fetch(import.meta.env.VITE_SERVER_URL + `/auth/me`);
        const data = await response.json();
        if(data.status === 401) setStatus({status: 'loggedOut'})
        if(data.status === 200) setStatus({status: 'loggedIn', user: data.user})
}
