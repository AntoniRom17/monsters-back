import db from "#db/client";

export async function createDepartment(name, description, imageUrl, contactEmail) {
  const sql = `
    INSERT INTO departments (name, description, image_url, contact_email)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const { rows: [department] } = await db.query(sql, [name, description, imageUrl, contactEmail]);
  return department;
}

export async function deleteDepartment(id) {
  const sql = `
    DELETE FROM departments
    WHERE id = $1
    RETURNING *
  `;
  const { rows: [department] } = await db.query(sql, [id]);
  return department;
}

export async function updateDepartment({ id, name, description, imageUrl, contactEmail }) {
  const sql = `
    UPDATE departments
    SET
      name = $2,
      description = $3,
      image_url = $4,
      contact_email = $5
    WHERE id = $1
    RETURNING *
  `;
  const { rows: [department] } = await db.query(sql, [id, name, description, imageUrl, contactEmail]);
  return department;
}

export async function getDepartments() {
  const sql = `SELECT * FROM departments`;
  const { rows: departments } = await db.query(sql);
  return departments;
}

export async function getDepartmentById(id) {
  const sql = `SELECT * FROM departments WHERE id = $1`;
  const { rows: [department] } = await db.query(sql, [id]);
  return department;
}

export async function getProfessorsByDepartmentId(id) {
  const sql = `SELECT * FROM professors WHERE department_id = $1`;
  const { rows: professors } = await db.query(sql, [id]);
  return professors;
}