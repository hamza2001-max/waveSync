import userRouter from "./routes/userRoute";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import pg from "pg";

config();
require("./strategies/local.ts");
export const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    store: new (require("connect-pg-simple")(session))({
      pool: new pg.Pool({
        user: "postgres",
        host: "localhost",
        port: 5432,
        database: "waveSync",
        password: "hamza",
      }),
      tableName: "LoginSession",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/user/", userRouter);

