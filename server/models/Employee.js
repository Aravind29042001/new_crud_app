const mongoose = require("mongoose"); // Import the mongoose library

// Define the schema for the Employee model
const EmployeeSchema = new mongoose.Schema({
  name: String,    // Employee's name
  email: String,   // Employee's email
  password: String // Employee's password
});

// Create the model for employees collection based on the EmployeeSchema
const EmployeeModel = mongoose.model("Employees", EmployeeSchema);

// Export the Employee model to use it in other parts of the application
module.exports = EmployeeModel;
