import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/student/Home'
import Jobs from './components/student/Jobs'
import JobDescription from './components/student/JobDescription'
import AppliedJobs from './components/student/AppliedJobs'
import Companies from './components/recruiter/Companies'
import CompanyCreate from './components/recruiter/CompanyCreate'
import PostJob from './components/recruiter/PostJob'
import AdminJobs from './components/recruiter/AdminJobs'
import Applicants from './components/recruiter/Applicants'
import AdminDashboard from './components/admin/AdminDashboard'

const appRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/jobs', element: <Jobs /> },
  { path: '/jobs/:id', element: <JobDescription /> },
  { path: '/applied-jobs', element: <AppliedJobs /> },
  { path: '/admin/companies', element: <Companies /> },
  { path: '/admin/companies/create', element: <CompanyCreate /> },
  { path: '/admin/jobs', element: <AdminJobs /> },
  { path: '/admin/jobs/create', element: <PostJob /> },
  { path: '/admin/jobs/:id/applicants', element: <Applicants /> },
  { path: '/admin/dashboard', element: <AdminDashboard /> },
])

function App() {
  return <RouterProvider router={appRouter} />
}

export default App