const { isAuth, isCompanyAuth,isCompany } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const {createOferta, getAllOfertas, getOfertaById, updateOferta, deleteOferta} = require("./oferta.controller");


const routerOferta = require("express").Router();
routerOferta.get("/", getAllOfertas);
routerOferta.get("/oferta/:id", getOfertaById);
routerOferta.post("/", [isAuth],[isCompany],[isCompanyAuth], upload.single("portada"), createOferta);
routerOferta.put("/:id",[isAuth],[isCompany],[isCompanyAuth], upload.single("portada"), updateOferta);
routerOferta.delete("/:id", [isAuth],[isCompany],[isCompanyAuth], deleteOferta);

module.exports = routerOferta;