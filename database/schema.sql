# Entity Relationship Diagram (ERD)

## Database Schema

```mermaid
erDiagram
    LANDMARKS ||--o{ VISITS : has
    LANDMARKS {
        int id PK
        string name
        text description
        string location
        string category
        string image_url
        timestamp created_at
        timestamp updated_at
    }
    VISITS {
        int id PK
        int landmark_id FK
        date visit_date
        int visitor_count
    }
```

## Relationships

1. **Landmarks to Visits (One-to-Many)**
   - One landmark can have multiple visits
   - Each visit belongs to exactly one landmark
   - Foreign key: `visits.landmark_id` references `landmarks.id` with CASCADE delete

## Table Descriptions

### Landmarks Table
- Primary key: `id` (auto-incrementing integer)
- Contains information about tourist spots in Lipa City
- Fields:
  - `name`: Name of the landmark (varchar(255))
  - `description`: Detailed description (text)
  - `location`: Physical location (varchar(255))
  - `category`: Type of landmark (varchar(100))
  - `image_url`: URL to landmark image (varchar(255))
  - `created_at`: Timestamp of creation
  - `updated_at`: Timestamp of last update

### Visits Table
- Primary key: `id` (auto-incrementing integer)
- Foreign key: `landmark_id` references `landmarks.id`
- Tracks visitor statistics
- Fields:
  - `visit_date`: Date of visit
  - `visitor_count`: Number of visitors

## Indexes
- `landmarks.id`: Primary key index
- `visits.id`: Primary key index
- `visits.landmark_id`: Foreign key index

## Sample Data
The database includes sample data for:
- 8 landmarks including Taal Volcano, Lipa Cathedral, San Sebastian Cathedral, etc.
- 27 visit records spanning from 2023 to 2025
- Various categories: natural-attractions, churches, parks, museums

## Database Features
- UTF8MB4 character set
- InnoDB engine
- Automatic timestamp updates
- Foreign key constraints with CASCADE delete
- Auto-incrementing primary keys