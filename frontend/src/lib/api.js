import { axiosInstance } from "./axios";

export const signup =async(signupData)=>{
    const response = await axiosInstance.post("/auth/signup",signupData)
    return response.data;
};
export const getAuthUser=async() => {
    try {
        const res=await axiosInstance.get("/auth/me");
    return res.data;
    } catch (error) {
        console.log("error in get auth user",error);
        return null ;
    }
};
export const completeOnboarding=async(userData)=>{
    const res =await axiosInstance.post("/auth/onboarding",userData);
    return res.data; 
};
export const login =async(loginData)=>{
    const response = await axiosInstance.post("/auth/login",loginData);
    return response.data;
};
export const logout =async(loginData)=>{
    const response = await axiosInstance.post("/auth/logout" );
    return response.data;
};
export const getUserFriends=async()=>{
    const response =await axiosInstance.get("/users/friends");
    return response.data;
};
export const getRecommedatedUser=async()=>{
    const response=await axiosInstance.get("/users");
    return response.data;
};
export const getOutgoingFriendsRequest=async()=>{
    const response = await axiosInstance.get("/users/outgoing-friend-request");
    return response.data;
}
export const sendFriendRequest=async(userId)=>{
    const response = await axiosInstance.post(`/users/friend-request/${userId}`);
    return response.data;
}
export const getFriendRequest= async()=>{
    const response =await axiosInstance.get("/users/friend-request");
    return response.data;
}
export const acceptFriendRequest= async(userId)=>{
    const response =await axiosInstance.put(`/users/friend-request/${userId}/accept`);
    return response.data;
}
export const getStreamToken= async ()=>{
    const response =await axiosInstance.get('/chat/token');
    return response.data;
}
export const createGroup = async (groupData) => {
  
  const response = await axiosInstance.post("/groups/create", groupData);
  return response.data;
};
export const getUserGroups = async (token) => {
  
  const response = await axiosInstance.get("/groups/mygroups");
  return response.data;
};
export const getGroupById = async (groupId) => {
  const response = await axiosInstance.get(`/groups/${groupId}`);
  return response.data;
};
