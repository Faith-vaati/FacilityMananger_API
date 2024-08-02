const DataTypes = require("sequelize");
module.exports = (sequelize) => {
  const Farms = sequelize.define("Farms", {
    FarmID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    FarmerID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    Longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    Latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  });
  return Farms;
};
