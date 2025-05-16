-- First set a default image for all records
UPDATE landmarks SET image_url = 'default.jpg';

-- Then update specific landmarks with their images
UPDATE landmarks SET image_url = 'cathedral.jpg' WHERE name LIKE '%Sebastian Cathedral%';
UPDATE landmarks SET image_url = 'casa.jpg' WHERE name LIKE '%Casa de Segunda%';
UPDATE landmarks SET image_url = 'malarayat.jpg' WHERE name LIKE '%Malarayat%';
UPDATE landmarks SET image_url = 'farm.jpg' WHERE name LIKE '%Farm%';
UPDATE landmarks SET image_url = 'taal.jpg' WHERE name LIKE '%Taal%';
