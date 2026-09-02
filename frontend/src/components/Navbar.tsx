import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useState } from "react";

export default function Navbar() {
  const { state, operationState, logOut } = useAuth();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    const encodedQuery = encodeURIComponent(query);
    navigate(`/search?q=${encodedQuery}`);
  }
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
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          name="searchBox"
          id=""
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit"></button>
      </form>

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
