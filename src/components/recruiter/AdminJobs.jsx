import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { JOB_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'
import { Briefcase, Plus, Users } from 'lucide-react'

const AdminJobs = () => {
    const [jobs, setJobs] = useState([])
    const navigate = useNavigate()

    const fetchAdminJobs = async () => {
        try {
            const res = await axios.get(
                `${JOB_API_END_POINT}/getadminjobs`,
                { withCredentials: true }
            )
            if (res.data.success) {
                setJobs(res.data.jobs)
            }
        } catch (error) {
            toast.error('Failed to fetch jobs')
        }
    }

    useEffect(() => {
        fetchAdminJobs()
    }, [])

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold" style={{ color: '#1f2937' }}>
                            Posted Jobs
                        </h1>
                        <p className="mt-1" style={{ color: '#6b7280' }}>
                            Manage all your job postings
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/admin/jobs/create')}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-medium transition-all hover:shadow-md"
                        style={{ backgroundColor: '#6366f1' }}>
                        <Plus className="w-4 h-4" />
                        Post New Job
                    </button>
                </div>

                {jobs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm"
                        style={{ border: '1px solid #e5e7eb' }}>
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: '#eef2ff' }}>
                            <Briefcase className="w-8 h-8" style={{ color: '#6366f1' }} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2" style={{ color: '#6b7280' }}>
                            No jobs posted yet
                        </h3>
                        <p className="mb-6" style={{ color: '#9ca3af' }}>
                            Post your first job to start receiving applications
                        </p>
                        <button
                            onClick={() => navigate('/admin/jobs/create')}
                            className="px-6 py-2.5 rounded-full text-white font-medium"
                            style={{ backgroundColor: '#6366f1' }}>
                            Post a Job
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden"
                        style={{ border: '1px solid #e5e7eb' }}>
                        {/* Table Header */}
                        <div className="grid grid-cols-5 gap-4 px-6 py-4"
                            style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #e5e7eb' }}>
                            <p className="font-semibold" style={{ color: '#374151' }}>Company</p>
                            <p className="font-semibold" style={{ color: '#374151' }}>Role</p>
                            <p className="font-semibold" style={{ color: '#374151' }}>Location</p>
                            <p className="font-semibold" style={{ color: '#374151' }}>Posted On</p>
                            <p className="font-semibold" style={{ color: '#374151' }}>Applicants</p>
                        </div>

                        {/* Table Rows */}
                        {jobs.map((job) => (
                            <div key={job._id}
                                className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
                                style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <div className="flex items-center gap-2">
                                    {job.company?.logo ? (
                                        <img
                                            src={job.company.logo}
                                            alt={job.company.name}
                                            className="w-8 h-8 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: '#eef2ff' }}>
                                            <span className="font-bold text-sm" style={{ color: '#6366f1' }}>
                                                {job.company?.name?.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    <p className="font-medium text-sm" style={{ color: '#374151' }}>
                                        {job.company?.name}
                                    </p>
                                </div>
                                <p className="font-medium" style={{ color: '#1f2937' }}>
                                    {job.title}
                                </p>
                                <p className="text-sm" style={{ color: '#6b7280' }}>
                                    {job.location}
                                </p>
                                <p className="text-sm" style={{ color: '#6b7280' }}>
                                    {new Date(job.createdAt).toLocaleDateString()}
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium px-3 py-1 rounded-full"
                                        style={{ backgroundColor: '#eef2ff', color: '#6366f1' }}>
                                        {job.applications?.length || 0}
                                    </span>
                                    <button
                                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                                        style={{
                                            border: '2px solid #6366f1',
                                            color: '#6366f1',
                                            backgroundColor: 'white'
                                        }}>
                                        <Users className="w-3 h-3" />
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminJobs