const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Import routers
const visitsRouter = require('./routes/visits');
const landmarksRouter = require('./routes/landmarks');
// ...add more routers as needed

app.use('/api/visits', visitsRouter);
app.use('/api/landmarks', landmarksRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
