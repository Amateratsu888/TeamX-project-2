const Users= require("../models/user.model")

//MODULE POUR VERIFIER SI L'ID EXISTE
const verifiedID = require("mongoose").Types.ObjectId


// lister tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
    try {
    const users = await Users.find()
    res.status(200).json(users);
    } catch (err) {
    res.status(500).send({ message: err });
    }
}

// lister un seul utilisateur
module.exports.getOneUser = async (req, res) => {
    if (!verifiedID.isValid(req.params.id))
    console.log(`INVALID ID : ${req.params.id}`);
    try {
    const user = await Users.findById(req.params.id)
    res.status(200).json(user);
    } catch (err) {
    res.status(500).send({ message: err });
    }
}


//Ajouter un utilisateur
module.exports.postUser = async (req, res) => {
try{
    const { firstname, lastname, address} = req.body;
    const user = await Users.create({ firstname, lastname, address})
    res.status(201).json(user)
    }catch (err)
    {
        res.status(500).send({message : err})
    }
}


// suprimer un utilisateur
module.exports.deleteUser = async (req, res) => {
    if (!verifiedID.isValid(req.params.id))
    return res.status(404).send({ message: `INVALID ID ${req.params.id}` });
    else{
    await Users.deleteOne({ _id: req.params.id }).exec();
    return res.status(202).send({ message: "Supprimer avec succés!" });
    }
}

// modifier un utilisateur
module.exports.patchUser = async (req, res) => {
    if (!verifiedID.isValid(req.params.id))
        console.log(`INVALID ID : ${req.params.id}`);
    try {
        await Users.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
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


