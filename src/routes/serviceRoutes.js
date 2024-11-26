const express = require("express")
const serviceModel = require("../models/serviceModel")
const router = express.Router()

const getAllServices = async (req, res) => {
    try {
        const services = await serviceModel.find()
        res.status(200).json(services)
    } catch (err) {
        res.status(500).json({err})
    }
    return 
}

const getServiceByType = async (req, res) => {
    try {

        const service = await serviceModel.findOne({type: req.params.type})
        res.status(200).json(service)
    } catch (err) {
        res.status(404).json({error: `service with the type ${req.params.type} not found`})
    }
    return 
}

const calculateEmiAmount = (req, res) => {
    const {amt, tenure} = req.body 
    const R = 0.10 // let the loan interest be 10 %
    const emi = (amt * R / 12 * (1 + R) ** tenure ) / ((1 + R) ** tenure - 1)
    res.status(200).json({EMIAmount: emi})
    return 
}

router.get("/allservices", getAllServices)
router.get("/service/:type", getServiceByType)
router.post("/service/:type/calculate", calculateEmiAmount)

module.exports = router 