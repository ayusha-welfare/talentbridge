import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setLoading, setUser } from '../../redux/authSlice'
import { USER_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: ''
    })

    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true))
            const res = await axios.post(
                `${USER_API_END_POINT}/login`,
                input,
                { withCredentials: true }
            )
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                if (res.data.user.role === 'admin') {
                    navigate('/admin/dashboard')
                } else {
                    navigate('/')
                }
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            <Navbar />
            <div className="flex items-center justify-center py-16 px-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
                    style={{ border: '1px solid #e5e7eb' }}>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold" style={{ color: '#1f2937' }}>
                            Welcome Back!
                        </h1>
                        <p className="mt-2" style={{ color: '#6b7280' }}>
                            Login to your TalentBridge account
                        </p>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1"
                                style={{ color: '#374151' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="ayusha@gmail.com"
                                className="w-full px-4 py-3 rounded-lg outline-none transition"
                                style={{ border: '2px solid #e5e7eb' }}
                                onFocus={e => e.target.style.borderColor = '#6366f1'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1"
                                style={{ color: '#374151' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-lg outline-none transition"
                                style={{ border: '2px solid #e5e7eb' }}
                                onFocus={e => e.target.style.borderColor = '#6366f1'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium mb-3"
                                style={{ color: '#374151' }}>
                                Login As
                            </label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="w-4 h-4"
                                    />
                                    <span style={{ color: '#374151' }}>Student</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="w-4 h-4"
                                    />
                                    <span style={{ color: '#374151' }}>Recruiter</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="admin"
                                        checked={input.role === 'admin'}
                                        onChange={changeEventHandler}
                                        className="w-4 h-4"
                                    />
                                    <span style={{ color: '#374151' }}>Admin</span>
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-full font-semibold text-white transition-all hover:shadow-md"
                            style={{ backgroundColor: '#6366f1' }}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        {/* Signup Link */}
                        <p className="text-center text-sm" style={{ color: '#6b7280' }}>
                            Don't have an account?{' '}
                            <Link to="/signup"
                                className="font-medium hover:underline"
                                style={{ color: '#6366f1' }}>
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login