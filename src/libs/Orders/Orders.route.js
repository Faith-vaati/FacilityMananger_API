const OrdersController = require("./Orders.controller");
const verifyToken = require("../Utils/VerifyToken");

exports.OrdersRoutes = function (app) {
    app.post("/orders/create", [verifyToken, OrdersController.createOrder]);

    app.get("/orders/:id", [verifyToken, OrdersController.orderDetails]);

    app.delete("/orders/:id", [verifyToken, OrdersController.deleteOrdersById]);

    app.put("/orders/update/:id", [verifyToken, OrdersController.updateOrdersById]);

    app.get("/orders", [ OrdersController.getAllOrders]);
};