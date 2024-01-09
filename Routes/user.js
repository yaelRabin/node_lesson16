import mongoose from "mongoose";
import express from "express";
import {addUser,getAllUsers,loginUser} from '../Controllers/user.js';
import authToken from '../middlewares/authToken.js'

const router= express.Router();
router.post('/login',loginUser);
router.post('/addUser',addUser);
router.get('/',authToken,getAllUsers);

router.use('/',(req,res)=>{
    res.status(400).send("page not found")
})

export default router;
