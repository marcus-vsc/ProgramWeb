const express = require("express");
const routes = express.Router();
const UserController = require("./controller/UserController");
const BanckAccountController = require("./controller/BankAccountController");

routes.get("/users", UserController.list);
routes.get("/users/:id", UserController.show);
routes.post("/users", UserController.create);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);

routes.get("/bankAccount", BanckAccountController.list);
routes.get("/bankAccount/:id", BanckAccountController.show);
routes.get("/bankAccount_usuario/:idUsuario", BanckAccountController.showUser);
routes.post("/bankAccount", BanckAccountController.create);
routes.put("/bankAccount/:id/", BanckAccountController.update);
routes.delete("/bankAccount/:id", BanckAccountController.delete);
routes.delete("/bankAccount_usuario/:idUsuario", BanckAccountController.deleteByUser);

module.exports = routes;
