import React from 'react'
import EditProfile from './editProfile'
import { useSelector } from 'react-redux'
import type { UserState } from '../store/UserState';

const Profile = () => {
  const User = useSelector((state: { user: UserState }) => state.user);
  return (
    <div>
      <EditProfile {...User} />
    </div>
  )
}

export default Profile
