import React, { useState } from 'react'; // Import React and the useState hook
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom for navigation
import axios from 'axios'; // Import axios for making HTTP requests

function LoginIn({ setIsLoggedIn }) { // Define the LoginIn component with setIsLoggedIn as a prop
    const [email, setEmail] = useState(''); // State for storing the email input
    const [password, setPassword] = useState(''); // State for storing the password input
    const [message, setMessage] = useState(''); // State for storing the message
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleSubmit = (e) => { // Function to handle form submission
        e.preventDefault(); // Prevent the default form submission behavior
        setMessage(''); // Clear any previous messages

        if (!email || !password) { // Check if email or password is empty
            setMessage('Please fill in both email and password.'); // Set error message
            return; // Exit the function
        }

        // Make a POST request to the login endpoint
        axios.post('http://localhost:3001/employees/login', { email, password })
            .then(result => { // Handle the response
                console.log(result.data); // Log the response data
                if (result.data === 'Success') { // Check if login is successful
                    setIsLoggedIn(true); // Set the login state to true
                    navigate('/user'); // Navigate to the user page
                } else {
                    setMessage('Invalid email or password. Please try again.'); // Set error message for invalid login
                }
            })
            .catch(err => { // Handle errors
                console.log(err); // Log the error
                setMessage('An error occurred. Please try again.'); // Set error message for any other errors
            });
    };

    const handleEmailChange = (e) => { // Function to handle email input change
        const value = e.target.value.toLowerCase(); // Convert email to lowercase
        setEmail(value); // Update the email state
    };

    return ( // Render the login form
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            onChange={handleEmailChange}
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
                </form>
                {message && <p style={{ color: 'red' }}>{message}</p>} {/* Display message if exists */}

                <p>Don't Have an Account?</p>
                <Link to="/SignIn">
                    <button className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Sign Up</button>
                </Link>
            </div>
        </div>
    );
}

export default LoginIn; // Export the LoginIn component
