import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setLoading } from '../../redux/authSlice'
import { USER_API_END_POINT } from '../../utils/constant'
import { Button } from '../ui/button'
import Navbar from '../shared/Navbar'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: ''
    })

    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fullname', input.fullname)
        formData.append('email', input.email)
        formData.append('phoneNumber', input.phoneNumber)
        formData.append('password', input.password)
        formData.append('role', input.role)
        if (input.file) {
            formData.append('file', input.file)
        }

        try {
            dispatch(setLoading(true))
            const res = await axios.post(
                `${USER_API_END_POINT}/register`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            )
            if (res.data.success) {
                navigate('/login')
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex items-center justify-center py-16 px-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Create Account
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Join TalentBridge today
                        </p>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-5">

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                placeholder="Ayusha Sharma"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="ayusha@gmail.com"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                placeholder="9876543210"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="Create a password"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Register As
                            </label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-gray-700">Student</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-gray-700">Recruiter</span>
                                </label>
                            </div>
                        </div>

                        {/* Profile Photo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Profile Photo (Optional)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>

                        {/* Login Link */}
                        <p className="text-center text-gray-500 text-sm">
                            Already have an account?{' '}
                            <Link to="/login"
                                className="text-blue-600 font-medium hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup