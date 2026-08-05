import jwt from "jsonwebtoken";

function generateToken(userId) {
  const payload = {
    userId
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
}

export default { generateToken };
