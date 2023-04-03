const { isAuth } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getAllEmpresas, createEmpresa } = require("./empresa.controller");


const routerEmpresas = require("express").Router();
routerEmpresas.get("/", getAllEmpresas);
routerEmpresas.post("/", upload.single("portada"),[isAuth], createEmpresa);

module.exports = routerEmpresas;