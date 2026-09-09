import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useState } from "react";

export default function AuthMenu() {
  const { state, operationState, logOut } = useAuth();
  const [isDroppedDown, setIsDroppedDown] = useState(false);
  function handleDropdown() {
    setIsDroppedDown((prev) => !prev);
  }
  return (
    <div className="auth-menu">
      {state.status !== "loggedIn" ? (
        <>
          <Link
            to="/register"
            className="auth-menu__register link"
          >
            Register
          </Link>

          <Link
            to="/login"
            className="auth-menu__login link"
          >
            Login
          </Link>
        </>
      ) : (
        <div className="auth-menu__user-menu">
          <div
            className="auth-menu__profile-pic-container profile-pic-container"
            onClick={handleDropdown}
          >
            <img
              src={
                state.user.profilePic ??
                "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg"
              }
              alt="profile picture"
              className="auth-menu__profile-pic profile-pic"
            />
          </div>
          {isDroppedDown && (
            <div className="auth-menu__dropdown">
              <Link
                className="auth-menu__profile link"
                to="/profile"
              >
                Profile
              </Link>
              <Link
                className="auth-menu__creator-controls link"
                to="/creator-controls"
              >
                Creator controls
              </Link>
              <Link
                className="auth-menu__settings link"
                to="/settings"
              >
                Settings
              </Link>
              <button
                disabled={operationState.status === "submitting"}
                onClick={logOut}
                className="auth-menu__logout button"
              >
                {operationState.status === "submitting"
                  ? "Logging out..."
                  : "Log out"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
