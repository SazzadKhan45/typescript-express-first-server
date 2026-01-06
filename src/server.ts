import express, { Application, Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app: Application = express();
const PORT = 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Db connection
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STRING}`,
});

//
const initDb = async () => {
  // USer table create
  await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
  // user todo table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false,
      due_date DATE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

//
initDb();

// test route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Express + TypeScript server running!!!!",
  });
});

// post route
app.post("/api", (req: Request, res: Response) => {
  // console.log(req.body);

  res.status(201).json({
    success: true,
    message: "POST API working",
  });
});

// server start
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
