import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '../../redux/jobSlice'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Search, Briefcase, Building2, Users } from 'lucide-react'

const Home = () => {
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate('/jobs')
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            <Navbar />

            {/* Hero Section */}
            <section style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #fff7ed 100%)' }}>
                <div className="max-w-7xl mx-auto px-4 py-24 text-center">

                    <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
                        style={{ backgroundColor: '#eef2ff', color: '#6366f1' }}>
                        ✨ #1 Job Portal for Students
                    </span>

                    <h1 className="text-5xl font-bold leading-tight mb-6"
                        style={{ color: '#1f2937' }}>
                        Bridging the Gap Between <br />
                        <span style={{ color: '#6366f1' }}>Talent</span>
                        <span style={{ color: '#f97316' }}> & Opportunity</span>
                    </h1>

                    <p className="text-lg max-w-2xl mx-auto mb-10"
                        style={{ color: '#6b7280' }}>
                        Connect with top recruiters, apply to your dream jobs,
                        and track your applications — all in one place!
                    </p>

                    {/* Search Bar */}
                    <div className="flex items-center max-w-xl mx-auto bg-white rounded-full px-4 py-2 shadow-md"
                        style={{ border: '2px solid #e5e7eb' }}>
                        <Search className="w-5 h-5 mr-3" style={{ color: '#6366f1' }} />
                        <input
                            type="text"
                            placeholder="Search jobs, companies, skills..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                            className="flex-1 outline-none bg-transparent"
                            style={{ color: '#374151' }}
                        />
                        <button
                            onClick={searchJobHandler}
                            className="rounded-full px-6 py-2 text-white font-semibold transition-all"
                            style={{ backgroundColor: '#6366f1' }}>
                            Search
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-3 gap-8 text-center">
                        <div className="bg-white rounded-2xl p-8 shadow-sm"
                            style={{ border: '1px solid #e5e7eb' }}>
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                style={{ backgroundColor: '#eef2ff' }}>
                                <Briefcase className="w-7 h-7" style={{ color: '#6366f1' }} />
                            </div>
                            <h3 className="text-4xl font-bold mb-2" style={{ color: '#6366f1' }}>500+</h3>
                            <p className="font-medium" style={{ color: '#6b7280' }}>Jobs Available</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-sm"
                            style={{ border: '1px solid #e5e7eb' }}>
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                style={{ backgroundColor: '#fff7ed' }}>
                                <Building2 className="w-7 h-7" style={{ color: '#f97316' }} />
                            </div>
                            <h3 className="text-4xl font-bold mb-2" style={{ color: '#f97316' }}>200+</h3>
                            <p className="font-medium" style={{ color: '#6b7280' }}>Companies</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-sm"
                            style={{ border: '1px solid #e5e7eb' }}>
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                style={{ backgroundColor: '#ecfdf5' }}>
                                <Users className="w-7 h-7" style={{ color: '#10b981' }} />
                            </div>
                            <h3 className="text-4xl font-bold mb-2" style={{ color: '#10b981' }}>1000+</h3>
                            <p className="font-medium" style={{ color: '#6b7280' }}>Students Placed</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4"
                        style={{ color: '#1f2937' }}>
                        How It Works
                    </h2>
                    <p className="text-center mb-12" style={{ color: '#6b7280' }}>
                        Get started in just 3 simple steps
                    </p>
                    <div className="grid grid-cols-3 gap-8">
                        {[
                            { step: '1', title: 'Create Account', desc: 'Sign up as a Student or Recruiter in just a few seconds', color: '#6366f1', bg: '#eef2ff' },
                            { step: '2', title: 'Find Jobs', desc: 'Browse hundreds of jobs and filter by your skills and location', color: '#f97316', bg: '#fff7ed' },
                            { step: '3', title: 'Get Hired', desc: 'Apply with one click and track your application status live', color: '#10b981', bg: '#ecfdf5' },
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                    style={{ backgroundColor: item.bg }}>
                                    <span className="text-2xl font-bold" style={{ color: item.color }}>
                                        {item.step}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2" style={{ color: '#1f2937' }}>
                                    {item.title}
                                </h3>
                                <p style={{ color: '#6b7280' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}>
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Find Your Dream Job?
                    </h2>
                    <p className="text-indigo-200 mb-8">
                        Join thousands of students already using TalentBridge
                    </p>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
                        style={{ backgroundColor: '#f97316', color: 'white' }}>
                        Get Started Free →
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8" style={{ backgroundColor: '#1f2937' }}>
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-xl font-bold mb-2 text-white">
                        Talent<span style={{ color: '#6366f1' }}>Bridge</span>
                    </h2>
                    <p className="text-sm" style={{ color: '#9ca3af' }}>
                        © 2025 TalentBridge. IGNOU BCA Project by Ayusha Sharma
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Home