import { ApiError } from "../types/ApiErrorType";

export async function getUserFromSession() {
  // How to change headers, body, or authorization of request through here?
  const response = await fetch(import.meta.env.VITE_SERVER_URL + `/users/me`, {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new ApiError(response.status, data.message);
  return data;
}
