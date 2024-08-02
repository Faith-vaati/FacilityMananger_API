const AuthController = require("./Auths.controller");
const verifyToken = require("../Utils/VerifyToken");

exports.AuthRoutes = function (app) {
  app.post("/auth/register", [AuthController.insert]);

  app.post("/auth/login", [AuthController.login]);

  app.get("/auth/logout", [AuthController.logout]);

  app.get("/auth/seachbyphone/:role/:q", [
    verifyToken,
    AuthController.searchByPhone,
  ]);

  app.get("/auth/seachbyname/:role/:q", [
    verifyToken,
    AuthController.searchByName,
  ]);

  app.get("/auth/quicksearch/:q", [verifyToken, AuthController.quickSearch]);

  app.post("/auth/forgot", [AuthController.forgotPassword]);

  app.get("/auth/paginated/:offset", [AuthController.findAuthPaginated]);

  app.get("/auth/:authID", [AuthController.findAuthById]);

  app.put("/auth/:authID", [AuthController.updateAuthById]);

  app.delete("/auth/:authID", [AuthController.deleteAuthById]);

  app.get("/auth", [AuthController.findAllAuth]);
};
