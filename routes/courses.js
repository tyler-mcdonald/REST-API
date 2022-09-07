const express = require("express");
const router = express.Router();
const { asyncHandler } = require("../middleware/async-handler");
const { authenticateUser } = require("../middleware/auth-user");
const { Course } = require("../models");
const { User } = require("../models");

/** GET all courses */
router.get(
  "/courses",
  asyncHandler(async (req, res) => {
    const courses = await Course.findAll();
    await res.status(200).json(courses);
  })
);

/** GET course by ID */
router.get(
  "/courses/:id",
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    res.status(200).json(course);
  })
);

/** POST a new course */
router.post(
  "/courses",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const { title, description, estimatedTime, materialsNeeded, userId } =
      req.body;
    const course = await Course.create({
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    });
    res.location(`/courses/${course.id}`);
    res.status(201).end();
  })
);

/** PUT course */
router.put(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    const { title, description, estimatedTime, materialsNeeded, userId } =
      req.body;
    const course = await Course.findByPk(req.params.id);
    if (userId === course.userId) {
    }
    await course.update({
      title,
      description,
      estimatedTime,
      materialsNeeded,
    });
    res.status(204).end();
  })
);

/** DELETE course */
router.delete(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    await course.destroy();
    res.status(204).end();
  })
);

module.exports = router;
