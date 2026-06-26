import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const dept1 = await db.query(
    `INSERT INTO departments (name, description, image_url, contact_email)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    ["Computer Science", "Study of computation and programming.", "https://picsum.photos/seed/cs/800/400", "cs@fsu.edu"]
  );

  const dept2 = await db.query(
    `INSERT INTO departments (name, description, image_url, contact_email)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    ["Mathematics", "Study of numbers, quantity, and space.", "https://picsum.photos/seed/math/800/400", "math@fsu.edu"]
  );

  await db.query(
    `INSERT INTO professors (name, bio, profile_image, email, department_id)
     VALUES ($1, $2, $3, $4, $5)`,
    ["Dr. Alice Johnson", "Expert in algorithms and data structures.", "https://picsum.photos/seed/alice/200/200", "alice@fsu.edu", dept1.rows[0].id]
  );

  await db.query(
    `INSERT INTO professors (name, bio, profile_image, email, department_id)
     VALUES ($1, $2, $3, $4, $5)`,
    ["Dr. Bob Smith", "Specializes in calculus and linear algebra.", "https://picsum.photos/seed/bob/200/200", "bob@fsu.edu", dept2.rows[0].id]
  );
}