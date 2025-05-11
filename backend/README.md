# Lipa Tourism Dashboard Backend

## Overview
This is the backend for the Lipa City Tourism Dashboard project. It is built using Node.js with Express and connects to a MySQL database to serve tourism-related data for Lipa City, Batangas.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd lipa-tourism-dashboard/backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory and add your database connection details:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=lipa_tourism
   ```

### Running the Server

To start the server, run:
```
npm start
```
The server will run on `http://localhost:3000`.

### API Endpoints

- **GET /api/landmarks**: Fetch all landmarks.
- **GET /api/visits**: Fetch visit statistics.
- **GET /api/landmarks/:id**: Fetch a specific landmark by ID.

### Database Setup

1. Import the schema:
   Run the SQL commands in `database/schema.sql` to create the necessary tables.

2. Seed the database:
   Run the SQL commands in `database/seed.sql` to populate the tables with sample data.

### Folder Structure

```
backend
├── src
│   ├── app.js
│   ├── controllers
│   │   └── dataController.js
│   ├── models
│   │   └── db.js
│   ├── routes
│   │   └── api.js
│   └── utils
│       └── helpers.js
├── package.json
├── .env
└── README.md
```

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.