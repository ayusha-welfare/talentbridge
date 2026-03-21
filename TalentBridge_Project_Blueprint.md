# 🌉 TalentBridge — Complete Project Blueprint
### IGNOU BCA 6th Semester Project | Ayusha Sharma
### Guide: Mr. Dileep Kumar Sahu | Session: Oct–Dec 2025

---

## 📌 PROJECT OVERVIEW

| Field | Details |
|---|---|
| **Project Name** | TalentBridge |
| **Tagline** | Bridging the Gap Between Talent and Opportunity |
| **Type** | Full-Stack Web Application (Job Portal) |
| **Inspired By** | Naukri.com |
| **Tech Stack** | MERN (MongoDB, Express.js, React.js, Node.js) |
| **Student** | Ayusha Sharma |
| **Enrollment No** | _(your IGNOU enrollment number)_ |
| **Guide** | Mr. Dileep Kumar Sahu |
| **Programme** | BCA — Bachelor of Computer Applications |
| **Study Centre** | _(your study centre name & code)_ |

---

## 🗂️ FOLDER STRUCTURE

```
TalentBridge/
│
├── backend/                  ← Node.js + Express Server
│   ├── controllers/          ← Business logic
│   │   ├── user.controller.js
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   └── application.controller.js
│   ├── models/               ← MongoDB Schemas
│   │   ├── user.model.js
│   │   ├── company.model.js
│   │   ├── job.model.js
│   │   └── application.model.js
│   ├── routes/               ← API Endpoints
│   │   ├── user.route.js
│   │   ├── company.route.js
│   │   ├── job.route.js
│   │   └── application.route.js
│   ├── middlewares/
│   │   ├── isAuthenticated.js  ← JWT verification
│   │   └── multer.js           ← File upload handler
│   ├── utils/
│   │   ├── cloudinary.js       ← Cloudinary config
│   │   └── datauri.js          ← File to URI converter
│   ├── .env                    ← Secret keys (NEVER share this)
│   ├── index.js                ← Entry point
│   └── package.json
│
├── frontend/                 ← React + Vite Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── recruiter/
│   │   │   │   ├── Companies.jsx
│   │   │   │   ├── CompanyCreate.jsx
│   │   │   │   ├── PostJob.jsx
│   │   │   │   └── Applicants.jsx
│   │   │   ├── student/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Jobs.jsx
│   │   │   │   ├── JobDescription.jsx
│   │   │   │   └── AppliedJobs.jsx
│   │   │   └── shared/
│   │   │       ├── Navbar.jsx
│   │   │       └── Footer.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   ├── authSlice.js
│   │   │   └── jobSlice.js
│   │   ├── hooks/
│   │   │   ├── useGetAllJobs.jsx
│   │   │   └── useGetAppliedJobs.jsx
│   │   ├── utils/
│   │   │   └── constant.js     ← API base URLs
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## 🔌 ALL API ENDPOINTS

### 👤 User Routes (`/api/v1/user`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Public | Register as Student or Recruiter |
| POST | `/login` | Public | Login and get JWT cookie |
| GET | `/logout` | Auth | Clear session cookie |
| POST | `/profile/update` | Auth | Update profile, photo, resume |

---

## 🔐 ROLE-BASED AUTHENTICATION FLOW

TalentBridge uses a **single login system** but with **two distinct roles**. Both Students and Recruiters (Job Providers) use the same `/register` and `/login` endpoints — but the system behaves differently based on their role.

### 👨‍🎓 Student Authentication
| Step | What Happens |
|------|-------------|
| Register | Selects role = `"student"`, fills name/email/phone/password |
| Login | JWT generated → stored in HTTP-Only Cookie |
| Access | Can browse jobs, apply, track application status |
| Blocked From | `/admin/*` routes — redirected back if they try |

### 🏢 Recruiter (Job Provider) Authentication
| Step | What Happens |
|------|-------------|
| Register | Selects role = `"recruiter"`, fills name/email/phone/password |
| Login | JWT generated → stored in HTTP-Only Cookie (same as student) |
| Access | Can register companies, post jobs, view & manage applicants |
| Blocked From | Student-only routes like `/apply/:id` |

### 🔒 How Role Protection Works (Backend)

```js
// isAuthenticated.js — verifies JWT from cookie
// isRecruiter.js — checks role === "recruiter" before allowing access

// Example: Only recruiters can post a job
router.post("/post", isAuthenticated, isRecruiter, postJob);

// Example: Only students can apply
router.get("/apply/:id", isAuthenticated, isStudent, applyJob);
```

### 🔒 How Role Protection Works (Frontend)

```js
// ProtectedRoute component checks Redux store
// If user.role !== "recruiter" → redirect to home
// If user.role !== "student" → redirect to recruiter dashboard
// If not logged in at all → redirect to /login
```

### ✅ Add these 2 extra middleware files to your backend:

**`backend/middlewares/isRecruiter.js`**
```js
const isRecruiter = (req, res, next) => {
  if (req.id && req.role === "recruiter") return next();
  return res.status(403).json({ message: "Access denied. Recruiters only.", success: false });
};
```

**`backend/middlewares/isStudent.js`**
```js
const isStudent = (req, res, next) => {
  if (req.id && req.role === "student") return next();
  return res.status(403).json({ message: "Access denied. Students only.", success: false });
};
```

> 💡 **Key Point for Report:** Both roles share ONE User collection in MongoDB. The `role` field (enum) is what separates their permissions. This is called **Role-Based Access Control (RBAC)** — an important concept to mention in your project report.

---

### 🏢 Company Routes (`/api/v1/company`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Recruiter | Register a new company |
| GET | `/get` | Recruiter | Get all companies by recruiter |
| GET | `/get/:id` | Recruiter | Get single company |
| PUT | `/update/:id` | Recruiter | Update company info/logo |

### 💼 Job Routes (`/api/v1/job`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/post` | Recruiter | Post a new job |
| GET | `/get` | Student | Get all jobs (with filters) |
| GET | `/getadminjobs` | Recruiter | Get recruiter's posted jobs |
| GET | `/get/:id` | Student | Get single job details |

### 📋 Application Routes (`/api/v1/application`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/apply/:id` | Student | Apply to a job |
| GET | `/get` | Student | Get all applied jobs |
| GET | `/:id/applicants` | Recruiter | Get applicants for a job |
| POST | `/status/:id/update` | Recruiter | Update application status |

---

## 🗃️ DATABASE SCHEMAS

### User Schema
```js
{
  fullname: String (required),
  email:    String (required, unique),
  phoneNumber: Number (required),
  password: String (required, hashed),
  role:     Enum ['student', 'recruiter'] (required),
  profile: {
    bio:          String,
    skills:       [String],
    resume:       String,   // Cloudinary URL
    resumeOriginalName: String,
    company:      ObjectId → Company,
    profilePhoto: String    // Cloudinary URL
  }
}
```

### Company Schema
```js
{
  name:        String (required, unique),
  description: String,
  website:     String,
  location:    String,
  logo:        String,  // Cloudinary URL
  userId:      ObjectId → User (required)
}
```

### Job Schema
```js
{
  title:           String (required),
  description:     String (required),
  requirements:    [String],
  salary:          Number (required),
  experienceLevel: Number (required),
  location:        String (required),
  jobType:         String (required),
  position:        Number (required),
  company:         ObjectId → Company (required),
  created_by:      ObjectId → User (required),
  applications:    [ObjectId → Application]
}
```

### Application Schema
```js
{
  job:       ObjectId → Job (required),
  applicant: ObjectId → User (required),
  status:    Enum ['pending', 'accepted', 'rejected'] (default: 'pending')
}
```

---

## 🔐 ENVIRONMENT VARIABLES (backend/.env)

```env
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/talentbridge
SECRET_KEY=your_super_secret_jwt_key_here

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

---

## 🚀 DEPLOYMENT PLAN (All Free)

| Part | Platform | Free Tier | Steps |
|------|----------|-----------|-------|
| **Database** | MongoDB Atlas | 512MB forever free | Already set up |
| **Media Storage** | Cloudinary | 25 credits/month | Already set up |
| **Backend** | Render.com | 750 hrs/month free | Connect GitHub repo |
| **Frontend** | Vercel.com | Unlimited free | Connect GitHub repo |

---

## 📅 DEVELOPMENT ROADMAP

### Week 1 — Backend
- [ ] Day 1: Project setup, install packages, connect MongoDB
- [ ] Day 2: User model + Register/Login API
- [ ] Day 3: Company model + CRUD APIs
- [ ] Day 4: Job model + Post/Get APIs
- [ ] Day 5: Application model + Apply/Status APIs
- [ ] Day 6–7: Test all APIs using Postman

### Week 2 — Frontend
- [ ] Day 1: Vite + React setup, Tailwind + Shadcn install
- [ ] Day 2: Navbar, Login, Signup pages
- [ ] Day 3: Home page + Job listing page
- [ ] Day 4: Job details + Apply button
- [ ] Day 5: Student dashboard (Applied Jobs)
- [ ] Day 6: Recruiter dashboard (Post Job, View Applicants)
- [ ] Day 7: Redux setup, connect frontend to backend

### Week 3 — Polish & Deploy
- [ ] Day 1–2: Bug fixes, UI improvements
- [ ] Day 3: Deploy backend to Render
- [ ] Day 4: Deploy frontend to Vercel
- [ ] Day 5–7: Take screenshots for project report

---

## 📸 SCREENSHOTS NEEDED FOR REPORT
_(Take these once your project is live)_

1. Home Page (Student view)
2. Register Page
3. Login Page
4. Job Listing Page with filter
5. Job Description Page
6. Student — Applied Jobs Dashboard
7. Recruiter — Post a Job form
8. Recruiter — View Applicants table
9. Recruiter — Update Application Status
10. Company Registration Page
11. MongoDB Atlas — showing collections
12. Cloudinary — showing uploaded files

---

## 📦 NPM PACKAGES TO INSTALL

### Backend
```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken cookie-parser cors multer cloudinary datauri
npm install -D nodemon
```

### Frontend
```bash
npm install axios react-router-dom @reduxjs/toolkit react-redux
npx shadcn-ui@latest init
npm install lucide-react sonner
```

---

# 🤖 AI AGENT PROMPTS
## (Use these with Claude Sonnet 4.6 or Gemini)

---

### 🟦 MASTER CONTEXT PROMPT
> **Paste this at the START of every new chat session with any AI**

```
You are helping me build "TalentBridge" — a full-stack MERN job portal 
for my IGNOU BCA 6th semester project.

PROJECT DETAILS:
- Stack: MongoDB, Express.js, React.js, Node.js
- Auth: JWT stored in HTTP-Only cookies
- File Storage: Cloudinary (for profile photos and PDF resumes)
- State Management: Redux Toolkit
- UI: Tailwind CSS + Shadcn UI components
- I am a beginner — explain every step clearly
- OS: Windows 11

FOLDER STRUCTURE:
- /backend — Node/Express server
- /frontend — React/Vite app

Always give me:
1. The exact file to create/edit
2. The complete code (no partial snippets)
3. What command to run in terminal
4. What result to expect

Current task: [DESCRIBE WHAT YOU WANT TO BUILD]
```

---

### 🟩 PROMPT 1 — Backend Initial Setup
```
Using the master context above, help me set up the backend from scratch.

Tasks:
1. Create folder called "backend" 
2. Initialize npm (package.json)
3. Install all required packages: express, mongoose, dotenv, bcryptjs, 
   jsonwebtoken, cookie-parser, cors, multer, cloudinary, datauri, nodemon
4. Create index.js with Express server running on port 8000
5. Connect to MongoDB Atlas using MONGO_URI from .env
6. Set up CORS to allow requests from http://localhost:5173
7. Create the .env file template with all required variables

Give me every file completely. Tell me what to type in terminal step by step.
```

---

### 🟩 PROMPT 2 — User Model + Auth APIs
```
Using the master context, now help me build the User Authentication module.

Create these files completely:
1. backend/models/user.model.js — Mongoose schema with fields:
   fullname, email, phoneNumber, password, role (student/recruiter), 
   profile object (bio, skills array, resume URL, profilePhoto URL)

2. backend/controllers/user.controller.js — with functions:
   - register: hash password with bcrypt, save user, return success
   - login: compare password, generate JWT, set HTTP-only cookie
   - logout: clear cookie
   - updateProfile: update bio/skills, handle file upload to Cloudinary

3. backend/middlewares/isAuthenticated.js — verify JWT from cookie,
   also attach req.id and req.role from the decoded token

4. backend/middlewares/isRecruiter.js — check req.role === "recruiter",
   return 403 if not

5. backend/middlewares/isStudent.js — check req.role === "student",
   return 403 if not

6. backend/routes/user.route.js — connect routes to controllers

5. Update index.js to use the user routes

Test: show me what to type in Postman to test register and login.
```

---

### 🟩 PROMPT 3 — Company Module
```
Using the master context, build the Company module.

Create these files:
1. backend/models/company.model.js
   Fields: name (unique), description, website, location, logo (URL), 
   userId (ref to User)

2. backend/controllers/company.controller.js with:
   - registerCompany: check unique name, save to DB
   - getCompany: return all companies belonging to logged-in recruiter
   - getCompanyById: return single company
   - updateCompany: update fields + upload new logo to Cloudinary

3. backend/routes/company.route.js — all routes protected by isAuthenticated

Give complete code for all files.
```

---

### 🟩 PROMPT 4 — Job Module
```
Using the master context, build the Job Posting module.

Create:
1. backend/models/job.model.js
   Fields: title, description, requirements (array), salary, 
   experienceLevel, location, jobType, position, company (ref), 
   created_by (ref to User), applications (array of refs)

2. backend/controllers/job.controller.js with:
   - postJob: recruiter only, create job linked to company
   - getAllJobs: for students — filter by keyword using $regex on title/description
   - getJobById: return single job with company details (use .populate())
   - getAdminJobs: return jobs posted by the logged-in recruiter

3. backend/routes/job.route.js

Give complete code.
```

---

### 🟩 PROMPT 5 — Application Module
```
Using the master context, build the Application Tracking module.

Create:
1. backend/models/application.model.js
   Fields: job (ref), applicant (ref to User), 
   status (enum: pending/accepted/rejected, default: pending)

2. backend/controllers/application.controller.js with:
   - applyJob: check for duplicate application first, create record, 
     push application ID into Job's applications array
   - getAppliedJobs: return all jobs a student has applied to
   - getApplicants: for recruiter — get all applicants for a specific job
   - updateStatus: recruiter updates status (accepted/rejected)

3. backend/routes/application.route.js

Give complete code.
```

---

### 🟩 PROMPT 6 — React Frontend Setup
```
Using the master context, set up the React frontend.

Tasks:
1. Create Vite + React app inside /frontend folder
   Command: npm create vite@latest frontend -- --template react

2. Install packages:
   npm install axios react-router-dom @reduxjs/toolkit react-redux lucide-react

3. Set up Tailwind CSS (v3) — give exact commands for Windows

4. Initialize Shadcn UI — give exact commands

5. Create frontend/src/utils/constant.js with:
   export const USER_API_END_POINT = "http://localhost:8000/api/v1/user"
   export const JOB_API_END_POINT = "http://localhost:8000/api/v1/job"
   export const COMPANY_API_END_POINT = "http://localhost:8000/api/v1/company"
   export const APPLICATION_API_END_POINT = "http://localhost:8000/api/v1/application"

6. Set up React Router in App.jsx with routes for:
   /, /login, /signup, /jobs, /jobs/:id, /profile,
   /admin/companies, /admin/jobs, /admin/jobs/create

Give me every command and every file.
```

---

### 🟩 PROMPT 7 — Login & Signup Pages
```
Using the master context, build the Login and Signup UI pages.

Create:
1. frontend/src/components/auth/Login.jsx
   - Email + Password fields using Shadcn Input and Button
   - Role selector: Student or Recruiter (radio buttons)
   - On submit: POST to USER_API_END_POINT/login using axios
   - Store user in Redux after login
   - Redirect student to / and recruiter to /admin/companies

2. frontend/src/components/auth/Signup.jsx
   - Fields: Full Name, Email, Phone Number, Password, Role selector
   - Profile photo upload (file input)
   - On submit: POST to USER_API_END_POINT/register
   - Redirect to /login on success

3. frontend/src/redux/store.js — Redux store setup
4. frontend/src/redux/authSlice.js — store user, loading state

Use Tailwind CSS for styling. Make it clean and modern.
Give complete code for all files.
```

---

### 🟩 PROMPT 8 — Student Pages
```
Using the master context, build all Student-facing pages.

Create:
1. Home.jsx — Hero section + latest 6 jobs displayed as cards
2. Jobs.jsx — All jobs with keyword search filter
3. JobDescription.jsx — Full job details + Apply button
   (disable button if already applied, show "Already Applied")
4. AppliedJobs.jsx — Table showing: Company | Role | Date | Status
   Status badge: green=Accepted, red=Rejected, yellow=Pending

For each page, connect to the backend APIs using axios.
Use Tailwind + Shadcn components (Card, Badge, Button, Input).
Give complete code.
```

---

### 🟩 PROMPT 9 — Recruiter Dashboard Pages
```
Using the master context, build all Recruiter-facing pages.

Create:
1. Companies.jsx — Table of recruiter's companies + "New Company" button
2. CompanyCreate.jsx — Form to register a new company with logo upload
3. PostJob.jsx — Form to post a job (select from registered companies)
4. AdminJobs.jsx — Table of recruiter's posted jobs
5. Applicants.jsx — Table of applicants for a job showing:
   Name | Email | Resume (link) | Date | Status dropdown
   Dropdown: Accepted / Rejected — calls update status API

Protect all these routes (redirect to login if not authenticated recruiter).
Give complete code.
```

---

### 🟩 PROMPT 10 — Deploy to Render + Vercel
```
Using the master context, help me deploy TalentBridge for free.

BACKEND on Render.com:
1. What changes do I make to index.js for production?
2. How do I add environment variables on Render?
3. What is the Build Command and Start Command to enter on Render?
4. How do I get the live backend URL?

FRONTEND on Vercel.com:
1. How do I update constant.js to use the live Render backend URL?
2. How do I deploy to Vercel from GitHub?
3. What environment variables does Vercel need?

Walk me through every step like I'm a complete beginner.
Give me a final checklist to verify everything works after deployment.
```

---

### 🟨 DEBUGGING PROMPT (Use when something breaks)
```
I am building TalentBridge — a MERN stack job portal for my IGNOU project.

I have this error:
[PASTE YOUR ERROR MESSAGE HERE]

It happened when I:
[DESCRIBE WHAT YOU WERE DOING]

Here is the relevant code:
[PASTE THE FILE THAT HAS THE ISSUE]

Please:
1. Explain what caused the error in simple terms
2. Show me exactly what to change (show before and after)
3. Tell me if I need to run any commands
```

---

### 🟨 CODE EXPLANATION PROMPT (Use when you don't understand something)
```
I am a BCA student building my first MERN project. 
Please explain this code to me in very simple Hindi-English (Hinglish) 
as if I am a complete beginner:

[PASTE THE CODE HERE]

Tell me:
1. What each line does
2. Why we need this
3. Any important concept I should understand
```

---

## 💡 TIPS FOR USING AI EFFECTIVELY

1. **Always paste the Master Context** at the start of a new chat
2. **One prompt at a time** — don't ask for everything together
3. **If code doesn't work**, use the Debugging Prompt immediately
4. **Save every working file** to GitHub before moving to next step
5. **Test each API in Postman** before building the frontend for it
6. **Take screenshots as you go** — you'll need them for the report

---

## 📝 PROJECT REPORT CHAPTERS (Will be written after project is built)

1. Introduction & Objectives
2. System Analysis (Feasibility Study, Existing System, Proposed System)
3. System Design (ERD, DFD Level 0/1/2, Schema Design)
4. System Development (Module-wise code explanation)
5. System Testing (Test cases with screenshots)
6. Conclusion & Future Scope
7. Bibliography
8. Appendix (Source Code)

---

*Blueprint prepared by Claude (Anthropic) for Ayusha Sharma's IGNOU BCA Project*
*Model used: Claude Sonnet 4.6*
