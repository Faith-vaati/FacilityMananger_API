const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const FarmProduce = sequelize.define("FarmProduce", {
    FarmProduceID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Variety: {
      // or breed in livestock
      type: DataTypes.STRING,
      allowNull: false,
    },
    File: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return FarmProduce;
};
