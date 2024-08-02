const FarmProduceController = require("./FarmProduce.contoller");
const verifyToken = require("../Utils/VerifyToken");
const FarmProduceModel = require("./FarmProduce.model");

exports.FarmProduceRoutes = function (app) {
  app.post("/farmproduce/create", [
    FarmProduceModel.uploadFile,
    FarmProduceController.createFarmProduce,
  ]);

  app.get("/farmproduce/farm/:id", [
    FarmProduceController.getFarmProducesByFarmID,
  ]);

  app.get("/farmproduce/:offset", [FarmProduceController.getAllFarmProduces]);

  app.get("/farmproduce/type/:type", [
    FarmProduceController.getFarmProduceItemByType,
  ]);

  app.get("/farmproduce/variety/:variety", [
    FarmProduceController.getIDByVariety,
  ]);

  app.get("/farmproduce/name/:name", [
    FarmProduceController.getFarmProduceItemByName,
  ]);

  app.get("/farmproduce/test/:type", [
    //not tested on UI, not sure if this is correct
    FarmProduceController.getFarmProduceItem,
  ]);
};
