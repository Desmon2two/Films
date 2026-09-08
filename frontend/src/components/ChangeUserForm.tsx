import { useState } from "react";
import type { User } from "../auth/AuthTypes";
import type { ChangeUser } from "../types/ChangeUserType";
import type { RequestState } from "../types/RequestStateType";
import changeUserData from "../api/changeUserData";
import normalizeError from "../utils/normalizeError";

export default function ChangeUserForm(user:User) {
  const [userData, setUserData] = useState<ChangeUser>({
    profilePicture: user.profilePicture,
    username: user.username,
    displayName: user.displayName,
    bio: user.bio,
  });
  const [requestState, setRequestState] = useState<RequestState<User>>({
    status: "idle",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setRequestState({ status: "loading" });
    try {
      const result = await changeUserData(userData);
      setRequestState({ status: "success", data: result });
    } catch (error) {
      setRequestState({ status: "failure", error: normalizeError(error) });
    }
  }
  return (
    <form
      className="change-user-data__form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="profilePicture"
        value={userData.profilePicture ?? ""}
        placeholder="New profile picture"
        className="change-user-data__profile-picture"
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        value={userData.username}
        placeholder="New username"
        className="change-user-data__username"
        onChange={handleChange}
      />
      <input
        type="text"
        name="displayName"
        value={userData.displayName}
        placeholder="New display name"
        className="change-user-data__display-name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="bio"
        value={userData.bio ?? ""}
        placeholder="New bio"
        className="change-user-data__bio"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="change-user-data__submit button"
        disabled={requestState.status === "loading"}
      >
        Change
      </button>
      {requestState.status === "loading" && <p>Loading...</p>}
      {requestState.status === "failure" && <p>{requestState.error.message}</p>}
      {requestState.status === "success" && (
        <p>User updated! Refresh the page</p>
      )}
    </form>
  );
}
