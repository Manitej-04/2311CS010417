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

