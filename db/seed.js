import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const scaring = await db.query(
    `INSERT INTO departments (name, description, image_url, contact_email)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [
      "School of Scaring",
      "The signature Monsters University program, where students study scare technique, room entry, roar control, and performance under pressure.",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      "scaring@monstersuniversity.edu",
    ]
  );

  const doors = await db.query(
    `INSERT INTO departments (name, description, image_url, contact_email)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [
      "Department of Door Technology",
      "A hands-on program focused on portal mechanics, door storage systems, safety procedures, and the technology used to reach the human world.",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
      "doors@monstersuniversity.edu",
    ]
  );

  const energy = await db.query(
    `INSERT INTO departments (name, description, image_url, contact_email)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [
      "Scream Energy Research",
      "Students and faculty research scream collection, energy storage, laugh power theory, and sustainable power for the monster world.",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      "energy@monstersuniversity.edu",
    ]
  );

  const business = await db.query(
    `INSERT INTO departments (name, description, image_url, contact_email)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [
      "Monster Business and Leadership",
      "A department for monsters who want to lead teams, run scare operations, manage fraternities and sororities, or start their own monster-world company.",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
      "business@monstersuniversity.edu",
    ]
  );

  const professors = [
    {
      name: "Dean Abigail Hardscrabble",
      bio: "Dean Hardscrabble is a legendary scarer known for exacting standards, sharp instincts, and an unforgettable entrance.",
      profile_image: "https://picsum.photos/seed/hardscrabble/200/200",
      email: "hardscrabble@monstersuniversity.edu",
      department_id: scaring.rows[0].id,
    },
    {
      name: "Professor Derek Knight",
      bio: "Professor Knight introduces first-year monsters to scare fundamentals, classroom discipline, and the importance of practice.",
      profile_image: "https://picsum.photos/seed/knight/200/200",
      email: "dknight@monstersuniversity.edu",
      department_id: scaring.rows[0].id,
    },
    {
      name: "Mike Wazowski",
      bio: "Mike teaches planning, research, teamwork, and why a monster should never underestimate careful preparation.",
      profile_image: "https://picsum.photos/seed/mike/200/200",
      email: "mwazowski@monstersuniversity.edu",
      department_id: scaring.rows[0].id,
    },
    {
      name: "James P. Sullivan",
      bio: "Sullivan shares field experience from Monsters, Inc. and helps students understand presence, timing, and confidence.",
      profile_image: "https://picsum.photos/seed/sully/200/200",
      email: "jsullivan@monstersuniversity.edu",
      department_id: scaring.rows[0].id,
    },
    {
      name: "Randall Boggs",
      bio: "Randall studies stealth, visual adaptation, and the risks of relying on talent without teamwork.",
      profile_image: "https://picsum.photos/seed/randall/200/200",
      email: "rboggs@monstersuniversity.edu",
      department_id: doors.rows[0].id,
    },
    {
      name: "Roz",
      bio: "Roz teaches careful paperwork, secure records, and the terrifying power of a missing form.",
      profile_image: "https://picsum.photos/seed/roz/200/200",
      email: "roz@monstersuniversity.edu",
      department_id: doors.rows[0].id,
    },
    {
      name: "Celia Mae",
      bio: "Celia helps students understand floor communication, customer service, and energy operations behind the scenes.",
      profile_image: "https://picsum.photos/seed/celia/200/200",
      email: "cmae@monstersuniversity.edu",
      department_id: energy.rows[0].id,
    },
    {
      name: "Don Carlton",
      bio: "Don brings a nontraditional student perspective to leadership, teamwork, and making a fresh start at MU.",
      profile_image: "https://picsum.photos/seed/don/200/200",
      email: "dcarlton@monstersuniversity.edu",
      department_id: business.rows[0].id,
    },
    {
      name: "Johnny Worthington III",
      bio: "Johnny lectures on reputation, competition, and what campus leaders can learn from the Scare Games.",
      profile_image: "https://picsum.photos/seed/johnny/200/200",
      email: "jworthington@monstersuniversity.edu",
      department_id: business.rows[0].id,
    },
  ];

  for (const p of professors) {
    await db.query(
      `INSERT INTO professors (name, bio, profile_image, email, department_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [p.name, p.bio, p.profile_image, p.email, p.department_id]
    );
  }
}