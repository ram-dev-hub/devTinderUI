import { useState } from "react"
import axios from "axios"
import { useDispatch } from 'react-redux'
import { addUser } from '../store/userSlicer'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [user, setUser] = useState('')
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {
        if (user === '' || password === '') {
            alert('Please fill in all fields')
            return
        }
        try {
            const res = await axios.post('http://localhost:7200/login', {
                email: user,
                password: password
            }, { withCredentials: true })
            if (res.status === 200) {
                dispatch(addUser(res.data))
                navigate('/feed')
            }
        } catch (error) {
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

    const handleRegister = async () => {
        if (firstName === '' || lastName === '' || user === '' || password === '') {
            alert('Please fill in all fields')
            return
        }
        try {
            const res = await axios.post('http://localhost:7200/signup', {
                firstName,
                lastName,
                email:user,
                password
            }, { withCredentials: true })
            if (res.status === 200) {
                dispatch(addUser(res.data))
                navigate('/feed')
            }
        } catch (error) {
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

    // Disable logic
    const isLoginDisabled = user === '' || password === ''
    const isRegisterDisabled = firstName === '' || lastName === '' || user === '' || password === ''

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">{isRegister ? "Register" : "Login"}</legend>

              { isRegister&& <><label className="label">First Name</label><input
                    type="text"
                    required={isRegister}
                    value={firstName}
                    className="input"
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="First Name"
                    disabled={!isRegister} /><label className="label">Last Name</label><input
                        type="text"
                        required={isRegister}
                        value={lastName}
                        className="input"
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Last Name"
                        disabled={!isRegister} /></>
              }
                <label className="label">Email</label>
                <input
                    type="email"
                    required={true}
                    value={user}
                    className="input"
                    onChange={e => setUser(e.target.value)}
                    placeholder="Email"
                />

                <label className="label">Password</label>
                <input
                    type="password"
                    value={password}
                    required={true}
                    onChange={e => setPassword(e.target.value)}
                    className="input"
                    placeholder="Password"
                />
                <p className="text-error mt-2">{error}</p>
                <button
                    className="btn btn-neutral mt-4"
                    onClick={isRegister ? handleRegister : handleLogin}
                    disabled={isRegister ? isRegisterDisabled : isLoginDisabled}
                >
                    {isRegister ? "Register" : "Login"}
                </button>
            </fieldset>
            <div className="flex flex-col items-center mt-4">
                <p>
                    {isRegister
                        ? "Already have an account?"
                        : "Don't have an account?"}
                    <button
                        className="link ml-2"
                        type="button"
                        onClick={() => {
                            setIsRegister(!isRegister)
                            setError('')
                        }}
                    >
                        {isRegister ? "Login" : "Register"}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Login
