import express from "express";
import prisma from "../prisma.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🔸 Create Memory
router.post("/", authenticateToken, async (req, res) => {
  const { name, title, message, mood, image } = req.body;

  try {
    const memory = await prisma.memory.create({
      data: {
        name,
        title,
        message,
        mood,
        imageUrl: image,
        userId: req.user.userId,
      },
    });

    res.status(201).json(memory);
  } catch (error) {
    console.error("Create Memory Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const memories = await prisma.memory.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(memories);
  } catch (error) {
    console.error("Fetch Memories Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, title, message, mood, image } = req.body;

  try {
    const updated = await prisma.memory.updateMany({
      where: {
        id,
        userId: req.user.userId,
      },
      data: {
        name,
        title,
        message,
        mood,
        imageUrl: image,
      },
    });

    if (updated.count === 0) {
      return res
        .status(404)
        .json({ error: "Memory not found or unauthorized" });
    }

    res.json({ message: "Memory updated successfully" });
  } catch (error) {
    console.error("Update Memory Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await prisma.memory.deleteMany({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (deleted.count === 0) {
      return res
        .status(404)
        .json({ error: "Memory not found or unauthorized" });
    }

    res.json({ message: "Memory deleted successfully" });
  } catch (error) {
    console.error("Delete Memory Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
