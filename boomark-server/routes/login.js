const express = require("express");
const router = express.Router();
const passport = require("passport");
const mode = process.env.NODE_ENV;
const { User } = require("../models");

router.get("/", async (req, res) => {
  if (req.user) {
    const user = await User.findOne({
      where: { id: req.user.dataValues.id },
    });
    res.send(user);
  } else {
    res.send("null");
  }
});

// 카카오 로그인
router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/login",
  }),
  async (req, res) => {
    if (mode === "development") {
      // 개발환경
      res.redirect("http://localhost:3000");
    } else {
      res.redirect("https://pickle-pickle.kr");
    }
  }
);

// 구글 로그인

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("https://pickle-pickle.kr");
  }
);

// 로그아웃

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  req.session = null;
  res.send("OK");
});

module.exports = router;
