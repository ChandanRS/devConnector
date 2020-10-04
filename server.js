const express = require('express');
const app = express()

app.get('/kl',(req,res)=>{
    console.log("here")
    res.send('API RUNING')
})


app.listen(8000,()=>console.log("Hii"))
