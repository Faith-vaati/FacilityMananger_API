const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Auths = sequelize.define("Auths", {
    UserID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Auths;
};
