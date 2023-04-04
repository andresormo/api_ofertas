const { isAuth } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getAllEmpresas, createEmpresa, getEmpresaById, updateEmpresa } = require("./empresa.controller");


const routerEmpresas = require("express").Router();
routerEmpresas.get("/", getAllEmpresas);
routerEmpresas.get("/empresa/:id", getEmpresaById );
routerEmpresas.post("/", upload.single("portada"),[isAuth], createEmpresa);
routerEmpresas.put("/:id", upload.single("portada"), [isAuth], updateEmpresa)

module.exports = routerEmpresas;