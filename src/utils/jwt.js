const jwt = require("jsonwebtoken");


const generarSing = (id, email)=>{
    return jwt.sign({id,email}, process.env.JWT_SECRET, {expiresIn:'30d'});
}

const verifyJwt = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {generarSing, verifyJwt};