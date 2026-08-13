import authService from "../authFeature/authService.js";
import { UnauthorizedError } from "../errors/unauthorizedError.js";

function authenticate(req, res, next) {
	try {
		const { authorization } = req.headers;
		if (!authorization) throw new UnauthorizedError("Authentication required");
		if (!authorization.startsWith("Bearer "))
			throw new UnauthorizedError("Invalid authentication format");
		const token = authorization.slice(7);
		const user = authService.verifyAccessToken(token);
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
}

export default authenticate;
