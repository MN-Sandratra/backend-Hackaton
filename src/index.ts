import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user";
require('dotenv').config()

const server=express()
let dblink=process.env.CONNECTION_DB;

//middleware 
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//middleware route
server.use('/api/users',userRoute);

server.get('/',(req,res)=>{
    res.send("Coucou jiaby jiaby")
});

async function startServer(){
    await mongoose.connect(
        ""+dblink,
        ).then(()=>console.log("Connected to MongoDB Database"))
        .catch(()=>console.log("Connection Failed"));
    server.listen(3030,()=>{
        console.log("Server listen on http://localhost:3030");
    })
};

startServer();