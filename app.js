const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// In-memory "database"
let leaderboard = [
  { name: "Alice", score: 9 },
  { name: "Bob", score: 7 },
  // You can pre-populate this array with more objects as desired.
];

// Endpoint to get the leaderboard
app.get('/leaderboard', (req, res) => {
  // Optionally, sort the leaderboard by score before sending it
  const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score);
  res.json(sortedLeaderboard);
});

// Endpoint to add a new player to the leaderboard
app.post('/leaderboard', (req, res) => {
  const { name, score } = req.body;

  // Validate input
  if (typeof name !== 'string' || typeof score !== 'number') {
    console.log(req.body)
    return res.status(400).json({ message: 'Invalid request data. Please provide a valid name and score.' });
  }

  // Add the new player to the leaderboard
  leaderboard.push({ name, score });
  res.status(201).json({ message: "Player added successfully." });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
