import { config } from "dotenv";
import jwt from "jsonwebtoken"

function generateToken(_user) {
    let secretKey=process.env.JWT_STRING;
    let payload={
        userName:_user.userName,
        id:_user._id,
        role:_user.role
    }
    let token=jwt.sign(payload,secretKey,{expiresIn:"60s"});
    return token;
    
}
export default generateToken;