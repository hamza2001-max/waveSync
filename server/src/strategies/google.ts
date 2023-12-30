import passport from "passport";
import { OAuth2Strategy } from "passport-google-oauth";

passport.serializeUser((user: any, done) => {
  done(null, user.emails[0].value);
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
      callbackURL: "http://localhost:7000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);
