import Joi from "joi";
import {carSchema} from './cars.js'
import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    password:String,
    userName:String,
    identity:String,
    email:String,
    cars:[carSchema]
})
export const UserModel=mongoose.model("users",userSchema);

export const userValidate=(_user)=>{
    const schema=Joi.object({
        password:Joi.string().min(5).max(8).required(),
        userName:Joi.string().min(2).max(15).alphanum().required(),
        identity:Joi.string().pattern(/^[0-9]{9}$/).required(),
        email:Joi.string().email()
    })
    return schema.validate(_user);
}
export const userValidateToLogin=(_user)=>{
    const schema=Joi.object({
        password:Joi.string().min(5).max(8).required(),
        userName:Joi.string().min(2).max(15).alphanum().required()
    })
    return schema.validate(_user);
}
  


