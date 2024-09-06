import { User } from "../Models/User.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const Authenticate=async (req,res,next)=>{
    const token=req.header("Auth")
    try{
        if(!token) return res.json({message:"login first"})
        
        const decode=jwt.verify(token,process.env.SECRET_KEY);
        
       // console.log("this is decoded data",decode)
       const id=decode.userId 

       let user=await User.findById(id)

       if(!user) return res.json({message:"user not exist"})

        req.user=user

        next();
    } catch(error){
        res.json({message:error})
    }
}