import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req,res){
    const{fullName,email,password}=req.body; 
     
    try {
        if(!fullName||!email||!password){
            return res.status(400).json({message: "All the field are Requied"});
        }
        if(password.length<6){
            return res.status(400).json({message: "Password Should be of atleast 6 chars"});
        }
        const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Enter a Vaild Email"});
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "E mail already exist please enter another email or go to the login page"}); 
        }
        const index=Math.floor(Math.random()*100)+1;
        const randomAvatar=`http://avatar.iran.liara.run/public/${index}.png`;
        const newUser= await User.create({
            email,
            password,
            fullName,
            profilePic:randomAvatar,
        });

        try{
        await upsertStreamUser({id:newUser._id.toString(),name:newUser.fullName, image:newUser.profilePic||""});
        console.log(`stream user created for ${newUser.fullName } `);
        }catch(error){
            console.log("error while creating stream user ",error); 
        }

        const token= jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn: "7d"
        })
        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true, //xss attacks
            sameSite:"strict", //prevent csrf attacks
            secure:process.env.NODE_ENV === "production"
        })
        res.status(201).json({message:"user created",user:newUser   })
    } catch (error) {
        console.log("Error in Signup controller",error); 
        res.status(500).json({message:"error while signup"});
    }
};
export async function login(req,res){
    try {
        const{email,password}=req.body;
        if(!email||!password){
          return  res.status(400).json({message:"All Fields Are Required"});
        }   
        const user= await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"invaild Email"});
        }
        const isPasswordCorrect=await user.matchPassword(password);
        if(isPasswordCorrect===false){
            return res.status(401).json({message:"Incorrect Password"});
        }

        const token= jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn: "7d"
        })
        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true, //xss attacks
            sameSite:"strict", //prevent csrf attacks
            secure:process.env.NODE_ENV === "production"
        }) 

        res.status(200).json({success:true ,user });    
    } catch (error) {
        console.log("error in login controller",error);
        res.status(500).json({message:"Enternal server error"});
    }
};
export function logout(req,res){
    res.clearCookie("jwt"); 
    res.status(200).json({success:true,message:"logout sucessfull"});
};
export async function  onboarding(req,res){
    try {
        const userId=req.user._id;
        const{fullName,bio,nativeLanguage,learningLanguage,location}=req.body; 
        if(!fullName||!bio||!nativeLanguage||!learningLanguage||!location){
           return res.status(400).json({message:"All fields are required",
             missing:[
                !fullName&&"fullName",!bio&&"bio",!nativeLanguage&&"nativeLanguage",!learningLanguage&&"learnignLanguage",!location&&"location"
             ].filter(Boolean )
           })
        }
        const updatedUser=await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded:true,
        },{new:true})
        if(!updatedUser){
            return res.status(404).json({message:"User Not Found"})
        }
        try{
            await upsertStreamUser({id:updatedUser._id.toString(),name:updatedUser.fullName,image:updatedUser.profilePic});
            console.log(`user upserted in the stream ${updatedUser.fullName}`);
        }catch(StremError){
            console.log("error while upserting user in stream",StremError); 
            
        }
        res.status(200).json({success:true,user:updatedUser})
    } catch (error) {
        console.log("onboarding error",error);
        res.status(500).json({message:"Internal Surver Error"});
    }

}