INSERT INTO landmarks (id, name, description, location, category) VALUES
(1, 'Taal Volcano', 'An active volcano and a popular tourist destination.', 'Taal Lake, Batangas', 'Natural'),
(2, 'Lipa Cathedral', 'A historical cathedral known for its beautiful architecture.', 'Lipa City, Batangas', 'Cultural'),
(3, 'San Sebastian Cathedral', 'A famous church known for its unique architecture.', 'Lipa City, Batangas', 'Cultural'),
(4, 'Mount Malarayat', 'A mountain range popular for hiking and nature trips.', 'Lipa City, Batangas', 'Natural'),
(5, 'The Farm at San Benito', 'A wellness resort offering various health and wellness programs.', 'Lipa City, Batangas', 'Recreational');

INSERT INTO visits (id, landmark_id, visit_date, visitor_count) VALUES
(1, 1, '2023-01-15', 150),
(2, 2, '2023-01-20', 200),
(3, 3, '2023-02-10', 100),
(4, 4, '2023-02-15', 75),
(5, 5, '2023-03-05', 50),
(6, 1, '2023-03-10', 120),
(7, 2, '2023-03-20', 180),
(8, 3, '2023-04-01', 90),
(9, 4, '2023-04-10', 60),
(10, 5, '2023-04-15', 40);