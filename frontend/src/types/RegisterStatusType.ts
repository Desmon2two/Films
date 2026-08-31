import type { User } from "../auth/AuthTypes";
import type { ApiError } from "./ApiErrorType";

export type RegisterStatus =
| {status: "idle"}
| {status: "submitting"}
| {status: "success", user: User}
| {status: "failure", error: ApiError}