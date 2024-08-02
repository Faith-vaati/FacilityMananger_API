const DataTypes = require("sequelize");

module.exports = (sequelize) => {
  const Farmers = sequelize.define("Farmers", {
    FarmerID: {
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FarmerType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FarmingType: {
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
  return Farmers;
};
