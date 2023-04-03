const { isAuth } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const {createOferta, getAllOfertas} = require("./oferta.controller");


const routerOferta = require("express").Router();
routerOferta.get("/", getAllOfertas);
routerOferta.post("/", [isAuth], upload.single("portada"), createOferta);

module.exports = routerOferta;