import express from "express";
import Counter from "../models/Counter.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

/* All routes authenticated */
router.use(authMiddleware);

/* GET /count -> { value } */
router.get("/count", async (req, res) => {
  const doc =
    (await Counter.findOne({ userId: req.userId })) ||
    (await Counter.create({ userId: req.userId, value: 0 }));
  return res.json({ value: doc.value });
});

/* POST /count/increment -> { value } */
router.post("/count/increment", async (req, res) => {
  const doc = await Counter.findOneAndUpdate(
    { userId: req.userId },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return res.json({ value: doc.value });
});

export default router;
