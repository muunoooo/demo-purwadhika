import express, { Request, Response } from "express";
import cors from "cors";
import prisma from "./prisma";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send("Oke masuk bang APInya");
});

app.get("/messages", async (req: Request, res: Response) => {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(messages);
});

app.post("/messages", async (req: Request, res: Response) => {
  const { name, message } = req.body;
  const newMessage = await prisma.message.create({ data: { name, message } });
  res.status(201).json(newMessage);
});

app.listen(8000, () => console.log("Server ready at http://localhost:8000"));
