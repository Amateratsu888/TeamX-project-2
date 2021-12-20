const multer = require('multer')

//definition du chemin de destination et du nom du futur fichier (Configuration)  à téléverser dans la base de donnée grace à MULTER
var config = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/images')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1]
        cb(null, file.fieldname + '-' + Date.now()+'.'+ext)
    }
})
const isImage = (req, file , cb )=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb( new Error ('Only image is allowed'))
    }
}
// declaration du middleware 
var upload = multer({ storage: config , fileFilter : isImage })

module.exports = upload