const express = require("express")
const requestModel = require("../models/requestModel")
const router = express.Router()

const requestForService = async (req, res) => {
    try {
        const {
            mobile,
            email,
            amt,
            type,
            msg,
            code
        } = req.body 
        const request = new requestModel({
            mobile: mobile, 
            email: email,
            amt: amt,
            type: type,
            msg: msg,
            code: code  
        })
        await request.save()
        res.status(201).send("request created successfully")
    } catch (err) {
        res.status(400).json({err})
    }
    return 
}

const  updateRequest = async (req, res) => {
    try {
        const request = await requestModel.findOne({mobile: req.body.mobile})
        request.service = req.body.service
        request.type = req.body.type
        request.remarks = req.body.remarks 
        await request.save()
        res.status(200).send("successfully updated the request")
    } catch (error) {
        res.status(500).json({error})
    }
    return 
}

const deleteRequest = async (req, res) => {
    try {
        const delCount = await requestModel.deleteOne({mobile: req.body.mobile})
        res.status(200).send("successfully deleted the request")
        return
    } catch (error)
    {
        res.status(500).json({error})
    }
    return 
}

router.post("/service/:type/form", requestForService)
router.put("/updaterequest", updateRequest)
router.delete("/deleterequest", deleteRequest)

module.exports = router 