const express = require ('express');
import { UserController } from './controllers/userController' 
// import  authentication  from './middlewares/authentication'

import dotenv from 'dotenv';

dotenv.config()

// const errorHandler = require("./middlewares/errorHandler")
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post("/register", UserController.registerUser)
app.post("/", UserController.loginUser )
app.put("/", UserController.changePassword)
app.delete("/", UserController.deleteAccount)
app.get("/", UserController.getAccount)

// app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Listening Port ${port}`);
})
