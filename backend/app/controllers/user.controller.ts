import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/UserModel";
import { Request, Response } from "express";
import { z } from 'zod';
const SignUpschema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
  firstname: z.string().min(3, { message: 'firstname must be at least 3 characters long' }),
  lastname: z.string().min(2, { message: 'lastname must be at least 2 characters long' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});
const SignInschema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});
    export const UserSignup = async (req:Request, res:Response) => {
    try {
      const result = SignUpschema.safeParse(req.body);
      if (!result.success) {
        res.status(400).send(result.error.format());
      } else {
        const user=await User.findOne({ username:req.body.username })
        if(user){
          res.status(409).send('User Already Exists')
        }else{
          const hashedPassword=await bcrypt.hash(req.body.password,10)
          await User.create({
            username:req.body.username,
            email:req.body.email,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            password:hashedPassword
          })
          res.status(201).send("User Registered Successfully!")
        }
      }
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
    };

    export const UserSignin= async (req:Request, res:Response) => {
      try {
        const result = SignInschema.safeParse(req.body);
        if (!result.success) {
          res.status(400).send(result.error.format());
        } else {
          const user=await User.findOne({username:req.body.username})
          if(!user){
            res.status(404).send("User Doesn't Exists")
          }else{
            const matched=await bcrypt.compare(req.body.password,user.password)
            if(matched){
              const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY as string,{expiresIn:"1h"})
              res.status(200).send(token)
            }else{
              res.status(401).send("Invalid Credentials")
            }
          }
        }
      } catch (error) {
        console.log(error)
        res.status(500).send(error)
      }
    };
    export const userValue=async (req:Request, res:Response) => {
      try {
        const user =await User.findOne({_id:req.id})
        res.send(user)
      } catch (error) {
        console.log(error)
        res.status(500).send(error)
      }
    };
    