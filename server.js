const express = require("express")
const app = express()
const cors = require("cors")



require("dotenv").config({ path: "./config/.env" })
require("./config/db_connect")


const productsRoutes = require("./routes/product.routes")
const usersRoutes = require("./routes/user.routes")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/API', productsRoutes)
app.use('/API', usersRoutes)


app.listen(process.env.PORT, () => {
    console.log(`API connect to http://localhost:${process.env.PORT}`);
})