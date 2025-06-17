import React, { useState } from 'react';
import { useCreateGroup } from '../hooks/useCreateGroups';
import useAuthUser from '../hooks/useAuthUser.js';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

export default function CreateGroup() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const { authUser, token } = useAuthUser();

  const createGroupMutation = useCreateGroup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const membersToSend = members.length ? members : [authUser._id];

      await createGroupMutation.mutateAsync(
        { name, description, members: membersToSend },
        {
          onSuccess: (data) => {
            toast.success(`Group "${data.group.name}" created!`);
            setName('');
            setDescription('');
            setMembers([]);
            setTimeout(() => navigate('/'), 1000);
          },
          onError: () => {
            toast.error('Failed to create group');
          },
        }
      );
    } catch (error) {
      toast.error('Failed to create group');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-base-200 p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Create a New Group</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-1 text-accent">Group Name</label>
          <input
            type="text"
            placeholder="e.g., Study Buddies, Hiking Club"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-accent">Description</label>
          <textarea
            placeholder="Write a short description about the group..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full resize-none"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-accent">
            Members <span className="text-xs text-gray-400">(comma-separated user Email-IDs)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Kuldeep@gmail.com,kuldeep2@gmail.com"
            value={members.join(',')}
            onChange={(e) =>
              setMembers(e.target.value.split(',').map((id) => id.trim()))
            }
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full mt-4 tracking-wide text-lg">
          Create Group
        </button>
      </form>
    </div>
  );
}
