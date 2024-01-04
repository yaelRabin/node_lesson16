import mongoose from "mongoose";
import express from "express";
import {addUser,getAllUsers,loginUser} from '../Controllers/user.js';

const router= express.Router();
router.get('/',getAllUsers);
router.post('/login',loginUser);
router.post('/addUser',addUser);

router.use('/',(req,res)=>{
    res.status(400).send("page not found")
})

export default router;
