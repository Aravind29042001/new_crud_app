import React, { useEffect, useState } from 'react'; // Import React and the useEffect, useState hooks
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import axios from 'axios'; // Import axios for making HTTP requests

function User({ setIsLoggedIn }) { // Define the User component, with setIsLoggedIn as a prop
    const [users, setUsers] = useState([]); // State for storing the list of users
    const navigate = useNavigate(); // Hook for programmatic navigation

    useEffect(() => { // Fetch the list of users when the component mounts
        axios.get('http://localhost:3001/users') // Make a GET request to fetch the list of users
            .then(result => {
                console.log(result.data); // Log the fetched data
                if (Array.isArray(result.data)) { // Check if the data is an array
                    setUsers(result.data); // Update the users state
                } else {
                    setUsers([]); // Set users to an empty array if the data is not an array
                }
            })
            .catch(err => {
                console.log(err); // Handle errors
                setUsers([]); // Set users to an empty array if an error occurs
            });
    }, []);

    const handleDelete = (id) => { // Function to handle user deletion
        axios.delete(`http://localhost:3001/users/deleteUser/${id}`) // Make a DELETE request to delete a user
            .then(res => {
                console.log(res); // Log the response
                setUsers(users.filter(user => user._id !== id)); // Update the users state by filtering out the deleted user
            })
            .catch(err => console.log(err)); // Handle errors
    };

    const handleLogout = () => { // Function to handle logout
        setIsLoggedIn(false); // Update the isLoggedIn state
        navigate('/'); // Navigate to the home page
    };

    return ( // Render the user list
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <div className="d-flex justify-content-between mb-3">
                    <Link to="/create" className='btn btn-success'>Add +</Link> {/* Link to the create user page */}
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button> {/* Logout button */}
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => ( // Iterate over the users array and render each user
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    <Link to={`/edit/${user._id}`} className="btn btn-warning">Update</Link> {/* Link to the update user page */}
                                    <button className="btn btn-danger ml-2" onClick={() => handleDelete(user._id)}>Delete</button> {/* Delete button */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default User; // Export the User component
