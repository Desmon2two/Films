function errorHandler(err, req, res, next) {
  if (err.name === "ValidationError")
    return res.status(400).json({ message: err.message });
  if (err.name === "UnauthorizedError")
    return res.status(401).json({ message: err.message });
  if (err.name === "ForbiddenError")
    return res.status(403).json({ message: err.message });
  if (err.name === "NotFoundError")
    return res.status(404).json({ message: err.message });

  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
}

export default errorHandler
