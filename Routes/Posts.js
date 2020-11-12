const express = require('express')
const Router = express.Router()
const Post = require('../Models/Post')
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth')
const User = require('../Models/User')
const Profile = require('../Models/Profile')


//@route GET    api/posts
//@desc         Get All The Posts
//@access       Private
Router.get('/', auth, async (req,res)=>{

    try {
        const posts = await Post.find().sort({date: -1})
        // res.json({
        //     results:posts.length,
        //     posts:posts,
        // })
        res.send(posts)
    } catch (error) {
        res.status(400).send('Server Error')
    }
})


//@route GET    api/posts/:id
//@desc         Get Post By ID
//@access       Private
Router.get('/:id', auth, async (req,res)=>{

    try {
        const post = await Post.findById({_id: req.params.id})

        if(!post){
            return res.status(404).json({msg: 'The post not found'})
        }

        res.send(post)
    } catch (error) {
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: 'The post not found'})
        }
        res.status(400).send('Server Error')
    }
})

//@route    POST    api/posts
//@desc         Get All The Posts
//@access       Public
Router.post('/',[auth,
[
    // check('name','Name of th euser is reqd').not().isEmpty(),
    // check('title','title of th post is reqd').not().isEmpty(),
    check('description','description of the  is reqd').not().isEmpty()
]
], async (req,res)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      return res.status(400).json({errors : errors.array()})
    }
    try {
        const user = await User.findById(req.user.id).select('-password')

        const newPost = new Post({
            name: user.name,
            avatar: user.avatar,
            title: req.body.title,
            description: req.body.description,
            user: req.user.id
        })

        const post = await newPost.save()
        return res.status(200).json(post)

    } catch (error) {
        res.status(400).send('Unable to update the post.Please try again')
        console.log(error)
    }
    
})


//@route    delete    api/posts/:id
//@desc         Get All The Posts
//@access       Private
Router.delete('/delete/:id', auth, async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({msg: 'The post not found'})
        }
        if(req.user.id !== post.user.toString()){
            return res.status(400).json({msg:'You are not authorized to delete'})
        }

        await post.remove()
        // let updatedPosts = posts.filter(post => post._id !== req.params.id)
        // updatedPosts = await updatedPosts.save()
        // // res.send(updatedPosts)
       return res.status(204).send('Deleted the post successfully')
    } catch (error) {
         if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: 'The post not found'})
        }
    }
})


//@route PUT    api/posts/like/:id
//@desc         Like a post
//@access       Private
Router.put('/like/:id', auth, async (req,res)=>{

    try {
    const post = await Post.findById(req.params.id)

    if(!post){
        return res.status(404).json({msg: 'The post not found'})
    }

    if(post.likes.filter(like=> like.user.toString() === req.user.id).length > 0)
    return res.status(400).send('The post is already liked')
    
    post.likes.unshift({user: req.user.id})

    await post.save()

    res.status(200).json(post.likes)

    } catch (error) {
        res.status(400).send('Failed to like')
        console.log(error)
    }
    
})

//@route PUT    api/posts/like/:id
//@desc         Like a post
//@access       Private
Router.put('/unlike/:id', auth, async (req,res)=>{

    try {
    const post = await Post.findById(req.params.id)

    if(!post){
        return res.status(404).json({msg: 'The post not found'})
    }

    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
       return res.status(400).json('The post hasnt been liked by you')
    }

    post.likes = post.likes.filter(like => like.user.toString() !== req.user.id)
    
    await post.save()

    return res.status(200).json(post.likes)

    } catch (error) {
        res.status(400).send('Failed to like')
        console.log(error)
    }
    
})

//@route    POST    api/posts/comment
//@desc         Get All The Posts
//@access       private
Router.post('/comment/:id',[auth,
    [
        check('text','text is reqd').not().isEmpty()
    ]
    ], async (req,res)=>{
        const errors = validationResult(req)
    
        if(!errors.isEmpty()){
          return res.status(400).json({errors : errors.array()})
        }
        try {
            const user = await User.findById(req.user.id).select('-password')
            const post = await Post.findById(req.params.id)

            const newComment = {
                name: user.name,
                avatar: user.avatar,
                text: req.body.text,
                user: req.user.id
            }

            post.comments.unshift(newComment)
    
            await post.save()
            return res.status(200).json(post)
    
        } catch (error) {
            res.status(400).send('Unable to update the post.Please try again')
            console.log(error)
        }
        
    })
    
    


//@route    DELETE    api/posts/comment/:id/:comment_id
//@desc         Get All The Posts
//@access       private
Router.delete('/comment/:id/:comment_id',auth, async (req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
          return res.status(400).json({errors : errors.array()})
        }
        try {
            const post = await Post.findById(req.params.id)

            if(!post){
                return res.status(404).json({msg: 'The post not found'})
            }

            const comment = post.comments.find( com => com.id.toString() === req.params.comment_id )
           if(!comment){
              return res.status(404).json('Comment not found')
           }

           if(comment.user.toString() !== req.user.id){
              return res.status(401).json('Not authorised')
           }

           post.comments = post.comments.filter( commentOnPosts => commentOnPosts.id.toString() !== comment._id.toString())
           await post.save() 
           return res.status(200).json(post)
    
        } catch (error) {
            res.status(400).send('Unable to delete the comment.Please try again')
            console.log(error)
        }
        
    })




module.exports = Router