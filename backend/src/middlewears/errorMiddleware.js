import { ApplicationError } from "../src/errors/applicationError.js";
import { ForbiddenError } from "../src/errors/forbiddenError.js";
import { NotFoundError } from "../src/errors/notFoundError.js";
import { UnauthorizedError } from "../src/errors/unauthorizedError.js";
import { ValidationError } from "../src/errors/validationError.js";

function errorHandler(err, req, res, next) {
	if (err instanceof ApplicationError) {
		return res.status(err.statusCode).json({ message: err.message });
		// if (err instanceof UnauthorizedError)
		// 	return res.status(401).json({ message: err.message });
		// if (err instanceof ForbiddenError)
		// 	return res.status(403).json({ message: err.message });
		// if (err instanceof NotFoundError)
		// 	return res.status(404).json({ message: err.message });
	}
	console.error(err);
	return res.status(500).json({ message: "Internal server error" });
}

export default errorHandler;
