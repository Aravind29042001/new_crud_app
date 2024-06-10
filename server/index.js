const express = require("express"); // Import the express library
const mongoose = require("mongoose"); // Import the mongoose library
const cors = require("cors"); // Import the CORS library

const userRouter = require("./routes/user"); // Import the user routes
const employeeRouter = require("./routes/employee"); // Import the employee routes

const app = express(); // Create a new express application

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Middleware to enable CORS

// Connect to MongoDB using mongoose
mongoose
  .connect("mongodb://localhost:27017/crud", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB")) // Log success message on connection
  .catch((err) => console.error("Could not connect to MongoDB", err)); // Log error message on failure

app.use("/users", userRouter); // Use user routes for the /users endpoint
app.use("/employees", employeeRouter); // Use employee routes for the /employees endpoint

const PORT = process.env.PORT || 3001; // Define the port to listen on, default to 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log message indicating server is running
});
