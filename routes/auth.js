import express from "express";
import bcrypt from "bcrypt";
import db from "#db/client";
import { createToken } from "#utils/jwt";

const router = express.Router();

// POST /auth/register
router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const { rows } = await db.query(
      `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email`,
      [email, hashed]
    );
    const token = createToken({ id: rows[0].id, email: rows[0].email });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
});

// POST /auth/login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { rows } = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    const user = rows[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials." });

    const token = createToken({ id: user.id, email: user.email });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

export default router;