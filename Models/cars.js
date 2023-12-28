import mongoose from "mongoose";

const carSchema=mongoose.Schema({
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

export const CarModel=mongoose.model("cars",carSchema)