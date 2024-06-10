import axios from 'axios'; // Import axios for making HTTP requests
import React, { useState } from 'react'; // Import React and the useState hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom for navigation

function CreateUser() { // Define the CreateUser component
    const [name, setName] = useState(""); // State for storing the name input
    const [email, setEmail] = useState(""); // State for storing the email input
    const [age, setAge] = useState(""); // State for storing the age input
    const [errorMessage, setErrorMessage] = useState(""); // State for storing error messages
    const navigate = useNavigate(); // Hook for programmatic navigation

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

    const validateEmail = (value) => { // Function to validate the email input
        if (value === "") return true; // Allow empty input
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; // Regex for email validation
        return emailPattern.test(value); // Return true if valid, false otherwise
    };

    const submit = (e) => { // Function to handle form submission
        e.preventDefault(); // Prevent default form submission behavior

        if (!name || !email || !age) { // Check if any field is empty
            setErrorMessage("Please fill in all details."); // Set error message
            return; // Exit the function
        }

        if (!validateName(name)) { // Validate name input
            setErrorMessage("Name must start with an alphabet and can only contain alphabets and '.' up to 20 characters."); // Set error message
            return; // Exit the function
        }

        if (!validateEmail(email)) { // Validate email input
            setErrorMessage("Please enter a valid email address."); // Set error message
            return; // Exit the function
        }

        if (!validateAge(age)) { // Validate age input
            setErrorMessage("Age must be a number with 1 or 2 digits."); // Set error message
            return; // Exit the function
        }

        axios.post("http://localhost:3001/users/createUser", { name, email, age }) // Make a POST request to the createUser endpoint
            .then(result => { // Handle the response
                console.log(result); // Log the response
                navigate('/'); // Navigate to the home page
            })
            .catch(err => console.log("Error:", err)); // Handle errors
    };

    return ( // Render the create user form
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={submit}>
                    <h2>Add User</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display error message if exists */}
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder='Enter Name' 
                            className='form-control'
                            value={name}
                            onChange={(e) => { // Handle name input change
                                const value = e.target.value;
                                if (validateName(value)) { // Validate name input
                                    setName(value); // Update the name state
                                    setErrorMessage(""); // Clear error message
                                } else {
                                    setErrorMessage("Name must start with an alphabet and can only contain alphabets and '.' up to 20 characters."); // Set error message
                                }
                                if (value === "") {
                                    setName(value); // Allow empty input
                                }
                            }} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder='Enter Email' 
                            className='form-control'
                            value={email}
                            onInput={(e) => {
                                e.target.value = e.target.value.toLowerCase(); // Convert email to lowercase
                            }}
                            onChange={(e) => setEmail(e.target.value)} // Update the email state
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="age">Age</label>
                        <input 
                            type="text" 
                            id="age" 
                            placeholder='Enter Age' 
                            className='form-control'
                            value={age}
                            onChange={(e) => { // Handle age input change
                                const value = e.target.value;
                                if (validateAge(value)) { // Validate age input
                                    setAge(value); // Update the age state
                                    setErrorMessage(""); // Clear error message
                                } else {
                                    setErrorMessage("Age must be a number with 1 or 2 digits."); // Set error message
                                }
                                if (value === "") {
                                    setAge(value); // Allow empty input
                                }
                            }} 
                        />
                    </div>
                    <button className='btn btn-success'>Submit</button> {/* Submit button */}
                </form>
            </div>
        </div>
    );
}

export default CreateUser; // Export the CreateUser component
