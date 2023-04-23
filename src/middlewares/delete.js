const cloudinary = require("cloudinary").v2;

const deleteFile = (portada)=>{
    const portadaSplited = portada.split("/");
    const nameSplited = portadaSplited.at(-1).split(".");
    const folderSplited = portadaSplited.at(-2);
    const public_id= `${folderSplited}/${nameSplited[0]}`;

    cloudinary.uploader.destroy(public_id, ()=>{
        console.log("Se ha eliminado");
    })
}

module.exports = {deleteFile};