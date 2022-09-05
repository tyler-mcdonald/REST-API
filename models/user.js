const { Model, Datatypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
      firstName: Datatypes.STRING,
      lastName: Datatypes.STRING,
      emailAddress: Datatypes.STRING,
      password: Datatypes.STRING,
    },
    { sequelize }
  );

  User.associate = (models) => {
    User.belongsTo(models.Course, {});
  };

  return User;
};
