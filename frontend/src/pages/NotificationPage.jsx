import { useMutation, useQuery, useQueryClient, useIsFetching } from '@tanstack/react-query'
import React from 'react'
import { getFriendRequest, acceptFriendRequest } from '../lib/api';
import { UserCheckIcon, ClockIcon, MessageSquareIcon, BellIcon } from 'lucide-react';
import NoNotificationsFound from '../components/NoNotificationsFound';
import PageLoader from '../components/PageLoader';

const NotificationPage = () => {
  const queryClient = useQueryClient();
  // Tracks if *any* query is currently fetching
  const isFetching = useIsFetching();

  const { data: friendRequests, isLoading: loadingRequests } = useQuery({
    queryKey: ['friends'],
    queryFn: getFriendRequest,
  });

  const { mutate: acceptFriendMutation, isPending: mutationPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      queryClient.invalidateQueries({ queryKey: ['friendRequests'] });
    }
  });

  const incommingRequest = friendRequests?.inCommingRequest || [];
  const acceptedRequest = friendRequests?.acceptedRequest || [];

  // Show PageLoader if the query is still loading or if any fetch is in flight
  if (loadingRequests || isFetching > 0) {
    return <PageLoader />;
  }

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto max-w-4xl space-y-8'>
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight mb-6'>
          Notifications
        </h1>

        {incommingRequest.length > 0 && (
          <section className='space-y-4'>
            <h2 className='text-xl font-semibold flex items-center gap-2'>
              <UserCheckIcon className='size-5 text-primary' />
              Friend Requests
              <span className='badge badge-primary ml-2'>
                {incommingRequest.length}
              </span>
            </h2>
            <div className='space-y-3'>
              {incommingRequest.map((req) => (
                <div
                  key={req._id}
                  className='card bg-base-200 shadow-sm hover:shadow-md transition-shadow'
                >
                  <div className='card-body p-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <div className='avatar size-14 rounded-full bg-base-300'>
                          <img
                            src={req.sender.profilePic}
                            alt={req.sender.fullName}
                          />
                        </div>
                        <div>
                          <h3 className='font-semibold'>
                            {req.sender.fullName}
                          </h3>
                          <div className='flex flex-wrap gap-1.5 mt-1'>
                            <span className='badge badge-secondary badge-sm'>
                              Native: {req.sender.nativeLanguage}
                            </span>
                            <span className='badge badge-outline badge-sm'>
                              Learning: {req.sender.learningLanguage}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        className='btn btn-primary btn-sm'
                        onClick={() => acceptFriendMutation(req._id)}
                        disabled={mutationPending}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {acceptedRequest.length > 0 && (
          <section className='space-y-4'>
            <h2 className='text-xl font-semibold flex items-center gap-2'>
              <BellIcon className='h-5 w-5 text-success' />
              New Connections
            </h2>
            <div className='space-y-3'>
              {acceptedRequest.map((notification) => (
                <div
                  key={notification._id}
                  className='card bg-base-200 shadow-sm'
                >
                  <div className='card-body p-4'>
                    <div className='flex items-start gap-3'>
                      <div className='avatar mt-1 size-10 rounded-full'>
                        <img
                          src={notification.recipient.profilePic}
                          alt={notification.recipient.fullName}
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-semibold'>
                          {notification.recipient.fullName}
                        </h3>
                        <p className='text-sm my-1'>
                          {notification.recipient.fullName} accepted your friend request
                        </p>
                        <p className='text-xs flex items-center opacity-70'>
                          <ClockIcon className='h-3 w-3 mr-1' />
                          Recently
                        </p>
                      </div>
                      <div className='badge badge-success'>
                        <MessageSquareIcon className='h-3 w-3 mr-1' />
                        New Friend
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {incommingRequest.length === 0 && acceptedRequest.length === 0 && !loadingRequests && !mutationPending && (
          <NoNotificationsFound />
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
