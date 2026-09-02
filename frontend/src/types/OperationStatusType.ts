import type { ApiError } from "./ApiErrorType";

export type OperationStatus =
| {status: "idle"}
| {status: "submitting"}
| {status: "success"}
| {status: "failure", error: ApiError}