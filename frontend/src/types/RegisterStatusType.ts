import type { ApiError } from "./ApiErrorType";

export type RegisterStatus =
| {status: "idle"}
| {status: "submitting"}
| {status: "success"}
| {status: "failure", error: ApiError}