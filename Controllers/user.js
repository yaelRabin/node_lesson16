import mongoose from "mongoose";
import { hash, compare } from "bcrypt";
import { UserModel, userValidate, userValidateToLogin } from "../Models/user.js";
import generateToken from '../Config/generateToken.js'


export const getAllUsers = async (req, res) => {
    try {
        let allUsers = await UserModel.find({},"-password");
        res.json(allUsers);
    }
    catch (err) {
        res.status(400).json({ type: "oops there is an error", massage: err.massage })
    }
}
export const addUser = async (req, res) => {
    let checkUser = userValidate(req.body);
    if (checkUser.error)
        return res.status(400).send(checkUser.error.details[0].message)
    let { userName, password, identity, email } = req.body;
    try {
        let similarUser = await UserModel.findOne({ $or: [{ userName }] });
        if (similarUser)
            return res.status(409).send("sorry, we cant add this user, such user exists in our system!");
        password = await hash(password, 13);
        let newUser = new UserModel({ userName, password, identity, email });
        await newUser.save();
        let token = generateToken(newUser);
        return res.json({ newUser, token });
    }
    catch (err) {
        res.status(400).json({ type: "oops there is an error", massage: err.message })
    }
}
export const loginUser = async (req, res) => {
    try {
        let loginDetails = userValidateToLogin(req.body);
        if (loginDetails.error)
            return res.status(400).send(loginDetails.error.details[0].message);
        let { password, userName } = req.body;
        let thisUser = await UserModel.findOne({ userName });
        if (!thisUser||!await compare(password,thisUser.password))
            return res.status(404).send("there is no such user, please sign up");
        let token = generateToken(thisUser);
        return res.json({ thisUser, token });
    } catch (err) {
        res.status(400).json({ type: "oops there is an error", massage: err.massage })
    }
}

