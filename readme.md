Markdown
# MERN Microservices Todo Application

A production-ready, distributed Todo application built using **Node.js**, **Express**, **MySQL**, **React**, and **Tailwind CSS**. This project demonstrates a microservices architecture featuring an API Gateway, centralized authentication with **Role-Based Access Control (RBAC)**, and horizontal resource ownership protection.

---

## Architecture Overview

```text
               +-----------------------+
               |    React Frontend     |
               |     (Port: 5173)      |
               +-----------+-----------+
                           |
                     HTTP Requests
                           |
                           v
               +-----------+-----------+
               |      API Gateway      |
               |     (Port: 4000)      |
               +----+---------------+--+
                    |               |
       JWT Validation             Proxy
                    |               |
                    v               v
         +----------+---+    +------+-------+
         | Auth Service |    | Todo Service |
         | (Port: 4001) |    | (Port: 4002) |
         +-------+------+    +------+-------+
                 |                  |
                 v                  v
         +-------+------+    +------+-------+
         |  MySQL (Auth)|    |  MySQL (Todo)|
         +--------------+    +--------------+
Tech Stack
Frontend: React (Vite), Tailwind CSS, React Router DOM, Axios, Lucide React

Backend: Node.js, Express.js

Database: MySQL 8.0+

Security & Architecture: JSON Web Tokens (JWT), Bcrypt.js, Helmet, Express Rate Limit, HTTP Proxy Middleware

Repository Structure
Plaintext
mern-todo-microservices/
├── api-gateway/
│   ├── src/
│   ├── .env
│   └── package.json
├── auth-service/
│   ├── src/
│   ├── .env
│   └── package.json
├── todo-service/
│   ├── src/
│   ├── .env
│   └── package.json
└── client/
    ├── src/
    ├── .env
    └── package.json
Prerequisites
Make sure you have the following installed on your machine:

Node.js (v18+ recommended)

MySQL Server (Running locally or via Docker)

Git

Getting Started & Installation
1. Clone the Repository
Bash
git clone [https://github.com/your-username/mern-todo-microservices.git](https://github.com/your-username/mern-todo-microservices.git)
cd mern-todo-microservices
2. Setup Databases
Open your MySQL client and execute the following SQL scripts to create the required databases and tables:

SQL
-- Create Auth Database & Table
CREATE DATABASE IF NOT EXISTS todo_auth_db;
USE todo_auth_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('User', 'Manager', 'Admin') DEFAULT 'User',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Todo Database & Table
CREATE DATABASE IF NOT EXISTS todo_service_db;
USE todo_service_db;

CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
3. Configure and Start Services
Open 4 separate terminal windows or tabs to run each component concurrently.

Window 1: Auth Service (Port 4001)
Bash
cd auth-service
npm install
Create a .env file inside auth-service/:

Code snippet
PORT=4001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=todo_auth_db
DB_PORT=3306
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=1d
Start the service:

Bash
npm run dev
Window 2: Todo Service (Port 4002)
Bash
cd todo-service
npm install
Create a .env file inside todo-service/:

Code snippet
PORT=4002
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=todo_service_db
DB_PORT=3306
Start the service:

Bash
npm run dev
Window 3: API Gateway (Port 4000)
Bash
cd api-gateway
npm install
Create a .env file inside api-gateway/:

Code snippet
PORT=4000
AUTH_SERVICE_URL=http://localhost:4001
TODO_SERVICE_URL=http://localhost:4002
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
Start the gateway:

Bash
npm run dev
Window 4: React Frontend Client (Port 5173)
Bash
cd client
npm install
Create a .env file inside client/:

Code snippet
VITE_API_BASE_URL=http://localhost:4000
Start the client:

Bash
npm run dev
Usage & Testing
Open your browser and navigate to http://localhost:5173.

Click Register here to create an account. You can assign yourself a role (User, Manager, or Admin).

Log in with your credentials.

Dashboard: Create, edit, and update your personal tasks. Regular users will only see their own tasks.

Admin Panel: If logged in with an Admin or Manager account, access the Admin Panel via the navbar to view and manage all tasks across all users in the system.

API Endpoints Reference
API Gateway (Port 4000)
POST /api/auth/register - Register a new user

POST /api/auth/login - Authenticate user & return JWT

GET /api/todos - Get tasks (Filtered by ownership for users; all tasks for Admin/Manager)

POST /api/todos - Create a new task

PUT /api/todos/:id - Update an existing task

DELETE /api/todos/:id - Delete a task

License
This project is open-source and available under the MIT License.