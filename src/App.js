import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import Signup from "./client/Signup";
import User from "./components/User";
import LoginIn from "./client/LoginIn";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/user" /> : <LoginIn setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/SignIn"
            element={<Signup setIsLoggedIn={setIsLoggedIn} />}  
          />
          {isLoggedIn && (
            <>
              <Route
                path="/user"
                element={<User setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route path="/create" element={<CreateUser />} />
              <Route path="/edit/:id" element={<UpdateUser />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;