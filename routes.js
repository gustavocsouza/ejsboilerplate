const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatoController = require("./src/controllers/contatoController");
const { authMiddleware } = require("./src/middlewares/auth");

route.get("/", homeController.index);

route.get("/login", loginController.index);
route.post("/login", loginController.login);
route.get("/logout", loginController.logout);
route.post("/register", loginController.register);

route.use(authMiddleware);
route.get("/contatos", contatoController.index);
route.post("/contatos", contatoController.register);
route.get("/contatos/:id", contatoController.editIndex);
route.post("/contatos/:id", contatoController.edit);
route.get("/contatos/delete/:id", contatoController.delete);

module.exports = route;