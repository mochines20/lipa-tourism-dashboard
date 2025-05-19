# Lipa Tourism Dashboard

A full-stack web application that visualizes tourism data for Lipa City, Batangas. The dashboard provides insights into visitor trends, landmark popularity, and tourism statistics through interactive charts and visualizations.

## Features

- Interactive data visualization using Chart.js
- Responsive design using Tailwind CSS
- Real-time data updates
- Multiple chart types (Bar, Line, Pie, Radar)
- RESTful API endpoints
- MySQL database integration

## Tech Stack

### Frontend
- React.js
- Chart.js
- Tailwind CSS
- React Router

### Backend
- PHP
- MySQL
- Apache (XAMPP)

## Prerequisites

- XAMPP (PHP 8.0 or higher)
- MySQL (v8.0 or higher)
- Node.js (v14 or higher) for frontend development
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lipa-tourism-dashboard.git
cd lipa-tourism-dashboard
```

2. Set up XAMPP:
- Install XAMPP if not already installed
- Place the project in the `htdocs` directory
- Start Apache and MySQL services

3. Set up the database:
- Open phpMyAdmin (http://localhost/phpmyadmin)
- Create a new database named `lipa_tourism`
- Import the database schema from `database/schema.sql`
- Import sample data from `database/seed.sql`

4. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Running the Application

1. Start XAMPP services:
- Start Apache
- Start MySQL

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost/lipa-tourism-dashboard/api/

## API Documentation

### GET Endpoints

1. **Get All Landmarks**
   ```
   GET http://localhost/lipa-tourism-dashboard/api/landmarks.php
   ```
   Returns a list of all landmarks in the database.

2. **Get Landmarks by Category**
   ```
   GET http://localhost/lipa-tourism-dashboard/api/landmarks-by-category.php?category=churches
   ```
   Returns landmarks filtered by the specified category.

3. **Get Landmark Statistics**
   ```
   GET http://localhost/lipa-tourism-dashboard/api/landmark-stats.php
   ```
   Returns statistics for all landmarks including total visits and visitor counts.

4. **Get Visits Statistics**
   ```
   GET http://localhost/lipa-tourism-dashboard/api/visits.php?period=daily|weekly|monthly|yearly
   ```
   Returns visitor statistics filtered by period (daily, weekly, monthly, or yearly).

5. **Get Visits by Date Range**
   ```
   GET http://localhost/lipa-tourism-dashboard/api/visits-by-date.php?start_date=2024-01-01&end_date=2024-12-31
   ```
   Returns visits filtered by the specified date range.

6. **Get Visitor Trends**
   ```
   GET http://localhost/lipa-tourism-dashboard/api/visitor-trends.php
   ```
   Returns visitor trends data for the last 30 days.

7. **Get Landmark Details**
   ```
   GET http://localhost/lipa-tourism-dashboard/api/landmark-details.php?id=1
   ```
   Returns detailed information about a specific landmark, including:
   - Landmark details
   - Total visits and visitors
   - Last visit date
   - Recent visits (last 10)

## Database Schema

The database consists of two main tables:

### Landmarks
- id (Primary Key)
- name
- description
- location
- category
- image_url
- created_at
- updated_at

### Visits
- id (Primary Key)
- landmark_id (Foreign Key)
- visit_date
- visitor_count
- created_at
- updated_at

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Batangas State University
- Lipa City Tourism Office
- Chart.js for the visualization library
- React.js community