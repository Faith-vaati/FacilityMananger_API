const OrdersModel = require("./Orders.model");

exports.createOrder = (req, res) => {
    OrdersModel.createOrder(req.body).then(
        (result) => {
            res.status(200).send(result);
        },
        (err) => {
            console.log(err);
            res.status(203).send(err);
        }
    );
};

exports.updateOrdersById = (req, res) => {
    OrdersModel.updateOrdersById(req.params.id, req.body).then(
        (result) => {
            res.status(200).send(result);
        },
        (err) => {
            console.log(err);
            res.status(203).send(err);
        }
    );
};

exports.deleteOrdersById = (req, res) => {
    OrdersModel.deleteOrdersById(req.params.id).then(
        (result) => {
            res.status(200).send(result);
        },
        (err) => {
            console.log(err);
            res.status(203).send(err);
        }
    );
}

exports.orderDetails = (req, res) => {
    OrdersModel.orderDetails(req.params.id).then(
        (result) => {
            res.status(200).send(result);
        },
        (err) => {
            console.log(err);
            res.status(203).send(err);
        }
    );
};

exports.getAllOrders = (req, res) => {
    OrdersModel.getAllOrders().then(
        (result) => {
            res.status(200).send(result);
        },
        (err) => {
            console.log(err);
            res.status(203).send(err);
        }
    );
};
