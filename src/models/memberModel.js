const {Schema, model} = require("mongoose")

const memberSchema = new Schema({
    mobile: Number,
    email: String,
    occupation: String,
    password: String
})

module.exports = model('member', memberSchema)