const { Model, Datatypes } = require("sequelize");

module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init(
    {
      title: Datatypes.STRING,
      description: Datatypes.TEXT,
      estimatedTime: Datatypes.STRING,
      materialsNeeded: Datatypes.STRING,
      //   userId - created in model associations
    },
    { sequelize }
  );

  Course.associate = (models) => {
    Course.hasMany(models.User, {});
  };

  return Course;
};
