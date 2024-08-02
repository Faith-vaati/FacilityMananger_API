const AgroProductsController = require("../AgroProducts/AgroProducts.controller");
const AgroProductsModel = require("../AgroProducts/AgroProducts.model");
const verifyToken = require("../Utils/VerifyToken");

exports.AgroProductsRoutes = function (app) {
  app.post("/products/create", [AgroProductsController.createProducts]);
  app.get("/products/agrovet/:id", [
    AgroProductsController.getAgroProductsByAgrovetID,
  ]);

  app.get("/products/:productsID", [
    verifyToken,
    AgroProductsController.getProductsById,
  ]);

  app.delete("/products/:id", [
    verifyToken,
    AgroProductsController.deleteProductsById,
  ]);

  app.put("/products/update/:productsID", [
    verifyToken,
    AgroProductsController.updateProductsById,
  ]);

  app.get("/products", [AgroProductsController.getAllProducts]);
};
