import { useQuery } from '@tanstack/react-query';
import { getUserGroups } from '../lib/api';

export const useUserGroups = () => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: getUserGroups,
  });
};
