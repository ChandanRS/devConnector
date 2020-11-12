const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')

const connectDB = async ()=>{
    try{
        mongoose.connect(db,{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex : true })
        console.log("DB connected!")
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB