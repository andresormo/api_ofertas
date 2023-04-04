const { isAuth } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const {createOferta, getAllOfertas, getOfertaById, updateOferta, deleteOferta} = require("./oferta.controller");


const routerOferta = require("express").Router();
routerOferta.get("/", getAllOfertas);
routerOferta.get("/oferta/:id", getOfertaById);
routerOferta.post("/", [isAuth], upload.single("portada"), createOferta);
routerOferta.put("/:id",[isAuth], upload.single("portada"), updateOferta);
routerOferta.delete("/:id", [isAuth], deleteOferta);

module.exports = routerOferta;