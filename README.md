# 📦 Inventory Management Backend

A **Node.js + Express** backend API for managing inventory.  
This project includes modules for **authentication**, **product management**, **categories**, **stock tracking**, and **orders/sales**.  
It follows **REST API best practices** and uses **MongoDB** for data storage with **Zod** for validation.

---

## 🚀 Overview

This project is a backend API for an **Inventory Management System**.  
It provides endpoints for managing:
- Authentication
- Products
- Categories
- Orders
- Stock transactions  

The backend is built with **Node.js** and **Express**, using a **modular structure** for controllers, models, routes, and middleware.

---

## 🧩 Features

- 🔐 **Authentication (JWT-based)** – User login/signup  
- 🛒 **Products API** – Add, update, delete, and view products  
- 🗂️ **Categories API** – Manage product categories  
- 📦 **Stock API** – Track stock in/out movements  
- 🧾 **Orders/Sales API** – Create and manage orders with status & filters  

---

## ⚙️ Tech Stack

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Zod (for validation)  
- JWT (for authentication)

---

## 🧰 Getting Started

### 🪛 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)  
- [npm](https://www.npmjs.com/) (comes with Node.js)  
- A running MongoDB instance (local or cloud)

---

### 💻 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arshadjamil13/Inventory_Management_System.git
   cd Inventory_Management_System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/inventory_db
     JWT_SECRET=your_jwt_secret
     ```

---

### 🏃 Running the Server

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

Server runs at:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧾 API Endpoints

### **Auth**
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/signin` | Login user |
| GET | `/api/auth/profile` | Get user details |

---

### **Products**
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/product/createproduct` | Create a product |
| GET | `/api/product/getproducts` | Get all products |
| GET | `/api/product/getproductbysku/:sku` | Get product by SKU |
| GET | `/api/product/getproductbycategory` | Get product by category |
| GET | `/api/product/productbyfilterwithname` | Filter product by name |
| PUT | `/api/product/updateproduct/:sku` | Update product |
| DELETE | `/api/product/deleteproduct/:sku` | Delete product |

---

### **Categories**
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/category/createcategory` | Create category |
| GET | `/api/category/getcategory` | Get all categories |
| PUT | `/api/category/updatecategory/:id` | Update category |
| DELETE | `/api/category/deletecategory/:id` | Delete category |

---

### **Stock**
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/stock/increaseproduct/:id` | Add stock for a product |
| POST | `/api/stock/decreaseproduct/:id` | Remove stock from a product |
| GET | `/api/stock/getstockhistory` | Get stock history |
| GET | `/api/stock/getstocksummary` | Get stock summary |
| GET | `/api/stock/getstockhistorybydate` | Get stock by date |

---

### **Orders**
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/order/createorder` | Create order |
| GET | `/api/order/getallorders` | Get all orders (with filters) |
| GET | `/api/order/getorderbyid/:id` | Get single order by ID |
| GET | `/api/order/ordersummary` | Get order summary by date |
| PUT | `/api/order/updateorder/:id` | Update order |
| DELETE | `/api/order/deleteorder/:id` | Delete/cancel order |

---

## 🧪 Running Tests

Automated tests are not implemented yet.  
However, you can **test APIs manually via Postman** using the detailed examples below.
---

## 🔐 Auth APIs

### 1️⃣ Signup API
**Endpoint:**  
`POST /auth/signup`  

**Description:** Register a new user (admin or staff).  

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "mypassword",
  "role": "admin"
}
```

**Response Body:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64b123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

- `role` is optional; defaults to `"staff"` if not provided.  
- You will get a JWT token in the response (prefix included as `"Bearer "`).  

---

### 2️⃣ Signin API
**Endpoint:**  
`POST /auth/signin`  

**Description:** Login existing user and get JWT token.  

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "mypassword"
}
```

**Response Body:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64b123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

- Copy the `token` from this response to use in all protected routes.  

---

### 3️⃣ Profile API
**Endpoint:**  
`GET /auth/profile`  

**Description:** Fetch the logged-in user’s profile.  

**Request Header:**
```
Authorization: Bearer <token>
```

