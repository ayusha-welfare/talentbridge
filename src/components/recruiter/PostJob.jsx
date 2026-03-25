import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { JOB_API_END_POINT, COMPANY_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'
import { Briefcase } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        experienceLevel: '',
        location: '',
        jobType: '',
        position: '',
        companyId: ''
    })
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fetchCompanies = async () => {
        try {
            const res = await axios.get(
                `${COMPANY_API_END_POINT}/get`,
                { withCredentials: true }
            )
            if (res.data.success) {
                setCompanies(res.data.companies)
            }
        } catch (error) {
            toast.error('Failed to fetch companies')
        }
    }

    useEffect(() => {
        fetchCompanies()
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(
                `${JOB_API_END_POINT}/post`,
                input,
                { withCredentials: true }
            )
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin/jobs')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    const inputStyle = {
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        padding: '12px 16px',
        width: '100%',
        outline: 'none',
        color: '#374151',
        backgroundColor: 'white'
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            <Navbar />

            <div className="max-w-2xl mx-auto px-4 py-10">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: '#eef2ff' }}>
                        <Briefcase className="w-6 h-6" style={{ color: '#6366f1' }} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold" style={{ color: '#1f2937' }}>
                            Post a New Job
                        </h1>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                            Fill in the details to post a job vacancy
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm"
                    style={{ border: '1px solid #e5e7eb' }}>
                    <form onSubmit={submitHandler} className="space-y-5">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-1"
                                style={{ color: '#374151' }}>
                                Job Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                placeholder="e.g. Frontend Developer"
                                style={inputStyle}
                                onFocus={e => e.target.style.borderColor = '#6366f1'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium mb-1"
                                style={{ color: '#374151' }}>
                                Job Description *
                            </label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Describe the role and responsibilities"
                                rows={4}
                                style={{ ...inputStyle, resize: 'none' }}
                                onFocus={e => e.target.style.borderColor = '#6366f1'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        {/* Requirements */}
                        <div>
                            <label className="block text-sm font-medium mb-1"
                                style={{ color: '#374151' }}>
                                Requirements
                            </label>
                            <input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                placeholder="React, Node.js, MongoDB (comma separated)"
                                style={inputStyle}
                                onFocus={e => e.target.style.borderColor = '#6366f1'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        {/* Salary and Experience */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1"
                                    style={{ color: '#374151' }}>
                                    Salary (LPA) *
                                </label>
                                <input
                                    type="number"
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. 12"
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1"
                                    style={{ color: '#374151' }}>
                                    Experience (Years) *
                                </label>
                                <input
                                    type="number"
                                    name="experienceLevel"
                                    value={input.experienceLevel}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. 1"
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                                />
                            </div>
                        </div>

                        {/* Location and Job Type */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1"
                                    style={{ color: '#374151' }}>
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Indore, Remote"
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1"
                                    style={{ color: '#374151' }}>
                                    Job Type *
                                </label>
                                <select
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    style={inputStyle}>
                                    <option value="">Select type</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            </div>
                        </div>

                        {/* Positions */}
                        <div>
                            <label className="block text-sm font-medium mb-1"
                                style={{ color: '#374151' }}>
                                Number of Positions *
                            </label>
                            <input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                placeholder="e.g. 2"
                                style={inputStyle}
                                onFocus={e => e.target.style.borderColor = '#6366f1'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        {/* Company */}
                        <div>
                            <label className="block text-sm font-medium mb-1"
                                style={{ color: '#374151' }}>
                                Select Company *
                            </label>
                            {companies.length === 0 ? (
                                <div className="px-4 py-3 rounded-lg"
                                    style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}>
                                    <p className="text-sm" style={{ color: '#92400e' }}>
                                        No companies registered yet.{' '}
                                        <span
                                            onClick={() => navigate('/admin/companies/create')}
                                            className="font-medium underline cursor-pointer">
                                            Register a company first
                                        </span>
                                    </p>
                                </div>
                            ) : (
                                <select
                                    name="companyId"
                                    value={input.companyId}
                                    onChange={changeEventHandler}
                                    style={inputStyle}>
                                    <option value="">Select a company</option>
                                    {companies.map((company) => (
                                        <option key={company._id} value={company._id}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/jobs')}
                                className="flex-1 py-3 rounded-full font-medium transition-all"
                                style={{
                                    border: '2px solid #e5e7eb',
                                    color: '#374151',
                                    backgroundColor: 'white'
                                }}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3 rounded-full font-medium text-white transition-all hover:shadow-md"
                                style={{ backgroundColor: '#6366f1' }}>
                                {loading ? 'Posting...' : 'Post Job'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob