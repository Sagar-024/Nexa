// server.js
import express from 'express'
import cors from 'cors'
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors())

// Root endpoint
app.get('/', (req, res) => {
  res.send('Trip Planner AI Backend is Running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
