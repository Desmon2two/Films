import { useEffect, useState } from "react";
import { getUserFromSession } from "../api/getUser";
import type { User } from "../auth/AuthTypes";
import PageSkeleton from "./PageSkeleton";
import normalizeError from "../utils/normalizeError";
import type { RequestState } from "../types/RequestStateType";

export default function ProfilePage() {
  const [state, setState] = useState<RequestState<User>>({ status: "loading" });
  const [retryCount, setRetryCount] = useState(0);
  useEffect(() => {
    (async function fetchUser() {
      try {
        setState({ status: "loading" });
        const fetchedUser = await getUserFromSession();
        setState({ status: "success", data: fetchedUser });
      } catch (error) {
        setState({ status: "failure", error: normalizeError(error) });
      }
    })();
  }, [retryCount]);
  if (state.status === "loading") return <PageSkeleton />;
  if (state.status === "failure")
    return (
      <>
        {state.error.message} <br />
        <button onClick={() => setRetryCount((previous) => previous + 1)}>
          Retry?
        </button>
      </>
    );
  if (state.status === "success")
    return (
      <section>
        <h1>Profile page</h1>
        <p>{state.data.email}</p>
        <p>{state.data.username}</p>
      </section>
    );
}
