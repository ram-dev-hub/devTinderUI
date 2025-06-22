import React from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removefeedUser } from '../store/feedSlicer';

interface CardProps {
  user: any;
  isfeed?: boolean;
}

const Card: React.FC<CardProps> = ({ user,isfeed=false }) => {
      const dispatch = useDispatch();
  

  const onClicksend= async (_status: string, _id: string) => {
    try {
        const response = await axios.post('http://localhost:7200/request/send/' + _status + '/' + _id, {}, {
            withCredentials: true
        });
        if (response) {
            dispatch(removefeedUser(_id));            
        } else {
            console.error('Failed to accept request:', response);
        }
    } catch (error) {
        console.error('There has been a problem with your accept operation:', error);
    }
}

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
        {isfeed && <div className="flex justify-center gap-6">
          <button onClick={()=>onClicksend('interested',user._id)} className="btn btn-circle bg-red-500 border-none hover:bg-red-600 text-white text-2xl shadow-xl">
            <span role="img" aria-label="Reject">✖️</span>
          </button>
          <button onClick={()=>onClicksend('ignored',user._id)} className="btn btn-circle bg-green-500 border-none hover:bg-green-600 text-white text-2xl shadow-xl">
            <span role="img" aria-label="Interest">❤️</span>
          </button>
        </div>
        }
    </div>
    </div>
  )
}

export default Card
