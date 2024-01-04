import Joi from "joi";
import mongoose from "mongoose";

export const carSchema=mongoose.Schema({
    company:{
        type:String,
        required:true
    },
    price:Number,
    km:Number,
    year:{
       type:Number,
       default:2023
    }
})
export const CarValidate=(_car)=>{
    const schema=Joi.object({
        company:Joi.string().min(3).max(15).required(),
        price:Joi.number().min(25000).max(500000).required(),
        km:Joi.number().default(25000),
        year:Joi.number().min(2010).max(2023)
    })
    return schema.validate(_car);
}
export const CarModel=mongoose.model("cars",carSchema)
