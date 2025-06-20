import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';  
import type { UserState } from '../store/UserState';
import {  removeUser} from '../store/userSlicer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const NavBar: React.FC = () => {
const user = useSelector((state: { user: UserState }) => state.user);
const navigate = useNavigate();
const dispatch=useDispatch();
const logout = () => {  
  axios.post('http://localhost:7200/logout', {}, { withCredentials: true })
    .then((res) => {
      dispatch(removeUser());
      navigate('/login');
    })  
}

useEffect(() => {}, [user]);


    return (
        <div className="navbar bg-base-300 shadow-sm">
    <div className="flex-1">
      <a href='/feed' className="btn btn-ghost text-xl">🙌 devTinder</a>
    </div>
    <div className="flex gap-2">
      {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
    <div className="dropdown dropdown-end mx-5">
      <div className="flex items-center gap-2">
        {user?.firstName && 
        <span className="text-sm font-semibold">Welcome, {user.firstName}</span>
        }
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {user?.imageUrl && 
            <>
                <img
            alt="Tailwind CSS Navbar component"
            src={user&&user?.imageUrl?user?.imageUrl: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" }/>
          </>}
        </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
        <a className="justify-between" href='/profile'>
          Profile
          <span className="badge">New</span>
        </a>
        </li>

        <li><a href='/connections'>Connections</a></li>

        <li><a href='/requests' >Requests</a></li>

        <li><a>Settings</a></li>
        <li onClick={()=>logout()}><a>Logout</a></li>
      </ul>
    </div>
    </div>
  </div>
    );
};

export default NavBar;