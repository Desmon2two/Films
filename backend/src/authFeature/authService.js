import jwt from "jsonwebtoken";

function generateToken(userId) {
  return jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

function verifyToken(token){
    return jwt.verify(token, process.env.JWT_SECRET)
}

export default { generateToken, verifyToken };
