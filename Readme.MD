# 🌟Lost and Found System

## 📜 Overview

Welcome to the Lost and Found System! This project is a comprehensive solution to help users report lost items and claim found items, providing a seamless and organized way to reunite people with their lost belongings. This application is for a Lost and Found System built using TypeScript, Express.js, Prisma for PostgreSQL, and JWT for authentication.

## 🌐 Live URL

Click here to visit lost and found system [Live Url](https://assign-8-two.vercel.app/api/register)

## 📚 Features

- User Registration
- User Login
- Create Found Item Category
- Report a Found Item
- Get Paginated and Filtered Found Items
- Create a Claim
- Get Claims
- Update Claim Status
- Get Profile
- Update My Profile

## 🛠️ Technology Stack

- **Programming Language:** TypeScript
- **Web Framework:** Express.js
- **Object Relational Mapping (ORM):** Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** PostgreSQL

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running

### ⚙️ Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-shuvo-h.git
    ```

2. Navigate to the project directory:

    ```bash
    cd l2-b2-fullstack-track-assignment-8-shuvo-h
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:
    
    Create a `.env` file in the root directory and add the following:

    ```
    DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>"
    JWT_SECRET="<your_jwt_secret>"
    NODE_ENV=<your-production-env>
    PORT=<your-port>
    JWT_SECRET=<your-jwt-secret>
    EXPIRES_IN=<your-jwt-expire-time>
    REFRESH_TOKEN_SECRET=<your-jwt-refresh-secret>
    REFRESH_TOKEN_EXPIRES_IN=<your-jwt-refresh-secret>
    ```

5. Run database migrations:

    ```bash
    npx prisma migrate deploy
    ```

6. Start the server:

    ```bash
    npm start
    ```

## **Error Handling:**

All ther error occured in the server will be pass in the below format. 

### **Sample Error Response:**

- For Validation Error:

```json
{
    "success": false,
    "message": "Name field is required. Email must be a valid email address.",
    "errorDetails": {
        "issues": [
            {
                "field": "name",
                "message": "Name field is required."
            },
            {
                "field": "email",
                "message": "Email must be a valid email address."
            }
        ]
    }
}

```

- For General or Generic Errors

```json
{
    "success": false,
    "message": "error mesage",
    "errorDetails": error
}

```

- Unauthorized Error Response

If an unauthorized access attempt is detected, the system will respond with the following error message:

```json
{
    "success": false,
    "message": "error mesage",
    "errorDetails": unauthorized error
}
```

## 🚀 API Endpoints

### User Registration
This endpoint handles user registration, creating both the user account and corresponding user profile simultaneously using a transactional approach.

- **Endpoint:** **`POST /api/register`**
- **Request Body:**

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password",
    "profile": {
        "bio": "Passionate about helping people find their lost items.",
        "age": 30
		}
 }
```

- **Response:** 

```json
{
    "success": true,
    "statusCode": 201,
    "message": "User registered successfully",
    "data": {
        "id": "b9964127-2924-42bb-9970-60f93c016bvf",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2024-03-23T12:00:00Z",
        "updatedAt": "2024-03-23T12:00:00Z",
        "profile": {
            "id": "c1982e1a-4f01-4b6b-a313-54f78cbb8e55",
            "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
            "bio": "Passionate about helping people find their lost items.",
            "age": 30,
            "createdAt": "2024-03-23T12:00:00Z",
            "updatedAt": "2024-03-23T12:00:00Z"
        }
    }
}
```



###  User Login
- **Endpoint:** **`POST /api/login`**
- **Request Body:**

```json
{
    "email": "john@example.com",
    "password": "password"
}
```

- **Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully",
    "data": {
        "id": "b9964127-2924-42bb-9970-60f93c016bvf",
        "name": "John Doe",
        "email": "john@example.com",
        "token": "<JWT token>",
    }
}
```




### Create Found Item Category
This endpoint allows authenticated users to create a new category for found items.

- **Endpoint:** **`POST /api/found-item-categories`**
- **Request Headers:**
    - **`Authorization: <JWT_TOKEN>`**
- **Request Body:**

```json
{
    "name": "Electronics"
}
```

- **Response:**

```json
{
    "success": true,
    "statusCode": 201,
    "message": "Found item category created successfully",
    "data": {
        "id": "9deaf54e-3f4f-4b50-9902-6c272f73db4a",
        "name": "Electronics",
        "createdAt": "2024-03-26T12:00:00Z",
        "updatedAt": "2024-03-26T12:00:00Z"
    }
}
```






### Report a Found Item**

