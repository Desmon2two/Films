export type RequestStateType =
  | { status: "loading" }
  | { status: "success" }
  | { status: "failure"; error: Error };
