const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../middleware/async-handler");
const { Course } = require("../models");

/** GET all courses */
router.get(
  "/courses",
  asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      include: [{ model: User }],
    });
    await res.status(200).json(courses);
  })
);

/** POST a new course */
router.post(
  "/courses",
  asyncHandler(async (req, res) => {
    const course = await Course.create({
      title: req.body.title,
      description: req.body.description,
      estimatedTime: req.body.estimatedTime,
      materialsNeeded: req.body.materialsNeeded,
    });
    res.location("/");
    res.status(201).end();
  })
);

module.exports = router;
