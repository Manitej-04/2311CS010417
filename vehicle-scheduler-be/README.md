## Vehicle Scheduler Backend

## Overview

This project is a backend microservice built using **Node.js** and **Express.js**.

It fetches depot and vehicle data from the provided Evaluation APIs and generates an optimal maintenance schedule using the **0/1 Knapsack Algorithm**.

The goal is to maximize the total vehicle impact without exceeding the available mechanic hours of a depot.

---

## Tech Stack

- Node.js
- Express.js
- Axios
- JavaScript

---

## Project Structure

```
vehicle-scheduler-be/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
│
├── screenshots/
├── server.js
├── package.json
└── .env.example
```

---

## Installation

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
BASE_URL=http://4.224.186.213/evaluation-service
ACCESS_TOKEN=your_generated_access_token
```

Start the server:

```bash
npm run dev
```

---

## API Endpoint

Generate an optimal maintenance schedule:

```
GET /api/schedule/:depotId
```

Example:

```
GET http://localhost:3000/api/schedule/1
```

---

## Algorithm Used

The project uses the **0/1 Knapsack Dynamic Programming Algorithm** to select the best combination of vehicle maintenance tasks within the available mechanic hours.

---

## Features

- Fetches depots from protected API
- Fetches vehicles from protected API
- Uses Bearer Token Authentication
- Generates optimal maintenance schedule
- Custom logging middleware integration
- Error handling

---

## Screenshots

Project output screenshots are available in the `screenshots` folder.

---

## Author

**Manitej B**
