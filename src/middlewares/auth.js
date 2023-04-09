const User = require("../api/users/user.models");
const { verifyJwt } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.json("No estas autorizado");
        }
        const parsedToken = token.replace("Bearer ", "");
        const validToken = verifyJwt(parsedToken);
        const userLoged = await User.findById(validToken.id);

        userLoged.password = null;
        req.user = userLoged;

        next();
    } catch (error) {
        return res.json(error);
    }
}

const isCompany = async (req, res, next)=>{
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.json("No estás autorizado");
        }
        const parsedToken = token.replace("Bearer ", "");
        const validToken = verifyJwt(parsedToken);
        const userLoged = await User.findById(validToken.id);

        if (!userLoged.cif) {
            return res.status(403).json("Acceso denegado, no eres empresa");
        }
        next();

    } catch (error) {
        return res.json(error);
    }
}

const isCompanyAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.json("No estás autorizado");
        }
        const parsedToken = token.replace("Bearer ", "");
        const validToken = verifyJwt(parsedToken);
        const userLoged = await User.findById(validToken.id);

        if (userLoged.empresa !== req.user.id) {
            return res.status(403).json("Acceso denegado, eres otra empresa");
        }
        next();
    } catch (error) {
        return res.json(error)
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.json("No estás autorizado");
        }
        const parsedToken = token.replace("Bearer ", "");
        const validToken = verifyJwt(parsedToken);
        const userLoged = await User.findById(validToken.id);


        if (userLoged.rol === 'admin') {
            userLoged.password = null;
            req.user = userLoged;
            next();
        } else {
            return res.json("A donde vas primo?");
        }
    } catch (error) {
        return res.json(error);
    }
}

module.exports = { isAuth, isAdmin, isCompanyAuth, isCompany }