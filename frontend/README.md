# Lipa City Tourism Dashboard Frontend

This is the frontend part of the Lipa City Tourism Dashboard project. It is built using modern web technologies including React, Chart.js for data visualization, and Tailwind CSS for styling.

## Getting Started

To get started with the frontend, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd lipa-tourism-dashboard/frontend
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then, run the following command to install the necessary packages:
   ```bash
   npm install
   ```

3. **Run the Application**
   Start the development server with:
   ```bash
   npm start
   ```
   This will launch the application in your default web browser at `http://localhost:3000`.

## Project Structure

The frontend project is organized as follows:

- **public/**: Contains static files such as `index.html` and `favicon.ico`.
- **src/**: Contains the source code for the application.
  - **components/**: Reusable components like `Chart.js` and `Navbar.js`.
  - **pages/**: Page components such as `Dashboard.js` and `About.js`.
  - **styles/**: Contains the Tailwind CSS styles.
  - **main.js**: The entry point for the React application.

## Features

- **Responsive Design**: The application is built with Tailwind CSS, ensuring a responsive layout across devices.
- **Data Visualization**: Utilizes Chart.js to render various types of charts based on tourism data.
- **Navigation**: A simple navigation bar to switch between the Dashboard and About pages.

## API Integration

The frontend communicates with the backend RESTful API to fetch tourism data. Ensure that the backend server is running and accessible for the frontend to function correctly.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.