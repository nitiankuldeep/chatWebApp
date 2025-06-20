import {login} from "../lib/api.js"
import { useMutation, useQueryClient } from '@tanstack/react-query';


const useLogin = () => {
    const queryClient =useQueryClient();
    const {mutate,isPending,error}=useMutation({
      mutationFn:login,
      onSuccess:(data)=>{queryClient.invalidateQueries({queryKey:["authUser"]})}, 
  
    });
    return {isPending,error,loginMutate:mutate};
}

export default useLogin;
