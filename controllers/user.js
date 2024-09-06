import { User } from "../Models/User.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const register=async(req,res)=>{
    const {name,gmail,password}=req.body;
    
    try{
        let user=await User.findOne({gmail})

        if(user) return res.json({message:"User already exist"});


        const hashPassword=await bcrypt.hash(password,10)
        user=await User.create({name,gmail,password:hashPassword})

        res.json({message:"user register successfuly..."})
    }
    catch (error){
        res.json({message:error})
    }
}

export const login=async (req,res)=>{
    const {gmail,password}=req.body

    try{
        let user=await User.findOne({gmail});

        if(!user) return res.json({message:"user is not exist.."})

        const vaild= await bcrypt.compare(password,user.password);
        if(!vaild) return res.json({message:"Invaild password"})
        
        const token=jwt.sign({userId:user._id},process.env.SECRET_KEY,{
            expiresIn:'1d'
        })    
        res.json({message:`Welcom ${user.name}`,token})        
    } catch (error){
        res.json({message:error.message})
    }
}

export const profile=async(req,res)=>{
    res.json({user : req.user})
}