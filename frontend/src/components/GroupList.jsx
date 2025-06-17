import React from 'react';
import { useUserGroups } from '../hooks/useUserGroups';
import { Link } from 'react-router';
import { MessageSquare, Users2 } from 'lucide-react';

const GroupList = () => {
  const { data: groups = [], isLoading } = useUserGroups();

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="card bg-base-200 p-6 text-center">
        <h3 className="font-semibold text-lg mb-2">No groups found</h3>
        <p>Join or create a group to get started.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Your Groups</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Link
            to={`/group-chat/${group._id}`}
            key={group._id}
            className="card bg-base-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <div className="card-body p-5 flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg truncate">{group.name}</h3>
                <Users2 className="w-6 h-6 text-primary" />
              </div>

              {group.description && (
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {group.description}
                </p>
              )}

              <div className="mt-auto flex items-center justify-between">
                <span className="badge badge-outline text-xs flex items-center gap-1">
                  👥 {group.members.length} member{group.members.length !== 1 && 's'}
                </span>
                <MessageSquare />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
