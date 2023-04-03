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
        } else{
            return res.json("A donde vas primo?");
        }
    } catch (error) {
        return res.json(error);
    }
}

module.exports = {isAuth, isAdmin}