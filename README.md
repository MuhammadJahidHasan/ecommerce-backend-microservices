# 🛒 Ecommerce Backend Microservices

A scalable and modular ecommerce backend built with **NestJS**, leveraging **microservice architecture**. This project integrates **RabbitMQ**, **Redis**, and **MySQL** to ensure performance, flexibility, and maintainability.

## 📦 Project Structure

This monorepo is structured using microservices, where each core feature is isolated into its own NestJS service.

### Services

- **Auth Service** – Handles user registration, login, JWT-based authentication.
- **Product Service** – Manages product catalog, categories, and inventory.
- **Order Service** – Handles orders, payments, and order history.
- **Cart Service** – In-memory cart using **Redis**.
- **Notification Service** – Sends emails via **RabbitMQ**, using **Nodemailer** and **EJS templates**.
- **Payment Service** – Handles mock or real payment integration (future expansion).
- **Gateway / API Gateway** – Unified entry point to the services, includes global middleware, validation, and routing.

## 🚀 Tech Stack

| Technology       | Purpose                        |
|------------------|--------------------------------|
| NestJS           | Backend framework              |
| TypeScript       | Static typing                  |
| Redis            | Cart caching, quick access     |
| RabbitMQ         | Messaging between services     |
| MySQL            | Relational DB for core data    |
| Nodemailer + EJS | Email templates via notification service |
| Docker           | Containerization for services  |

---

## Installation

### 2. Install Dependencies
```bash
yarn install
```

### 3. Start Docker Services (RabbitMQ, Redis, MySQL)
Make sure you have Docker installed. Then run:
```bash
docker-compose up -d
```

This will start:
- **RabbitMQ** on `localhost:5672` (UI: `localhost:15672`)
- **Redis** on `localhost:6379`
- **MySQL** on `localhost:3306`

### 4. Configure .env Files
Each service has its own `.env` file. Example for a service:
```ini
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=password
DB_NAME=ecommerce_auth
RABBITMQ_URL=amqp://guest:guest@localhost:5672
REDIS_URL=redis://localhost:6379
```

### 5. Start Each Service
You can start services individually:
```bash
# Example
cd services/auth-service
npm run start:dev
```
Repeat this for each service (`product-service`, `cart-service`, etc.)

## 📬 Inter-Service Communication
All communication between microservices is handled via **RabbitMQ**, using direct exchanges. Services publish events (e.g., "order_created") that others subscribe to.

## 🛠 Features
- 🔐 Secure authentication
- 📦 Modular product and inventory handling
- 🛒 Redis-powered fast cart system
- 📧 Email notifications (via RabbitMQ and Nodemailer)
- ⚙️ Event-driven architecture with clear responsibilities
- 🧩 Easy to scale, test, and deploy

## 📈 Roadmap
- Auth, Products, Orders, Cart modules
- RabbitMQ messaging
- Redis cart service
- Notification service with email templates
- Stripe or SSLCommerz integration
- Admin dashboard integration
- Unit + E2E tests

## 🤝 Contributing
Contributions and pull requests are welcome! Please make sure to follow the coding conventions used in the project.

## 📄 License
This project is licensed under the **MIT License**.

## 👨‍💻 Author
**Muhammad Jahid Hasan**  
GitHub: https://github.com/MuhammadJahidHasan
