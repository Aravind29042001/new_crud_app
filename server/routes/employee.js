const express = require("express"); // Import the express library
const EmployeeModel = require("../models/Employee"); // Import the Employee model

const router = express.Router(); // Create a new router object

// Define the login route for employees
router.post("/login", (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body

  // Find an employee by email
  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("Success"); // If password matches, send success response
        } else {
          res.json("Password is incorrect"); // If password doesn't match, send error response
        }
      } else {
        res.json("Email is incorrect"); // If email is not found, send error response
      }
    })
    .catch((err) => {
      console.error("Error during login:", err); // Log any errors
      res.status(500).json("Internal Server Error"); // Send server error response
    });
});

// Define the register route for employees
router.post("/register", (req, res) => {
  EmployeeModel.create(req.body) // Create a new employee with data from request body
    .then((employee) => res.json(employee)) // Send the created employee as response
    .catch((err) => res.status(500).json(err)); // Send error response in case of failure
});

// Export the router to use it in other parts of the application
module.exports = router;
