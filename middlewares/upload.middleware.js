const cloudinary = require('../config/cloudinary.config.js');
const fs = require('fs');

const managerImage = async (req, res, next) => {
  if (!req.filePath) {
    res.status(400).send({ error: 'No se recibio la ruta del archivo ' });
  }

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(req.filePath, options);
    console.log(result.secure_url);
    req.cloudinaryUrl = result.secure_url;

    // Elimino el archivo de la carpeta uploads
    fs.unlinkSync(req.filePath);
    next();
  } catch (error) {
    if (req.filePath && fs.existsSync(req.filePath)) {
      fs.unlinkSync(req.filePath);
    }
    next(error);
  }
};

module.exports = managerImage;

//!!!!! MULTER GIT CHECKOUUUUUUT //////////////
//!!!!! MULTER GIT CHECKOUUUUUUT //////////////
//!!!!! MULTER GIT CHECKOUUUUUUT //////////////
//!!!!! MULTER GIT CHECKOUUUUUUT //////////////
//!!!!! MULTER GIT CHECKOUUUUUUT //////////////
//!!!!! MULTER GIT CHECKOUUUUUUT //////////////
//!!!!! MULTER GIT CHECKOUUUUUUT //////////////
//!!!!! MULTER GIT CHECKOUUUUUUT //////////////
//!!!!! MULTER GIT CHECKOUUUUUUT //////////////
//!!!!! MULTER GIT CHECKOUUUUUUT //////////////
//!!!!! MULTER GIT CHECKOUUUUUUT //////////////
