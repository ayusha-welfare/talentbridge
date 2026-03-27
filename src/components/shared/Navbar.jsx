import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/authSlice'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { LogOut, User2 } from 'lucide-react'

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`,
                { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm"
            style={{ borderBottom: '1px solid #e5e7eb' }}>
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link to="/">
                    <h1 className="text-2xl font-bold">
                        <span style={{ color: '#6366f1' }}>Talent</span>
                        <span style={{ color: '#f97316' }}>Bridge</span>
                    </h1>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-8">
                    {user && user.role === 'admin' ? (
                        <>
                            <Link to="/admin/dashboard"
                                className="font-medium transition-colors hover:opacity-80"
                                style={{ color: '#374151' }}>
                                Dashboard
                            </Link>
                        </>
                    ) : user && user.role === 'recruiter' ? (
                        <>
                            <Link to="/admin/companies"
                                className="font-medium transition-colors hover:opacity-80"
                                style={{ color: '#374151' }}>
                                Companies
                            </Link>
                            <Link to="/admin/jobs"
                                className="font-medium transition-colors hover:opacity-80"
                                style={{ color: '#374151' }}>
                                Jobs
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/"
                                className="font-medium transition-colors hover:opacity-80"
                                style={{ color: '#374151' }}>
                                Home
                            </Link>
                            <Link to="/jobs"
                                className="font-medium transition-colors hover:opacity-80"
                                style={{ color: '#374151' }}>
                                Jobs
                            </Link>
                            <Link to="/applied-jobs"
                                className="font-medium transition-colors hover:opacity-80"
                                style={{ color: '#374151' }}>
                                Applied Jobs
                            </Link>

                            <Link to="/profile"
                                className="font-medium transition-colors hover:opacity-80"
                                style={{ color: '#374151' }}>
                                Profile
                            </Link>
                        </>
                    )}
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-3">
                    {!user ? (
                        <>
                            <Link to="/login">
                                <button
                                    className="px-5 py-2 rounded-full font-medium transition-all hover:shadow-sm"
                                    style={{
                                        border: '2px solid #6366f1',
                                        color: '#6366f1',
                                        backgroundColor: 'white'
                                    }}>
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button
                                    className="px-5 py-2 rounded-full font-medium text-white transition-all hover:shadow-md"
                                    style={{ backgroundColor: '#f97316' }}>
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                {user.profile.profilePhoto ? (
                                    <img
                                        src={user.profile.profilePhoto}
                                        alt="profile"
                                        className="w-9 h-9 rounded-full object-cover"
                                        style={{ border: '2px solid #eef2ff' }}
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: '#eef2ff' }}>
                                        <User2 className="w-5 h-5" style={{ color: '#6366f1' }} />
                                    </div>
                                )}
                                <span className="font-medium" style={{ color: '#374151' }}>
                                    {user.fullname}
                                </span>
                            </div>
                            <button
                                onClick={logoutHandler}
                                className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all"
                                style={{
                                    border: '2px solid #fee2e2',
                                    color: '#ef4444',
                                    backgroundColor: '#fff5f5'
                                }}>
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar