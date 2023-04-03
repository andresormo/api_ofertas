const mongoose = require("mongoose");

const ofertaSchema = new mongoose.Schema(
    {
        empresa:[{type:mongoose.Types.ObjectId, ref:"empresas"}],
        puesto:{type:String, required:true},
        salario:{type:String, default:"No especifica"},
        descripcion:{type:String},
        contrato:{type:String, enum:["indefinido", "temporal", "larga duración", "sustitucion", "baja"]},
        sector:{type:String, enum:["Administracion","Tecnologico", "Agrícola", "Servicio", "Turismo", "Industria", "Otros"]},
        portada:{type:String, default:"https://cdn-icons-png.flaticon.com/512/25/25634.png"},
        telefono:{type:String, required:true},
        email:{type:String, required:true},
        ubicacion:{type:String}
    },
    {
        timestamps:true,
        collection:"ofertas"
    }
);

const Oferta = mongoose.model("ofertas", ofertaSchema);

module.exports = Oferta;