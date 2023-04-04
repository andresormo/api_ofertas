const { isAuth } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const {createOferta, getAllOfertas, getOfertaById} = require("./oferta.controller");


const routerOferta = require("express").Router();
routerOferta.get("/ofertas", getAllOfertas);
routerOferta.get("/ofertas/:id", getOfertaById);
routerOferta.post("/", [isAuth], upload.single("portada"), createOferta);

module.exports = routerOferta;