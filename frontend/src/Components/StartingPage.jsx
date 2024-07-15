import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/StartingPage.css"; // Import the CSS file for additional styling
import axios from "axios";
import Aeroplane from "../assets/aeroplane.png"

const StartingPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const isTokenValid = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/user/authenticate?token=${token}`);
      if (response.data.user) {
        // If user data exists, set the user name and continue rendering the page
        setUserName(response.data.user.name);
      } else {
        // If user data doesn't exist, redirect to the login page
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      // Handle errors, such as network issues or server errors
    }
  };

  const checkLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  };

  const getUserName = async () => {
    const userID = localStorage.getItem("userID");
    const response = await axios.get(`http://localhost:5000/api/viewTasks?userID=${userID}`);
    setUserName(response.data.user.name);
  };

  useEffect(() => {
    checkLoggedIn();
    getUserName();
    isTokenValid();
  }, []);

  const handleAddTask = () => {
    navigate("/addTask");
  };

  const handleViewTask = () => {
    navigate("/viewTasks");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="starting-page-container">

<div class="cloud cloud1">
  <div class="light"></div>
<img  src={Aeroplane}  /></div>

      <div className="card">
        <div className="content">
          <h1 className="title">Airport Authority of India</h1>
          <h3 className="midtitle">Task Management System</h3>
          {userName && (
            <>
              <h3 className="subtitle">Welcome {userName}</h3>
              <div className="button-container">
                <button
                  className="action-button add-button"
                  onClick={handleAddTask}
                >
                  ADD TASK
                </button>
                <button
                  className="action-button view-button"
                  onClick={handleViewTask}
                >
                  VIEW TASK
                </button>
                <button
                  className="action-button logout-button"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartingPage;
