import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGroup } from '../lib/api';

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(['groups']);
    },
  });
};
