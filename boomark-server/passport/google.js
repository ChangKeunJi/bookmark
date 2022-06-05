const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");

const { User } = require("../models");
dotenv.config();

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/login/google/callback",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "google" },
          });
          if (exUser) {
            cb(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile.emails[0].value,
              name: profile.displayName,
              snsId: profile.id,
              provider: "google",
            });
            cb(null, newUser);
          }
        } catch (err) {
          console.error(err);
          cb(err);
        }
      }
    )
  );
};
