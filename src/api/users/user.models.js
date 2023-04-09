const mongoose = require("mongoose");
const bycrpt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, unique: true, trim: true },
        password: { type: String, trim: true, require: true },
        rol: { type: String, default: "user", enum: ["user", "admin","company"], required: true},
        cif: {type: String},
        nombre:{type:String},
        direccion:{type:String},
        numero:{type:String},
        cp:{type:String},
        localidad:{type:String},
        portada:{type:String, default:"https://img.freepik.com/vector-premium/concepto-empresa-2-icono-linea-color-ilustracion-simple-elemento-amarillo-azul-diseno-simbolo-esquema-concepto-empresa_159242-4866.jpg"},
        capital:{type:String},
        trabajadores:{type:String},
    },
    {
        timestamps:true,
        collection: "users"
    }
);

userSchema.pre("save", function(next){
    this.password = bycrpt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;