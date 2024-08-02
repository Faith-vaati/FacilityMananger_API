const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AgroProducts = sequelize.define("AgroProducts", {
    AgroProductID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Categories: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ApplicationMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Target: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    File: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return AgroProducts;
};
