const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const AgroItem = sequelize.define("AgroItem", {
    AgroItemID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    AgroDealerID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AgroProductID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return AgroItem;
};
