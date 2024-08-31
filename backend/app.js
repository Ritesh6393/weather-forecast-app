require('dotenv').config();
const express=require('express');
const weatherRouter=require('./Router/weather')

const app=express();
app.use('/api',weatherRouter)
const  port=3000;

app.listen(port,()=>{
    console.log(`server is running on port {port}`)
})