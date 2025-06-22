import  { useEffect } from 'react'
import NavBar from './nav-bar'
import Footer from './footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { UserState } from '../store/UserState'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { addUser } from '../store/userSlicer'

const Body = () => {
    const user = useSelector((state: { user: UserState }) => state.user);
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const fetchProfile = async () => {
        
      await axios.get('http://localhost:7200/profile/view', { withCredentials: true }).then((res)=>{

            dispatch(addUser(res.data))       

        }).catch((err) => {        
     
        console.log(err)
            navigate('/login');
        })
    }
    useEffect(() => {
        if (!user.email||user.email!=='')
            fetchProfile();
    }, [])


  return (
    <div data-theme="dark" className='flex flex-col h-screen'>
        <NavBar>

        </NavBar>
        <div className="flex-grow overflow-y-auto pb-16">

        <Outlet/>
        </div>


        <Footer></Footer>
      
    </div>
  )
}

export default Body
