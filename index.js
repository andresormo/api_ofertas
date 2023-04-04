const express = require("express");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT;

const server = express();
server.use(cors({
    origin: '*'
}));

const routerOferta = require("./src/api/ofertas/oferta.routes");
const routerEmpresas = require("./src/api/empresas/empresa.routes");
const userRouter = require("./src/api/users/user.routes");


const cloudinary = require("cloudinary").v2;

server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.use("/", routerEmpresas);
server.use("/", routerOferta);
server.use("/", userRouter);

const db = require("./src/utils/db.js");
db.connectDB();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

server.use((err,req,res,next)=>{
    return res.status(res.status(err.status||500).json(err.message||"Error inesperado"))
});

server.use("*",(req,res,next)=>{
    return res.status(404).json("Route not found")
});

server.listen(PORT, ()=>{
    console.log("Escuchando en http://localhost:"+PORT);
})
