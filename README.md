# ÌæØ JobPilot - Job Application Tracker (Mini CRM)

A full-stack MERN application to help users track their job applications efficiently with real-time updates and smart filtering.  

---

## Ì≥å Features

### ‚úÖ Core Features
- **User Authentication**
  - Register/Login with JWT
- **Job Application Management**
  - Add, edit, delete, and view job applications
  - Fields: Company, Role, Status, Applied Date, Notes
  - Statuses: `Applied`, `Interview`, `Offer`, `Rejected`, `Accepted`
- **Filtering & Sorting**
  - Filter by status
  - Sort by applied date
- **Real-Time Notifications**
  - Email alerts or on-panel updates for application changes

### Ì∑ë‚ÄçÌ≤º Applicant Dashboard
- View all applications in table/card format
- Apply filters and sort jobs
- Responsive UI for mobile and desktop

### Ì±®‚ÄçÌ≤ª Admin Panel *(optional)*
- View all users and applications
- Manage application statuses

---

## ÌøóÔ∏è Tech Stack

### Frontend
- React
- React Router
- Axios
- Formik / Yup (form validation)
- Tailwind CSS or Bootstrap

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Bcrypt (password hashing)
- Nodemailer / Socket.io (for notifications)

---

## Ì∫Ä Getting Started

### Ì≥Å Clone the Repo
```bash
git clone https://github.com/yourusername/jobpilot.git
cd jobpilot

