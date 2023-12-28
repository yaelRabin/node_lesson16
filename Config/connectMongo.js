import mongoose from "mongoose";

const db_connection=process.env.DB_CONNECTION ||'mongodb://0.0.0.0:27017'

async function connectMongoDB() {
    try{
      await mongoose.connect(`${db_connection}/${process.env.DB_NAME}`)
      console.log(`connection to ${process.env.DB_NAME} database sucsses!!`)
    }
    catch{
        console.log('sorry, connection to mogoDB failed');
        process.exit(1)
    }
    
}
export {connectMongoDB}