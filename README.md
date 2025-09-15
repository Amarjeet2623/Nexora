# 🚀 Nexora – Real-Time Chat & Video Call App  

🌐 **Live Demo:** [https://nexora.vercel.app/](https://nexora.vercel.app/)  

[![MERN](https://img.shields.io/badge/Stack-MERN-green?style=flat-square&logo=mongodb)]()  
[![Frontend](https://img.shields.io/badge/Frontend-React-blue?style=flat-square&logo=react)]()  
[![Backend](https://img.shields.io/badge/Backend-Express-black?style=flat-square&logo=express)]()  
[![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen?style=flat-square&logo=mongodb)]()  
[![WebRTC](https://img.shields.io/badge/Video-Calls-orange?style=flat-square&logo=webrtc)]()  
[![Deployed](https://img.shields.io/badge/Deployed-Live-success?style=flat-square&logo=vercel)]()  

**Nexora** is a modern **real-time chat & video calling application** built with the **MERN stack**.  
Enjoy **instant messaging, voice/video calls, notifications, and a sleek UI** — all in one place.  

---

## ✨ Features  

- 🔒 **Authentication** — Secure login/signup with JWT, protected routes  
- 💬 **Real-Time Chat** — One-to-one and group messaging with WebSockets  
- 📷 **Media Sharing** — Send images, files, and emojis in chat  
- 🎥 **Voice & Video Calls** — High-quality calls powered by **WebRTC**  
- 👤 **User Profiles** — Avatars, status updates, online/offline indicators  
- 🔔 **Notifications** — Instant message/call notifications  
- 🎨 **Modern UI** — Responsive, TailwindCSS + shadcn/ui + Framer Motion animations  
- ⚡ **Scalable APIs** — Node.js + Express backend with modular structure  
- 🌎 **Deployment Ready** — Frontend (Vercel), Backend (Render/Heroku), MongoDB Atlas  

---

## 🛠️ Tech Stack  

| Layer      | Tools & Libraries |  
|-----------|-------------------|  
| **Frontend** | React, Zustand/Redux, TailwindCSS, shadcn/ui, Framer Motion, Stream/WebRTC |  
| **Backend** | Node.js, Express.js, Socket.IO |  
| **Database** | MongoDB Atlas |  
| **Auth** | JWT (Cookies) |  
| **videochat** | steam Api / Multer |  

---

## ⚡ Getting Started  

### 🔑 Prerequisites  
- Node.js & npm  
- MongoDB Atlas account  
- Steam Api 

### 🚀 Installation  

```bash
# Clone the repository
git clone https://github.com/yourusername/nexora.git
cd nexora

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
⚙️ Environment Setup
Backend → /backend/.env

env
Copy code
PORT=5001
MONGODB_URI=your_mongo_connection_string
STEAM_API_NAME=your_steam_name
STEAM_API_SECRETY=your_steam_api_key
JWT_SECRET_KEY=your_jwt_secret

Frontend → /frontend/.env.local

env
Copy code
VITE_API_URL=http://localhost:5001
▶️ Run the App
bash
Copy code
# Start backend server
cd backend
npm run dev

# Start frontend development server
cd frontend
npm run dev
Now visit 👉 http://localhost:5173

📁 Project Structure
csharp
Copy code
nexora/
├── backend/
│   ├── models/         # Database models
│   ├── controllers/    # Route controllers
│   ├── routes/         # API routes
│   ├── sockets/        # Socket.IO events (chat, calls)
│   ├── middleware/     # Authentication & error handlers
│   └── utils/          # Helper functions
├── frontend/
│   ├── src/            # React source code
│   ├── .env.local      # Frontend env vars
│   └── vite.config.js  # Vite config
└── README.md
🔗 API Endpoints
Endpoint	Description
/api/auth/	Login / Register / Logout
/api/users/	Fetch & manage user profiles
/api/messages/	Send / fetch chat messages
/api/calls/	Initialize / accept / reject calls

🌩️ WebRTC + Socket.IO Integration
WebRTC handles peer-to-peer video & audio streaming

Socket.IO manages real-time events (chat, typing indicators, call requests)

👨‍💻 Author
Your Name
🔗 GitHub | 🔗 LinkedIn

💡 Contributions, issues, and feature requests are welcome!

📄 License
Licensed under the MIT License.

🙏 Acknowledgements
WebRTC — Real-time media streaming

Socket.IO — Real-time communication

MongoDB Atlas — Database hosting


Vercel — Frontend deployment

shadcn/ui — Modern UI components
