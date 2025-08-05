import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import memoryRoutes from "./routes/memories.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/memories", memoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
