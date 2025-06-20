import React from 'react'
import  type {UserState } from '../store/UserState';

interface CardProps {
  user: any;
}

const Card: React.FC<CardProps> = ({ user }) => {
  return (
    <div className="relative w-80 h-[480px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col justify-end">
      <img
        src={user.imageUrl ? user.imageUrl : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
        alt={user.firstName}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    <div className="relative z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
      <h2 className="text-3xl font-extrabold text-white drop-shadow-lg mb-1">
        {user.firstName}, <span className="font-semibold text-pink-400">{user.age}</span>
      </h2>
      <p className="text-pink-300 text-base font-medium mb-1 drop-shadow">{user.gender}</p>
      <p className="text-white text-base font-medium mb-2 line-clamp-2 drop-shadow">{user.aboutUs}</p>
      <p className="text-cyan-200 text-sm font-semibold mb-4 drop-shadow">{user.skills}</p>
      <div className="flex justify-center gap-6">
        <button className="btn btn-circle bg-red-500 border-none hover:bg-red-600 text-white text-2xl shadow-xl">
        <span role="img" aria-label="Reject">✖️</span>
        </button>
        <button className="btn btn-circle bg-green-500 border-none hover:bg-green-600 text-white text-2xl shadow-xl">
        <span role="img" aria-label="Interest">❤️</span>
        </button>
      </div>
    </div>
    </div>
  )
}

export default Card
