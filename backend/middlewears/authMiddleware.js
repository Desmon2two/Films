import authService from "../src/authFeature/authService.js";

function authenticate(req, res, next) {
	try {
		const { authorization } = req.headers;
		if (!authorization)
			return res.status(401).json({ message: "Authentication required" });
		if (!authorization.startsWith("Bearer "))
			return res.status(401).json({ message: "Invalid authentication format" });
		const token = authorization.slice(7);
		const user = authService.verifyToken(token);
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
}

export default authenticate;
