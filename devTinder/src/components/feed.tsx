import React, { useEffect } from 'react'
import Card from './card'
import axios from 'axios'
import { setFeed } from '../store/feedSlicer' 
import { useDispatch, useSelector } from 'react-redux'

const Feed = () => {
  const dispatch = useDispatch();

  const feedUser=useSelector((state: { feed: any }) => state.feed);
  

  const fetchFeedData=()=>{
    axios.get('http://localhost:7200/user/feeds',{withCredentials:true}).then((res)=>{
      dispatch(setFeed(res.data.feedUsers));
    }).catch((err)=>{
  
      })    
  }
  useEffect(() => {
    if(feedUser&&feedUser.length>0) return;
    fetchFeedData();
  },[])


  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {feedUser&&feedUser.length>0
?   <Card user={feedUser[0]} ></Card>:<span className="loading loading-ring loading-xl"></span>

}
    </div>
  )
}

export default Feed
