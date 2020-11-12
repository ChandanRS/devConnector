const express = require('express')
const Router = express.Router()
const auth = require('../middleware/auth')
const request = require('request')
const config = require('config')
const User = require('../Models/User')
const Post = require('../Models/Post')
const Profile = require('../Models/Profile')
const {  check,validationResult } = require('express-validator')


//@route GET api/profile/me
//@desc         GEt Current users profile
//@access       Private
Router.get('/me',auth, async(req,res)=>{
    try{
        const profile = await Profile.findOne({user : req.user.id}).populate('user',['name','avatar'])

        if(!profile){
            return res.status(404).json({msg:'No profile found'})
        }
        res.status(200).json({profile})
    }   
    catch(err){
        console.log(err)
        res.status(500).send('Server error')
    } 
})


//@route POST api/profile/me
//@desc         Update users profile
//@access       Private
Router.post('/me',auth,
    // [
    //     check('status','Status is Mandatory').not().isEmpty(),
    //     check('skills','skills are Mandatory').not().isEmpty()
    // ]
 async(req,res) => {
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(400).send('Enter valid data')
    }
    // res.status(400).json({msg:'Okay'})
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    const profileFields = {};

    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(status) profileFields.status = status;
    if(bio) profileFields.bio = bio;
    if(githubusername) profileFields.githubusername = githubusername;

    if(skills && typeof skills === 'string'){
        profileFields.skills = skills.split(',').map(el=>el.trim())
    }
    else if(skills){
        profileFields.skills = skills
    }

    profileFields.social = {}

    if(facebook) profileFields.social.facebook = facebook;
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;

    console.log(profileFields);
    try{
        let profile = await Profile.findOne({user : req.user.id})
        console.log(profile)

        if(profile){
            //update
            profile = await Profile.findOneAndUpdate({ user : req.user.id },{ $set: profileFields},{new:true})
            return res.status(200).json(profile)
        }
    // console.log(`profile: ${JSON.stringify(profile)}`);
    //create
        profile = new Profile(profileFields)
       await profile.save()
       console.log(profile)

        res.send(profile)
       
    }
    catch(err){
        console.log(err)
        res.status(400).send({msg : 'err'})

    }

})


//@route GET api/profile
//@desc         Get all the profiles
//@access       Public
Router.get('/',async (req,res)=> {
    try{
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.status(200).json({profiles})
    }
    catch(err){
        res.send({err:'Failed to fetch'})
        console.log(err)
    }
})


//@route GET api/profile/user/user_id
//@desc         Get profile by User Id
//@access       Public
Router.get('/user/:user_id',async (req,res)=> {
    try{
        const profile = await Profile.findOne({user : req.params.user_id}).populate('user',['name','avatar']);
        if(!profile){
           return res.send('No profiles found')
        }
        res.json({profile})
    }
    catch(err){
        if(err.kind == 'ObjectId'){
           return res.status(400).send('User doesnt exist')
        }
        res.send({err:'Failed to fetch'})
        console.log(err)
    }
})


//@route DELETE api/profile/
//@desc         Delete the user, profile and posts
//@access       private
Router.delete('/',auth , async (req,res)=> {
    try{
        console.log(req.user)
        await Profile.findOneAndRemove({user : req.user.id});
        await User.findOneAndRemove({_id : req.user.id});
        res.status(204).json({msg:'Deleted User Successfully'});
    }
    catch(err){
        res.send({err:'Failed to delete'})
        console.log(err)
    }
})

//@route PUT api/profile/experience
//@desc         Add profile experience
//@access       Private
Router.put('/experience',[auth,[
    check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','from is required').not().isEmpty()
]] , async (req,res)=> {
    const errors =  validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
        const experience = {};
        const { 
        title,
        company,
        location,
        from,
        to,
        current,
        description 
        } = req.body

        if(title) experience.title = title;
        if(company) experience.company = company;
        if(location) experience.location = location;
        if(from) experience.from = from;
        if(to) experience.to = to;
        if(current) experience.current = current;
        if(description) experience.description = description;

        try{
        const profile = await Profile.findOne({user: req.user.id});
        // const profile = await Profile.findOneAndUpdate({user: req.user.id, profile.experience:experience})
        profile.experience.push(experience); 
        await profile.save()
        console.log(profile)
        res.send(profile)
       
    }
    catch(err){
        res.send({err:'Failed to fetch'})
        console.log(err)
    }
})


//@route DELETE api/profile/
//@desc         Delete the user, profile and posts
//@access       private
Router.delete('/experience/:exp_id', auth , async (req,res)=> {
    try{
        console.log(req.user)
        await Post.deleteMany({ user: req.user.id})
        // await posts.save()
        // await Profile.findByIdAndRemove({_id: req.params.exp_id})
        const profile = await Profile.findOne({user : req.user.id});
        const updatedExp = profile.experience.filter(exp=> req.params.exp_id != exp._id)
        // console.log(updatedExp)
        profile.experience = updatedExp;
        await profile.save()
        res.json(profile);
    }
    catch(err){
        res.send({err:'Failed to delete'})
        console.log(err)
    }
})


//@route PUT api/profile/education
//@desc         Add profile education
//@access       Private
Router.put('/education',[auth,[
    check('college','college is required').not().isEmpty(),
    check('degree','degree is required').not().isEmpty(),
    check('fieldofstudy','fieldofstudy is required').not().isEmpty(),
    check('from','from is required').not().isEmpty()
]] , async (req,res)=> {
    const errors =  validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
        const education = {};
        const { 
            college,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body

        if(college) education.college = college;
        if(degree) education.degree = degree;
        if(fieldofstudy) education.fieldofstudy = fieldofstudy;
        if(from) education.from = from;
        if(to) education.to = to;
        if(current) education.current = current;
        if(description) education.description = description;

        try{
        const profile = await Profile.findOne({user: req.user.id});
        // const profile = await Profile.findOneAndUpdate({user: req.user.id, profile.education:education})
        profile.education.push(education); 
        await profile.save()
        console.log(profile)
        res.send(profile)
       
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }

        
})



//@route DELETE api/profile/:edu_id
//@desc         Delete the user, profile and posts
//@access       private
Router.delete('/education/:edu_id', auth , async (req,res)=> {
    try{
        console.log(req.user)
        // await Profile.findByIdAndRemove({_id: req.params.exp_id})
        const profile = await Profile.findOne({user : req.user.id});
        const updatedEducation = profile.education.filter(edu=> req.params.edu_id != edu._id)
        console.log(updatedEducation)
        profile.education = updatedEducation;
        await profile.save()
        res.send(profile)    
        // res.status(204).json({msg:'Deleted education Successfully'});
    }
    catch(err){
        res.send({err:'Failed to delete'})
        console.log(err)
    }
})

//@route GET api/profile/
//@desc         Get the user github repo
//@access       private
Router.get('/github/:username', auth , async (req,res)=> {
    try {

        const options = {
            uri : `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
            method: 'GET',
            headers: {'user-agent':'node.js'}
        }

        request(options,(error,response,body)=>{
            if(error) console.log(error)

            if(response.statusCode !== 200){
               return res.status(400).json({'msg':'Theres no github profile for the user'})
            }

            res.json(JSON.parse(body))
        })

    } catch (error) {
        console.log(error);
        res.status(400).send('Server error')
    }
})
module.exports = Router 
