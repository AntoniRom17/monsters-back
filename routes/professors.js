import express from "express";
import db from "#db/client";
import { authenticate } from "#middleware/auth";

const router = express.Router();

// GET all professors - public
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM professors");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single professor (with their department) - public
router.get("/:id", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT professors.*, departments.name AS department_name
       FROM professors
       LEFT JOIN departments ON professors.department_id = departments.id
       WHERE professors.id = $1`,
      [req.params.id],
    );
    if (!result.rows.length)
      return res.status(404).json({ error: "Professor not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new professor - protected
router.post("/", authenticate, async (req, res) => {
  const { name, bio, profile_image, email, department_id } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO professors (name, bio, profile_image, email, department_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, bio, profile_image, email, department_id],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH professor - protected
router.patch("/:id", authenticate, async (req, res) => {
  const { name, bio, profile_image, email, department_id } = req.body;
  try {
    const result = await db.query(
      `UPDATE professors
       SET name = COALESCE($1, name),
           bio = COALESCE($2, bio),
           profile_image = COALESCE($3, profile_image),
           email = COALESCE($4, email),
           department_id = COALESCE($5, department_id)
       WHERE id = $6
       RETURNING *`,
      [name, bio, profile_image, email, department_id, req.params.id],
    );
    if (!result.rows.length)
      return res.status(404).json({ error: "Professor not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE professor - protected
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const result = await db.query(
      "DELETE FROM professors WHERE id = $1 RETURNING *",
      [req.params.id],
    );
    if (!result.rows.length)
      return res.status(404).json({ error: "Professor not found" });
    res.json({ message: "Professor deleted", professor: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
