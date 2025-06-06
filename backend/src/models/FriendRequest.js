import mongoose from "mongoose";

const requestSchema= new mongoose.Schema({
    sender:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required:true
    },
    recipient:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Approved"],
        default:"Pending"
        
    }
},{
    timestamps: true,
});

const FriendRequest=mongoose.model("FriendRequest",requestSchema);
export default FriendRequest;