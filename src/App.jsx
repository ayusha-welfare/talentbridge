import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/student/Home'
import Jobs from './components/student/Jobs'
import JobDescription from './components/student/JobDescription'
import AppliedJobs from './components/student/AppliedJobs'
import Profile from './components/student/Profile'
import Companies from './components/recruiter/Companies'
import CompanyCreate from './components/recruiter/CompanyCreate'
import PostJob from './components/recruiter/PostJob'
import AdminJobs from './components/recruiter/AdminJobs'
import Applicants from './components/recruiter/Applicants'
import AdminDashboard from './components/admin/AdminDashboard'
import Navbar from './components/shared/Navbar'
import { Clock } from 'lucide-react'

// Pending Approval Page
const PendingApproval = () => (
  <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
    <Navbar />
    <div className="flex items-center justify-center py-20">
      <div className="bg-white rounded-2xl p-10 shadow-sm text-center max-w-md"
        style={{ border: '1px solid #e5e7eb' }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: '#fff7ed' }}>
          <Clock className="w-8 h-8" style={{ color: '#f97316' }} />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#1f2937' }}>
          Pending Admin Approval
        </h2>
        <p style={{ color: '#6b7280' }}>
          Your recruiter account is under review.
          Please wait for admin approval before posting jobs.
        </p>
        <p className="mt-4 text-sm font-medium" style={{ color: '#f97316' }}>
          We'll notify you once approved! ✅
        </p>
      </div>
    </div>
  </div>
)

// Protected Route for Recruiters
const RecruiterRoute = ({ children }) => {
  const { user } = useSelector(store => store.auth)
  if (!user) return <Navigate to="/login" />
  if (user.role !== 'recruiter') return <Navigate to="/" />
  if (!user.isApproved) return <PendingApproval />
  return children
}

// Protected Route for Admin
const AdminRoute = ({ children }) => {
  const { user } = useSelector(store => store.auth)
  if (!user) return <Navigate to="/login" />
  if (user.role !== 'admin') return <Navigate to="/" />
  return children
}

// Protected Route for logged in users
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector(store => store.auth)
  if (!user) return <Navigate to="/login" />
  return children
}

const appRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/jobs', element: <Jobs /> },
  { path: '/jobs/:id', element: <JobDescription /> },
  { path: '/applied-jobs', element: <AppliedJobs /> },
  {
    path: '/profile',
    element: <ProtectedRoute><Profile /></ProtectedRoute>
  },
  {
    path: '/admin/companies',
    element: <RecruiterRoute><Companies /></RecruiterRoute>
  },
  {
    path: '/admin/companies/create',
    element: <RecruiterRoute><CompanyCreate /></RecruiterRoute>
  },
  {
    path: '/admin/jobs',
    element: <RecruiterRoute><AdminJobs /></RecruiterRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <RecruiterRoute><PostJob /></RecruiterRoute>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <RecruiterRoute><Applicants /></RecruiterRoute>
  },
  {
    path: '/admin/dashboard',
    element: <AdminRoute><AdminDashboard /></AdminRoute>
  },
])

function App() {
  return <RouterProvider router={appRouter} />
}

export default App