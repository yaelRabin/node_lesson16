import express from "express";
import { config } from "dotenv";
import {connectMongoDB} from './Config/connectMongo.js'
import carsRouter from './Routes/cars.js'

config();
const app = express()
app.use(express.json())

app.use('/', (req, res, next) => {
   console.log('welcome to our shop!');
   next();
})

connectMongoDB()

app.use('/api/cars', carsRouter)

app.use((err,req,res,next)=>{
   let statusCode=res.statusCode||500;
   res.status(statusCode).send(err.massage||"sorry, there is an error, try again")
})


//if the client send worng path in url - throw an error
app.use('/',(req,res)=>{
   res.statusCode(404)
   throw new Error('oops,sorry, the page not found')
})





let port=process.env.PORT || 2142
app.listen(port, () => {
   console.log(`listening on port ${port}`)
})