import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const scaring = await db.query(
    `INSERT INTO departments (name, description, image_url, contact_email, phone, location)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      "School of Scaring",
      "The signature Monsters University program, where students study scare technique, room entry, roar control, and performance under pressure.",
      "https://images2.alphacoders.com/688/thumb-1920-688538.jpg",
      "scaring@monstersuniversity.edu",
      "555-0131",
      "Scare Hall",
    ]
  );

  const doors = await db.query(
    `INSERT INTO departments (name, description, image_url, contact_email, phone, location)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      "Department of Door Technology",
      "A hands-on program focused on portal mechanics, door storage systems, safety procedures, and the technology used to reach the human world.",
      "https://www.springscreative.com/cdn/shop/files/tiled_preview_square_20250725_140459_9668b5fc-426b-4e82-b1d5-948e4562570e.png?v=1764615635",
      "doors@monstersuniversity.edu",
      "555-0199",
      "Innovation Hall",
    ]
  );

  const energy = await db.query(
    `INSERT INTO departments (name, description, image_url, contact_email, phone, location)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      "Scream Energy Research",
      "Students and faculty research scream collection, energy storage, laugh power theory, and sustainable power for the monster world.",
      "https://i.pinimg.com/564x/ea/11/35/ea113567c23118eeb67e5e51f5981b1d.jpg",
      "energy@monstersuniversity.edu",
      "555-0144",
      "Energy Research Center",
    ]
  );

  const business = await db.query(
    `INSERT INTO departments (name, description, image_url, contact_email, phone, location)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      "Monster Business and Leadership",
      "A department for monsters who want to lead teams, run scare operations, manage fraternities and sororities, or start their own monster-world company.",
      "https://images.squarespace-cdn.com/content/v1/60241cb68df65b530cd84d95/1721159001853-Y0EKLS9ZIXW9HZE7S6NR/Monsters14.jpg",
      "business@monstersuniversity.edu",
      "555-0188",
      "Roar Hall",
    ]
  );

  const professors = [
    {
      name: "Dean Abigail Hardscrabble",
      title: "Dean of the School of Scaring",
      bio: "Dean Hardscrabble is a legendary scarer known for exacting standards, sharp instincts, and an unforgettable entrance.",
      profile_image: "https://static.wikia.nocookie.net/disney/images/1/13/Profile_-_Dean_Hardscrabble.png/revision/latest?cb=20190312074801",
      email: "hardscrabble@monstersuniversity.edu",
      office: "Scare Hall 101",
      department_id: scaring.rows[0].id,
    },
    {
      name: "Professor Derek Knight",
      title: "Scaring 101 Instructor",
      bio: "Professor Knight introduces first-year monsters to scare fundamentals, classroom discipline, and the importance of practice.",
      profile_image: "https://static.wikia.nocookie.net/monstersincmovies/images/c/c0/Prof.knight.jpg/revision/latest/scale-to-width-down/1200?cb=20160822221547",
      email: "dknight@monstersuniversity.edu",
      office: "Scare Hall 204",
      department_id: scaring.rows[0].id,
    },
    {
      name: "Mike Wazowski",
      title: "Guest Lecturer in Scare Strategy",
      bio: "Mike teaches planning, research, teamwork, and why a monster should never underestimate careful preparation.",
      profile_image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c5ae195f-e639-4f3e-87e0-6199d10d2fb9/dg65n12-e39839ab-ea1c-4f10-81c0-58a5acdc6a13.png/v1/fill/w_791,h_1010/mike_wazowski_meme_png_by_kylewithem_dg65n12-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTYzNCIsInBhdGgiOiIvZi9jNWFlMTk1Zi1lNjM5LTRmM2UtODdlMC02MTk5ZDEwZDJmYjkvZGc2NW4xMi1lMzk4MzlhYi1lYTFjLTRmMTAtODFjMC01OGE1YWNkYzZhMTMucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.K9jNItN29dKsf--8_IHyFKV7K4vuMwwnCcLq4N4_eUo",
      email: "mwazowski@monstersuniversity.edu",
      office: "Scare Hall 212",
      department_id: scaring.rows[0].id,
    },
    {
      name: "James P. Sullivan",
      title: "Guest Lecturer in Applied Scaring",
      bio: "Sullivan shares field experience from Monsters, Inc. and helps students understand presence, timing, and confidence.",
      profile_image: "https://static.wikia.nocookie.net/pixar/images/e/e7/MU_James_P._Sullivan.jpg/revision/latest/scale-to-width-down/985?cb=20130220173900",
      email: "jsullivan@monstersuniversity.edu",
      office: "Scare Hall 213",
      department_id: scaring.rows[0].id,
    },
    {
      name: "Randall Boggs",
      title: "Camouflage Systems Lecturer",
      bio: "Randall studies stealth, visual adaptation, and the risks of relying on talent without teamwork.",
      profile_image: "https://static.wikia.nocookie.net/antagonists/images/8/86/Randall.png/revision/latest?cb=20240601034538",
      email: "rboggs@monstersuniversity.edu",
      office: "Innovation Hall 118",
      department_id: doors.rows[0].id,
    },
    {
      name: "Roz",
      title: "Instructor of Records and Compliance",
      bio: "Roz teaches careful paperwork, secure records, and the terrifying power of a missing form.",
      profile_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTldfOPfQi9pw9cY2SC80U5lFBenjF5qTXkvrzLN8fT-GbFVlIZca1ZVrE&s=10",
      email: "roz@monstersuniversity.edu",
      office: "Innovation Hall 009",
      department_id: doors.rows[0].id,
    },
    {
      name: "Celia Mae",
      title: "Scream Operations Coordinator",
      bio: "Celia helps students understand floor communication, customer service, and energy operations behind the scenes.",
      profile_image: "https://static.wikia.nocookie.net/disney/images/9/96/Profile_-_Celia.png/revision/latest?cb=20190313100849",
      email: "cmae@monstersuniversity.edu",
      office: "Energy Research Center 310",
      department_id: energy.rows[0].id,
    },
    {
      name: "Don Carlton",
      title: "Leadership Seminar Instructor",
      bio: "Don brings a nontraditional student perspective to leadership, teamwork, and making a fresh start at MU.",
      profile_image: "https://static.wikia.nocookie.net/monstersincmovies/images/2/21/DonCarlton.jpg/revision/latest?cb=20130522115036",
      email: "dcarlton@monstersuniversity.edu",
      office: "Roar Hall 222",
      department_id: business.rows[0].id,
    },
    {
      name: "Johnny Worthington III",
      title: "Competitive Leadership Lecturer",
      bio: "Johnny lectures on reputation, competition, and what campus leaders can learn from the Scare Games.",
      profile_image: "https://disney.fandom.com/wiki/File:Johnny_Worthington_-_Monsters_at_Work.jpg",
      email: "jworthington@monstersuniversity.edu",
      office: "Roar Hall 301",
      department_id: business.rows[0].id,
    },
  ];

  for (const p of professors) {
    await db.query(
      `INSERT INTO professors (name, title, bio, profile_image, email, office, department_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [p.name, p.title, p.bio, p.profile_image, p.email, p.office, p.department_id]
    );
  }
}