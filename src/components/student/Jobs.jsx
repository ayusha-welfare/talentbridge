import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { setAllJobs } from '../../redux/jobSlice'
import { JOB_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'
import { Search, MapPin, Briefcase, Clock } from 'lucide-react'

const Jobs = () => {
    const [query, setQuery] = useState('')
    const { allJobs } = useSelector(store => store.job)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchJobs = async (keyword = '') => {
        try {
            const res = await axios.get(
                `${JOB_API_END_POINT}/get?keyword=${keyword}`,
                { withCredentials: true }
            )
            if (res.data.success) {
                dispatch(setAllJobs(res.data.jobs))
            }
        } catch (error) {
            toast.error('Failed to fetch jobs')
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    const searchHandler = () => {
        fetchJobs(query)
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            <Navbar />

            {/* Search Header */}
            <div style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fff7ed 100%)' }}>
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold mb-2" style={{ color: '#1f2937' }}>
                        Find Your Perfect Job ✨
                    </h1>
                    <p className="mb-6" style={{ color: '#6b7280' }}>
                        Browse through hundreds of opportunities
                    </p>
                    <div className="flex items-center max-w-2xl bg-white rounded-full px-4 py-2 shadow-md"
                        style={{ border: '2px solid #e5e7eb' }}>
                        <Search className="w-5 h-5 mr-3" style={{ color: '#6366f1' }} />
                        <input
                            type="text"
                            placeholder="Search by job title, skills..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
                            className="flex-1 outline-none bg-transparent"
                            style={{ color: '#374151' }}
                        />
                        <button
                            onClick={searchHandler}
                            className="rounded-full px-6 py-2 text-white font-semibold"
                            style={{ backgroundColor: '#6366f1' }}>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Jobs List */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <p className="mb-6 font-medium" style={{ color: '#6b7280' }}>
                    {allJobs.length} jobs found
                </p>

                {allJobs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <Briefcase className="w-16 h-16 mx-auto mb-4" style={{ color: '#d1d5db' }} />
                        <h3 className="text-xl font-semibold mb-2" style={{ color: '#6b7280' }}>
                            No jobs found
                        </h3>
                        <p style={{ color: '#9ca3af' }}>
                            Try searching with different keywords
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allJobs.map((job) => (
                            <div key={job._id}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                                style={{ border: '1px solid #e5e7eb' }}>

                                {/* Company Info */}
                                <div className="flex items-center gap-3 mb-4">
                                    {job.company?.logo ? (
                                        <img
                                            src={job.company.logo}
                                            alt={job.company.name}
                                            className="w-12 h-12 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: '#eef2ff' }}>
                                            <span className="font-bold text-lg" style={{ color: '#6366f1' }}>
                                                {job.company?.name?.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="font-semibold" style={{ color: '#1f2937' }}>
                                            {job.company?.name}
                                        </h3>
                                        <div className="flex items-center gap-1 text-sm"
                                            style={{ color: '#9ca3af' }}>
                                            <MapPin className="w-3 h-3" />
                                            <span>{job.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Job Title */}
                                <h2 className="text-xl font-bold mb-2" style={{ color: '#1f2937' }}>
                                    {job.title}
                                </h2>
                                <p className="text-sm mb-4 line-clamp-2" style={{ color: '#6b7280' }}>
                                    {job.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="text-xs font-medium px-3 py-1 rounded-full"
                                        style={{ backgroundColor: '#eef2ff', color: '#6366f1' }}>
                                        {job.jobType}
                                    </span>
                                    <span className="text-xs font-medium px-3 py-1 rounded-full"
                                        style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
                                        {job.salary} LPA
                                    </span>
                                    <span className="text-xs font-medium px-3 py-1 rounded-full"
                                        style={{ backgroundColor: '#fff7ed', color: '#f97316' }}>
                                        {job.experienceLevel} yr exp
                                    </span>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4"
                                    style={{ borderTop: '1px solid #f3f4f6' }}>
                                    <div className="flex items-center gap-1 text-sm"
                                        style={{ color: '#9ca3af' }}>
                                        <Clock className="w-3 h-3" />
                                        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/jobs/${job._id}`)}
                                        className="rounded-full px-4 py-1.5 text-sm text-white font-medium transition-all hover:shadow-md"
                                        style={{ backgroundColor: '#6366f1' }}>
                                        View Details →
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

export default Jobs
