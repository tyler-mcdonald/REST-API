/**
 * Wraps a provided async callback function within a try catch block.
 * @param {function} cb - the callback function to be executed in the try statement
 */
exports.asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        // Forward error to the global error handler
        next(error);
      }
    }
  };
};
