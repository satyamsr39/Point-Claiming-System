import express from 'express';
import connectdb from './mongodb.js';
import User from './models/User.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors());         // Enables Cross-Origin Resource Sharing

// Connect to MongoDB
await connectdb();

// In-memory store for optional tracking (not used here but declared)
const recentClaims = [];

// Route to add a new user
app.post('/Add', async (req, res) => {
  const newUser = new User({
    "UserName": req.body.UserName,
    "Points": req.body.Points,
  });

  await newUser.save(); // Save new user to the database
  res.status(201).json("Saved");
});

// Route to get top 10 users sorted by points (Leaderboard)
app.get('/leaderboard', async (req, res) => {
  const usertable = await User.find({}, { _id: 0, UserName: 1, Points: 1 })
    .sort({ Points: -1 })
    .limit(10);
  res.send(usertable);
});

// Route to get all users with _id (used in dropdowns or internal lookups)
app.get('/allUsers', async (req, res) => {
  const usertable = await User.find({}, { _id: 1, UserName: 1, Points: 1 });
  res.send(usertable);
});

// Route to claim points for a specific user
app.patch('/claim/:id', async (req, res) => {
  const { id } = req.params;
  const { points } = req.body;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Add claimed points and update timestamp
  user.Points += points;
  user.lastClaimedAt = new Date();
  await user.save();

  res.status(200).json(user);
});

// Route to fetch the 10 most recent point claims
app.get('/recent-claims', async (req, res) => {
  try {
    const recentClaimedUsers = await User.find({ lastClaimedAt: { $ne: null } })
      .sort({ lastClaimedAt: -1 }) // Most recent first
      .limit(10);

    res.json(recentClaimedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch recent claims' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});
