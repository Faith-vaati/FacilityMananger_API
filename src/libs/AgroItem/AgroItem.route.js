const AgroItemController = require("./AgroItem.contoller");
const verifyToken = require("../Utils/VerifyToken");

exports.AgroItemRoutes = function (app) {
  app.get("/agroItem/singlefarm/:id", [
    AgroItemController.getAgroItemsByFarmID,
  ]);

  app.post("/agroItem/create", [AgroItemController.createAgroItem]);

  app.get("/agroItems", [AgroItemController.getAllAgroItem]);

  app.delete("/agroItem/delete/:id", [AgroItemController.deleteById]);
};
