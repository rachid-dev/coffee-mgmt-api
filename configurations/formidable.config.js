const {formidable} = require("formidable");

const options = {
    uploadDir : `${__dirname}/../public/assets`,
    keepExtensions : true,
    filename : (name,ext)=>{
        return name.split(' ').join('_') + ext;
    }
}

module.exports = formidable(options);
