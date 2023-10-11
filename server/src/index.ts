import userRouter from "./routes/userRoute";
import { config } from "dotenv";
import express from "express";
import cors from "cors";

config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/user/", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});
