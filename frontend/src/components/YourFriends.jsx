import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserFriends } from '../lib/api';
import FriendCard from './FriendCard';
import NoFriendsFound from './NoFriendsFound';

const YourFriends = () => {
  const { data: friendsData = [], isLoading: loadingFriends } = useQuery({
    queryKey: ['friends'],
    queryFn: () => getUserFriends(),
  });

  // Normalize: if friendsData is an array, use it; if it's an object with .friends, use that
  const friendsList = Array.isArray(friendsData)
    ? friendsData
    : friendsData.friends || [];

  if (loadingFriends) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (friendsList.length === 0) {
    return <NoFriendsFound />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {friendsList.map((friend) => (
        <FriendCard key={friend._id} friend={friend} />
      ))}
    </div>
  );
};

export default YourFriends;
