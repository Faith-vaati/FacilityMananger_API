const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AgroDealers = sequelize.define("AgroDealers", {
    AgroDealerID: {
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

    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    StoreName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    County: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    SubCounty: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Ward: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Market: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    Longitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },

    Latitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    
  });
  return AgroDealers;
};
