import { useState } from "react"
import axios from "axios"
import { useDispatch } from 'react-redux'
import { addUser } from '../store/userSlicer'
import { useNavigate } from "react-router-dom"


const Login = () => {

    const [user, setUser] = useState('')
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
     const navigate = useNavigate()
    
    const handleOnClick = async () => {
        if (user === '' || password === '') {
            alert('Please fill in all fields')
            return
        }
        try {
      const res= await axios.post('http://localhost:7200/login', {
            email: user,
            password: password
            
        },{ withCredentials: true }).then((res) => {
            if (res.status === 200) {
                dispatch(addUser(res.data))
                navigate('/feed')
            }

        })
    
    }
        catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(error.response.data)
                } else if (error.request) {
                    setError('Network error, please try again later')
                } else {
                    setError('An unexpected error occurred')
                }
            } else {
                setError('An unexpected error occurred')
            }
            console.log(error)
        }
    }

  return (
      <div className="flex flex-col items-center justify-center h-screen">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend">Login</legend>

              <label className="label">Email</label>
              <input type="email" required={true} value={user} className="input" onChange={e=>setUser(e.target.value)} placeholder="Email" />

              <label className="label">Password</label>
              <input type="password" value={password} required={true} onChange={e=>setPassword(e.target.value)} className="input" placeholder="Password" />
              <p className="text-error mt-2">{error}</p>
              <button className="btn btn-neutral mt-4" onClick={handleOnClick} >Login</button>
          </fieldset>
            <div className="flex flex-col items-center mt-4">
                <p>Don't have an account?</p>
                <a href="/register" className="btn btn-neutral mt-2">Register</a>
                </div>
      </div>
  )
}

export default Login
