const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const Orders = require("../../models/Orders")(sequelize, Sequelize);

Orders.sync({ force: false });

exports.createOrder = (orderdata) => {
  return new Promise(async (resolve, reject) => {
    if (orderdata.FarmerID === undefined) {
      return reject({ error: "Body is required!!!" });
    }

    Orders.create(orderdata).then(
      (result) => {
        resolve({ success: "Order created successfully" });
      },
      (err) => {
        console.log(err);
        reject({ error: "Order creation failed" });
      }
    );
  });
};

exports.updateOrdersById = (orderId, orderData) => {
  return new Promise(async (resolve, reject) => {
    Orders.update(orderData, {
      where: {
        OrderID: orderId,
      },
    }).then(
      (result) => {
        resolve({ success: "Order updated successfully" });
      },
      (err) => {
        reject({ error: "Order update failed" });
      }
    );
  });
};

exports.deleteOrdersById = (orderId) => {
  return new Promise(async (resolve, reject) => {
    Orders.destroy({
      where: {
        OrderID: orderId,
      },
    }).then(
      (result) => {
        resolve({ success: "Order deleted successfully" });
      },
      (err) => {
        reject({ error: "Order deletion failed" });
      }
    );
  });
};

exports.orderDetails = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT 
            json_build_object(
                'OrderID', "Orders"."OrderID",
                'OrderDate', "Orders"."OrderDate",
                'Quantity', "Orders"."Quantity",
                'TotalAmount', "Orders"."TotalAmount",
                'OrderNotes', "Orders"."OrderNotes",
                'Status', "Orders"."Status"
            ) AS "OrderDetails",
            json_build_object(
                'Name', "Farmer"."Name",
                'Phone', "Farmer"."Phone",
                'FarmerType', "Farmer"."FarmerType",
                'FarmingType', "Farmer"."FarmingType"
            ) AS "FarmerDetails",
            json_build_object(
                'StoreName', "AgroDealer"."StoreName",
                'Name', "AgroDealer"."Name",
                'Phone', "AgroDealer"."Phone"
            ) AS "AgroDealerDetails"
        FROM 
            "Orders"
        LEFT JOIN 
            "Farmers" AS "Farmer" ON "Orders"."FarmerID" = "Farmer"."FarmerID"
        LEFT JOIN 
            "AgroDealers" AS "AgroDealer" ON "Orders"."AgroDealerID" = "AgroDealer"."AgroDealerID"
        WHERE 
            "Orders"."OrderID" = '${orderId}'`
      );
      resolve({data: data});
    } catch (error) {
      console.log(error);
      reject({ error: "Something went wrong" });
    }
  });
};

exports.getAllOrders = () => {
  return new Promise(async (resolve, reject) => {
    Orders.findAll().then(
      (result) => {
        resolve(result);
      },
      (err) => {
        console.log(err);
        reject({ error: "Failed to fetch orders" });
      }
    );
  });
};
