const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'pulkitisaG00dB0y';
let success = false;

//ROUTE-1 = creating a user with Post request with a name, email and password for a login and signUp page **login not required**
router.post('/createuser',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {

    //checking if everything is ok or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        //using bcrypt package to secure password trough hash and salt
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user:{
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken)

        success = true;
        res.json({success, authtoken});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//ROUTE-2 = writing the code to check whether the login info is real/correct or not **login required*

router.post('/login',[
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter the password').exists(),
], async (req, res) => {

    //checking if everything is ok or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success, error: "Enter the correct Email"});
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Enter the correct Password"});
        }

        const data = {
            user:{
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});

    } catch (error) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//ROUTE-3 = code to get loggedin user details using - post "api/auth/getuser". **login required**

router.post('/getuser', fetchuser, async (req, res) => {

    try{
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password")
        res.send(user);

    } catch (error) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
module.exports = router