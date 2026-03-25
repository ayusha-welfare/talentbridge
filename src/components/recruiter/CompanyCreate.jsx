import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'
import { Building2 } from 'lucide-react'

const CompanyCreate = () => {
    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        file: null
    })
    const [loading, setLoading] = useState(false)
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
        formData.append('name', input.name)
        formData.append('description', input.description)
        formData.append('website', input.website)
        formData.append('location', input.location)
        if (input.file) {
            formData.append('file', input.file)
        }

        try {
            setLoading(true)
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            )
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin/companies')
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

            <div className="max-w-2xl mx-auto px-4 py-10">

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: '#eef2ff' }}>
                        <Building2 className="w-6 h-6" style={{ color: '#6366f1' }} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold" style={{ color: '#1f2937' }}>
                            Register Company
                        </h1>
                        <p className="text-sm" style={{ color: '#6b7280' }}>
                            Add your company to start posting jobs
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm"
                    style={{ border: '1px solid #e5e7eb' }}>
                    <form onSubmit={submitHandler} className="space-y-5">

                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1"
                                style={{ color: '#374151' }}>
                                Company Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                placeholder="e.g. Google, Microsoft"
                                className="w-full px-4 py-3 rounded-lg outline-none transition"
                                style={{ border: '2px solid #e5e7eb' }}
                                onFocus={e => e.target.style.borderColor = '#6366f1'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium mb-1"
                                style={{ color: '#374151' }}>
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Brief description about your company"
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg outline-none transition resize-none"
                                style={{ border: '2px solid #e5e7eb' }}
                                onFocus={e => e.target.style.borderColor = '#6366f1'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        {/* Website */}
                        <div>
                            <label className="block text-sm font-medium mb-1"
                                style={{ color: '#374151' }}>
                                Website
                            </label>
                            <input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                placeholder="https://yourcompany.com"
                                className="w-full px-4 py-3 rounded-lg outline-none transition"
                                style={{ border: '2px solid #e5e7eb' }}
                                onFocus={e => e.target.style.borderColor = '#6366f1'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium mb-1"
                                style={{ color: '#374151' }}>
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="e.g. Mumbai, Bangalore"
                                className="w-full px-4 py-3 rounded-lg outline-none transition"
                                style={{ border: '2px solid #e5e7eb' }}
                                onFocus={e => e.target.style.borderColor = '#6366f1'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        {/* Logo */}
                        <div>
                            <label className="block text-sm font-medium mb-1"
                                style={{ color: '#374151' }}>
                                Company Logo
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="w-full px-4 py-3 rounded-lg outline-none transition"
                                style={{ border: '2px solid #e5e7eb', color: '#6b7280' }}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/companies')}
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
                                {loading ? 'Registering...' : 'Register Company'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate