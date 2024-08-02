const AgroProductsModel = require("./AgroProducts.model");

exports.createProducts = (req, res) => {
  AgroProductsModel.createProducts(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getAllProducts = (req, res) => {
  AgroProductsModel.getAllAgroProducts().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getProductsById = (req, res) => {
  AgroProductsModel.getProductsById(req.params.productsID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.updateProductsById = (req, res) => {
  AgroProductsModel.updateProductsById(req.params.productsID, req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.deleteProductsById = (req, res) => {
  AgroProductsModel.deleteProductsById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getAgroProductsByAgrovetID = (req, res) => {
  AgroProductsModel.getAgroProductsByAgrovetID(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};
