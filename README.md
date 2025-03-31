# UssdJS - A USSD Framework for Node.js

UssdJS is a TypeScript-based USSD framework designed to simplify the development of USSD applications in Ghana. It abstracts the complexities of handling different USSD gateways, session management, and menus, providing developers with a seamless integration experience.

## Features
- **Multiple Gateway Support** (Hubtel, Africa's Talking, Twilio, Custom)
- **Standardized Request & Response Handling**
- **Session Management** (Default: Redis, Supports: In-memory, MongoDB, MySQL, PostgreSQL)
- **Menu Navigation & Input Handling**
- **Form & Pagination Support**
- **Customizable Session Resume**
- **Dependency Injection & Middleware Support**
- **Seamless Express.js Integration**

## Installation
To install UssdJS, run:
```sh
npm install ussdjs
```
or run
```sh
yarn add ussdjs
```

Getting Started

1. Initialize UssdJS in your project
```javascript
import express from "express";
import { initializeUssdService, ussdMiddleware } from "ussdjs";
import { UssdGateway } from "ussdjs/models/UssdGateway";

const app = express();
app.use(express.json());

// Configure USSD Service
initializeUssdService({
    gateway: UssdGateway.HUBTEL,
    storage: "redis",
    resumeSession: true
});

// USSD Middleware
app.post("/ussd", ussdMiddleware);

const PORT = 3000;
app.listen(PORT, () => console.log(`USSD Server running on port ${PORT}`));
```
