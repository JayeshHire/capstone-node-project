const {Schema, model} = require("mongoose")

const serviceSchema = new Schema({
    type: String,
    code: String, 
    description: String,
    imgUrl: String,
    detail: [String]
})

module.exports = model('service', serviceSchema)