**Response Body:**
```json
{
  "success": true,
  "info": {
    "_id": "64b123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

---

## 🗂️ Category APIs

### 1️⃣ Create Category
**Method:** POST  
**Endpoint:** `/category/createcategory`  

**Authorization:**
```
Header: Authorization: Bearer <admin_token>
```
- Token must belong to an admin user.  

**Request Body:**
```json
{
  "name": "Electronics",
  "description": "Devices and gadgets"
}
```

**Response Body:**
```json
{
  "message": "Category created successfully",
  "Category": {
    "_id": "652ecabc12...",
    "name": "Electronics",
    "description": "Devices and gadgets",
    "createdAt": "2025-10-06T10:00:00Z"
  }
}
```

---

### 2️⃣ Get Categories
**Method:** GET  
**Endpoint:** `/category/getcategory`  

**Authorization:**
```
Header: Authorization: Bearer <token>
```
- Token must belong to an admin user.  

**Query Params (optional):**
- `page` → number  
- `limit` → number  

**Response Body:**
```json
{
  "Categories": [
    {
      "_id": "652ecabc12...",
      "name": "Electronics",
      "description": "Devices and gadgets"
    }
  ]
}
```

---

### 3️⃣ Update Category
**Method:** PUT  
**Endpoint:** `/category/updatecategory/:id`  

**Authorization:**
```
Header: Authorization: Bearer <admin_token>
```
**Params:** `id = category_id (MongoDB ID)`  

**Request Body:**
```json
{
  "name": "Smart Devices",
  "description": "Updated category description"
}
```

**Response Body:**
```json
{
  "message": "Category updated",
  "updatedcategory": {
    "_id": "652ecabc12a3d",
    "name": "Smart Devices",
    "description": "Updated category description"
  }
}
```

---

### 4️⃣ Delete Category
**Method:** DELETE  
**Endpoint:** `/category/deletecategory/:id`  

**Authorization:**
```
Header: Authorization: Bearer <admin_token>
```
**Params:** `id = category_id (MongoDB ID)`  

**Response Body:**
```json
{
  "message": "Category Deleted",
  "Category": {
    "_id": "652ecabc12a3d",
    "name": "Smart Devices",
    "description": "Updated category description"
  }
}
```


## 🧩 Product APIs

### 1. Create Product
**Method:** `POST`  
**Endpoint:** `/createproduct`  
**Authorization:**  
Header: `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "name": "iPhone 16",
  "sku": "IPH16",
  "category_id": "652ed41b123abc456def7890",
  "price": 89999,
  "stock_quantity": 25
}
```

**Response Body:**
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "652ed41b12...",
    "name": "iPhone 16",
    "sku": "IPH16",
    "category_id": "652ed41b123abc456def7890",
    "price": 89999,
    "stock_quantity": 25
  }
}
```

---

### 2. Get All Products
**Method:** `GET`  
**Endpoint:** `/product/getproducts`  
**Authorization:**  
Header: `Authorization: Bearer <token>`

**Query Params (optional):**
- `page` → number  
- `limit` → number  

**Response Body:**
```json
{
  "Products": [
    {
      "_id": "652ed41b12...",
      "name": "iPhone 16",
      "sku": "IPH16",
      "price": 89999
    }
  ]
}
```

---

### 3. Get Product by SKU
**Method:** `GET`  
**Endpoint:** `/product/getproductbysku`  
**Authorization:**  
Header: `Authorization: Bearer <token>`

**Query:**
- `sku` (required) → ProductSku  

**Response Body:**
```json
{
  "Products": {
    "_id": "652ed41b12...",
    "name": "iPhone 16",
    "sku": "IPH16",
    "price": 89999
  }
}
```

---

### 4. Get Products by Category
**Method:** `GET`  
**Endpoint:** `/product/getproductbycategory`  
**Authorization:**  
Header: `Authorization: Bearer <token>`

**Query:**
- `categoryId` → (MongoDB ID) - Required  
- `page` → number (optional)  
- `limit` → number (optional)

**Response Body:**
```json
{
  "Products": [
    {
      "_id": "652ed41b12...",
      "name": "iPhone 16",
      "category_id": {
        "name": "Electronics",
        "description": "Devices and gadgets"
      }
    }
  ]
}
```

---

### 5. Filter Products by Name
**Method:** `GET`  
**Endpoint:** `/products/productbyfilterwithname`  
**Authorization:**  
Header: `Authorization: Bearer <token>`

**Query:**
- `filter` → optional  

**Response Body:**
```json
{
  "Products": [
    {
      "product": {
        "_id": "652ed41b12...",
        "name": "iPhone 16",
        "sku": "IPH16"
      }
    }
  ]
}
```

---

### 6. Update Product
**Method:** `PUT`  
**Endpoint:** `/product/updatproduct/:sku`  
**Authorization:**  
Header: `Authorization: Bearer <admin_token>`

**Params:**
- `sku` → Required  

**Request Body:**
```json
{
  "price": 95000,
  "stock_quantity": 30
}
```

**Response Body:**
```json
{
  "message": "Product updated",
  "updatedProduct": {
    "_id": "652ed41b12...",
    "sku": "IPH16",
    "price": 95000,
    "stock_quantity": 30
  }
}
```

