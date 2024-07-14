import React, { useEffect } from "react";
import CreateBook from "./Components/CreateBook.jsx";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ViewTasks from "./Components/ViewTasks.jsx";
import StartingPage from "./Components/StartingPage.jsx";
import UpdateTask from "./Components/UpdateTask.jsx";
import AuthPage from "./Components/AuthPage.jsx";
import LoginPage from "./Components/LoginPage.jsx";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
    }
  }, [location]);

  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/home" element={<StartingPage />} />
      <Route exact path="/register" element={<AuthPage />} />
      <Route exact path="/addTask" element={<CreateBook />} />
      <Route exact path="/viewTasks" element={<ViewTasks />} />
      <Route exact path="/updateTask/:bid" element={<UpdateTask />} />
    </Routes>
  );
}

export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

// window.addEventListener('load', function() {
//   if (window.location.pathname === '/login') {
//       localStorage.removeItem('token');
//   }
// });

// window.addEventListener('popstate', function() {
//   if (window.location.pathname === '/login') {
//       localStorage.removeItem('token');
//   }
// });

// window.addEventListener('hashchange', function() {
//   if (window.location.pathname === '/login') {
//       localStorage.removeItem('token');
//   }
// });
