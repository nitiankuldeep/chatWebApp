import express from "express";
import "dotenv/config";
import authRoutes from './routes/auth.route.js';
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import connectDB from"./lib/db.js";
import cookieParser from "cookie-parser"; 
import groupRoutes from './routes/group.route.js'
import cors from "cors"

const app = express()
 
const PORT = process.env.PORT;
app.use(cors({
origin:"http://localhost:5173",
credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use('/api/groups', groupRoutes);


app.listen(PORT,()=>{
    console.log(`serve is running at ${PORT}`);
    connectDB();
 })
