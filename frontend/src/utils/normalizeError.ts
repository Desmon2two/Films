import { ApiError } from "../types/ApiErrorType";

export default function normalizeError(error: unknown): ApiError {
	if (error instanceof ApiError) return error;
	if (error instanceof Error) {
		return new ApiError(500, error.message);
	}
	return new ApiError(500, String(error));
}
