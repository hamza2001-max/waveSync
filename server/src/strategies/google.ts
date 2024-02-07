import passport from "passport";
import { OAuth2Strategy } from "passport-google-oauth";
import { prisma } from "../utils/client";

passport.serializeUser((user: any, done) => {
  done(null, user.email);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(
  new OAuth2Strategy(
    {
      clientID:
        "19915083809-9fravib32pbrnih0gp4apct5rqkumcgg.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`,
    },
    async (_, __, profile, done) => {
      try {
        const userExists = await prisma.user.findFirst({
          where: { email: profile.emails && profile.emails[0].value },
        });
        if (userExists) {
          return done(null, userExists);
        }
        console.log(profile);
        const createUser = await prisma.user.create({
          data: {
            fullname: profile.displayName,
            username:
              profile.displayName.split(" ").join("") +
              profile.id.substring(profile.id.length, -5),
            email:
              profile.emails && profile.emails[0]
                ? profile.emails[0].value
                : "",
            password: profile.id,
            profileImage: profile.photos ? profile.photos[0].value : null,
          },
        });
        done(null, createUser);
      } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(error, null);
      }
    }
  )
);
