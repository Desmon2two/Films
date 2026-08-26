import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <button>
        <Link to="/">
          <p>Home</p>
        </Link>
      </button>
      <button>
        <Link to="/register">
          <p>Register</p>
        </Link>
      </button>
      <button>
        <Link to="/login">
          <p>Login</p>
        </Link>
      </button>
    </nav>
  );
}
