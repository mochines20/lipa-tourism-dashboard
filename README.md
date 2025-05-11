# Lipa City Tourism Dashboard

This project is a full-stack application designed to provide insights into tourism data for Lipa City, Batangas. It features a responsive dashboard that visualizes various tourism metrics using charts.

## Project Structure

The project is organized into three main directories:

- **backend**: Contains the server-side code, including the Express application, API routes, and database connection.
- **frontend**: Contains the client-side code, including React components, pages, and styles.
- **database**: Contains SQL files for schema definition and seeding sample data.

## Technologies Used

- **Backend**: Node.js, Express, MySQL (using mysql2 or sequelize), dotenv
- **Frontend**: React, Chart.js, Tailwind CSS
- **Database**: MySQL

## Getting Started

### Prerequisites

- Node.js and npm installed
- MySQL server running

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your database connection details:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=lipa_tourism
   ```

4. Run the server:
   ```
   node src/app.js
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

### Database Setup

1. Import the schema:
   ```sql
   SOURCE path/to/database/schema.sql;
   ```

2. Seed the database with sample data:
   ```sql
   SOURCE path/to/database/seed.sql;
   ```

## API Endpoints

- `GET /api/landmarks`: Fetch all landmarks
- `GET /api/visits`: Fetch visit statistics

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.