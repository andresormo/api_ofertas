const User = require("./user.models.js");
const bcrypt = require("bcrypt");
const {generarSing} = require ("../../utils/jwt.js");

const signUp = async (req,res,next)=>{
    try {
        if(req.body.rol ==="admin"){
            req.body.rol = "user"
        }
        const newUser = new User(req.body);
        await newUser.save();
        return res.status(201).json(newUser);
    } catch (error) {
        return next(error);
    }
}

const getAllUser = async(req, res, next)=>{
    try {
        const user = await User.find();
        return res.json(user);
    } catch (error) {
        return next(error)
    }
}

const getUserById = async (req, res, next)=>{
    try {
        const {id}=req.params;
        const user = await User.findById(id);
        if(!user){
            return res.json("Empresa no encontrada")
        }
        return res.json(user);
    } catch (error) {
        return next(error);
    }
}

const modifyUser = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const userToUpdate = new User(req.body);
        if (req.user.rol !== 'admin') {
            if(req.user.rol ==='company'){
                req.body.rol = 'company';
            } else{req.body.rol = 'user';}
        }

        userToUpdate._id = id;

        const idUser = JSON.stringify(userToUpdate._id);
        const idUserParsed = idUser.slice(1, idUser.length - 1);

        if (idUserParsed === id || req.user.rol === "admin") {
            const userToUpdated = await User.findByIdAndUpdate(id, req.body, { new: true });
            return res.json(userToUpdated);
        } else {
            res.json("No puedes modificar a otro usuario");
        }
    } catch (error) {
        return next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const userToLog = await User.findOne({ email: req.body.email });
        if (!userToLog) {
            return res.status(500).json("Usuario incorrecto");
        }
        if (bcrypt.compareSync(req.body.password, userToLog.password)) {
            const token = generarSing(userToLog._id, userToLog.email);
            return res.status(200).json({ token, userToLog });
        } else { return res.status(500).json("te has equivocado"); }
    } catch (error) {
        return next(error);
    }
}

module.exports = { signUp, modifyUser, login, getAllUser, getUserById }