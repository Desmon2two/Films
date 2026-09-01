import type { User } from "../auth/AuthTypes";
import { ApiError } from "../types/ApiErrorType";

export default async function registerUser(
  email: string,
  password: string,
  username: string
): Promise<User> {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + "/auth/register",
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password, username }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();
  if (!response.ok) throw new ApiError(response.status, data.message);
  return data
}
