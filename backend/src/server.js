const express = require('express');
const cors = require('cors');
const landmarksRouter = require('./routes/landmarks');
const visitsRouter = require('./routes/visits');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/landmarks', landmarksRouter);
app.use('/api/visits', visitsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 