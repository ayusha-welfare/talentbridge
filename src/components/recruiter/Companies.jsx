import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import Navbar from '../shared/Navbar'
import { Building2, Plus } from 'lucide-react'

const Companies = () => {
    const [companies, setCompanies] = useState([])
    const navigate = useNavigate()

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

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold" style={{ color: '#1f2937' }}>
                            My Companies
                        </h1>
                        <p className="mt-1" style={{ color: '#6b7280' }}>
                            Manage your registered companies
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/admin/companies/create')}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-medium transition-all hover:shadow-md"
                        style={{ backgroundColor: '#6366f1' }}>
                        <Plus className="w-4 h-4" />
                        New Company
                    </button>
                </div>

                {companies.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm"
                        style={{ border: '1px solid #e5e7eb' }}>
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: '#eef2ff' }}>
                            <Building2 className="w-8 h-8" style={{ color: '#6366f1' }} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2" style={{ color: '#6b7280' }}>
                            No companies yet
                        </h3>
                        <p className="mb-6" style={{ color: '#9ca3af' }}>
                            Register your first company to start posting jobs
                        </p>
                        <button
                            onClick={() => navigate('/admin/companies/create')}
                            className="px-6 py-2.5 rounded-full text-white font-medium"
                            style={{ backgroundColor: '#6366f1' }}>
                            Register Company
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {companies.map((company) => (
                            <div key={company._id}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                                style={{ border: '1px solid #e5e7eb' }}>
                                <div className="flex items-center gap-4">
                                    {company.logo ? (
                                        <img
                                            src={company.logo}
                                            alt={company.name}
                                            className="w-14 h-14 rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: '#eef2ff' }}>
                                            <span className="font-bold text-xl" style={{ color: '#6366f1' }}>
                                                {company.name?.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-lg font-bold" style={{ color: '#1f2937' }}>
                                            {company.name}
                                        </h3>
                                        <p className="text-sm" style={{ color: '#6b7280' }}>
                                            {company.location || 'Location not set'}
                                        </p>
                                    </div>
                                </div>
                                {company.description && (
                                    <p className="text-sm mt-4 line-clamp-2" style={{ color: '#6b7280' }}>
                                        {company.description}
                                    </p>
                                )}
                                <div className="mt-4 pt-4 flex items-center justify-between"
                                    style={{ borderTop: '1px solid #f3f4f6' }}>
                                    <p className="text-xs" style={{ color: '#9ca3af' }}>
                                        Registered {new Date(company.createdAt).toLocaleDateString()}
                                    </p>
                                    <button
                                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                                        className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                                        style={{
                                            border: '2px solid #6366f1',
                                            color: '#6366f1',
                                            backgroundColor: 'white'
                                        }}>
                                        Edit
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

export default Companies