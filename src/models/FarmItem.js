const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const FarmItem = sequelize.define("FarmItem", {
    FarmItemID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    FarmID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FarmProduceID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return FarmItem;
};
