import { ApiError } from "../types/ApiErrorType";

export default async function loginUser(email: string, password: string) {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + `/auth/login`,
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  if (!response.ok) throw new ApiError(response.status, data.message);
  return data.user;
}
