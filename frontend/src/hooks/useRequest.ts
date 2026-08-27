import { useEffect, useState, type DependencyList } from "react";
import type { RequestStateType } from "../types/RequestStateType";
import normalizeError from "../utils/normalizeError";

export default function useRequest<T>(
  fn: () => Promise<T>,
  dependencies: DependencyList,
) {
  const [requestState, setRequestState] = useState<RequestStateType<T>>({
    status: "loading",
  });
  useEffect(() => {
    async function executeRequest() {
      try {
        setRequestState({ status: "loading" });
        const fetchedData = await fn();
        setRequestState({ status: "success", data: fetchedData });
      } catch (error) {
        setRequestState({ status: "failure", error: normalizeError(error) });
      }
    }
    executeRequest();
  }, dependencies);
  return requestState;
}
