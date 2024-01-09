function handleErrorsMiddleware(err,req,res,next) {
        let statusCode=res.statusCode||500;
        res.status(statusCode).send(err.massage||"sorry, there is an error, try again")
     
}
export default handleErrorsMiddleware