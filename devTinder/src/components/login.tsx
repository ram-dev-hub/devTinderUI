import { useState } from "react"
import axios from "axios"

const Login = () => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
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
            console.log(res)
            if (res.status === 200) {
            }
        })
    
    }
        catch (error) {
            console.log(error)
            alert('Login failed')
        }
    }

  return (
      <div className="flex flex-col items-center justify-center h-screen">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend">Login</legend>

              <label className="label">Email</label>
              <input type="email" value={user} className="input" onChange={e=>setUser(e.target.value)} placeholder="Email" />

              <label className="label">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="input" placeholder="Password" />

              <button className="btn btn-neutral mt-4" onClick={handleOnClick} >Login</button>
          </fieldset>
      </div>
  )
}

export default Login
