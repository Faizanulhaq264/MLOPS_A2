import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, unique: true },
    value: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Counter", CounterSchema);
