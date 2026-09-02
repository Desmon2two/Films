import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function Navbar() {
  const { state, operationState, logOut } = useAuth();
  function handleLogout() {
    logOut();
  }
  return (
    <nav>
      <button>
        <Link to="/">
          <p>Home</p>
        </Link>
      </button>

      <button hidden={state.status === "loggedIn"}>
        <Link to="/register">
          <p>Register</p>
        </Link>
      </button>

      <button hidden={state.status === "loggedIn"}>
        <Link to="/login">
          <p>Login</p>
        </Link>
      </button>

      <button hidden={state.status !== "loggedIn"}>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
      </button>

      <button
        hidden={state.status !== "loggedIn"}
        disabled={operationState.status === "submitting"}
        onClick={handleLogout}
      >
        {operationState.status === "submitting" ? (
          <p>Logging out...</p>
        ) : (
          <p>Log out</p>
        )}
      </button>
    </nav>
  );
}
