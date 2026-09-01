import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../auth/useAuth";
import PageSkeleton from "../pages/PageSkeleton";

export default function GuestOnlyRoute() {
  const { state } = useAuth();
  if (state.status === "unknown") {
    return <PageSkeleton />;
  }
  if (state.status === "loggedIn") {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }
  return <Outlet />;
}
