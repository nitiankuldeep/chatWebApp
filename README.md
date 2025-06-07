# 🌐 Chat | Language Learning Through Real-Time Conversation

A modern chat application that enables users to **chat, share files, and make video calls** while learning new languages. Users specify their **native** and **learning language**, and the app connects them with compatible users for immersive, real-time language exchange — including both **one-on-one** and **group** conversations.

---

## 📌 Key Features

### 💬 Real-Time Messaging
- **One-on-one and group chats** using **Stream Chat API**
- Typing indicators, threaded replies, and emoji reactions
- Read/seen status for clarity

### 👥 Group Chat
- Create and join language learning groups
- Invite members via email
- Admins can manage members (basic admin control)
- Backed by **Stream team channels** for real-time communication

### 🧠 Recommended Users
- See suggested users based on your:
  - `nativeLanguage` ↔ `learningLanguage` pairing
- Easily start a conversation with compatible language partners

### 📹 Video Calling
- Peer-to-peer video and audio calls using **Stream Video SDK**
- Initiate video calls directly from a chat

### 📂 File Sharing
- Send documents, images, PDFs, and more
- Secure storage and sharing via Stream
- In-chat previews and download options

### 🎨 UI & Themes
- 32 elegant themes with **DaisyUI**
- Light/Dark mode toggle
- Responsive design using **Tailwind CSS**
- Clean iconography with **Lucide Icons**

### 🔐 Authentication & Security
- Register/login with email + password
- Passwords securely hashed
- Email format validation
- JWT-based authentication system

### 🔔 Notification System
- Bell icon for in-app alerts
- Toast popups for real-time feedback
- Dedicated **Notifications Page** for full history

---

## 🧰 Tech Stack

| Layer        | Technology                                 |
|--------------|---------------------------------------------|
| Frontend     | React, Tailwind CSS, DaisyUI, Lucide Icons |
| Backend      | Node.js, Express, MongoDB, JWT Auth         |
| Real-Time    | Stream Chat API, Stream Video SDK           |
| Notifications| Toastify, Custom Notification Logic         |

---

## 📁 Project Structure

```
chatWebApp/
├── backend/             # Express server and APIs
│   ├── routes/          # User, auth, group, chat routes
│   ├── models/          # Mongoose models for User, Group, etc.
│   ├── controllers/     # Business logic
│   └── server.js        # Server entry point
├── frontend/            # React UI with Tailwind & DaisyUI
│   ├── components/      # Reusable UI components
│   ├── pages/           # Login, Chat, Groups, etc.
│   └── App.js           # Main app file
├── screenshots/         # Add demo screenshots here
├── .env.example         # Sample environment config
└── README.md            # Project documentation
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nitiankuldeep/chatWebApp.git
cd chatWebApp
```

### 2. Setup Environment Variables

#### 📄 `backend/.env`

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

#### 📄 `frontend/.env`

```env
VITE_APP_STREAM_API_KEY=your_stream_api_key
```

### 3. Install Dependencies

#### Backend:

```bash
cd backend
npm install
npm start
```

#### Frontend:

```bash
cd frontend
npm install
npm run dev
```

---

## 📦 Future Enhancements

- [ ] Group admin moderation (add/remove members)
- [ ] Public discoverable groups with join requests
- [ ] GPT-powered grammar suggestions and inline translation
- [ ] Online/offline status and typing indicators
- [ ] OAuth login (Google, GitHub)

---

## 👨‍💻 Author

**Kuldeep Singh**  
🔗 GitHub: [@nitiankuldeep](https://github.com/nitiankuldeep)

---
