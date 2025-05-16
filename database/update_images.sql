UPDATE landmarks 
SET image_url = CASE 
    WHEN name LIKE '%Sebastian Cathedral%' THEN 'cathedral.jpg'
    WHEN name LIKE '%Casa de Segunda%' THEN 'casa.jpg'
    WHEN name LIKE '%Farm%' THEN 'farm.jpg'
    WHEN name LIKE '%Taal%' THEN 'taal.jpg'
    ELSE 'default.jpg'
END;
