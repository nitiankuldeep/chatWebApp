import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../lib/api';
const useLogout = () => {
    
    const queryClient=useQueryClient();
        const{mutate, isLoading}=  useMutation({
            mutationFn:logout,
            onSuccess:()=>queryClient.invalidateQueries({queryKey:["authUser"]

         })
            
    });
    return {logoutMutation:mutate,isLoading};
}

export default useLogout
