const mongoose = require('mongoose')


// Definition du schema de produit
const productSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    price : {
        type : Number,
        required : true 
    },
    quantity : {
        type : Number,
        required : true
    },
    image_path: {
        type:String,
        required:false
    },
    image_filename: {
        type:String,
        required:false
    },

},
{
timestamps: true,
})

module.exports = mongoose.model("Product", productSchema);