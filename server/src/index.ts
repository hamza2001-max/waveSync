import userRouter from "./routes/localRoute";
import { config } from "dotenv";
import express from "express";
import googleRouter from "./routes/googleRoute";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import pg from "pg";

config();

export const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    },
    store: new (require("connect-pg-simple")(session))({
      pool: new pg.Pool({
        user: process.env.POOL_USER,
        host: process.env.POOL_HOST,
        port: Number(process.env.POOL_PORT),
        database: process.env.POOL_DB,
        password: process.env.POOL_PWD,
      }),
      tableName: process.env.STORE_TABLE,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/auth", googleRouter)