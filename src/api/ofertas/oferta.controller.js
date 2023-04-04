const Oferta = require("./oferta.models");


const getAllOfertas = async (req,res,next)=>{
    try {
        const ofertas = await Oferta.find().populate("empresa");
        return res.json(ofertas);
    } catch (error) {
        return next(error);
    }
}

const getOfertaById = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const oferta = await Oferta.findById(id).populate("empresa");
        if(!oferta){
            return res.json("Id inexitente para la oferta")
        }
        return res.json(oferta);
    } catch (error) {
        return next(error);
    }
}

const getOfertaByName = async ( req,res,next)=>{
    try {
        const {nombre} = req.params;
        const oferta = await Oferta.findOne({nombre:nombre}).populate("empresa");
        return res.json(oferta);
    } catch (error) {
        return next(error);
    }
}

const createOferta = async(req,res, next)=>{
    try {
        const newOferta = new Oferta(req.body);
        if(req.file){
            newOferta.portada = req.file.path;
        }
        await newOferta.save();
        return res.json(newOferta);
    } catch (error) {
        return next(error);
    }
}

module.exports = { getAllOfertas, createOferta, getOfertaById, getOfertaByName};