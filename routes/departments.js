import express from "express";
const router = express.Router();
export default router;

import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  getProfessorsByDepartmentId,
  updateDepartment,
  deleteDepartment,
} from "#db/departments";
import { authenticate } from "#middleware/auth";

// Get all departments //
router.get("/", async (req, res) => {
  const departments = await getDepartments();
  res.send(departments);
});

// Create new department //
router.post("/", authenticate, async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is required");

  const { name, description, imageUrl, contactEmail } = req.body;
  if (!name || !description || !imageUrl || !contactEmail)
    return res.status(400).send("Request body can't be missing any fields");

  const department = await createDepartment(name, description, imageUrl, contactEmail);
  res.status(201).send(department);
});

router.param("id", async (req, res, next, id) => {
  const department = await getDepartmentById(id);
  if (!department) return res.status(404).send("Department not found");
  req.department = department;
  next();
});

// Get single department //
router.get("/:id", (req, res) => {
  res.send(req.department);
});

// Delete a single department //
router.delete("/:id", authenticate, async (req, res) => {
  await deleteDepartment(req.department.id);
  res.sendStatus(204);
});

// Update a single department //
router.put("/:id", authenticate, async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is required");

  const { name, description, imageUrl, contactEmail } = req.body;
  if (!name || !description || !imageUrl || !contactEmail)
    return res.status(400).send("Request body can't be missing any fields");

  const updatedDepartment = await updateDepartment({
    id: req.department.id,
    name,
    description,
    imageUrl,
    contactEmail,
  });
  res.send(updatedDepartment);
});

// Get all professors from specific department //
router.get("/:id/professors", async (req, res) => {
  const professors = await getProfessorsByDepartmentId(req.department.id);
  res.send(professors);
});