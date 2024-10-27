const multer = require('multer')

const MIME_TYPES = {
    'image/png' : 'png',
    'image/jpg' : 'jpg',
    'image/jpeg': 'jpeg'
}


const storage = multer.diskStorage({
    destination : (req, file, callback) =>{
        callback(null, 'public/assets')
    },
    filename : (req, file, callback) =>{
        console.log("name")
        const name = file.originalname.includes('.') ?(file.originalname.split('.')[0].split(' ').join('_')):(
            file.originalname.split(' ').join('_')
        )
        const extension = MIME_TYPES[ file.mimetype ]
        callback(null, name + Date.now() + '.' + extension)
    }
})

module.exports = multer({storage}).single('image')