import { useState } from "react";
import { getUserFromSession } from "../api/getUser";
import type { User } from "../auth/AuthTypes";
import PageSkeleton from "./PageSkeleton";
import useRequest from "../hooks/useRequest";

export default function ProfilePage() {
  const [retryCount, setRetryCount] = useState(0);
  const requestState = useRequest<User>(
    () => getUserFromSession(),
    [retryCount],
  );


  if (requestState.status === "loading") return <PageSkeleton />;
  if (requestState.status === "failure")
    return (
      <>
        {requestState.error.message} <br />
        <button onClick={() => setRetryCount((previous) => previous + 1)}>
          Retry?
        </button>
      </>
    );
  if (requestState.status === "success")
    return (
      <section className="profile">
        <h1>Profile page</h1>
        <p className="profile__email">{requestState.data.email}</p>
        <p className="profile__username">{requestState.data.username}</p>
      </section>
    );
}
