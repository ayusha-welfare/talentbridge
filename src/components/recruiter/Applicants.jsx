import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'
import { Users } from 'lucide-react'

const Applicants = () => {
    const { id } = useParams()
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchApplicants = async () => {
        try {
            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/${id}/applicants`,
                { withCredentials: true }
            )
            if (res.data.success) {
                setJob(res.data.job)
            }
        } catch (error) {
            toast.error('Failed to fetch applicants')
        }
    }

    useEffect(() => {
        fetchApplicants()
    }, [id])

    const updateStatusHandler = async (applicationId, status) => {
        try {
            setLoading(true)
            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
                { status },
                { withCredentials: true }
            )
            if (res.data.success) {
                toast.success(res.data.message)
                fetchApplicants()
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted':
                return 'bg-green-100 text-green-700'
            case 'rejected':
                return 'bg-red-100 text-red-700'
            default:
                return 'bg-yellow-100 text-yellow-700'
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Applicants</h1>
                    <p className="text-gray-500 mt-1">
                        {job?.title} — {job?.applications?.length || 0} applicants
                    </p>
                </div>
                {!job || job.applications?.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-500">No applicants yet</h3>
                        <p className="text-gray-400 mt-2">Applications will appear here once students apply</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-50 border-b">
                            <p className="font-semibold text-gray-600">#</p>
                            <p className="font-semibold text-gray-600">Name</p>
                            <p className="font-semibold text-gray-600">Email</p>
                            <p className="font-semibold text-gray-600">Resume</p>
                            <p className="font-semibold text-gray-600">Status</p>
                            <p className="font-semibold text-gray-600">Action</p>
                        </div>
                        {job.applications?.map((application, index) => (
                            <div key={application._id} className="grid grid-cols-6 gap-4 px-6 py-4 border-b hover:bg-gray-50 transition-colors items-center">
                                <p className="text-gray-500">{index + 1}</p>
                                <div className="flex items-center gap-2">
                                    {application.applicant?.profile?.profilePhoto ? (
                                        <img src={application.applicant.profile.profilePhoto} alt={application.applicant.fullname} className="w-8 h-8 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 font-bold text-sm">{application.applicant?.fullname?.charAt(0)}</span>
                                        </div>
                                    )}
                                    <p className="font-medium text-gray-700 text-sm">{application.applicant?.fullname}</p>
                                </div>
                                <p className="text-gray-500 text-sm">{application.applicant?.email}</p>
                                <div>
                                    {application.applicant?.profile?.resume ? (
                                        <a href={application.applicant.profile.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">View Resume</a>
                                    ) : (
                                        <p className="text-gray-400 text-sm">No resume</p>
                                    )}
                                </div>
                                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full w-fit capitalize ${getStatusColor(application.status)}`}>
                                    {application.status}
                                </span>
                                <select onChange={(e) => updateStatusHandler(application._id, e.target.value)} defaultValue="" disabled={loading} className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                    <option value="" disabled>Update</option>
                                    <option value="accepted">✅ Accept</option>
                                    <option value="rejected">❌ Reject</option>
                                    <option value="pending">⏳ Pending</option>
                                </select>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Applicants