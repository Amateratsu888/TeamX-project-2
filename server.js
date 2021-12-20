//import des modules
const express = require("express")
const app = express()
const cors = require("cors")


// import des variables d'environnement et de la connection a la base de donnée
require("dotenv").config({ path: "./config/.env" })
require("./config/db_connect")

//import des routes 
const productsRoutes = require("./routes/product.routes")
const usersRoutes = require("./routes/user.routes")

//middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/images', express.static('upload/images'));
app.use('/API', productsRoutes)
app.use('/API', usersRoutes)

//listener
app.listen(process.env.PORT, () => {
    console.log(`API connect to http://localhost:${process.env.PORT}`);
})