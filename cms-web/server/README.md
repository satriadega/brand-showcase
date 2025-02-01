# Project Setup Instructions `brand-showcase/cms-web/server`

## Steps to Run the Project

1. Set up `config.json` with the correct PostgreSQL address:
   - Navigate to the `config` folder.
   - Update `config.json` with your PostgreSQL `username`, `password`, `database`, and `host`.

2. Make the setup script executable:
   ```bash
   chmod +x dbsetup-sequelize.sh #for db-setup
   chmod +x dbdrop-sequelize.sh #for db-drop
3. Run the setup script:
   ```bash
   npm install
   ./dbsetup-sequelize.sh
   npm start

## Swagger docs at local http://localhost:6661/api-docs
<br />

# API Documentation  

This is the official documentation for the API. The API provides endpoints for user registration, login, post management, admin management, and category management. The documentation is auto-generated using Swagger.  

## Table of Contents  

- [Getting Started](#getting-started)  
- [API Endpoints](#api-endpoints)  
  - [Authentication](#authentication)  
  - [Posts](#posts)  
  - [Admins](#admins)  
  - [Categories](#categories)  
- [Swagger Documentation](#swagger-documentation)  
- [Development](#development)  

---  

## Getting Started  

To use this API, you need to make HTTP requests to the appropriate endpoints. The base URL for the API is:  

```
http://localhost:3000
```  

All endpoints require specific HTTP methods (e.g., `GET`, `POST`, `PUT`, `DELETE`) and may require request headers, parameters, or a request body.  

---  

## API Endpoints  

### Authentication  

#### Register a New User  

- **Endpoint:** `POST /register`  
- **Description:** Register a new user.  

**Request Body:**  

```json  
{  
    "username": "string",  
    "email": "string",  
    "password": "string",  
    "phoneNumber": "string",  
    "address": "string"  
}  
```  

**Response:** `201 Created`  

#### Login  

- **Endpoint:** `POST /login`  
- **Description:** Authenticate a user.  

**Request Body:**  

```json  
{  
    "email": "string",  
    "password": "string"  
}  
```  

**Response:** `200 OK`  

---  

### Posts  

#### Get All Posts  

- **Endpoint:** `GET /posts`  
- **Description:** Retrieve a list of all posts.  

**Response:** `200 OK`  

#### Create a New Post  

- **Endpoint:** `POST /posts`  
- **Description:** Create a new post.  
- **Headers:**  
  - `access_token: string (required)`  

**Request Body:**  

```json  
{  
    "title": "string",  
    "content": "string",  
    "imgUrl": "string",  
    "categoryId": "string",  
    "tags": "string"  
}  
```  

**Response:** `201 Created`  

#### Get a Specific Post  

- **Endpoint:** `GET /posts/{id}`  
- **Description:** Retrieve details of a specific post.  
- **Parameters:**  
  - `id: string (required, in path)`  

**Response:** `200 OK`  

#### Update a Post  

- **Endpoint:** `PUT /posts/{id}`  
- **Description:** Update an existing post.  
- **Headers:**  
  - `access_token: string (required)`  
- **Parameters:**  
  - `id: string (required, in path)`  

**Request Body:**  

```json  
{  
    "title": "string",  
    "content": "string",  
    "imgUrl": "string",  
    "categoryId": "string",  
    "tags": "string"  
}  
```  

**Response:** `201 Created`  

#### Delete a Post  

- **Endpoint:** `DELETE /posts/{id}`  
- **Description:** Delete a specific post.  
- **Headers:**  
  - `access_token: string (required)`  
- **Parameters:**  
  - `id: string (required, in path)`  

**Response:** `200 OK`  

---  

### Admins  

#### Create a New Admin  

- **Endpoint:** `POST /admins`  
- **Description:** Create a new admin user.  
- **Headers:**  
  - `access_token: string (required)`  

**Request Body:**  

```json  
{  
    "username": "string",  
    "email": "string",  
    "password": "string",  
    "phoneNumber": "string",  
    "address": "string"  
}  
```  

**Response:** `201 Created`  

---  

### Categories  

#### Create a New Category  

- **Endpoint:** `POST /categories`  
- **Description:** Create a new category.  
- **Headers:**  
  - `access_token: string (required)`  

**Request Body:**  

```json  
{  
    "name": "string"  
}  
```  

**Response:** `201 Created`  

#### Get All Categories  

- **Endpoint:** `GET /categories`  
- **Description:** Retrieve a list of all categories.  
- **Headers:**  
  - `access_token: string (required)`  

**Response:** `200 OK`  

#### Get a Specific Category  

- **Endpoint:** `GET /categories/{id}`  
- **Description:** Retrieve details of a specific category.  
- **Headers:**  
  - `access_token: string (required)`  
- **Parameters:**  
  - `id: string (required, in path)`  

**Response:** `200 OK`  

#### Update a Category  

- **Endpoint:** `PUT /categories/{id}`  
- **Description:** Update an existing category.  
- **Headers:**  
  - `access_token: string (required)`  
- **Parameters:**  
  - `id: string (required, in path)`  

**Request Body:**  

```json  
{  
    "name": "string"  
}  
```  

**Response:** `201 Created`  

#### Delete a Category  

- **Endpoint:** `DELETE /categories/{id}`  
- **Description:** Delete a specific category.  
- **Headers:**  
  - `access_token: string (required)`  
- **Parameters:**  
  - `id: string (required, in path)`  

**Response:** `200 OK`  
