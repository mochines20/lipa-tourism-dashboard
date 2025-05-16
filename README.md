# Lipa Tourism Dashboard

Interactive dashboard for visualizing tourism data in Lipa City, Batangas.

## Features
- Visitor trends visualization
- Landmark statistics
- Tourist profile analysis
- Interactive charts and graphs

## Tech Stack
- Frontend: HTML, CSS (Tailwind), JavaScript (Chart.js)
- Backend: PHP
- Database: MySQL

## Setup
1. Clone repository:
```bash
git clone https://github.com/YOUR_USERNAME/lipa-tourism-dashboard.git
```

2. Place in XAMPP htdocs:
```bash
cd /xampp/htdocs/lipa-tourism-dashboard
```

3. Import database:
```bash
mysql -u root -p lipa_tourism < database/seed.sql
```

4. Access the dashboard:
```
http://localhost/lipa-tourism-dashboard/frontend/public/
```

## Project Structure
- `/frontend` - Frontend code and assets
- `/api` - PHP API endpoints
- `/database` - Database schema and seeds
- `/docs` - Documentation files