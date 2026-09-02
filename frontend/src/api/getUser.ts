import type { User } from "../auth/AuthTypes";
import { ApiError } from "../types/ApiErrorType";

export async function getUserFromSession(): Promise<User> {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + `/auth/users/me`,
    {
      credentials: "include",
    },
  );
  const data = await response.json();
  if (!response.ok) throw new ApiError(response.status, data.message);
  return data;
}
