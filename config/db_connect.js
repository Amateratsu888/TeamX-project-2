const mongoose = require("mongoose");

// connection a la base de donnée
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log("database connected"))
    .catch((error)=>console.log(`Impoosible to get connection:${error}`))