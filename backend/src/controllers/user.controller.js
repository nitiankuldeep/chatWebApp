import User from "../models/User.js"
import FriendRequest from "../models/FriendRequest.js";
export async function getMyFriends(req,res){
    try {
        const userId=req.user._id;
        
        const user = await User.findById(req.user._id).select("friends").populate("friends","fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json(user.friends);
        
    } catch (error) {
        console.log("error while getting your friends",error);
        res.status(500).json({message:"Internal Server Error" });
        
    }

};
export async function getRecomdatedUser(req,res) {
    try {
        const userId=req.user._id;
        const currentUser=req.user;
        const recomdatedUser = await User.find({
            $and:[
                { _id:{$ne:userId}},
                { _id:{$nin:currentUser.friends}},
                {isOnboarded:true}
            ]
        });
        res.status(200).json(recomdatedUser);
        
    } catch (error) {
        console.log("error while getting recomdating users",error);
        res.status(500).json({message:"Internal Surver Error"});
    } 
}
export async function sendFriendRequest(req,res) {

    try {
        const userId= req.user._id;
        const {idx}=req.params;
        console.log(idx);
        if(userId=== idx){
            return res.status(400).json({message:"you cannot send friend request to yourself"});
        }
        const recipient = await User.findById(idx);
         
        if(!recipient){
            return res.status(400).json({message:"That user does't exist"} );
        }
        if(recipient.friends.includes(userId)){
            return res.status(400).json({message:"You cannot send request to your Already Friends"} );
        }
        const existingRequest= await FriendRequest.findOne({
            $or :[{sender:userId,recipient:idx},{sender:idx,recipient:userId}]}
        );
        if(existingRequest){
            return res.status(400).json({message:" request already exsist between you and this User "});
        }
        const request= await FriendRequest.create({
            sender:userId,
            recipient:idx
        });
        res.status(200).json(request);
    } catch (error) {
        console.log("Error while Sending the Friend Request",error);
        res.status(500).json({message:"Internal Server Error"}); 
    } 
}

export async function acceptFriendRequest(req,res){
    try {
        const {id:requestId}=req.params;
        const request= await FriendRequest.findById(requestId);
        if(!request){
            return res.status(400).json({message:"Request doesn't exit"});
        }
        if(request.recipient!==req.user._id){
            return res.status(400).json({message:"You are not authorized to accept that request"});
        }
        if(request.status==="Approved"){
            return res.status(400).json({message:"Request is already accepted"});
        }
        request.status="Approved";
        await request.save();
        await User.findByIdAndUpdate(request.sender,{ 
            $addToSet:{friends:request.recipient}
        });
        await User.findByIdAndUpdate(request.recipient,{
            $addToSet:{friends:request.sender}
        });

        res.status(200).json({message:"Friend Request Accepted"});
    } catch (error) {
        console.log("Error in accepting friend request",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
export async function getFriendRequest(req,res){
    try {
        const inCommingRequest= await FriendRequest.find({
            recipient:req.user._id,
            status:"Pending"
        }).populate("sender","fullName profilePic nativeLanguage learningLanguage");

        const acceptedRequest=await FriendRequest.find({
            sender :req.user._id,
            status:"Pending"
        }).populate("recipient","fullName profilePic");

        res.status(200).json(inCommingRequest,acceptFriendRequest);

    } catch (error) {
        console.log("Error in Getting friend request",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
export async function outgoingfriendRequest(req,res){
     try {
        const userId=req.user._id;
        
        const request= await FriendRequest.find({sender:userId,status:"Pending"}).populate("recipient","fullName profilePic learningLanguage nativeLanguage");
        res.status(200).json(  request);
          
     } catch (error) {
        console.log("Error in fetching Outgoing friend request",error);
        res.status(500).json({message:"Internal Server Error"});
     }
}