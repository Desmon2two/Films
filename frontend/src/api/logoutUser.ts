import { ApiError } from "../types/ApiErrorType";

export default async function logoutUser() {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URL + `/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    },
  );
  if (!response.ok) {
    const data = await response.json();

    throw new ApiError(response.status, data.message);
  }
}
