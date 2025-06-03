import mongoose from "mongoose";

const requestSchema= new mongoose.Schema({
    sender:{
        type : mongoose.Schema.Types.ObjectId,
        rel : "User",
        required:true
    },
    recipient:{
        type : mongoose.Schema.Types.ObjectId,
        rel : "User",
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Approved"],
        default:"Pending"
        
    }
},{
    timeseries:true,
});

const FriendRequest=mongoose.model("FriendRequest",requestSchema);
export default FriendRequest;