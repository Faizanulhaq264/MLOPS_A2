import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router = express.Router();

/* Helper to sign JWT */
const signToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "2h" });

/* POST /signup */
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email & password required" });

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already used" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });
    return res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

/* POST /login */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = signToken(user._id);
    return res.json({ email: user.email, token });
  } catch {
    return res.status(500).json({ error: "Server error" });
  }
});

/* POST /forgot (simple stub) */
router.post("/forgot", async (req, res) => {
  /* You’d normally email a reset‑token here */
  return res.json({ message: "Forgot‑password link would be emailed." });
});

export default router;
