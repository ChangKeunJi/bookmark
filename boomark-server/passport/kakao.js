const passport = require("passport");
const kakaoStrategy = require("passport-kakao").Strategy;
const dotenv = require("dotenv");

const { User } = require("../models");
dotenv.config();

module.exports = () => {
  passport.use(
    new kakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: `/login/kakao/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json.kakao_account.email,
              name: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });

            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
