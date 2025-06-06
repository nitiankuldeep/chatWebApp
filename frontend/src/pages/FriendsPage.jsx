import React from 'react'
import YourFriends from '../components/YourFriends'

const FriendsPage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
        </div>
        <YourFriends />
      </div>
    </div>
  )
}

export default FriendsPage
