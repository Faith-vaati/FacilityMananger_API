const UsersController = require("./Users.controller");
const verifyToken = require("../Utils/VerifyToken");

exports.UsersRoutes = function (app) {
  app.post("/users/create", [UsersController.createUsers]);

  app.get("/users/paginated/:limit/:offset", [UsersController.getAllUsers]);
};
