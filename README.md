# 🔐 Auth App — User Authentication & Authorization with Bearer Token

A complete JWT-based authentication system built with **Node.js**, **Express.js**, **Mongoose**, and **bcryptjs**, following the **MVC pattern**.

---

## 📁 Project Structure

```
auth-app/
├── config/
│   └── db.js                        # MongoDB connection
├── controllers/
│   └── authController.js            # register, login, getMe, getAllUsers
├── middleware/
│   ├── authMiddleware.js            # JWT protect + authorize (role-based)
│   └── errorMiddleware.js           # Global error & 404 handler
├── models/
│   └── User.js                      # Mongoose schema + password hashing
├── routes/
│   └── authRoutes.js                # Express routes with validation
├── .env.example                     # Environment variable template
├── .gitignore
├── package.json
├── AuthApp.postman_collection.json  # Postman API collection
├── README.md
└── server.js                        # Entry point
```

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework & routing |
| Mongoose | MongoDB ODM |
| bcryptjs | Password hashing (salt rounds: 12) |
| jsonwebtoken | JWT generation & verification |
| express-validator | Input validation |
| dotenv | Environment variables |
| cors | Cross-Origin Resource Sharing |

---

## ⚙️ Getting Started

### 1. Clone and install
```bash
git clone https://github.com/<your-username>/auth-app.git
cd auth-app
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/authdb
JWT_SECRET=your_very_long_random_secret_key_here
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
```

### 3. Run the server
```bash
npm run dev     # development
npm start       # production
```

---

## 📡 API Endpoints

**Base URL:** `http://localhost:5000`

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/` | None | Health check |
| POST | `/api/auth/register` | None | Register new user |
| POST | `/api/auth/login` | None | Login and get JWT |
| GET | `/api/auth/me` | Bearer Token | Get my profile |
| GET | `/api/auth/users` | Bearer Token (Admin) | Get all users |

---

## 👤 User Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `username` | String | ✅ | 3–30 chars, unique |
| `email` | String | ✅ | valid email, unique |
| `password` | String | ✅ | min 6 chars, hashed with bcrypt |
| `role` | String | ❌ | 'user' or 'admin' (default: 'user') |
| `isActive` | Boolean | ❌ | default: true |
| `createdAt` | Date | auto | — |
| `updatedAt` | Date | auto | — |

---

## 🔑 How JWT Authentication Works

```
1. User registers/logs in → server validates credentials
2. Server generates a JWT signed with JWT_SECRET
3. JWT is returned to the client
4. Client stores the JWT (localStorage, etc.)
5. Client sends JWT in every protected request:
   Authorization: Bearer <token>
6. Server middleware decodes and verifies the token
7. If valid → req.user is populated → route is accessible
8. If invalid/expired → 401 Unauthorized response
```

---

## 🧪 Sample Requests

### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "praveen123",
  "email": "praveen@example.com",
  "password": "password123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "praveen@example.com",
  "password": "password123"
}
```

### Get Profile (Protected)
```bash
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📬 Postman Collection

Import `AuthApp.postman_collection.json` into Postman:
1. Open Postman → **Import** → select the JSON file
2. Set `baseUrl` variable to `http://localhost:5000`
3. Register or Login → copy the `token` from the response
4. For protected routes: **Authorization** tab → **Bearer Token** → paste token

---

## ☁️ Deployment on Render

1. Push code to GitHub
2. Go to render.com → **New Web Service** → connect repo
3. Build: `npm install` | Start: `npm start`
4. Add Environment Variables:
   - `MONGODB_URI` → MongoDB Atlas connection string
   - `JWT_SECRET` → a long random secret
   - `JWT_EXPIRES_IN` → `7d`
   - `NODE_ENV` → `production`

---

## 🔒 Security Features

- Passwords hashed with **bcrypt** (12 salt rounds)
- JWT tokens signed with a secret key
- Password field excluded from all database queries (`select: false`)
- Input validation on all endpoints
- Role-based access control (user / admin)
- Descriptive error messages without leaking sensitive info

---

## 📄 License

ISC
