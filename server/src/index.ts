import { config } from "dotenv";
import express from "express";

config();
const app = express();

app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});