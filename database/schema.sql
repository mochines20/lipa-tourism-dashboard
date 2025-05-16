CREATE TABLE landmarks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    category VARCHAR(100),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE visits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    landmark_id INT,
    visit_date DATE,
    visitor_count INT,
    FOREIGN KEY (landmark_id) REFERENCES landmarks(id) ON DELETE CASCADE
);