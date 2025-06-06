
# 🌐 Chat | Language Learning Through Real-Time Conversation

A modern chat application that allows users to **chat, share files, and make video calls** while learning new languages. Each user specifies their **native** and **learning language**, and connects with users around the world for immersive, real-time language exchange.

---

## 📌 Key Features

### 💬 Real-Time Messaging
- One-on-one chats using **Stream Chat API**
- Typing indicators, replies, and emoji reactions
- Seen/read status support

### 📹 Video Calling
- Peer-to-peer audio/video calls via **Stream Video SDK**

### 📂 File Sharing
- Upload documents, images, PDFs, and more
- Files are stored securely using Stream
- Preview or download attachments from chat

### 🎨 UI & Themes
- 32 beautiful themes using **DaisyUI**
- Light/Dark mode support
- Built with **Tailwind CSS** for responsive layout
- Uses **Lucide icons** for elegant UI consistency

### 🧠 Language Learning Focus
- Every user has a:
  - `nativeLanguage`
  - `learningLanguage`
- Chat matches can be made based on language compatibility

### 🔐 Authentication & Security
- Email + password login system
- Passwords hashed securely
- Email validation using regex
- Authentication handled with **JWT**

### 🔔 Notification System
- In-app notifications using a bell icon
- Toast popups for instant alerts
- Dedicated **Notification Page** to review all activity

---

## 🧰 Tech Stack

| Layer        | Technology                             |
|--------------|-----------------------------------------|
| Frontend     | React, Tailwind CSS, DaisyUI, Lucide Icons |
| Backend      | Node.js, Express, MongoDB, JWT Auth     |
| Real-Time    | Stream Chat API, Stream Video SDK       |
| Notifications| Toastify, Custom UI                     |

---

## 📁 Project Structure

```
chatWebApp/
├── backend/             # Express server and APIs
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── server.js
├── frontend/            # React UI with Tailwind & DaisyUI
│   ├── components/
│   ├── pages/
│   └── App.js
├── screenshots/         # Add demo screenshots here
├── .env.example         # Sample environment config
└── README.md
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

- [ ] Language-based user matching algorithm
- [ ] Group chat with moderators/admin controls
- [ ] GPT-based grammar correction & translation
- [ ] Typing indicators and online/offline badges
- [ ] OAuth login (Google, GitHub)

---


## 👨‍💻 Author

**Kuldeep Singh**  
🔗 GitHub: [@nitiankuldeep](https://github.com/nitiankuldeep)

---

## 📄 License

This project is licensed under the **MIT License** – feel free to use, modify, and contribute.
