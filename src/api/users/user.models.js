const mongoose = require("mongoose");
const bycrpt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, unique: true, trim: true },
        password: { type: String, trim: true, require: true },
        rol: { type: String, default: "user", enum: ["user", "admin"], required: true},
        codigo: {type: String, unique: true, required:true},
    }
);

userSchema.pre("save", function(next){
    this.password = bycrpt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;