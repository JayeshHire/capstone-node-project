const {Schema, model} = require("mongoose")

const requestService = new Schema({
    mobile: Number,
    email: String,
    amt: Number,
    type: String,
    msg: String,
    code: String
})

module.exports = model('request', requestService)