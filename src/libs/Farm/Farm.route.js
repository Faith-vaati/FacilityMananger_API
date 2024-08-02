const FarmController = require("./Farm.contoller");
const verifyToken = require("../Utils/VerifyToken");

exports.FarmRoutes = function (app) {
  app.post("/farm/create", [FarmController.createFarm]);

  app.get("/farms", [FarmController.getAllFarms]);

  app.put("/farm/update/:farmId", [FarmController.updateFarmDetails]);

  app.get("/farms/:farmerId", [FarmController.getFarmerFarms]);

  app.delete("/farms/delete/:id", [FarmController.deleteById]);
};
