import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "working" });
});

app.listen(process.env.PORT || 3700, () => {
  console.log("Server running on port 3700");
});
