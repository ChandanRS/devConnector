//LOGIN PAGE
const bcrypt = require('bcryptjs')
const express = require('express')
const Router = express.Router()
const auth = require('../middleware/auth')
const User = require('../Models/User')
const config = require('config')
const { check,validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')


//@route GET    api/auth
//@desc         Get authorized(logged in) user
//@access       private

Router.get('/',auth,async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password')
       return res.json(user)
    }catch(err){
        console.log(err)
        res.status(500).send('Server error')
    }
})


Router.post('/',
[
    check('email','Please mention a valid email').isEmail(),
    check('password','Please provide a password of length at least 6').exists()
],
async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.errors
        })
    }

    try{
        const { email, password } = req.body
        //1. Check whether User already exists

        let user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({errors : [{msg : 'Invalid Credentialss'}]})
        }

        const payload = {
            user: {
                id : user.id
            }
        }
        const isValidUser = await bcrypt.compare(password,user.password)

        if(!isValidUser){
            return res.status(400).json({errors : [{msg : 'Invalid Credentials'}]})
        }

        jwt.sign(payload,config.get('jwtSecret'),{expiresIn : 36000000},
        (err,token) => {
            if(err) throw err
          res.send(token)
        }
        )

        // res.send("User Regestered")
        // res.status(200).json({"message":"New User Regestered"})

    }
    catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }

})

module.exports = Router
