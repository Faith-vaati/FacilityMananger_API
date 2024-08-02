const DataTypes = require("sequelize");

module.exports = (sequelize) => {
  const Stores = sequelize.define("Stores", {
    storeID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Contact: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    StoreType: {
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
  return Stores;
};
