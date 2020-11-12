const express = require('express')
const Router = express.Router()
const User = require('../Models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check,validationResult } = require('express-validator')


//@route POST    api/users
//@desc         Test route
//@access       Public

Router.post('/',
[
    check('name','Name is required').not().isEmpty(),
    check('email','Please mention a valid email').isEmail(),
    check('password','Please provide a password of length at least 6').isLength({ min : 6})
],
async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.errors
        })
    }
    console.log(req.body)

    // res.json({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })


    try{
        const { name, email, password } = req.body
        //1. Check whether User already exists

        let user = await User.findOne({ email })
        console.log(user)
        if(user){
            return res.status(400).json({errors : [{msg : 'User already exists'}]})
        }

        const avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d:'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password,salt)

        await user.save()
        const payload = {
            user: {
                id : user.id
            }
        }

            jwt.sign(payload,config.get('jwtSecret'),{expiresIn : 3600000000},
            (err,token) => {
                if(err) throw err
                res.json({ token })
            }
            )

        // res.send("User Regestered")
        // res.status(200).json({"message":"New User Regestered"})

    }
    catch(err){
        console.log(err)
        res.status(400)
    }

})

module.exports = Router