- **Endpoint:** **`POST /api/found-items`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
    "categoryId": "9deaf54e-3f4f-4b50-9902-6c272f73db4a",
    "foundItemName": "iPhone 12 Pro",
    "description": "Lost iPhone 12 Pro, some other information about the item",
    "location": "Rampura, Banssree"
}
```

- **Response:**

```json
{
    "success": true,
    "statusCode": 201,
    "message": "Found item reported successfully",
    "data": {
        "id": "b9964127-2924-42bb-9970-60f93c0162lm",
        "userId": "b9964127-2924-42bb-9970-60f93c016bvf", 
        "user": {
            "id": "b9964127-2924-42bb-9970-60f93c016bvf",
            "name": "John Doe",
            "email": "john@example.com",
            "createdAt": "2024-03-23T12:00:00Z",
            "updatedAt": "2024-03-23T12:00:00Z"
        },
        "categoryId": "9deaf54e-3f4f-4b50-9902-6c272f73db4a",
        "category": {
            "id": "9deaf54e-3f4f-4b50-9902-6c272f73db4a",
            "name": "Electronics",
            "createdAt": "2024-03-26T12:00:00Z",
            "updatedAt": "2024-03-26T12:00:00Z"
        },
        "foundItemName": "iPhone 12 Pro",
        "description": "Lost iPhone 12 Pro, some other information about the item",
        "location": "Rampura, Banssree",
        "createdAt": "2024-03-23T12:00:00Z",
        "updatedAt": "2024-03-23T12:00:00Z"
    }
}
```

### Get Paginated and Filtered Found Items

- **Endpoint:** **`GET /api/found-items`**

**Query Parameters for API Requests:**

When interacting with the API, you can utilize the following query parameters to customize and filter the results according to your preferences.

- searchTerm: (Optional) Searches for items based on a keyword or phrase. Only applicable to the following fields: `foundItemName`, `location`, `description`  (searching mode insensitive)
- page: (Optional) Specifies the page number for paginated results. Default is 1. Example: ?page=1
- limit: (Optional) Sets the number of items per page. Default is a predefined limit. Example: ?limit=10
- sortBy: (Optional) Specifies the field by which the results should be sorted. Only applicable to the following fields: `foundItemName`, `category`, `foundDate`. Example: ?sortBy=foundItemName
- sortOrder: (Optional) Determines the sorting order, either 'asc' (ascending) or 'desc' (descending). Example: ?sortOrder=desc
- foundItemName: (Optional) Filters results by the name of the found item. Example: ?foundItemName=iphone 15 pro
- **Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Found items retrieved successfully",
    "meta": {
        "total": 20,
        "page": 1,
        "limit": 10
    },
    "data": [
        {
            "id": "9deaf54e-3f4f-4b50-9902-6c272f73db4a",
            "foundItemName": "iPhone 12 Pro",
            "description": "Lost iPhone 12 Pro, some other information about the item",
            "location": "Rampura, Banssree",
            "createdAt": "2024-03-23T12:00:00Z",
            "updatedAt": "2024-03-23T12:00:00Z",
            "user": {
                "id": "b9964127-2924-42bb-9970-60f93c016bvf",
                "name": "John Doe",
                "email": "john@example.com",
                "createdAt": "2024-03-23T12:00:00Z",
                "updatedAt": "2024-03-23T12:00:00Z"
            },
            "category": {
                "id": "9deaf54e-3f4f-4b50-9902-6c272f73db4a",
                "name": "Electronics",
                "createdAt": "2024-03-26T12:00:00Z",
                "updatedAt": "2024-03-26T12:00:00Z"
            }
        },
        {
            "id": "7b3ad54e-3f4f-4b50-9902-6c272f73db4b",
            "foundItemName": "Laptop",
            "description": "Found a laptop at the bus stop.",
            "location": "Dhanmondi, Dhaka",
            "createdAt": "2024-03-24T08:00:00Z",
            "updatedAt": "2024-03-24T08:00:00Z",
            "user": {
                "id": "b9964127-2924-42bb-9970-60f93c016bvf",
                "name": "John Doe",
                "email": "john@example.com",
                "createdAt": "2024-03-23T12:00:00Z",
                "updatedAt": "2024-03-23T12:00:00Z"
            },
            "category": {
                "id": "9deaf54e-3f4f-4b50-9902-6c272f73db4a",
                "name": "Electronics",
                "createdAt": "2024-03-26T12:00:00Z",
                "updatedAt": "2024-03-26T12:00:00Z"
            }
        },
        // More found items
    ]
}

```





### Create a Claim

