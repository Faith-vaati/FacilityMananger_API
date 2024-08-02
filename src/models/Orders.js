const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Orders = sequelize.define("Orders", {
    OrderID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    FarmerID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    AgroDealerID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ProductID: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
    },
    OrderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TotalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    OrderNotes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
  });
  return Orders;
};
