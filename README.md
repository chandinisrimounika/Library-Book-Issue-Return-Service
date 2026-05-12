

# 📚 Library Book Issue & Return Service

A REST-based backend application built using Spring Boot for managing library books, members, and book issue/return operations.

This project automates the library book issuing process with proper validations and business rules.

---

## 🚀 Features

### 📖 Book Management
- Add new books
- View all books
- View available books
- Search books by title or author

### 👤 Member Management
- Register library members
- View member details
- View books issued to a member

### 🔄 Issue & Return Management
- Issue books to members
- Return issued books
- Automatically update return date
- Mark returned books as available

---

## 📌 Business Rules

- One book can be issued to only one member at a time
- A member can issue a maximum of 3 books
- Only available books can be issued
- Returned books become available again

---

## 🛠️ Tech Stack

- Java
- Spring Boot
- Spring Data JPA
- H2 Database / MySQL
- Maven
- Postman

---



## 🗄️ Core Data Objects

### Book
```java
bookId
title
author
availability
```

### Member
```java
memberId
name
email
```

### IssueRecord
```java
issueId
issueDate
returnDate
```

---

## 🔗 REST API Endpoints

### 📚 Book APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/books` | Add a new book |
| GET | `/books` | View all books |
| GET | `/books/available` | View available books |
| GET | `/books/search?keyword=` | Search books |

---

### 👤 Member APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/members` | Register a member |
| GET | `/members/{id}` | View member details |
| GET | `/members/{id}/books` | View books issued to a member |

---

### 🔄 Issue APIs

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/issues/issue` | Issue a book |
| PUT | `/issues/return/{issueId}` | Return a book |

---

## 📥 Sample Request

### Issue Book

```json
{
  "bookId": 1,
  "memberId": 1
}
```

---

## ⚙️ H2 Database Configuration

```properties
spring.datasource.url=jdbc:h2:mem:librarydb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

---

## ▶️ How to Run the Project

### Clone Repository

```bash
git clone https://github.com/your-username/library-management-system.git
```

### Navigate to Project

```bash
cd library-management-system
```

### Run Application

```bash
mvn spring-boot:run
```

Application runs on:

```bash
http://localhost:8080
```

---

## 🧪 API Testing

Use Postman to test all REST endpoints.

---

## ✅ Functional Workflow

1. Add books
2. Register members
3. Issue books
4. Return books

---

## ⚠️ Exception Handling

The application includes:
- Validation checks
- Business rule validations
- Global exception handling
- Proper HTTP status responses

---

## 🎯 Future Enhancements

- JWT Authentication
- MySQL Integration
- Fine Calculation
- Admin Dashboard
- Frontend Integration
