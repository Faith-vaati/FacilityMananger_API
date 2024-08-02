const FarmersController = require("./Farmers.controller");
const verifyToken = require("../Utils/VerifyToken");

exports.FarmersRoutes = function (app) {
  app.post("/farmer/register", [FarmersController.createFarmer]);

  app.post("/farmer/login", [FarmersController.farmerlogin]);

  app.delete("/farmer/delete/:id", [FarmersController.deleteFarmer]);

  app.put("/farmer/update/:id", [FarmersController.updateFarmerByID]);

  app.get("/farmers", [FarmersController.getAllFarmers]);

  app.get("/farmers/stats/:id", [FarmersController.getFarmerStats]);
};
