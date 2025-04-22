import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import counterRoutes from "./routes/counter.js";

dotenv.config();
await connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "http://frontend.local",
  "http://localhost:8088" //docker compose
];

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use("/", counterRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Counter-service listening on ${process.env.PORT}!!!`)
);
