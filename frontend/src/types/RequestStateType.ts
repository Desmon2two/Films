export type RequestStateType<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "failure"; error: Error };