- **Endpoint:** **`POST /api/claims`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
    "foundItemId": "9deaf54e-3f4f-4b50-9902-6c272f73db4a",
    "distinguishingFeatures": "My phone has a small scratch on the back cover.",
    "lostDate": "2024-03-25T10:00:00Z"
}
```

- **Response:**

```json
{
    "success": true,
    "statusCode": 201,
    "message": "Claim created successfully",
    "data": {
        "id": "a8c74a93-c76f-4f63-aa54-7dbcf584e437",
        "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
        "foundItemId": "9deaf54e-3f4f-4b50-9902-6c272f73db4a",
        "distinguishingFeatures": "My phone has a small scratch on the back cover.",
        "lostDate": "2024-03-25T10:00:00Z",
        "status": "PENDING",
        "createdAt": "2024-03-26T12:05:00Z",
        "updatedAt": "2024-03-26T12:05:00Z"
    }
}
```

### Get Claims

- **Endpoint:** **`GET /api/claims`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Response:**

```json

{
    "success": true,
    "statusCode": 200,
    "message": "Claims retrieved successfully",
    "data": [
        {
            "id": "a8c74a93-c76f-4f63-aa54-7dbcf584e437",
            "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
            "foundItemId": "9deaf54e-3f4f-4b50-9902-6c272f73db4a",
            "distinguishingFeatures": "My phone has a small scratch on the back cover.",
            "lostDate": "2024-03-25T10:00:00Z",
            "status": "PENDING",
            "createdAt": "2024-03-26T12:05:00Z",
            "updatedAt": "2024-03-26T12:05:00Z",
            "foundItem": {
                "id": "9deaf54e-3f4f-4b50-9902-6c272f73db4a",
                "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
                "categoryId": "1b3d5083-4b41-47ff-8567-3829ee5cfb71",
                "foundItemName": "iPhone 12 Pro",
                "description": "Found iPhone 12 Pro in a black case.",
                "location": "123 Main Street, Cityville",
                "createdAt": "2024-03-25T08:00:00Z",
                "updatedAt": "2024-03-25T08:00:00Z",
                "user": {
                    "id": "b9964127-2924-42bb-9970-60f93c016bvf", 
                    "name": "John Doe",
                    "email": "john@example.com",
                    "createdAt": "2024-03-23T12:00:00Z",
                    "updatedAt": "2024-03-23T12:00:00Z"
                },
                "category": {
                    "id": "1b3d5083-4b41-47ff-8567-3829ee5cfb71",
                    "name": "Electronics",
                    "createdAt": "2024-03-24T09:00:00Z",
                    "updatedAt": "2024-03-24T09:00:00Z"
                }
            }
        },
        // More claims...
    ]
}
```






### Update Claim Status

- **Endpoint:** **`PUT /api/claims/:claimId`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json

{
    "status": "APPROVED"
}
```

- **Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Claim updated successfully",
    "data": {
        "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
        "userId": "9b0dadf5-10fd-41d1-8355-80e67c85727t",
        "foundItemId": "9b0dadf5-10fd-41d1-8345-80e67c85727c",
        "distinguishingFeatures": "My phone has a dent in the back",
        "lostDate": "2024-03-23T12:00:00Z",
        "status": "APPROVED",
        "createdAt": "2024-03-23T12:05:00Z",
        "updatedAt": "2024-03-23T12:05:00Z"
    }
}
```






### Get Profile

- **Endpoint:** **`GET /api/my-profile`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Response:**

```json

{
    "success": true,
    "statusCode": 200,
    "message": "Profile retrieved successfully",
    "data": {
        "id": "b9964127-2924-42bb-9970-60f93c016bfr",
        "userId": "b9964127-2924-42bb-9970-60f93c016b3f",
        "bio": "Passionate about helping people find their lost items.",
        "age": 30,
        "createdAt": "2024-03-23T12:00:00Z",
        "updatedAt": "2024-03-23T12:05:00Z",
        "user": {
            "id": "b9964127-2924-42bb-9970-60f93c016b3f",
            "name": "John Doe",
            "email": "john@example.com",
            "createdAt": "2024-03-23T12:00:00Z",
            "updatedAt": "2024-03-23T12:00:00Z"
        }
    }
}

```





###  Update My Profile
This endpoint allows users to update their profile information such as bio and age.

- **Endpoint:** **`PUT /api/my-profile`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json

{
    "bio": "Updated bio text",
    "age": 35
}
```

- **Response:**

```json

{
    "success": true,
    "statusCode": 200,
    "message": "User profile updated successfully",
    "data": {
        "id": "b9964127-2924-42bb-9970-60f93c016bfr",
        "userId": "b9964127-2924-42bb-9970-60f93c016b3f",
        "bio": "Updated bio text",
        "age": 35,
        "createdAt": "2024-03-23T12:00:00Z",
        "updatedAt": "2024-03-24T10:00:00Z",
        "user": {
            "id": "b9964127-2924-42bb-9970-60f93c016b3f",
            "name": "John Doe",
            "email": "john@example.com",
            "createdAt": "2024-03-23T12:00:00Z",
            "updatedAt": "2024-03-23T12:00:00Z"
        }
    }
}
```



## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.