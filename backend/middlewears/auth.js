function authMiddleware(req, res, next){
    // read token, verify it, attach to req.user
    const token = req.headers.authorization;
    try {
        // Imagine JWT verify
        const user = verifyToken(token);
    
        if (!token || token.expired) return next(new UnauthError("Token missing or expired"));
        req.user = user;
        next()
        
    } catch (error) {
        next(new UnauthError("Invalid token"))
    }
}