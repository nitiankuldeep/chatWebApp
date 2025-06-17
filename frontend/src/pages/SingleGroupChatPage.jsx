import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
} from 'stream-chat-react';

import { getStreamToken, getUserGroups } from '../lib/api';
import useAuthUser from '../hooks/useAuthUser';
import PageLoader from '../components/PageLoader';

const apiKey = import.meta.env.VITE_STREAM_API_KEY;
const client = StreamChat.getInstance(apiKey); 

const SingleGroupChatPage = () => {
  const { groupId } = useParams();
  const { authUser } = useAuthUser();

  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    if (!authUser || !groupId) return;

    const init = async () => {
      try {
        setLoading(true);

        if (!client.user) {
          const { token } = await getStreamToken();
          await client.connectUser(
            {
              id: authUser._id,
              name: authUser.username || authUser.email,
            },
            token
          );
        }

        const groups = await getUserGroups();
        const foundGroup = groups.find((g) => g._id === groupId);

        if (!foundGroup) throw new Error('Group not found');

        setGroup(foundGroup);

        const chatChannel = client.channel('team', foundGroup.channelId, {
          name: foundGroup.name,
          members: foundGroup.members.map((m) => m._id),
        });

        await chatChannel.watch();
        setChannel(chatChannel);
      } catch (error) {
        console.error('Error setting up chat:', error);
      } finally {
        setLoading(false);
      }
    };

    init();

    return () => {
      if (client && client.user) {
        client.disconnectUser();
      }
    };
  }, [authUser, groupId]);

  if (loading) return <PageLoader />;
  if (!channel) return <div className="text-center mt-10 text-gray-600">Group not found or failed to load.</div>;

  return (
    <div className="h-screen">
      <Chat client={client} theme="messaging light">
        <Channel channel={channel} thread={null}>
          <Window>
            <ChannelHeader title={group?.name || 'Group Chat'} />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default SingleGroupChatPage;
