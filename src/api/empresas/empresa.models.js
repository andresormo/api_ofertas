const mongoose = require("mongoose");


const empresaSchema = new mongoose.Schema(
    {
        nombre:{type:String, required:true, unique:true},
        cif:{type:String, required:true,unique:true},
        direccion:{type:String, required:true},
        numero:{type:String},
        cp:{type:String},
        localidad:{type:String},
        portada:{type:String, default:"https://img.freepik.com/vector-premium/concepto-empresa-2-icono-linea-color-ilustracion-simple-elemento-amarillo-azul-diseno-simbolo-esquema-concepto-empresa_159242-4866.jpg"},
        capital:{type:Number},
        trabajadores:{type:Number},
        ofertas:[{type:mongoose.Types.ObjectId, ref:"ofertas"}]
    },
    {
        timestamps:true,
        collection:"empresas"
    }
)

const Empresas = mongoose.model("empresas", empresaSchema);

module.exports = Empresas;