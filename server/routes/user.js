const express = require("express"); // Import the express library
const UserModel = require("../models/User"); // Import the User model

const router = express.Router(); // Create a new router object

// Define the route to get all users
router.get("/", (req, res) => {
  UserModel.find({}) // Find all users in the collection
    .then((users) => res.json(users)) // Send the list of users as response
    .catch((err) => res.status(500).json(err)); // Send error response in case of failure
});

// Define the route to get a user by ID
router.get("/getUser/:id", (req, res) => {
  const id = req.params.id; // Extract the user ID from the request parameters

  UserModel.findById(id) // Find user by ID
    .then((user) => res.json(user)) // Send the user data as response
    .catch((err) => res.status(500).json(err)); // Send error response in case of failure
});

// Define the route to update a user by ID
router.put("/updateUser/:id", (req, res) => {
  const id = req.params.id; // Extract the user ID from the request parameters

  UserModel.findByIdAndUpdate(id, req.body, { new: true }) // Update the user data
    .then((user) => res.json(user)) // Send the updated user data as response
    .catch((err) => res.status(500).json(err)); // Send error response in case of failure
});

// Define the route to delete a user by ID
router.delete('/deleteUser/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the user ID from the request parameters

    const deletedUser = await UserModel.findByIdAndDelete(id); // Delete the user by ID

    if (deletedUser) {
      res.status(200).send({ message: 'User deleted successfully' }); // Send success response if user is deleted
    } else {
      res.status(404).send({ message: 'User not found' }); // Send error response if user is not found
    }
  } catch (error) {
    res.status(500).send({ message: error.message }); // Send error response in case of failure
  }
});

// Define the route to create a new user
router.post("/createUser", (req, res) => {
  UserModel.create(req.body) // Create a new user with data from request body
    .then((user) => res.json(user)) // Send the created user as response
    .catch((err) => res.status(400).json({ error: err.message })); // Send error response in case of failure
});

// Export the router to use it in other parts of the application
module.exports = router;
