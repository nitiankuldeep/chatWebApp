import mongoose from "mongoose";

export default async function connectDB(){
    try{
       const conn= await mongoose.connect(process.env.MONGO_URI);
       console.log(`mongodb connected ${conn.connection.host}`); 
    }catch(error){
        console.log("error connecting to mongodb",error);
        process.exit(1);//1 mean fail  
    }
}