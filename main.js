import express from "express";
import cors from "cors";
import { config } from "dotenv";
import carsRouter from './Routes/cars.js'
import userRouter from './Routes/user.js'
import {connectMongoDB} from './Config/connectMongo.js'
import errHandle from './middlewares/handleErrorsMiddleware.js'

config();
const app = express();
app.use(express.json());

app.use('/',cors({origin:"http://localhost:2142",methods:"DELETE"}));

app.use('/', (req, res, next) => {
   console.log('welcome to our shop!');
   next();
})

connectMongoDB()

app.use('/api/cars', carsRouter)
app.use('/api/users', userRouter)





//if the client send worng path in url - throw an error
app.use('/',(req,res)=>{
   res.status(404)
   throw new Error('oops,sorry, the page not found')
})
app.use(errHandle)




let port=process.env.PORT || 2142
app.listen(port, () => {
   console.log(`listening on port ${port}`)
})