import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req,res){
    try {
        const token = generateStreamToken(req.user._id);
        res.status(200).json({token});
    } catch (error) {
        console.log("error while getting stream token at chat controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}