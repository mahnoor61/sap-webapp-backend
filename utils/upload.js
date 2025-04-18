const multer = require('multer');
const fs = require('fs');

const uploadMiddleware = (modelName) => {

    const destination = `./public/uploads/images/${modelName}/`;

    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, {recursive: true});
    }

    const storage = multer.diskStorage({
        destination,
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        },
    });

    return multer({storage})
}

module.exports = uploadMiddleware;
