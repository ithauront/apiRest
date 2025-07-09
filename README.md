# 💸 Fastify Transactions API — Finance Tracker Backend

A structured and testable RESTful API built with **Fastify**, **Knex**, and **SQLite** that simulates a personal finance tracker backend. It supports creating, listing, and summarizing financial transactions, organized per user session using cookies.

---

## 🧾 Requirements & Rules

#### ✅ Functional Requirements

- [x] User can create a new transaction
- [x] User can list all existing transactions
- [x] User can view a single transaction by its ID
- [x] User can view a **summary** of their account (total balance)

#### 📋 Business Rules

- [x] Transactions must be either **credit** (inflow) or **debit** (outflow)
- [x] Transactions are **session-specific** — one user's data should not interfere with another's
- [x] User can only **view transactions they created**

---

## 🛠️ Tech Stack

- **Fastify** – lightweight and fast Node.js web framework  
- **Knex.js** – SQL query builder and migration tool  
- **SQLite** – lightweight embedded database  
- **Zod** – schema validation for environment and request data  
- **Vitest** – testing framework  
- **Supertest** – HTTP request assertions  
- **Dotenv** – environment variable configuration  

---

## ⚙️ Environment Setup

Create two `.env` files in the root:

### .env
```env
DATABASE_URL="./db/app.db"
DATABASE_CLIENT="sqlite"
NODE_ENV="development"
PORT=3333
```

### .env.test

```env
DATABASE_URL="./db/test.db"
DATABASE_CLIENT="sqlite"
NODE_ENV="test"
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/ithauront/apiRest.git

# Navigate to repository folder
cd apiRest

# Install dependencies
npm install

# Run database migrations
npm run knex migrate:latest

# Start the development server
npm run dev
```
API will be available at:

```
http://localhost:3333/transactions
```

---
## 🧪 Running Tests

```bash
npm run test
```
Tests use a separate SQLite database and reset the schema before each run:

```
npm run knex migrate:rollback --all
npm run knex migrate:latest
```

---
## 📬 API Endpoints

### POST /transactions

Create a new transaction.

Body:
```json
{
  "title": "Salary",
  "amount": 5000,
  "type": "credit"
}
```
Returns ```201 Created``` and sets a cookie ```sessionId```.


---

### GET /transactions

List all transactions for the current session.
Requires the ```sessionId``` cookie.


---

### GET /transactions/:id

Fetch a specific transaction by ID.
Session-bound.


---

### GET /transactions/summary

Return a summary with the total balance for the session:
```json
{
  "summary": { "amount": 2000 }
}
```

---

## 🔐 Session Tracking

Each session is identified by a ```sessionId``` cookie.
All transaction data is scoped to that session only.
There is no authentication system — this is a session-based simulation.


---


## 🧠 What I Practiced

* Structured backend with Fastify + Knex

* Environment configuration using dotenv + Zod

* SQL migration and DB versioning

* Full integration testing with Vitest

* Cookie-based session handling

* RESTful route design and validation

* Planning and separating functional requirements vs. business rules

---

🤝 Related Project

Although this backend was developed as a standalone project focused on backend architecture, testing, and database handling, it shares the core logic with a frontend project I also built: dtmoney.

However, they were never integrated. The goal was to learn each layer of the stack in isolation — apiRest focused on backend fundamentals, while dtmoney was about mastering React and UI design with fake data.

Both projects reflect my intention to build full product experiences, even when explored independently.

