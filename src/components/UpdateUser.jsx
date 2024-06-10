import React, { useState, useEffect } from 'react'; // Import React and the useState, useEffect hooks
import axios from 'axios'; // Import axios for making HTTP requests
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate from react-router-dom

function UpdateUser() { // Define the UpdateUser component
    const { id } = useParams(); // Get the user id from the URL parameters
    const navigate = useNavigate(); // Hook for programmatic navigation
    const [user, setUser] = useState({ // State for storing the user details
        name: '',
        email: '',
        age: ''
    });
    const [errorMessage, setErrorMessage] = useState(""); // State for storing error messages

    useEffect(() => { // Fetch user details when the component mounts
        axios.get(`http://localhost:3001/users/getUser/${id}`) // Make a GET request to fetch the user details
            .then(result => {
                setUser(result.data); // Update the user state with the fetched data
            })
            .catch(err => console.log(err)); // Handle errors
    }, [id]);

    const validateName = (value) => { // Function to validate the name input
        if (value === "") return true; // Allow empty input
        const namePattern = /^[A-Za-z][A-Za-z.]{0,19}$/; // Regex for name validation
        return namePattern.test(value); // Return true if valid, false otherwise
    };

    const validateAge = (value) => { // Function to validate the age input
        if (value === "") return true; // Allow empty input
        const agePattern = /^\d{1,2}$/; // Regex for age validation
        return agePattern.test(value); // Return true if valid, false otherwise
    };

    const handleChange = (e) => { // Function to handle input changes
        const { name, value } = e.target; // Get the name and value of the input

        if (name === 'name') {
            if (validateName(value)) { // Validate name input
                setUser(prevState => ({
                    ...prevState,
                    [name]: value // Update the user state
                }));
                setErrorMessage(""); // Clear error message
            } else {
                setErrorMessage("Name must start with an alphabet and can only contain alphabets and '.' up to 20 characters."); // Set error message
            }
        } else if (name === 'age') {
            if (validateAge(value)) { // Validate age input
                setUser(prevState => ({
                    ...prevState,
                    [name]: value // Update the user state
                }));
                setErrorMessage(""); // Clear error message
            } else {
                setErrorMessage("Age must be a number with 1 or 2 digits."); // Set error message
            }
        } else {
            setUser(prevState => ({
                ...prevState,
                [name]: value // Update the user state
            }));
        }
    };

    const handleSubmit = (e) => { // Function to handle form submission
        e.preventDefault(); // Prevent default form submission behavior
        if (!user.name || !user.email || !user.age) { // Check if any field is empty
            setErrorMessage("Please fill in all details."); // Set error message
            return; // Exit the function
        }

        axios.put(`http://localhost:3001/users/updateUser/${id}`, user) // Make a PUT request to update the user details
            .then(res => {
                console.log(res); // Log the response
                navigate('/user'); // Navigate to the user list page
            })
            .catch(err => console.log(err)); // Handle errors
    };

    return ( // Render the update user form
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mt-4">Update User</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display error message if exists */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label"><strong>Name</strong></label>
                            <input
                                onChange={handleChange}
                                value={user.name}
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter Name"
                                autoComplete="off"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                            <input
                                onChange={handleChange}
                                value={user.email}
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter Email"
                                autoComplete="off"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label"><strong>Age</strong></label>
                            <input
                                onChange={handleChange}
                                value={user.age}
                                type="text"
                                name="age"
                                className="form-control"
                                placeholder="Enter Age"
                                autoComplete="off"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Update</button> {/* Submit button */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser; // Export the UpdateUser component
