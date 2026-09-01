import { useEffect, useState } from "react";
import { getUserFromSession } from "../api/getUser";
import type { User } from "../auth/AuthTypes";
import PageSkeleton from "./PageSkeleton";
import { ApiError } from "../types/ApiErrorType";
import normalizeError from "../utils/normalizeError";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<ApiError | null>(null)
  useEffect(() => {
    (async function fetchUser() {
      try {
        const fetchedUser = await getUserFromSession();
        setUser(fetchedUser);
      } catch (error) {
        setError(normalizeError(error))
      }
    })();
  }, []);
  if (!user) return <PageSkeleton />
  return (
    <section>
      <h1>Profile page</h1>
      <p>{user.email}</p>
      <p>{user.username}</p>
    </section>
  );
}
