# Lipa City Tourism Dashboard – Walkthrough

This walkthrough will guide you through the main features and usage of the Lipa City Tourism Dashboard system.

---

## 1. System Overview

The Lipa City Tourism Dashboard is a full-stack web application for visualizing tourism data in Lipa City, Batangas. It features a responsive frontend dashboard, interactive charts, and a backend API connected to a MySQL database.

---

## 2. Accessing the System

- **Local URL:**  
  Open your browser and go to:  
  `http://localhost/lipa-tourism-dashboard/frontend/public/index.html`

---

## 3. Main Dashboard (`index.html`)

### **Navigation Bar**
- Located at the top of every page.
- Links to Dashboard, Landmarks, and Reports.

### **Stats Cards**
- Shows quick stats:  
  - Total Landmarks  
  - Total Visits  
  - Monthly Visitors

### **Visitor Trends Chart**
- Interactive line chart showing visitor trends.
- Use the dropdown to switch between Daily, Weekly, Monthly, and Yearly views.
- Data updates automatically based on your selection.

### **Additional Charts**
- **Bar Chart:** Landmark Comparison (visits per landmark)
- **Pie Chart:** Visitor Breakdown (e.g., Local vs. Foreign)
- **Radar Chart:** Visitor Profile (interest levels in various categories)

---

## 4. Landmarks Page (`landmarks.html`)

- **Category Filter:**  
  Filter landmarks by category (Churches, Museums, Parks, Historical Sites).
- **Landmark Cards:**  
  Each card displays a landmark’s name, category, description, and rating.
- **Add Landmark:**  
  Click "Add Landmark" to open a modal and submit a new landmark.
- **View Details:**  
  Click "View Details" on any card to see more information in a modal.

---

## 5. Reports Page (`reports.html`)

- **Tourism Reports:**  
  View monthly and annual visitor reports.
- **Growth Chart:**  
  Interactive bar chart showing annual, monthly, weekly, or daily growth.
- **Download Report:**  
  Click "Download Report" to export the monthly report as a PDF (includes chart and stats).
- **Search Landmark:**  
  Use the search bar to filter report items by landmark name.

---

## 6. Backend API

- **Endpoints:**  
  - `/api/landmarks` – Get all landmarks  
  - `/api/landmarks/:id` – Get a specific landmark  
  - `/api/visits` – Get all visits  
  - `/api/visits/daily`, `/weekly`, `/monthly`, `/yearly` – Get visits grouped by period  
  - `/api/landmarks/category/:category` – Get landmarks by category  
  - `/api/visits` (POST) – Add a new visit

- **Usage:**  
  The frontend fetches data from these endpoints to populate charts and tables.

---

## 7. Database

- **Tables:**  
  - `landmarks` – Stores landmark info  
  - `visits` – Stores visit records (linked to landmarks)

- **Sample Data:**  
  The database is seeded with sample landmarks and visits for demo purposes.

---

## 8. Customization & Extending

- **Add More Charts:**  
  You can add more Chart.js charts by creating new `<canvas>` elements and initializing them in JS.
- **API Integration:**  
  Update the backend API to fetch real data as needed.
- **Styling:**  
  Tailwind CSS is used for easy customization.

---

## 9. Troubleshooting

- **Charts not showing?**  
  - Make sure you are running via a web server (not opening HTML files directly).
  - Check the browser console for errors.
  - Ensure Chart.js is loaded before your main JS.

- **API not working?**  
  - Make sure the backend server is running.
  - Check your database connection settings.

---

## 10. Support

For questions or issues, please open an issue on the repository or contact the project maintainer.

---
