require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const memberRouter = require("./routes/memberRoutes")
const requestRouter = require("./routes/requestRoutes")
const serviceRouter = require("./routes/serviceRoutes")

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const timelogPathlog = (req, res, next) => {
    console.log(`${new Date()}  ${req.path}`)
    next()
    return 
}
app.use(timelogPathlog)

app.use('/', memberRouter)
app.use('/', requestRouter)
app.use('/', serviceRouter)

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("successfully connected to the mongodb server")
})
.catch((error) => {
    console.log("error while connecting to the mongodb server")
    console.log(error)
})

app.get("/home", (req, res) => {
    res.send("<h1> This is the home page of the application</h1>")
    return
})

app.listen(process.env.PORT , () => {
    console.log("successfully started the server at port "+process.env.PORT)
})

