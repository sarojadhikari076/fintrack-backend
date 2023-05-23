# FinTrack API

The FinTrack API is a Node.js backend application that powers the Finance Tracker web application. It provides the necessary endpoints and functionality for user authentication, managing finance data, handling daily expenses, and sending email notifications. The API is built using Express.js and interacts with a MongoDB database to store and retrieve data.

## Technologies Used

- Node.js - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express.js - A fast and minimalist web application framework for Node.js.
- MongoDB - A NoSQL database for storing and managing data.
- Mongoose - An Object Data Modeling (ODM) library for MongoDB and Node.js.
- JWT - JSON Web Tokens for secure authentication and authorization.
- bcrypt - A library for hashing and encrypting passwords.
- dotenv - A module for loading environment variables from a .env file.
- Nodemailer - A module for sending emails from Node.js applications.

## API Endpoints

The FinTrack API provides the following endpoints:

- `/api/auth` - User authentication and authorization.
  - `/api/auth/register` - Register a new user.
  - `/api/auth/login` - Log in an existing user and obtain an access token.
  - `/api/auth/logout` - Log out the authenticated user.

- `/api/finances` - Finance data management.
  - `GET /api/finances` - Get the finance plan for the authenticated user.
  - `POST /api/finances` - Create an finance plan for the authenticated user.
  - `PATCH /api/finances` - Update the finance plan of the authenticated user.
  - `DELETE /api/finances` - Delete the finance plan of the authenticated user.

- `/api/expenditures` - Expense data management.
  - `GET /api/expenditures` - Get the expense list for the authenticated user.
  - `POST /api/expenditures` - Create an expense record for the authenticated user.
  - `PATCH /api/expenditures/:expenseId` - Update an expense of the authenticated user.
  - `DELETE /api/expenditures/:expenseId` - Delete an expense of the authenticated user.

## Features

The FinTrack API provides the following features:

- User authentication - Register, log in, and log out users.
- Add, update, and delete finance data and daily expenses.
- Sort, filter, search, and paginate finance data and expenses.
- Email notifications - Send email alerts when the expense budget is getting low.
- Seed data etc.

## Prerequisites

Before running the FinTrack API, ensure that you have the following prerequisites installed:

- Node.js - Download and install Node.js from the official website: [https://nodejs.org](https://nodejs.org)
- MongoDB - Install MongoDB and set up a local or remote MongoDB instance.

## Getting Started

To run the FinTrack API locally:

1. Clone the repository: `git clone https://github.com/sarojadhikari076/fintrack-backend.git`
2. Install dependencies: `cd fintrack-backend` and `yarn install`
3. Set up environment variables: Create a `.env` file in the root directory and add necessary environment variables (e.g., database connection URL, secret key, email configuration).
4. Start the development server: `yarn dev`
5. The API server will be running at `http://localhost:8000`

## Deployment

The FinTrack API is deployed [here](https://fintrack-api.onrender.com/api/v1).

## Contributing

Contributions to the FinTrack API project are welcome! If you encounter any issues or have suggestions for improvements, please create an issue in the GitHub repository.

##

 License

The FinTrack API is open source and released under the [MIT License](https://opensource.org/licenses/MIT).