---

### 7. Delete Product
**Method:** `DELETE`  
**Endpoint:** `/delete/deleteproduct/:sku`  
**Authorization:**  
Header: `Authorization: Bearer <admin_token>`

**Params:**
- `sku` → Required  

**Response Body:**
```json
{
  "message": "Product Deleted",
  "Product": {
    "_id": "652ed41b12...",
    "sku": "IPH16"
  }
}
```

---

## 📦 Stock APIs

### 1. Increase Product Stock
**Method:** `POST`  
**Endpoint:** `/stock/increaseproduct/:id`  
**Authorization:**  
Header: `Authorization: Bearer <admin_token>`

**Params:**
- `id` → MongoDB ProductId  

**Request Body:**
```json
{
  "quantity": 10,
  "reason": "PURCHASE"
}
```

**Response Body:**
```json
{
  "message": "Stock Increased",
  "Product": {
    "_id": "652ed41b123abc456def7890",
    "name": "iPhone 16",
    "stock_quantity": 35
  },
  "Stock": {
    "productId": "652ed41b123abc456def7890",
    "type": "IN",
    "quantity": 10,
    "reason": "Restocking from supplier",
    "performedBy": "userId123"
  }
}
```

---

### 2. Decrease Product Stock
**Method:** `POST`  
**Endpoint:** `/stock/decreasestock/:id`  
**Authorization:**  
Header: `Authorization: Bearer <admin_token>`

**Params:**
- `id` → MongoDB ProductId  

**Request Body:**
```json
{
  "quantity": 5,
  "reason": "Customer order fulfillment"
}
```

**Response Body:**
```json
{
  "message": "Stock Decreased",
  "Product": {
    "_id": "652ed41b123abc456def7890",
    "stock_quantity": 20
  },
  "Stock": {
    "productId": "652ed41b123abc456def7890",
    "type": "OUT",
    "quantity": 5,
    "reason": "Customer order fulfillment"
  }
}
```

---

### 3. Get Stock History (All Transactions)
**Method:** `GET`  
**Endpoint:** `/stock/getstockhistory`  
**Authorization:**  
Header: `Authorization: Bearer <token>`

**Query Params (optional):**
- `page`  
- `limit`

**Response Body:**
```json
{
  "History": [
    {
      "productId": {
        "name": "iPhone 16",
        "sku": "IPH16",
        "price": 89999
      },
      "type": "IN",
      "quantity": 10,
      "reason": "Restocking from supplier"
    }
  ]
}
```

---

### 4. Get Stock Summary
**Method:** `GET`  
**Endpoint:** `/stock/getstocksummary`  
**Authorization:**  
Header: `Authorization: Bearer <token>`

**Response Body:**
```json
{
  "Products": [
    {
      "_id": "652ed41b123abc456def7890",
      "name": "iPhone 16",
      "sku": "IPH16",
      "price": 89999,
      "stock_quantity": 25,
      "category_id": { "name": "Electronics" }
    }
  ]
}
```

---

### 5. Get Stock History by Date Range
**Method:** `GET`  
**Endpoint:** `/stock/getstockhistorybydate`  
**Authorization:**  
Header: `Authorization: Bearer <token>`

**Query Parameters:**
- `start` → Required (e.g. `2025-09-01`)  
- `end` → Required (e.g. `2025-09-03`)  
- `page` → optional  
- `limit` → optional  

**Response Body:**
```json
{
  "success": true,
  "History": [
    {
      "productId": {
        "name": "iPhone 16",
        "sku": "IPH16"
      },
      "type": "OUT",
      "quantity": 3,
      "reason": "Customer sale"
    }
  ]
}
```

---

## 🧾 Order APIs

### 1. Create Order
**Method:** `POST`  
**Endpoint:** `/order/createorders`  
**Authorization:**  
Header: `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "customer": {
    "name": "Aamir Sohaib",
    "email": "aamir123@gmail.com",
    "phone": "7598458988"
  },
  "items": [
    {
      "productId": "68dd7c843785286e03498569",
      "quantity": 1
    }
  ],
  "paymentMethod": "card"
}
```

**Response Body:**
```json
{
  "message": "Successfully Order Created",
  "Order": {
    "customer": {
      "name": "Aamir Sohaib",
      "email": "aamir123@gmail.com",
      "phone": 7598458988
    },
    "items": [
      {
        "productId": "68dd7c843785286e03498569",
        "quantity": 1,
        "price": 1300,
        "subtotal": 1300,
        "_id": "68e3f25bb88b93ca40966a39"
      }
    ],
    "totalAmount": 1300,
    "paymentMethod": "card",
    "paymentStatus": "pending",
    "orderStatus": "pending",
    "createdBy": "68dadc0a09c3c8afa176cbfa",
    "_id": "68e3f25bb88b93ca40966a38",
    "createdAt": "2025-10-06T16:46:19.168Z",
    "updatedAt": "2025-10-06T16:46:19.168Z",
    "__v": 0
  }
}
```

