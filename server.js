const express = require('express');
const connectDB =require('./config/db') 
const ProfileRouter = require('./Routes/Profile')
const AuthRouter = require('./Routes/Auth')
const UsersRouter = require('./Routes/Users')
const PostsRouter = require('./Routes/Posts')


const path = require('path')

const app = express()

//CONNECT DB
connectDB()

//MIDDLEWARES
app.use(express.json({extended: false}))


    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin,X-Auth-Token, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token");
        // res.header("Access-Control-Allow-Headers","*");
        next();
      });


app.use('/api/users',UsersRouter)
app.use('/api/profile',ProfileRouter)
app.use('/api/auth',AuthRouter)
app.use('/api/posts',PostsRouter)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*',(req,res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const PORT = process.env.PORT || 8000

app.listen(PORT,()=>console.log(`Listening to port ${PORT}`))
