const express = require('express');
const router = express.Router()

const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jwrsecret = "MYNameisJashandeepSInghjoharmukts"
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');


router.get("/datalist",
   
async (req, res) => {
       console.log("Data")
        try {
            const fetch_data = await mongoose.connection.db.collection("contacts")
            fetch_data.find({}).sort({_id:-1}).toArray(async function(err , data){
                console.log(data[0],"sdsd")
                res.json({ 
                    Success: true,
                    data: data[0],
                })
            })
            
        }
        catch (error) {
            console.log(error);
            res.json({ Success: false })
        }
    });



router.post("/login", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
        let userdata = await User.findOne({ email });
        if (!userdata) {
            return res.status(400).json({ errors: "Login with correct details | UserData" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userdata.password)
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Login with correct details" });
        }


        const data = {
            user:{
                id:userdata.id
            }
        }

        const authToken = jwt.sign(data, jwrsecret)
        res.json({ Success: true,authToken:authToken })
    }
    catch (error) {
        console.log(error);
        res.json({ Success: false })
    }
});

module.exports = router;