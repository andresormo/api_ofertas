const Empresas = require("./empresa.models");

const getAllEmpresas = async(req,res,next)=>{
    try {
        const empresas = await Empresas.find().populate("ofertas");
        return res.json(empresas);
    } catch (error) {
        return next(error);
    }
}

const createEmpresa = async(req,res,next)=>{
    try {
        const newEmpresa = new Empresas(req.body);
        if(req.file){
            newEmpresa.portada = req.file.path;
        }
        await newEmpresa.save();
        return res.json(newEmpresa);
    } catch (error) {
        return next(error);
    }
}


module.exports = { getAllEmpresas, createEmpresa };