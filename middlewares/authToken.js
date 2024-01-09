import jwt from "jsonwebtoken";

function authToken(req, res, next) {
    let token = req.headers.token;
    if (!token)
        return res.status(404).json({ type: "token error", message: "token missing" })
    try {
        let decoded = jwt.verify(token, process.env.JWT_STRING)
        console.log(decoded)
        next();
    }
    catch (err) {
        res.status(401).json({ type: "token error", message: "user is not verified" })
    }
}
export default authToken;