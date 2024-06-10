const mongoose = require("mongoose"); // Import the mongoose library

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  name: String,   // User's name
  email: String,  // User's email
  age: Number     // User's age
});

// Create the model for users collection based on the UserSchema
const UserModel = mongoose.model("users", UserSchema);

// Export the User model to use it in other parts of the application
module.exports = UserModel;
