const Products= require("../models/product.model")

//MODULE POUR VERIFIER SI L'ID EXISTE
const verifiedID = require("mongoose").Types.ObjectId


// lister tous les produits
module.exports.getAllProduct = async (req, res) => {
    try {
    const products = await Products.find()
    res.status(200).json(products);
    } catch (err) {
    res.status(500).send({ message: err });
    }
}

// lister un seul produit
module.exports.getOneProduct = async (req, res) => {
    if (!verifiedID.isValid(req.params.id))
    console.log(`INVALID ID : ${req.params.id}`);
    try {
    const product = await Products.findById(req.params.id)
    res.status(200).json(product);
    } catch (err) {
    res.status(500).send({ message: err });
    }
}


//ajouter un produit
module.exports.postProduct = async (req, res) => {
try{
    
    const { name, price, quantity} = req.body;
    const product = await Products.create({ name, price,quantity,image_filename : req.file.filename,image_path : req.file.path})
    res.status(201).json(product)
}catch (err) {
    res.status(500).send({ message: err });
    }
}

// suprimer un produit
module.exports.deleteProduct = async (req, res) => {
    if (!verifiedID.isValid(req.params.id))
    return res.status(404).send({ message: `INVALID ID ${req.params.id}` });
    else{
    await Products.deleteOne({ _id: req.params.id }).exec();
    return res.status(202).send({ message: "Supprimer avec succés!" });
    }
}

// modifier un produit
module.exports.patchProduct = async (req, res) => {
    if (!verifiedID.isValid(req.params.id))
        console.log(`INVALID ID : ${req.params.id}`);
    try {
        await Products.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            image:req.body.image,
            },
        },
        { new: true },
        (err, data) => {
            if (!err) res.status(200).json(data);
            else res.status(500).send({ message: err });
        }
        )
    } catch (err) {
        console.log(err);
    }
    };


