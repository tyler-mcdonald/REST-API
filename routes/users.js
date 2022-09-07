const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models");
const { asyncHandler } = require("../middleware/async-handler");
const { authenticateUser } = require("../middleware/auth-user");

/** GET all users */
router.get(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const users = await User.findAll();
    await res.status(200).json(users);
  })
);

/** POST a new user */
router.post(
  "/users",
  asyncHandler(async (req, res) => {
    const { firstName, lastName, emailAddress, password } = req.body;
    await User.create({ firstName, lastName, emailAddress, password });
    res.location("/");
    res.status(201).end();
  })
);

module.exports = router;
