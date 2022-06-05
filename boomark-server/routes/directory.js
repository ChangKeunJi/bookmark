const express = require("express");
const router = express.Router();

const { Directory, Post } = require("../models");
const { isLoggedIn } = require("./middleware");

const summarizeStr = (str, num) => {
  if (str.length <= num) {
    return str;
  } else {
    return str.slice(0, num);
  }
};

// 모든 카테고리 불러오기
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.user.dataValues.id;
    const dirs = await Directory.findAll({
      where: { UserId: id },
      order: [
        ["order", "ASC"],
        // 카테고리 order 내림차순으로 정렬
      ],
    });

    res.send(dirs);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 카테고리 추가하기
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const allDir = await Directory.findAll({
      where: { UserId: req.user.dataValues.id },
    });

    let order = 0;
    if (allDir.length === 0) {
      order = 1;
    } else {
      const maxOrder = allDir.reduce((prev, current) => {
        return prev.order > current.order ? prev : current;
      });
      order = maxOrder.order + 1;
    }

    const newDir = await Directory.create({
      name: summarizeStr(req.body.name, 100),
      UserId: req.user.dataValues.id,
      order: order,
    });

    res.send(newDir);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 카테고리 순서 변경
router.patch("/order", isLoggedIn, async (req, res, next) => {
  try {
    await Directory.update(
      {
        order: req.body.order,
      },
      {
        where: { id: req.body.id },
      }
    );

    const dirs = await Directory.findAll({
      where: { UserId: req.user.dataValues.id },
      order: [["order", "ASC"]],
    });

    res.send(dirs);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 카테고리 이름 변경
router.patch("/", isLoggedIn, async (req, res, next) => {
  try {
    await Directory.update(
      {
        name: summarizeStr(req.body.name, 100),
      },
      {
        where: { id: req.body.id },
      }
    );

    const updatedDir = await Directory.findOne({ where: { id: req.body.id } });
    res.send(updatedDir);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 카테고리 삭제
router.delete("/:dirId", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.dirId;

    await Directory.destroy({
      where: { id },
    });

    res.send(id);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 특정 카테고리 포스트 불러오기
router.get("/:dirId", isLoggedIn, async (req, res, next) => {
  try {
    const dirId = req.params.dirId;

    const dirPosts = await Post.findAll({
      where: { DirectoryId: dirId, UserId: req.user.dataValues.id },
    });

    res.send(dirPosts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
