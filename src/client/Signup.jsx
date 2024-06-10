import React, { useState } from 'react'; // Import React and the useState hook
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom for navigation
import axios from 'axios'; // Import axios for making HTTP requests

function Signup({ setIsLoggedIn }) { // Define the Signup component with setIsLoggedIn as a prop
    const [name, setName] = useState(''); // State for storing the name input
    const [email, setEmail] = useState(''); // State for storing the email input
    const [password, setPassword] = useState(''); // State for storing the password input
    const [message, setMessage] = useState(''); // State for storing the message
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleSubmit = (e) => { // Function to handle form submission
        e.preventDefault(); // Prevent the default form submission behavior
        if (!name || !email || !password) { // Check if name, email, or password is empty
            setMessage('Please enter your name, email, and password.'); // Set error message
            return; // Exit the function
        }
        // Make a POST request to the register endpoint
        axios.post('http://localhost:3001/employees/register', { name, email, password })
            .then(result => { // Handle the response
                console.log(result); // Log the response
                navigate('/'); // Navigate to the login page
            })
            .catch(err => console.log(err)); // Log any errors
    };

    const validateName = (value) => { // Function to validate the name input
        const namePattern = /^[A-Za-z][A-Za-z.]{0,19}$/; // Regex for name validation
        return value === '' || namePattern.test(value); // Return true if valid, false otherwise
    };

    const validatePassword = (value) => { // Function to validate the password input
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Regex for password validation
        return passwordPattern.test(value); // Return true if valid, false otherwise
    };

    const handleNameChange = (e) => { // Function to handle name input change
        const value = e.target.value; // Get the value of the input
        if (validateName(value) && value.length <= 20) { // Check if name is valid and length is <= 20
            setName(value); // Update the name state
            setMessage(''); // Clear any previous messages
        } else {
            setMessage('Name must start with an alphabet, contain only alphabets and ".", and be up to 20 characters long.'); // Set error message
        }
    };

    const handleEmailChange = (e) => { // Function to handle email input change
        const value = e.target.value.toLowerCase(); // Convert email to lowercase
        setEmail(value); // Update the email state
    };

    const handlePasswordChange = (e) => { // Function to handle password input change
        const value = e.target.value; // Get the value of the input
        if (validatePassword(value)) { // Check if password is valid
            setPassword(value); // Update the password state
            setMessage(''); // Clear any previous messages
        } else {
            setPassword(value); // Update the password state
            setMessage('Password should contain uppercase and lowercase letters, letters and numbers, special characters, and have a minimum length of 8.'); // Set error message
        }
    };

    return ( // Render the signup form
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mt-4">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"><strong>Name</strong></label>
                            <input
                                onChange={handleNameChange}
                                value={name}
                                type="text"
                                placeholder="Enter Name"
                                autoComplete="off"
                                name="name"
                                className="form-control rounded-0"
                                maxLength="20"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                            <input
                                onChange={handleEmailChange}
                                value={email}
                                type="email"
                                placeholder="Enter Email"
                                autoComplete="off"
                                name="email"
                                className="form-control rounded-0"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                            <input
                                onChange={handlePasswordChange}
                                value={password}
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                className="form-control rounded-0"
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
                    </form>

                    {message && <p style={{ color: 'red' }}>{message}</p>} {/* Display message if exists */}

                    <p>Already Have an Account?</p>
                    <Link to="/">
                        <button className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup; // Export the Signup component
