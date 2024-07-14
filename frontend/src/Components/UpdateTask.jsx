import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CSS/UpdateTask.css";
import axios from "axios";

const UpdateTask = () => {
  const { bid } = useParams();

  const checkLoggedIn = () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (!token) {
      navigate("/");
    }
  };

  useEffect(() => {
    checkLoggedIn();
  });

  const navigate = useNavigate();

  const [TodoData, setTodoData] = useState({
    task_name: "",
    task_description: "",
    task_status: "",
    task_priority: "",
  });

  // this part of code is to fetch info about task when we need to update
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/viewTasks/${bid}`)
      .then((response) => {
        setTodoData({
          ...TodoData,
          task_name: response.data.title,
          task_description: response.data.description,
          task_status: response.data.status,
          task_priority: response.data.priority,
        });
      })
      // .then((error) => {
      //   console.log(error);
      // });
  },);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodoData({
      ...TodoData,
      [name]: value,
    });
  };

  // console.log(TodoData.task_name);

  //this part of code is to update changes
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api//updateTask/${bid}`,
        TodoData
      );
      //console.log(response.data);
      setTodoData({
        task_name: "",
        task_description: "",
        task_status: "",
        task_priority: "",
      });
      // console.log(response.data);
      navigate("/viewTasks");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <fieldset>
        <legend>Update Task</legend>
        <div className="input-group">
          <label htmlFor="task_name">Task Name</label>
          <input
            required
            type="text"
            name="task_name"
            value={TodoData.task_name}
            placeholder="Enter Task Name"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="task_description">Description</label>
          <input
            required
            type="text"
            name="task_description"
            value={TodoData.task_description}
            placeholder="Enter Task Description"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="task_priority">Priority</label>
          <select
            required
            name="task_priority"
            value={TodoData.task_priority}
            onChange={handleInputChange}
          >
            <option hidden selected>
              Select One
            </option>
            <option value="High">High</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="task_status">Status</label>
          <select
            required
            name="task_status"
            value={TodoData.task_status}
            onChange={handleInputChange}
          >
            <option hidden selected>
              Select One
            </option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="input-group">
          <input
            type="button"
            value="Update Task"
            name="UpdateTask"
            onClick={handleFormSubmit}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default UpdateTask;
