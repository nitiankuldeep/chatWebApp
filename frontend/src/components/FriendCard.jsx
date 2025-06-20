import React from 'react';
import { LANGUAGE_TO_FLAG } from '../constants';
import { Link } from 'react-router';
import { capitialize } from '../lib/util';

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-1">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt="userProfilePic" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <h3 className="font-semibold truncate">{friend.fullName}</h3>
            {friend.email && (
              <p
                title={friend.email}
                className="text-xs text-gray-500 truncate max-w-[200px]"
                style={{ wordBreak: 'break-all' }}
              >
                {friend.email}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {capitialize(friend.nativeLanguage)}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {capitialize(friend.learningLanguage)}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(Language) {
  if (!Language) return null;
  const langLower = Language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];
  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
