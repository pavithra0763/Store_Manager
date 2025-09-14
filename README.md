Inventory Management System

A full-stack Inventory Management System built with React.js (frontend), Node.js + Express.js (backend), and MongoDB (database). This system helps businesses efficiently manage products, stores, purchases, and sales with real-time tracking.

🚀 Features

Authentication – Secure login/register with JWT

Dashboard – Overview of products, sales, and purchases

Product Management – Add, edit, delete, and view products

Store Management – Manage multiple stores and stock

Purchase Management – Record supplier purchases

Sales Management – Track and monitor sales

Responsive UI – Works on desktop, tablet, and mobile

Scalable Backend – RESTful API built with Express.js

🛠️ Tech Stack

Frontend:

React.js

Redux (state management)

Material UI / Bootstrap

Backend:

Node.js

Express.js

Database:

MongoDB (local or Atlas cloud)

Other Tools:

Postman (API testing)

JWT (Authentication)

📂 Project Structure
Inventory-Management-System/
│
├── Backend/
│   ├── controller/       # Business logic
│   ├── models/           # Mongoose schemas
│   ├── router/           # API routes
│   ├── server.js         # Entry point
│   └── seed.js           # Sample data seeding
│
├── Frontend/
│   ├── public/           # Static files
│   └── src/              # React source
│       ├── components/   # UI components
│       ├── pages/        # Page-level components
│       └── redux/        # State management
│
├── package.json
└── README.md

⚙️ Installation & Setup
Prerequisites

Node.js (v14 or later)

MongoDB (local or MongoDB Atlas)

Git

Steps

Clone the repository

git clone https://github.com/your-username/inventory-management-system.git
cd inventory-management-system


Install backend dependencies

cd Backend
npm install


Start backend server

npm start


Install frontend dependencies

cd ../Frontend
npm install


Start frontend server

npm start


Open in browser

http://localhost:3000

🔑 API Endpoints
User

POST /api/user/register → Register user

POST /api/user/login → Login with JWT

Product

GET /api/products → Get all products

POST /api/products → Add new product

PUT /api/products/:id → Update product

DELETE /api/products/:id → Delete product

Store

GET /api/stores → Get all stores

POST /api/stores → Add store

Purchase

POST /api/purchases → Record purchase

GET /api/purchases → View purchases

Sales

POST /api/sales → Record sale

GET /api/sales → View sale
