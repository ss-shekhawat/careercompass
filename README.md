# CareerCompass

> Scientific career assessments + AI-powered guidance for Class 9–12 students in India.

🌐 **Live Demo**: [careercompass.vercel.app](#) <!-- Update after deploy -->
📂 **Backend Repo**: [coming soon](#)

---

## 🎯 What is CareerCompass?

CareerCompass helps Indian high-school students (Class 9–12) discover suitable career paths through:

- 🧠 **Scientific psychometric assessments** — personality, interest, and aptitude tests grounded in psychology research
- 🤖 **AI-powered career roadmaps** — personalized career recommendations based on assessment results
- 🎓 **Counsellor sessions** (coming soon) — 1-on-1 guidance from qualified career counsellors

---

## ✨ Features (v1)

- ✅ **User registration** with OTP verification
- ✅ **Profile-building questionnaire** before assessment
- ✅ **Three-section assessment**:
  - Personality test (with tie-breaker logic)
  - Interest test
  - Aptitude test (numerical, verbal, logical reasoning)
- ✅ **Personalized career report** with:
  - Interest analysis (radar chart)
  - Aptitude scores (gauge charts)
  - Top career recommendations (AI-matched)
  - Strengths & improvement areas
- ✅ **Student dashboard** with progress tracking
- ✅ **Free tier** for early users
- ⏳ **1-on-1 counsellor bookings** — coming soon

---

## 🛠️ Tech Stack

### Frontend (this repo)

- **React 18** + **Vite**
- **Tailwind CSS** for styling
- **Redux Toolkit** (RTK Query) for state management
- **React Router** for routing
- **Recharts** for data visualization
- **Framer Motion** for animations

### Backend

- **FastAPI** (Python)
- **PostgreSQL** database
- **JWT** authentication
- Hosted on **Render**

### Hosting

- Frontend: **Vercel**
- Backend: **Render** (free tier)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Local setup

```bash
# Clone the repo
git clone https://github.com/your-username/careercompass.git
cd careercompass

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your backend URL

# Run dev server
npm run dev
```

App runs at `http://localhost:5173`

### Environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://your-backend-url.com
```

---

## 📁 Project Structure
