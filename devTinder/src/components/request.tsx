import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeRequest, setRequests } from '../store/requestSlicer';

const Requests = () => {
    const dispatch = useDispatch();
    const requests= useSelector((state: { requests: any }) => state.requests);

    const fetcRequests = async () => {
        try {
            const response = await axios.get('http://localhost:7200/user/request/reviewed', {
                withCredentials: true
            });
            if (response) {
                // Handle the response data as needed
                dispatch(setRequests(response.data.data));
                console.log(response.data);
            } else {
                console.error('Failed to fetch requests:', response);
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
    React.useEffect(() => {
        if (requests && requests.length > 0) return;
        fetcRequests();
    }, []);
    const onClickReview = async (_status: string, _id: string) => {
        try {
            const response = await axios.post('http://localhost:7200/request/review/' + _status + '/' + _id, {}, {
                withCredentials: true
            });
            if (response) {
                dispatch(removeRequest(response.data._id));
            } else {
                console.error('Failed to accept request:', response);
            }
        } catch (error) {
            console.error('There has been a problem with your accept operation:', error);
        }
    }


  return (
    <div className="p-6">
        <h1 className='text-3xl font-bold text-center pb-6'>Requests</h1>
        {requests && requests.length > 0 ?
          requests.map((request: any) => (
            <div className="flex justify-center w-full pb-4">
              <div className="flex justify-center w-md gap-6">
                <div key={request._id} className="flex items-center w-80 md:w-96 h-24 bg-base-300 rounded-lg shadow-lg p-3 mx-auto">
                    <img
                        src={request.imageUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                        alt={request.firstName}
                        className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full mr-3 md:mr-4"
                    />
                    <div className="flex flex-col justify-center flex-1">
                        <span className="text-lg font-semibold">{request.firstName} ({request.age})</span>
                        <span className="text-sm truncate">{request.aboutUs}</span>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex gap-2">
                            <button onClick={() => onClickReview('accepted',request._id)} className="btn btn-primary btn-xs">Accept</button>
                            <button onClick={() => onClickReview('rejected',request._id)} className="btn btn-secondary btn-xs">Reject</button>
                        </div>
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

export default Requests
