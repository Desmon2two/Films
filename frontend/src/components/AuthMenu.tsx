import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useState } from "react";

export default function AuthMenu() {
  const { state, operationState, logOut } = useAuth();
  const [isDroppedDown, setIsDroppedDown] = useState(false);
  function handleDropdown() {
    setIsDroppedDown(prev => !prev)
  }
  return (
    <div className="auth-menu">
      {state.status !== "loggedIn" ? (
        <>
          <Link
            to="/register"
            className="auth-menu__register"
          >
            Register
          </Link>

          <Link
            to="/login"
            className="auth-menu__login"
          >
            Login
          </Link>
        </>
      ) : (
        <div className="auth-menu__user-menu">
          <button
            type="button"
            onClick={handleDropdown}
          >
            Profile Pic
          </button>
          {isDroppedDown && (
            <div className="auth-menu__dropdown">
              <Link
                className="auth-menu__profile"
                to="/profile"
              >
                Profile
              </Link>

              <button
                disabled={operationState.status === "submitting"}
                onClick={logOut}
                className="auth-menu__logout"
              >
                {operationState.status === "submitting" ? (
                  "Logging out..."
                ) : (
                  "Log out"
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
