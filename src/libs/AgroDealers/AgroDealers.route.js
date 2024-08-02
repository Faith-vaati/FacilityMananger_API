const AgroDealersController = require("./AgroDealers.controller");
const verifyToken = require("../Utils/VerifyToken");

exports.AgroDealersRoutes = function (app) {
  app.post("/agrodealers/create", [AgroDealersController.createDealer]);

  app.get("/agrodealers/:id", [AgroDealersController.getDealerByID]);

  app.get("/agrodealers/distance/:id", [
    AgroDealersController.getAgrodealersByDistance,
  ]);

  app.put("/agrodealers/:id", [AgroDealersController.updateDealerByID]);

  app.delete("/agrodealers/:id", [AgroDealersController.deleteDealerByID]);


  app.get("/agrodealers/filter/:column/:operator/:value", [
    AgroDealersController.filterDealer,
  ]);

  app.get("/agrodealers", [AgroDealersController.getAllDealers]);
};
