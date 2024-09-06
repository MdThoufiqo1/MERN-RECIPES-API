import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/user.js'
import bodyParser from 'express';
import recipeRouter from './routes/recipe.js'
import cors from 'cors'
import 'dotenv/config'

const app=express();

app.use(bodyParser.json())
app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use('/api',userRouter)
app.use('/api',recipeRouter)
//mern-recipe
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("mongodb connect")
).catch((err)=>console.log(err))

const port=process.env.PORT;

app.listen(port,()=>console.log(`server is running on port ${port}`))