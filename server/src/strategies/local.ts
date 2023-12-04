import { Strategy } from "passport-local";
import { prisma } from "../utils/client";
import passport from "passport";
import bcrypt from "bcrypt";

passport.serializeUser((user: any, done) => {
  console.log("Inside serialization");
  done(null, user.userId);
});

passport.deserializeUser(async (userId: number, done) => {
  console.log("Inside deserialization");
  try {
    const userExists = await prisma.user.findFirst({
      where: { userId: userId },
    });
    if (!userExists) throw new Error("User not found.");
    done(null, userExists);
  } catch (error) {
    done(error, false);
  }
});


passport.use(
  new Strategy(
    { usernameField: "email" },
    async (email: string, password: string, done: any) => {
      try {
        // Already gets mentioned in the message.
        // if (!email)
        //   return done(null, false, { message: "Email was not provided." });
        // if (!password)
        //   return done(null, false, { message: "Password was not provided" });

        const userExists = await prisma.user.findFirst({ where: { email } });
        
        if (!userExists)
          return done(null, false, { message: "User doesn't exists." });
        const match = await bcrypt.compare(password, userExists.password);
        if (match) {
          done(null, userExists);
        } else {
          return done(null, false, { message: "Wrong Password." });
        }
      } catch (error: any) {
        return done(error, false);
      }
    }
  )
);
