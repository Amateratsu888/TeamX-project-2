const mongoose = require("mongoose");

//definition du schemas de user
const usersSchema = new mongoose.Schema(
    {
    firstname: {
        type: String,
        required: true
        
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required : true
    },

    },
    {
    timestamps: true,
    }
);

module.exports = mongoose.model("User", usersSchema);