# Inventory Management Backend

This project is a backend API for an Inventory Management System. It provides endpoints for managing users, authentication, products, categories, orders, and stock transactions. The backend is built with Node.js and Express, using a modular structure for controllers, models, routes, and middleware.
A Node.js + Express backend API for managing inventory.
This project includes modules for authentication, product management, categories, stock tracking, and order/sales.
It follows REST API best practices and uses MongoDB for data storage with Zod for validation.

## Features
Authentication (JWT-based) – User login/signup
Products API – Add, update, delete, and view products
Categories API – Manage product categories
Stock API – Track stock in/out movements
Orders/Sales API – Create and manage orders with status & filters

## Tech Stack
Node.js
Express.js
MongoDB + Mongoose
Zod (for validation)
JWT (for authentication)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A running MongoDB instance (local or cloud)

### Installation
1. **Clone the repository:**
   ```powershell
   git clone <repository-url>
   cd Inventory_Management_System
   ```
2. **Install dependencies:**
   ```powershell
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables (adjust as needed):
     ```env
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/inventory_db
     JWT_SECRET=your_jwt_secret
     ```

### Running the Server
``

For development (with nodemon):

npm run dev


For production:

npm start


The server will start at:

http://localhost:3000.

### API Endpoints
Auth
- POST /api/auth/signup – Register a new user
- POST /api/auth/signin – Login user
- GET /api/auth/profile - Get the User detail

Products
-POST /api/product/createproduct – Create product
-GET /api/product/getproducts – Get all products
-GET /api/product/getproductbysku/:sku – Get product by sku
-GET /api/product/getproductbycategory – Get product by categoryId
-GET /api/product/productbyfilterwithname – Get product by name on filter
-PUT /api/product/updateproduct/:sku – Update product
-DELETE /api/product/deleteproduct/:sku – Delete product

Categories
-POST /api/category/createcategory – Create category
-GET /api/category/getcategory – Get all categories
-PUT /api/category/updatecategory/:id – Update product
-DELETE /api/category/deletecategory/:id – Delete product

Stock
-POST /api/stock/increaseproduct/:id – Add stock for a product
-POST /api/stock/decreaseproduct/:id – Remove stock from a product
-GET /api/stock/getstockhistory" – Get stock history details
-GET /api/stock/getstocksummary" – Get stock summary details
-GET /api/stock/getstockhistorybydate" – Get stock details by date

Orders
-POST /api/order/createorder – Create order
-GET /api/order/getallorders – Get all orders (filter by status, from, to)
-GET /api/order/getorderbyid/:id – Get single order by OrderId
-GET /api/order/ordersummary – Get Order Summary By Date
-PUT /api/order/updateorder/:id – Update order status
-DELETE /api/order/deleteorder/:id – Cancel/Delete order



Refer to the source code for detailed route and controller logic.

---


## Running Tests

Currently, automated test cases are not implemented due to time constraints.  
However, the project has been structured so that testing can be easily integrated in the future.

But Here It is how you can test it manually by Postman.
### Auth

1. Signup API

Endpoint: POST /auth/signup
Description: Register a new user (admin or staff).
Request Body : {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "mypassword",
  "role": "admin"
}
Response Body : {
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

-role is optional; defaults to "staff" if not provided.
-You will get a JWT token in the response (prefix included as "Bearer ").

2. Signin API

Endpoint: POST /auth/signin
Description: Login existing user and get JWT token.
Request Body : {
  "email": "john@example.com",
  "password": "mypassword"
}
Response Body : {
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

-Copy the "token" from this response to use in all protected routes

3. Profile API

Endpoint: GET - /auth/profile
Description: Fetch the logged-in user’s profile.
Request Body : Authorization: Bearer <token>
Response Body : {
  "success": true,
  "info": {
    "_id": "64b123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}

### categories
1.Create Category
Method: POST
Endpoint: /category/createcategory
Authorization:
-Header: Authorization: Bearer <admin_token>
-token must belong to an admin user.
Request Body :
{
  "name": "Electronics",
  "description": "Devices and gadgets"
}
Response Body:
{
  "message": "Category created successfully",
  "Category": {
    "_id": "652ecabc12...",
    "name": "Electronics",
    "description": "Devices and gadgets",
    "createdAt": "2025-10-06T10:00:00Z"
  }
}


2.Get Categories
Method: GET
Endpoint: /category/getcategory
Authorization:
-Header: Authorization: Bearer <token>
-token must belong to an admin user.
Query Params (optional):
page - number type 
limit - number type
Response Body : {
  "Categories": [
    {
      "_id": "652ecabc12...",
      "name": "Electronics",
      "description": "Devices and gadgets"
    }
  ]
}


3.Update Category
Method: PUT
Endpoint: /category/updatecategory/:id
Authorization:
- Header: Authorization: Bearer <admin_token>
Params:
id = category_id (MongoDB ID)
Request Body : {
  "name": "Smart Devices",
  "description": "Updated category description"
}
Response Body : {
  "message": "Category updated",
  "updatedcategory": {
    "_id": "652ecabc12a3d",
    "name": "Smart Devices",
    "description": "Updated category description"
  }
}

4.Delete category 
Method: DELETE
Endpoint: /category/deletecategory/:id
Authorization:
- Header: Authorization: Bearer <admin_token>
Params:
id = category_id (MongoDB ID)
Response Body :{
  "message": "Category Deleted",
  "Category": {
    "_id": "652ecabc12a3d",
    "name": "Smart Devices",
    "description": "Updated category description"
  }
}

### product 
1.Create Product
Method: POST
Endpoint: /createproduct
Authorization:
-Header: Authorization: Bearer <admin_token>
Request Body : {
  "name": "iPhone 16",
  "sku": "IPH16",
  "category_id": "652ed41b123abc456def7890",
  "price": 89999,
  "stock_quantity": 25
}
Response Body : {
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


2.Get All Products
Method: GET
Endpoint: /product/getproducts
Authorization:
-Header: Authorization: Bearer <token>

Query Params (optional):
-page -> number type 
-limit -> number type
Response Body : {
  "Products": [
    {
      "_id": "652ed41b12...",
      "name": "iPhone 16",
      "sku": "IPH16",
      "price": 89999
    }
  ]
}

3.Get Product by SKU
Method: GET
Endpoint: /product/getproductbysku
Authorization:
Header: Authorization: Bearer <token>
Query : 
- sku (required) -> ProductSku 
Response Body : {
  "Products": {
    "_id": "652ed41b12...",
    "name": "iPhone 16",
    "sku": "IPH16",
    "price": 89999
  }
}


4.Get Products by Category
Method: GET
Endpoint: /product/getproductbycategory
Authorization:
Header: Authorization: Bearer <token>
Query : 
categoryId -> (MongoDB ID) - Required
page -> number type -optional
limit -> number type - optional
Response Body : {
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

5.Filter Products by Name
Method: GET
Endpoint: /products/productbyfilterwithname
Authorization:
Header: Authorization: Bearer <token>
Query :
filter -> optional
Response Body :{
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

6.Update Product
Method: PUT
Endpoint: /product/updatproduct/:sku
Authorization:
Header: Authorization: Bearer <admin_token>
Params :
sku ->Required
Request Body :{
  "price": 95000,
  "stock_quantity": 30
}

Response Body :{
  "message": "Product updated",
  "updatedProduct": {
    "_id": "652ed41b12...",
    "sku": "IPH16",
    "price": 95000,
    "stock_quantity": 30
  }
}

7.Delete Product
Method: DELETE
Endpoint: delete/deleteproduct/:sku
Authorization:
Header: Authorization: Bearer <admin_token>
Params :
sku ->Required
Response Body : {
  "message": "Product Deleted",
  "Product": {
    "_id": "652ed41b12...",
    "sku": "IPH16"
  }
}

### stock
1.Increase Product Stock
Method: POST
Endpoint: /stock/increaseproduct/:id
Authorization:
-Header: Authorization: Bearer <admin_token>
Params :
id -> MongoDB ProductId
Request Body :{
  "quantity": 10,
  "reason": "PURCHASE"
}
Response Body:{
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



2.Decrease Product Stock
Method: POST
Endpoint: /stock/decreasestock/:id
Authorization:
-Header: Authorization: Bearer <admin_token>
Params :
id -> MongoDB ProductId
Request Body :{
  "quantity": 5,
  "reason": "Customer order fulfillment"
}
Response Body :{
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

3.Get Stock History (All Transactions)
Method: GET
Endpoint: /stock/getstockhistory
Authorization:
-Header: Authorization: Bearer <token>
Query Parameters :
page -> number type - optional
limit -> number type -optional
Response Body : {
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


4.Get Stock Summary (Current Product Stock Levels)
Method: GET
Endpoint: /stock/getstocksummary
Authorization:
-Header: Authorization: Bearer <token>
Query Parameters :
page -> number type - optional
limit -> number type -optional
Response Body : {
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

5.Get Stock History by Date Range
Method: GET
Endpoint: /stock/getstockhistorybydate
Authorization:
-Header: Authorization: Bearer <token>
Query Parameters :
page -> number type - optional
limit -> number type -optional
start -> Required - (eg:- 2025-09-01)
end -> Required - (eg:- 2025-09-03)
Response Body : {
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


### order
1.Create Order
Method : POST
Endpoint: /order/createorders
Authorization:
-Header: Authorization: Bearer <admin_token>
Request Body : {
    "customer" : {
        "name" : "Aamir Sohaib",
        "email" : "aamir123@gmail.com",
        "phone": "7598458988"
    },
    "items" : [{
        "productId" :"68dd7c843785286e03498569",
        "quantity" : 1
    }
   
        ],
    "paymentMethod" : "card"
}

Response Body : {
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

2.2️⃣ Get All Orders
Method : GET
Endpoint: /order/getallorders
Authorization:
-Header: Authorization: Bearer <token>
Query Params:
status  ->	string (optional) -	filter by order status (pending, completed, etc.)
from  ->	ISO date string	(2025-10-01)
to  ->	ISO date string	 (2025-10-06)
page  ->	number type - optional
limit  -> number type - optional
Response Body : {
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


3.. Get Order by ID
Method : GET
Endpoint: /getorderbyid/:id
Authorization:
-Header: Authorization: Bearer <token>
Params :
id -> Required - Order_id
Response Body : {
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

3.Order Summary
Method : GET
Endpoint: /order/ordersummary
Authorization:
-Header: Authorization: Bearer <token>
Query Parameters :
from -> ISO date (eg.2025-10-01)
to -> ISO date (eg.2025-10-06)
Response Body : {
  "success": true,
  "summary": {
    "totalSales": 18000,
    "orderCount": 12
  }
}


5.Update Order
Method : PUT
Endpoint: /order/updateorder/:id
Authorization:
-Header: Authorization: Bearer <admin_token>
Params :
-id -> Required - Order_id
Request Body : {
  "orderStatus": "completed",
  "paymentStatus": "paid"
}
Response Body : {
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

6.Delete (Cancel) Order
Method : DELETE
Endpoint: /order/deleteorder/:id
Authorization:
-Header: Authorization: Bearer <admin_token>
Params :
-id -> Required - Order_id
Response Body : {
  "success": true,
  "message": "Order cancelled"
}

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
