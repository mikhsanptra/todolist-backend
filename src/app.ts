// src/app.ts

import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route tidak ditemukan"
  });
});

export default app;