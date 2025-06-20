import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setConnections } from '../store/connectionSlice';

const Connections = () => {
    const dispatch = useDispatch();
    const connections= useSelector((state: { connections: any }) => state.connections);

    const fetcConnections = async () => {
        try {
            const response = await axios.get('http://localhost:7200/user/connections', {
                withCredentials: true
            });
            if (response) {
                // Handle the response data as needed
                dispatch(setConnections(response.data.data));
                console.log(response.data);
            } else {
                console.error('Failed to fetch connections:', response);
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
    React.useEffect(() => {
        if(connections && connections.length > 0) return;
           fetcConnections();
    }, []);


  return (
    <div className="p-6">
        <h1 className='text-3xl font-bold text-center pb-6'>Connections</h1>

        {connections && connections.length > 0 ?
          connections.map((connection: any) => (
            <div className="flex justify-center w-full pb-4">
              <div className="flex justify-center w-md gap-6">
                <div key={connection._id} className="flex items-center w-80 md:w-96 h-40 bg-base-300 rounded-lg shadow-lg p-4 mx-auto">
                    <img
                      src={connection.imageUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                      alt={connection.firstName}
                      className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-lg mr-4 md:mr-6"
                    />
                    <div className="flex flex-col justify-center">
                      <span className="text-2xl font-semibold">{connection.firstName} ({connection.age})</span>
                      <span className="text-lg">{connection.aboutUs}</span>
                    </div>
                </div>
              </div>
            </div>
          )) : <div className='flex flex-col items-center justify-center h-screen'>
            <span className="loading loading-ring loading-xl"></span>
          </div>}

    </div>
          
  )
}

export default Connections
