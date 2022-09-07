const { Course } = require("../models");

exports.verifyCourseOwner = async (req, res, next) => {
  const course = await Course.findByPk(req.params.id);
  const method = req.method;
  let message;

  // Pass to next() or throw 401 status
  if (req.body.userId === course.userId) next();
  else if (method === "PUT") {
    message = "You must be the course owner to update the course.";
  } else if (method === "DELETE") {
    message = "You must be the course owner to delete the course.";
  }

  res.status(401).json({ message });
};
