const express = require('express');
const router = express.Router()
const Contact = require('../models/Contact');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jwrsecret = "MYNameisJashandeepSInghjoharmukts"
const bcrypt = require("bcryptjs");


router.post("/createcontact",
    [
        body('address').isLength(),
        body('pincode').isLength(),
        body('phone').isLength(),
        body('email').isLength(),
    ]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        

        try {
            Contact.create({
                address: req.body.address,
                pincode: req.body.pincode,
                phone: req.body.phone,
                email: req.body.email
            })
            res.json({ Success: true })
        }
        catch (error) {
            console.log(error);
            res.json({ Success: false })
        }
    });



module.exports = router;