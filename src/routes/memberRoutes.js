const express = require("express")
const memberModel = require("../models/memberModel")
const bcrypt = require("bcryptjs")
const router = express.Router()

const memberRegistration = async (req, res) => {
    try {
        const {
            mobile,
            email,
            occupation, 
            password
        } = req.body
        // console.log(req.body)
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)    
        // console.log(hash)
        const member = new memberModel({
            mobile: mobile,
            email: email,
            occupation: occupation,
            password: hash
        })
        await member.save() 
        res.status(201).send("member created successfully")
    } catch (error) {
        // console.log("hello")
        res.status(500).json({error})
        console.log(error)
    }
    return 
}

const deleteMembership = async (req, res) => {
    try {
        const delCount = await memberModel.deleteOne({mobile: req.body.mobile}) 
        res.status(200).send("membership deleted successfully")
    } catch (error)
    {
        res.status(500).json({error})
    }
    return  
}

const updatePassword = async (req, res) => {
    try {
        const {mobile, password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const member = await memberModel.findOne({mobile: mobile})
        member.password = hash
        await member.save()
        res.status(200).send("member successfully updated")
    } catch (error)
    {
        res.status(500).json({error})
    }
    return
}

router.post("/member", memberRegistration)
router.put("/updatepassword", updatePassword)
router.delete("/cancelmember", deleteMembership)

module.exports = router 