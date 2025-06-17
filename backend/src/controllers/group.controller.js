import Group from '../models/Group.js';
import User from "../models/User.js";
import { StreamChat } from 'stream-chat';

const serverClient = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);

export const createGroup = async (req, res) => {
  try {
    const { name, description, members } = req.body; 
    const createdBy = req.user._id.toString();

    if (!name || !Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ message: 'Group name and member emails are required' });
    }

    
    const users = await User.find({ email: { $in: members } }, '_id email');

    if (users.length === 0) {
      return res.status(404).json({ message: 'No valid users found for the provided emails' });
    }

    const memberIds = users.map(user => user._id.toString());

    
    if (!memberIds.includes(createdBy)) memberIds.push(createdBy);


    const channel = serverClient.channel('team',undefined, {
      name,
      members: memberIds,
      created_by: { id: createdBy },
    });

    await channel.create();

 
    const group = await Group.create({
      name,
      description,
      members: memberIds,
      admins: [createdBy],
      createdBy,
      streamChannelId: channel.id,
    });

    res.status(201).json({ message: 'Group created', group });
  } catch (error) {
    console.error('Group creation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserGroups = async (req, res) => {
  try {
    const userId = req.user._id;
    const groups = await Group.find({ members: userId })
      .populate('members', 'username email')
      .populate('admins', 'username email');
    res.status(200).json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ message: 'Failed to get user groups' });
  }
};

export const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate('members', 'username email');
    if (!group) return res.status(404).json({ message: 'Group not found' });
    res.status(200).json(group);
  } catch (error) {
    console.error('Error fetching group by ID:', error);
    res.status(500).json({ message: 'Failed to get group' });
  }
};
