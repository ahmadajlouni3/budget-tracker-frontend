# 💰 Budget Tracker — Frontend

This is the **frontend** for the Budget Tracker web application.
It’s built with **React**, **React Router**, and **React Bootstrap**, and communicates with the backend API to manage users’ income and expenses.

---

## 🚀 Features

* 🔐 User authentication (login & register)
* 📊 Dashboard with transaction form and list
* 📱 Responsive UI built with React Bootstrap
* 🌐 Secure communication with backend API
* 📈 Placeholder for summary & charts

---

## 🛠️ Tech Stack

* **React 18**
* **React Router DOM**
* **React Bootstrap**
* **Axios** for API calls
* **JWT Authentication** (via backend)

---

## 📂 Project Structure

src/
├── api/            # Axios API configuration
├── components/     # UI components (Header, Dashboard, etc.)
├── context/        # AuthContext for JWT auth state
├── App.js
└── index.js

---

## ⚙️ Setup & Installation

1. **Clone the repository**
   git clone <your-frontend-repo-url>
   cd budget-tracker-frontend

2. **Install dependencies**
   npm install

3. **Configure API endpoint**

   * In src/api/api.js, update the baseURL to point to your backend (Render/localhost).

4. **Run development server**
   npm start

The app will run at:
[http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

Create a `.env` file in the project root (optional for frontend):

REACT\_APP\_API\_URL=[http://localhost:5000/api](http://localhost:5000/api)

Make sure to configure this variable in your deployment platform (Netlify, Vercel, etc.).

---

## 📝 Notes

* This repository only contains the **frontend**.
* The backend (API + database) is in a **separate repository**.
* Make sure the backend is running before using the app.

---

## 📦 Deployment

* **Netlify** or **Vercel** for frontend hosting.
* In your deployment platform, set the environment variable `REACT_APP_API_URL` to point to your backend API.

---

## 📄 License

This project is private for now.

---
