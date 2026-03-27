import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from '../../redux/authSlice'
import { USER_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'
import { User2, Mail, Phone, FileText, Pencil, X } from 'lucide-react'

const Profile = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.join(', ') || '',
        file: null
    })
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
        formData.append('bio', input.bio)
        formData.append('skills', input.skills)
        if (input.file) { formData.append('file', input.file) }
        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
                setIsEditing(false)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold" style={{ color: '#1f2937' }}>My Profile</h1>
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-white" style={{ backgroundColor: '#6366f1' }}>
                            <Pencil className="w-4 h-4" />Edit Profile
                        </button>
                    ) : (
                        <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium" style={{ border: '2px solid #e5e7eb', color: '#374151', backgroundColor: 'white' }}>
                            <X className="w-4 h-4" />Cancel
                        </button>
                    )}
                </div>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
                    <div className="h-24 w-full" style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fff7ed 100%)' }} />
                    <div className="px-8 pb-6">
                        <div className="flex items-end gap-4 -mt-12 mb-6">
                            {user?.profile?.profilePhoto ? (
                                <img src={user.profile.profilePhoto} alt="profile" className="w-24 h-24 rounded-full object-cover" style={{ border: '4px solid white' }} />
                            ) : (
                                <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#eef2ff', border: '4px solid white' }}>
                                    <User2 className="w-10 h-10" style={{ color: '#6366f1' }} />
                                </div>
                            )}
                            <div className="mb-2">
                                <h2 className="text-2xl font-bold" style={{ color: '#1f2937' }}>{user?.fullname}</h2>
                                <span className="text-sm font-medium px-3 py-1 rounded-full capitalize" style={{ backgroundColor: '#eef2ff', color: '#6366f1' }}>{user?.role}</span>
                            </div>
                        </div>
                        {!isEditing ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fafafa', border: '1px solid #f3f4f6' }}>
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#eef2ff' }}>
                                        <Mail className="w-5 h-5" style={{ color: '#6366f1' }} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium" style={{ color: '#9ca3af' }}>Email Address</p>
                                        <p className="font-medium" style={{ color: '#1f2937' }}>{user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fafafa', border: '1px solid #f3f4f6' }}>
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#fff7ed' }}>
                                        <Phone className="w-5 h-5" style={{ color: '#f97316' }} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium" style={{ color: '#9ca3af' }}>Phone Number</p>
                                        <p className="font-medium" style={{ color: '#1f2937' }}>{user?.phoneNumber}</p>
                                    </div>
                                </div>
                                {user?.profile?.bio && (
                                    <div className="p-4 rounded-xl" style={{ backgroundColor: '#fafafa', border: '1px solid #f3f4f6' }}>
                                        <p className="text-xs font-medium mb-2" style={{ color: '#9ca3af' }}>Bio</p>
                                        <p style={{ color: '#374151' }}>{user.profile.bio}</p>
                                    </div>
                                )}
                                {user?.profile?.skills?.length > 0 && (
                                    <div className="p-4 rounded-xl" style={{ backgroundColor: '#fafafa', border: '1px solid #f3f4f6' }}>
                                        <p className="text-xs font-medium mb-3" style={{ color: '#9ca3af' }}>Skills</p>
                                        <div className="flex flex-wrap gap-2">
                                            {user.profile.skills.map((skill, i) => (
                                                <span key={i} className="text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: '#eef2ff', color: '#6366f1' }}>{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {user?.profile?.resume && (
                                    <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: '#fafafa', border: '1px solid #f3f4f6' }}>
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ecfdf5' }}>
                                            <FileText className="w-5 h-5" style={{ color: '#10b981' }} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium" style={{ color: '#9ca3af' }}>Resume</p>
                                            <a href={user.profile.resume} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline" style={{ color: '#6366f1' }}>
                                                {user.profile.resumeOriginalName || 'View Resume'}
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {!user?.profile?.bio && !user?.profile?.skills?.length && !user?.profile?.resume && (
                                    <div className="text-center py-8">
                                        <p style={{ color: '#9ca3af' }}>Your profile is incomplete. Click Edit Profile to add your details!</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <form onSubmit={submitHandler} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Full Name</label>
                                    <input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} className="w-full px-4 py-3 rounded-lg outline-none" style={{ border: '2px solid #e5e7eb' }} onFocus={e => e.target.style.borderColor = '#6366f1'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Email Address</label>
                                    <input type="email" name="email" value={input.email} onChange={changeEventHandler} className="w-full px-4 py-3 rounded-lg outline-none" style={{ border: '2px solid #e5e7eb' }} onFocus={e => e.target.style.borderColor = '#6366f1'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Phone Number</label>
                                    <input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="w-full px-4 py-3 rounded-lg outline-none" style={{ border: '2px solid #e5e7eb' }} onFocus={e => e.target.style.borderColor = '#6366f1'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Bio</label>
                                    <textarea name="bio" value={input.bio} onChange={changeEventHandler} rows={3} placeholder="Write a short bio about yourself..." className="w-full px-4 py-3 rounded-lg outline-none resize-none" style={{ border: '2px solid #e5e7eb' }} onFocus={e => e.target.style.borderColor = '#6366f1'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Skills</label>
                                    <input type="text" name="skills" value={input.skills} onChange={changeEventHandler} placeholder="React, Node.js, MongoDB (comma separated)" className="w-full px-4 py-3 rounded-lg outline-none" style={{ border: '2px solid #e5e7eb' }} onFocus={e => e.target.style.borderColor = '#6366f1'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1" style={{ color: '#374151' }}>Upload Resume (PDF)</label>
                                    <input type="file" accept=".pdf" onChange={changeFileHandler} className="w-full px-4 py-3 rounded-lg outline-none" style={{ border: '2px solid #e5e7eb', color: '#6b7280' }} />
                                    {user?.profile?.resume && (
                                        <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>Current: {user.profile.resumeOriginalName || 'Resume uploaded'} — Upload new to replace</p>
                                    )}
                                </div>
                                <button type="submit" disabled={loading} className="w-full py-3 rounded-full font-semibold text-white" style={{ backgroundColor: '#6366f1' }}>
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile