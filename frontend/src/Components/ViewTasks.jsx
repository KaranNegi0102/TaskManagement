import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import "./CSS/ViewTasks.css"; // Import the external CSS file

const ViewTasks = () => {
  const [taskData, setTaskData] = useState([]);
  const [userName, setUserName] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const navigate = useNavigate();

  const getTasks = async () => {
    try {
      const userID = localStorage.getItem("userID");
      const response = await axios.get(`http://localhost:5000/api/viewTasks?userID=${userID}`);
      setTaskData(response.data.tasks);
      setUserName(response.data.user.name);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const checkLoggedIn = () => {
    const token = localStorage.getItem('token')
    // console.log(token);
    if(!token){
      navigate('/')
    }
  }

  useEffect(() => {
    checkLoggedIn()
  })

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteTask/${id}`);
      getTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleAddTask = () => {
    navigate("/addTask");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const filteredTasks = selectedPriority === "All" ? taskData : taskData.filter(task => task.priority === selectedPriority);

  return (
    <div>
      <header>
        <Navbar userName={userName} handleLogout={handleLogout} />
      </header>
      <div className="container">
        <h1 className="page-title">My Tasks</h1>

        <div className="filter-container">
          <label htmlFor="priority">Filter by Priority:</label>
          <select id="priority" value={selectedPriority} onChange={handlePriorityChange}>
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="task-list">
          {filteredTasks.map((task) => (
            <div key={task._id} className="task-card">
              <h3>{task.title}</h3>
              <p>Description: {task.description}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
              <div className="action-buttons">
                <a href={`/updateTask/${task._id}`} className="btn-edit">Edit</a>
                <button className="btn-delete" onClick={() => deleteTask(task._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <button className="add-task-btn" onClick={handleAddTask}>Add Another Task</button>
      </div>
    </div>
  );
};

export default ViewTasks;
