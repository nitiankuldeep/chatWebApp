import  {StreamChat} from "stream-chat"
import "dotenv/config"
 
const apikey=process.env.STEAM_API_KEY;
const apisecret=process.env.STEAM_API_SECRET;

if(!apikey||!apisecret ){
    console.error("stream api key or api secret is missing"); 
}

const streamClient=StreamChat.getInstance(apikey,apisecret); 


export const upsertStreamUser= async(userData)=>{
    try {
        await streamClient.upsertUser(userData);
        console.log(userData);
        return userData;
    } catch (error) {
        console.log("error upsert user at stream",error); 
    } 
};
export const generateStreamToken=(userId)=>{
     try {
       
        return streamClient.createToken( userId.toString());
     } catch (error) {
        console.log("error while genrating srtream token at stream.js",error);
        res.status(500).json({message:"Internal Server Error"});
     }
}