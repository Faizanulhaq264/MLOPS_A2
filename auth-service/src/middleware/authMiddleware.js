import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const raw = req.headers.authorization; // "Bearer <token>"
  if (!raw) return res.status(401).json({ error: "Missing token" });
  const token = raw.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
