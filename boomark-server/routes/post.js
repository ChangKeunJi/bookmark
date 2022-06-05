const express = require("express");
const router = express.Router();
const urlMetadata = require("url-metadata");

const { Post, Directory } = require("../models");
const { isLoggedIn } = require("./middleware");

const summarizeStr = (str, num) => {
  if (str.length <= num) {
    return str;
  } else {
    return str.slice(0, num);
  }
};

// 포스트 불러오기
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const allPosts = await Post.findAll({
      where: { UserId: req.user.dataValues.id },
      order: [["createdAt", "DESC"]],
    });

    res.send(allPosts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 포스트 추가
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const data = await urlMetadata(req.body.url);
    if (data) {
      const newPost = await Post.create({
        url: data.url || data["og:url"],
        thumbnail: data["og:image"] || data.image,
        title: summarizeStr(data.title || data["og:title"], 100),
        desc: summarizeStr(data.description || data["og:description"], 200),
        author: summarizeStr(
          data.author || data["og:site_name"] || data.source,
          100
        ),
        favorite: false,
        UserId: req.user.dataValues.id,
        DirectoryId: req.body.dirId ? req.body.dirId : null,
      });
      res.send(newPost);
    } else {
      res.status(403).send("올바른 URL이 아닙니다.");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 포스트와 디렉토리 동시 추가
router.post("/directory", isLoggedIn, async (req, res, next) => {
  try {
    const data = await urlMetadata(req.body.url);
    if (data) {
      // 디렉토리 생성
      const allDir = await Directory.findAll({
        where: { UserId: req.user.dataValues.id },
      });

      let order;
      if (allDir.length === 0) {
        order = 1;
      } else {
        let max = 0;
        for (let el of allDir) {
          if (el.order > max) {
            max = el.order;
          }
        }
        order = max + 1;
      }

      const newDir = await Directory.create({
        name: req.body.dirName,
        UserId: req.user.dataValues.id,
        order: order,
      });
      // 포스트 생성
      const newPost = await Post.create({
        url: data.url || data["og:url"],
        thumbnail: data["og:image"] || data.image,
        title: summarizeStr(data.title || data["og:title"], 100),
        desc: summarizeStr(data.description || data["og:description"], 200),
        author: summarizeStr(
          data.author || data["og:site_name"] || data.source,
          100
        ),
        favorite: false,
        UserId: req.user.dataValues.id,
        DirectoryId: newDir.dataValues.id,
      });

      res.send({ newPost, newDir });
    } else {
      res.status(403).send("올바른 URL이 아닙니다.");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 포스트 삭제
router.delete("/:postId", async (req, res, next) => {
  try {
    const id = req.params.postId;

    await Post.destroy({
      where: { id },
    });

    res.send(id);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 포스트 즐겨찾기 추가 or 삭제
router.patch("/fav", async (req, res, next) => {
  try {
    const bool = !req.body.bool;

    await Post.update(
      {
        favorite: bool,
      },
      {
        where: { id: req.body.id, UserId: req.user.dataValues.id },
      }
    );

    const updatedPost = await Post.findOne({
      where: { id: req.body.id, UserId: req.user.dataValues.id },
    });

    res.send(updatedPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 즐겨찾기 포스트만 불러오기
router.get("/favorite", isLoggedIn, async (req, res, next) => {
  try {
    const favPosts = await Post.findAll({
      where: { favorite: true, UserId: req.user.dataValues.id },
      order: [["createdAt", "DESC"]],
    });

    res.send(favPosts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
