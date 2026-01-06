import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 5000;

// middleware
app.use(express.json());

// test route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Express + TypeScript server running 🚀",
  });
});

// post route
app.post("/", (req: Request, res: Response) => {
  console.log(req.body);

  res.status(201).json({
    success: true,
    message: "POST API working",
  });
});

// server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
