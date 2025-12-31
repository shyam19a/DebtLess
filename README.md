# DebtLess — Expense Splitting Made Simple

DebtLess is a full-stack expense splitting application.
It helps groups track shared expenses, understand who owes whom, and settle balances effortlessly.

Live Demo: https://shyamdebtless.netlify.app/

---

##  Features

- Add and manage group members
- Add shared expenses with flexible participants
- View paid activity history
- Automatic calculation of who owes whom
- One-click Settle Up to clear all balances
- Fully deployed with cloud backend and persistent database

---

##  Tech Stack

Frontend
- React
- Deployed on Netlify

Backend
- Node.js
- Express
- RESTful APIs
- Deployed on Hugging Face Spaces

Database
- PostgreSQL
- Hosted on Neon

---

##  Architecture Overview

Frontend (Netlify)
↓
Backend API (Hugging Face — Docker)
↓
PostgreSQL Database (Neon)

This separation ensures scalability, clean API boundaries, and real-world production deployment.

---

##  API Endpoints (Sample)

- GET /api/users — Fetch all users
- POST /api/users — Add a new user
- POST /api/expenses — Add a new expense
- GET /api/expenses — Get all expenses
- GET /api/expenses/overview — Paid activity and settlements
- POST /api/expenses/settle — Settle all balances

---

##  How to Use (Demo)

1. Open the live application
2. Add group members
3. Add an expense (select who paid and participants)
4. View paid activity and settlements
5. Click Settle Up to reset balances

No authentication required — just try it.

---

##  Local Development (Optional)

Prerequisites
- Node.js
- PostgreSQL

Clone the repository
```
    git clone https://github.com/shyam19a/DebtLess.git
    cd DebtLess
```
Backend
```
    cd server
    npm install
    npm run dev
```
Create a .env file inside the server directory:
```
    DATABASE_URL=your_postgres_connection_string
    PORT=5000
```
Frontend
```
    cd client
    npm install
    npm run dev
```
---

## 📌 About This Project

DebtLess was built to gain hands-on experience with:
- Full-stack application development
- REST API design
- Database schema design
- Docker and cloud deployment
- Real-world production workflows

---
