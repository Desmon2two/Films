import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../auth/useAuth"
import PageSkeleton from "../pages/PageSkeleton";

export default function ProtectedRoute(){
    const {state} = useAuth();
    if (state.status === "unknown") {
        return <PageSkeleton />
    }
    if (state.status === "loggedOut") {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}