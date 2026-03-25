import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import Navbar from '../shared/Navbar'
import { USER_API_END_POINT } from '../../utils/constant'
import { CheckCircle, XCircle, Users, Briefcase } from 'lucide-react'

const AdminDashboard = () => {
    const [pendingRecruiters, setPendingRecruiters] = useState([])
    const [approvedRecruiters, setApprovedRecruiters] = useState([])
    const [students, setStudents] = useState([])
    const [activeTab, setActiveTab] = useState('pending')
    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/')
        }
    }, [user])

    const fetchData = async () => {
        try {
            const [pendingRes, approvedRes, studentsRes] = await Promise.all([
                axios.get(`${USER_API_END_POINT}/admin/recruiters/pending`, { withCredentials: true }),
                axios.get(`${USER_API_END_POINT}/admin/recruiters/approved`, { withCredentials: true }),
                axios.get(`${USER_API_END_POINT}/admin/students`, { withCredentials: true })
            ])
            if (pendingRes.data.success) setPendingRecruiters(pendingRes.data.recruiters)
            if (approvedRes.data.success) setApprovedRecruiters(approvedRes.data.recruiters)
            if (studentsRes.data.success) setStudents(studentsRes.data.students)
        } catch (error) {
            toast.error('Failed to fetch data')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const approveRecruiter = async (id) => {
        try {
            const res = await axios.put(
                `${USER_API_END_POINT}/admin/recruiters/approve/${id}`,
                {},
                { withCredentials: true }
            )
            if (res.data.success) {
                toast.success(res.data.message)
                fetchData()
            }
        } catch (error) {
            toast.error('Failed to approve recruiter')
        }
    }

    const rejectRecruiter = async (id) => {
        try {
            const res = await axios.delete(
                `${USER_API_END_POINT}/admin/recruiters/reject/${id}`,
                { withCredentials: true }
            )
            if (res.data.success) {
                toast.success(res.data.message)
                fetchData()
            }
        } catch (error) {
            toast.error('Failed to reject recruiter')
        }
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-10">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold" style={{ color: '#1f2937' }}>
                        Admin Dashboard
                    </h1>
                    <p style={{ color: '#6b7280' }}>Manage recruiters and students</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm"
                        style={{ border: '1px solid #e5e7eb' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: '#fff7ed' }}>
                                <Briefcase className="w-6 h-6" style={{ color: '#f97316' }} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: '#f97316' }}>
                                    {pendingRecruiters.length}
                                </p>
                                <p className="text-sm" style={{ color: '#6b7280' }}>Pending Approval</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm"
                        style={{ border: '1px solid #e5e7eb' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: '#ecfdf5' }}>
                                <CheckCircle className="w-6 h-6" style={{ color: '#10b981' }} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: '#10b981' }}>
                                    {approvedRecruiters.length}
                                </p>
                                <p className="text-sm" style={{ color: '#6b7280' }}>Approved Recruiters</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm"
                        style={{ border: '1px solid #e5e7eb' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: '#eef2ff' }}>
                                <Users className="w-6 h-6" style={{ color: '#6366f1' }} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: '#6366f1' }}>
                                    {students.length}
                                </p>
                                <p className="text-sm" style={{ color: '#6b7280' }}>Total Students</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    {['pending', 'approved', 'students'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="px-5 py-2 rounded-full font-medium capitalize transition-all"
                            style={{
                                backgroundColor: activeTab === tab ? '#6366f1' : 'white',
                                color: activeTab === tab ? 'white' : '#6b7280',
                                border: '2px solid',
                                borderColor: activeTab === tab ? '#6366f1' : '#e5e7eb'
                            }}>
                            {tab === 'pending' ? `Pending (${pendingRecruiters.length})` :
                                tab === 'approved' ? `Approved Recruiters` : `Students`}
                        </button>
                    ))}
                </div>

                {/* Pending Recruiters */}
                {activeTab === 'pending' && (
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden"
                        style={{ border: '1px solid #e5e7eb' }}>
                        {pendingRecruiters.length === 0 ? (
                            <div className="text-center py-20">
                                <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#d1d5db' }} />
                                <p className="text-xl font-semibold" style={{ color: '#6b7280' }}>
                                    No pending approvals! 🎉
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-5 gap-4 px-6 py-4"
                                    style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #e5e7eb' }}>
                                    <p className="font-semibold" style={{ color: '#374151' }}>#</p>
                                    <p className="font-semibold" style={{ color: '#374151' }}>Name</p>
                                    <p className="font-semibold" style={{ color: '#374151' }}>Email</p>
                                    <p className="font-semibold" style={{ color: '#374151' }}>Phone</p>
                                    <p className="font-semibold" style={{ color: '#374151' }}>Action</p>
                                </div>
                                {pendingRecruiters.map((recruiter, index) => (
                                    <div key={recruiter._id}
                                        className="grid grid-cols-5 gap-4 px-6 py-4 items-center"
                                        style={{ borderBottom: '1px solid #f3f4f6' }}>
                                        <p style={{ color: '#6b7280' }}>{index + 1}</p>
                                        <p className="font-medium" style={{ color: '#1f2937' }}>
                                            {recruiter.fullname}
                                        </p>
                                        <p className="text-sm" style={{ color: '#6b7280' }}>
                                            {recruiter.email}
                                        </p>
                                        <p className="text-sm" style={{ color: '#6b7280' }}>
                                            {recruiter.phoneNumber}
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => approveRecruiter(recruiter._id)}
                                                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white"
                                                style={{ backgroundColor: '#10b981' }}>
                                                <CheckCircle className="w-3 h-3" />
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => rejectRecruiter(recruiter._id)}
                                                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white"
                                                style={{ backgroundColor: '#ef4444' }}>
                                                <XCircle className="w-3 h-3" />
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}

                {/* Approved Recruiters */}
                {activeTab === 'approved' && (
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden"
                        style={{ border: '1px solid #e5e7eb' }}>
                        <div className="grid grid-cols-4 gap-4 px-6 py-4"
                            style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #e5e7eb' }}>
                            <p className="font-semibold" style={{ color: '#374151' }}>#</p>
                            <p className="font-semibold" style={{ color: '#374151' }}>Name</p>
                            <p className="font-semibold" style={{ color: '#374151' }}>Email</p>
                            <p className="font-semibold" style={{ color: '#374151' }}>Phone</p>
                        </div>
                        {approvedRecruiters.map((recruiter, index) => (
                            <div key={recruiter._id}
                                className="grid grid-cols-4 gap-4 px-6 py-4 items-center"
                                style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <p style={{ color: '#6b7280' }}>{index + 1}</p>
                                <p className="font-medium" style={{ color: '#1f2937' }}>
                                    {recruiter.fullname}
                                </p>
                                <p className="text-sm" style={{ color: '#6b7280' }}>
                                    {recruiter.email}
                                </p>
                                <p className="text-sm" style={{ color: '#6b7280' }}>
                                    {recruiter.phoneNumber}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Students */}
                {activeTab === 'students' && (
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden"
                        style={{ border: '1px solid #e5e7eb' }}>
                        <div className="grid grid-cols-4 gap-4 px-6 py-4"
                            style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #e5e7eb' }}>
                            <p className="font-semibold" style={{ color: '#374151' }}>#</p>
                            <p className="font-semibold" style={{ color: '#374151' }}>Name</p>
                            <p className="font-semibold" style={{ color: '#374151' }}>Email</p>
                            <p className="font-semibold" style={{ color: '#374151' }}>Phone</p>
                        </div>
                        {students.map((student, index) => (
                            <div key={student._id}
                                className="grid grid-cols-4 gap-4 px-6 py-4 items-center"
                                style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <p style={{ color: '#6b7280' }}>{index + 1}</p>
                                <p className="font-medium" style={{ color: '#1f2937' }}>
                                    {student.fullname}
                                </p>
                                <p className="text-sm" style={{ color: '#6b7280' }}>
                                    {student.email}
                                </p>
                                <p className="text-sm" style={{ color: '#6b7280' }}>
                                    {student.phoneNumber}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminDashboard