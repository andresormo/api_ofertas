const mongoose = require("mongoose");
const Empresas = require("../../api/empresas/empresa.models");
require("dotenv").config();

const LINK_DB = process.env.MONGO_DB;

const empresa = [
    {
        nombre:"Romeorsa",
        cif:"B-72898888",
        direccion:"C/Alamillo",
    }
];

mongoose.connect(LINK_DB).
then(async()=>{
    const empresa = await Empresas.find();
    if(empresa.length){
        await Empresas.collection.drop();
        console.log("Empresas eliminadas con éxito");
    }
})
.catch((error)=>console.log("Error al eliminar las empresas de la base de datos"))
.then(async()=>{
    await Empresas.insertMany(empresa);
    console.log("Empresas creadas con éxito");
})
.finally(()=> mongoose.disconnect);