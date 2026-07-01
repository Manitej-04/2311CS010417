# Campus Notification System Design

# Stage 1

## Goal

You know, design those REST endpoints for a campus alert platform, so authenticated students can pull notifications around placements, results, and some events also, you get it. Everything sends and receives JSON, REST-ish, pretty straight forward.

---

## Authentication

Every API call needs auth.

### Headers

```http
Authorization: Bearer 
Content-Type: application/json
Accept: application/json
```

---

# 1. Fetch Notifications

Gives back all notifications for the currently logged in student.

### Endpoint

```http
GET /api/v1/notifications
```

### Response

```json
{
  "success": true,
  "notifications": [
    {
      "id": "a123",
      "type": "Placement",
      "title": "Microsoft Hiring",
      "message": "Applications are open.",
      "isRead": false,
      "createdAt": "2026-04-22T17:51:30Z"
    }
  ]
}
```

---

# 2. Fetch Notification by ID

### Endpoint

```http
GET /api/v1/notifications/{id}
```

### Response

```json
{
  "success": true,
  "notification": {
    "id": "a123",
    "type": "Placement",
    "title": "Microsoft Hiring",
    "message": "Applications are open.",
    "isRead": false,
    "createdAt": "2026-04-22T17:51:30Z"
  }
}
```

---

# 3. Flag Notification as Read

### Endpoint

```http
PATCH /api/v1/notifications/{id}/read
```

### Request Body

```json
{}
```

### Response

```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

# 4. Flag All Notifications as Read

Basically batch it, so the unread list gets cleared out.

### Endpoint

```http
PATCH /api/v1/notifications/read-all
```

### Response

```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

# 5. Remove Notification

Delete a single notification record by id.

### Endpoint

```http
DELETE /api/v1/notifications/{id}
```

# Stage 2

## Database Choice

I recommend **MySQL** as the persistent storage for the Campus Notification System.

### Why MySQL?

- Supports ACID transactions for reliable data storage.
- Excellent performance for CRUD operations.
- Supports indexing to optimize frequent queries.
- Suitable for structured relational data.
- Easy to scale using read replicas and partitioning.
- Mature ecosystem with good tooling and community support.

---

# Database Schema

## Students Table

```sql
CREATE TABLE students (
    studentID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Notifications Table

```sql
CREATE TABLE notifications (
    notificationID CHAR(36) PRIMARY KEY,
    studentID INT NOT NULL,
    notificationType ENUM('Placement','Result','Event') NOT NULL,
    title VARCHAR(200),
    message TEXT NOT NULL,
    isRead BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(studentID)
    REFERENCES students(studentID)
    ON DELETE CASCADE
);
```

---

# Entity Relationship

```
Students (1)
      │
      │
      ▼
Notifications (Many)
```

Each student can have multiple notifications.

---

# Queries for Stage 1 APIs

## 1. Get All Notifications

```sql
SELECT *
FROM notifications
WHERE studentID = ?
ORDER BY createdAt DESC;
```

---

## 2. Get Notification By ID

```sql
SELECT *
FROM notifications
WHERE notificationID = ?;
```

---

## 3. Mark Notification as Read

```sql
UPDATE notifications
SET isRead = TRUE
WHERE notificationID = ?;
```

---

## 4. Mark All Notifications as Read

```sql
UPDATE notifications
SET isRead = TRUE
WHERE studentID = ?;
```

---

## 5. Delete Notification

```sql
DELETE
FROM notifications
WHERE notificationID = ?;
```

---

# Challenges as Data Grows

As the number of students and notifications increases, several issues may arise:

- Slower search queries due to large table scans.
- Increased database storage requirements.
- Higher write latency during peak notification periods.
- Increased server load from frequent reads.
- Longer backup and recovery times.

---

# Scalability Solutions

## 1. Indexing

Create indexes on frequently queried columns.

```sql
CREATE INDEX idx_student_read_created
ON notifications(studentID, isRead, createdAt DESC);
```

---

## 2. Pagination

Retrieve notifications in smaller batches.

Example:

```sql
SELECT *
FROM notifications
WHERE studentID = ?
ORDER BY createdAt DESC
LIMIT 20 OFFSET 0;
```

---

## 3. Read Replicas

Use read replicas to distribute read-heavy traffic while keeping writes on the primary database.

---

## 4. Table Partitioning

Partition the notifications table based on creation date or student ID to reduce query scan time.

---

## 5. Caching

Use Redis to cache frequently accessed unread notifications and reduce database load.

---

# Summary

MySQL provides reliable transactional storage for the notification system. Performance can be maintained at scale through indexing, pagination, read replicas, partitioning, and caching.