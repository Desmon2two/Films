import type { User } from "../auth/AuthTypes";
import { ApiError } from "../types/ApiErrorType";
import type { ChangeUser } from "../types/ChangeUserType";

export default async function changeUserData({profilePic, username, displayName, bio}: ChangeUser): Promise<User>{
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + `/auth/users/me`,
    {
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify({ profilePic, username, displayName, bio }),
    headers: {
      "Content-Type": "application/json",
    },
    },
  );
  const data = await response.json();
  if (!response.ok) throw new ApiError(response.status, data.message);
  return data.user;
}