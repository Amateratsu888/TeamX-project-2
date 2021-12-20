const router = require('express').Router()
const multer = require('multer')
const Upload = require('../middlewares/UploadMulter')
const productControllers =require('../controllers/product.controllers')



//endpoints mise en place pour product
router.get('/products', productControllers.getAllProduct)
router.get('/product/:id', productControllers.getOneProduct)
router.post('/product/',Upload.single('image'), productControllers.postProduct)
router.patch('/product/:id', productControllers.patchProduct)
router.delete('/product/:id', productControllers.deleteProduct)

//exportation de nos routes
module.exports = router