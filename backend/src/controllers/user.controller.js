import User from "../models/User.js"
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
                { id:{$nin:currentUser.friends}},
                {isOnboarded:true}
            ]
        });
        res.status(200).json(recomdatedUser);
        
    } catch (error) {
        console.log("error while getting recomdating users",error);
        res.status(500).json({message:"Internal Surver Error"});
    } 
}