# Finance Tracker App

The Finance Tracker App is a web application designed to help users manage their finances effectively. It allows users to track their income, expenses, and savings, providing them with insights into their financial health and helping them make informed financial decisions.

## Features

- User authentication: Register, login, and secure user authentication using JWT tokens.
- Finance plan management: Create, retrieve, and update finance plans for tracking income, expenses, savings, and investments.
- Expenditure tracking: Create, retrieve, update, and delete expenditures, with automatic calculation of remaining expense budget.
- User-specific data: Each user has their own finance plan and expenditures, ensuring data privacy and personalized financial management.
- Error handling: Robust error handling and validation to ensure data integrity and user-friendly error messages.
- API documentation: Detailed API documentation for easy integration and usage.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/financial-management-app.git

2. Install dependencies:

    ```bash
    cd financial-management-app
    npm install

3. Set up the environment variables:
 - Rename the .env.example file to .env.
 - Fill in the necessary configuration values in the .env file, such as database URL, JWT secret, etc.
 
4. Start the application:
    ```bash
    npm start

# API Documentation:
The API documentation provides detailed information about the available endpoints, request/response formats, and authentication requirements. You can access the API documentation by visiting http://localhost:3000/api/v1/docs after starting the application.

# Technologies Used
- Node.js: Server-side JavaScript runtime environment.
- Express.js: Web application framework for building APIs.
- MongoDB: NoSQL database for storing user and financial data.
- Mongoose: Object Data Modeling (ODM) library for MongoDB.
- JWT: JSON Web Tokens for user authentication and authorization.
- bcrypt: Password hashing and encryption library.
- Other dependencies: express-validator, dotenv, cors, nodemon etc.
