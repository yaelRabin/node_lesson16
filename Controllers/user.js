import mongoose from "mongoose";
import { UserModel, userValidate, userValidateToLogin } from "../Models/user.js";


export const getAllUsers = async (req, res) => {
    try {
        let allUsers = await UserModel.find({});
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
        let similarUser = await UserModel.findOne({ $or: [{ userName, password }] });
        if (similarUser)
            return res.status(409).send("sorry, we cant add this user, such user exists in our system!");

        let newUser = new UserModel({ userName, password, identity, email });
        await newUser.save();
        return res.json(newUser);
    }
    catch (err) {
        res.status(400).json({ type: "oops there is an error", massage: err.massage })
    }
}
export const loginUser = async (req, res) => {
    try {
        let loginDetails = userValidateToLogin(req.body);
        if (loginDetails.error)
            return res.status(400).send(loginDetails.error.details[0].message);
        let { password, userName } = req.body;
        let thisUser = await UserModel.findOne({ password, userName });
        if (!thisUser)
            return res.status(404).send("there is no such user, please sign up");
        thisUser.password="*****";
        return res.json(thisUser);
    } catch (err) {
        res.status(400).json({ type: "oops there is an error", massage: err.massage })
    }
}