---

### 2. Get All Orders
**Method:** `GET`  
**Endpoint:** `/order/getallorders`  
**Authorization:**  
Header: `Authorization: Bearer <token>`

**Query Params (optional):**
- `orderstatus`
- `paymentstatus`
- `from`
- `to`
- `page`
- `limit`

**Response Body:**
```json
{
  "success": true,
  "Orders": [
    {
      "_id": "653012f235c2c4a91b126f90",
      "customer": "John Doe",
      "items": [
        {
          "productId": {
            "_id": "652f77af35d91e5b1c1256d8",
            "name": "iPhone 14",
            "sku": "APL-IP14",
            "category_id": "650fe1289abc1234ef561234"
          },
          "quantity": 2,
          "price": 500,
          "subtotal": 1000
        }
      ],
      "totalAmount": 1000,
      "paymentMethod": "credit_card",
      "paymentStatus": "pending",
      "orderStatus": "pending",
      "createdAt": "2025-10-06T14:15:22.123Z"
    }
  ]
}
```

---

### 3. Get Order by ID
**Method:** `GET`  
**Endpoint:** `/getorderbyid/:id`  
**Authorization:**  
Header: `Authorization: Bearer <token>`

**Params:**
- `id` → Required  

**Response Body:**
```json
{
  "success": true,
  "Order": {
    "_id": "653012f235c2c4a91b126f90",
    "customer": "John Doe",
    "items": [
      {
        "productId": {
          "_id": "652f77af35d91e5b1c1256d8",
          "name": "iPhone 14",
          "sku": "APL-IP14",
          "category": "Electronics"
        },
        "quantity": 2,
        "price": 500,
        "subtotal": 1000
      }
    ],
    "totalAmount": 1000,
    "paymentMethod": "credit_card",
    "paymentStatus": "pending",
    "orderStatus": "pending",
    "createdAt": "2025-10-06T14:15:22.123Z"
  }
}
```

---

### 4. Order Summary
**Method:** `GET`  
**Endpoint:** `/order/ordersummary`  
**Authorization:**  
Header: `Authorization: Bearer <token>`

**Query Params:**
- `from` → ISO date (e.g. `2025-10-01`)  
- `to` → ISO date (e.g. `2025-10-06`)

**Response Body:**
```json
{
  "success": true,
  "summary": {
    "_id": null,
    "totalSales": 18000,
    "orderCount": 12
  }
}
```

---

### 5. Update Order
**Method:** `PUT`  
**Endpoint:** `/order/updateorder/:id`  
**Authorization:**  
Header: `Authorization: Bearer <admin_token>`

**Params:**
- `id` → Required  

**Request Body:**
```json
{
  "orderStatus": "completed",
  "paymentStatus": "paid"
}
```

**Response Body:**
```json
{
  "success": true,
  "Order": {
    "_id": "653012f235c2c4a91b126f90",
    "orderStatus": "completed",
    "paymentStatus": "paid",
    "customer": "John Doe",
    "totalAmount": 1800,
    "updatedAt": "2025-10-06T16:45:30.511Z"
  }
}
```

---

### 6. Delete (Cancel) Order
**Method:** `DELETE`  
**Endpoint:** `/order/deleteorder/:id`  
**Authorization:**  
Header: `Authorization: Bearer <admin_token>`

**Params:**
- `id` → Required  

**Response Body:**
```json
{
  "success": true,
  "message": "Order cancelled"
}
```
## Assumptions & Design Choices

- **User Roles**: Only admins can create/update/delete products ,stock and order
- **Validation**: All incoming data is validated using Zod (for ObjectId, enums, and dates).  
- **Order Handling**: 
  - Orders deduct stock immediately.  
  - Default statuses: `orderStatus = pending`, `paymentStatus = pending`.  
- **Date Filters**: Date queries (`from` and `to`) are provided by users in ISO string format and parsed into Date objects.  
- **Stock Tracking**: Instead of directly updating product quantities, stock history is logged through APIs.  
- **Error Handling**: APIs return consistent error messages with appropriate HTTP status codes.  
- **Database**: MongoDB is used due to flexibility in handling nested schemas (orders contain multiple items).  
- **Testing**: Manual testing was performed using Postman (instead of Jest/Mocha) due to time constraints.  




 

Feel free to contribute or raise issues for improvements!
