const FarmItemController = require("./FarmItem.contoller");
const verifyToken = require("../Utils/VerifyToken");

exports.FarmItemRoutes = function (app) {
  app.get("/farmitem/singlefarm/:id", [
    FarmItemController.getFarmItemsByFarmID,
  ]);

  app.post("/farmitem/create", [FarmItemController.createFarmItem]);

  app.get("/farmitem", [FarmItemController.getAllFarmItem]);

  app.delete("/farmitem/delete/:id", [FarmItemController.deleteById]);
};
