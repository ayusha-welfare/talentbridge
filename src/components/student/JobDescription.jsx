import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setSingleJob } from '../../redux/jobSlice'
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { MapPin, Briefcase, Clock, DollarSign, Users } from 'lucide-react'

const JobDescription = () => {
    const { id } = useParams()
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const [isApplied, setIsApplied] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchJob = async () => {
        try {
            const res = await axios.get(
                `${JOB_API_END_POINT}/get/${id}`,
                { withCredentials: true }
            )
            if (res.data.success) {
                dispatch(setSingleJob(res.data.job))
                const applied = res.data.job.applications?.some(
                    app => app.applicant === user?._id
                )
                setIsApplied(applied)
            }
        } catch (error) {
            toast.error('Failed to fetch job details')
        }
    }

    useEffect(() => {
        fetchJob()
    }, [id])

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${id}`,
                { withCredentials: true }
            )
            if (res.data.success) {
                setIsApplied(true)
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    if (!singleJob) return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex items-center justify-center py-20">
                <p className="text-gray-500">Loading job details...</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-10">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/jobs')}
                    className="text-blue-600 hover:underline mb-6 flex items-center gap-1">
                    ← Back to Jobs
                </button>

                {/* Job Header */}
                <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            {singleJob.company?.logo ? (
                                <img
                                    src={singleJob.company.logo}
                                    alt={singleJob.company.name}
                                    className="w-16 h-16 rounded-xl object-cover"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <span className="text-blue-600 font-bold text-2xl">
                                        {singleJob.company?.name?.charAt(0)}
                                    </span>
                                </div>
                            )}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {singleJob.title}
                                </h1>
                                <p className="text-gray-500 mt-1">
                                    {singleJob.company?.name}
                                </p>
                            </div>
                        </div>

                        {/* Apply Button */}
                        {user?.role === 'student' && (
                            <Button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`px-8 py-3 rounded-full font-semibold ${isApplied
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}>
                                {isApplied ? 'Already Applied ✓' : 'Apply Now'}
                            </Button>
                        )}
                    </div>

                    {/* Job Tags */}
                    <div className="flex flex-wrap gap-3 mt-6">
                        <span className="bg-blue-50 text-blue-600 text-sm font-medium px-4 py-1.5 rounded-full">
                            {singleJob.jobType}
                        </span>
                        <span className="bg-green-50 text-green-600 text-sm font-medium px-4 py-1.5 rounded-full">
                            {singleJob.salary} LPA
                        </span>
                        <span className="bg-purple-50 text-purple-600 text-sm font-medium px-4 py-1.5 rounded-full">
                            {singleJob.experienceLevel} yr experience
                        </span>
                        <span className="bg-orange-50 text-orange-600 text-sm font-medium px-4 py-1.5 rounded-full">
                            {singleJob.position} openings
                        </span>
                    </div>
                </div>

                {/* Job Details */}
                <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Job Details
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Location</p>
                                <p className="font-medium text-gray-700">{singleJob.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Salary</p>
                                <p className="font-medium text-gray-700">{singleJob.salary} LPA</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Job Type</p>
                                <p className="font-medium text-gray-700">{singleJob.jobType}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Positions</p>
                                <p className="font-medium text-gray-700">{singleJob.position} openings</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Job Description
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        {singleJob.description}
                    </p>
                </div>

                {/* Requirements */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Requirements
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {singleJob.requirements?.map((req, index) => (
                            <span key={index}
                                className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full">
                                {req}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription