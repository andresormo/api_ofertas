const { deleteFile } = require("../../middlewares/delete");
const Empresas = require("./empresa.models");

const getAllEmpresas = async(req,res,next)=>{
    try {
        const empresas = await Empresas.find().populate("ofertas");
        return res.json(empresas);
    } catch (error) {
        return next(error);
    }
}

const getEmpresaById= async (req,res,next)=>{
    try {
        const {id} = req.params;
        const empresa = await Empresas.findById(id).populate("ofertas");
        if(!empresa){
            return res.json("Id no existe para las empresas")
        }
        return res.json(empresa);
    } catch (error) {
        return next(error)
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

const updateEmpresa = async (req, res, next) => {
    try {
        const {id} = req.params;
        if(req.file){
            const oldEmpresa = await Empresas.findById(id);
            if(oldEmpresa.portada){
                deleteFile(oldEmpresa.portada)
            }
            req.body.portada = req.file.path;
        }

        const empresaUpdated = await Empresas.findByIdAndUpdate(id, req.body, {new:true});
        return res.status(200).json(empresaUpdated);
    } catch (error) {
        return next(error);
    }
}


module.exports = { getAllEmpresas, createEmpresa, getEmpresaById, updateEmpresa};