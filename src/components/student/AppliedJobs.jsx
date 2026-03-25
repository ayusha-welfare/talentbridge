import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setAllAppliedJobs } from '../../redux/jobSlice'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'
import { Briefcase } from 'lucide-react'

const AppliedJobs = () => {
    const { allAppliedJobs } = useSelector(store => store.job)
    const dispatch = useDispatch()

    const fetchAppliedJobs = async () => {
        try {
            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/get`,
                { withCredentials: true }
            )
            if (res.data.success) {
                dispatch(setAllAppliedJobs(res.data.applications))
            }
        } catch (error) {
            toast.error('Failed to fetch applied jobs')
        }
    }

    useEffect(() => {
        fetchAppliedJobs()
    }, [])

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

            <div className="max-w-5xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Applied Jobs
                </h1>
                <p className="text-gray-500 mb-8">
                    Track all your job applications here
                </p>

                {allAppliedJobs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-500">
                            No applications yet
                        </h3>
                        <p className="text-gray-400 mt-2">
                            Start applying to jobs to track them here
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 border-b">
                            <p className="font-semibold text-gray-600">#</p>
                            <p className="font-semibold text-gray-600">Company</p>
                            <p className="font-semibold text-gray-600">Job Role</p>
                            <p className="font-semibold text-gray-600">Applied On</p>
                            <p className="font-semibold text-gray-600">Status</p>
                        </div>

                        {/* Table Rows */}
                        {allAppliedJobs.map((application, index) => (
                            <div key={application._id}
                                className="grid grid-cols-5 gap-4 px-6 py-4 border-b hover:bg-gray-50 transition-colors items-center">
                                <p className="text-gray-500">{index + 1}</p>
                                <div className="flex items-center gap-2">
                                    {application.job?.company?.logo ? (
                                        <img
                                            src={application.job.company.logo}
                                            alt={application.job.company.name}
                                            className="w-8 h-8 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 font-bold text-sm">
                                                {application.job?.company?.name?.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    <p className="font-medium text-gray-700">
                                        {application.job?.company?.name}
                                    </p>
                                </div>
                                <p className="text-gray-700">
                                    {application.job?.title}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {new Date(application.createdAt).toLocaleDateString()}
                                </p>
                                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full w-fit capitalize ${getStatusColor(application.status)}`}>
                                    {application.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AppliedJobs