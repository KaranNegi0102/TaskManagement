import "./CSS/AuthPage.css";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
 

const AuthPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  async function registerUser(e) {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const response = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (data.success) {
      window.location.href = "/";
    } else {
      setErrorMessage(data.message || "An error occurred during registration.");
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="auth-container">
      <h1>Airport Authority of India</h1>
      <form onSubmit={registerUser}>
        <h1>Register Here</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={name}
          placeholder="Enter Your Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter Your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={password}
            placeholder="Enter Your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEye/> : <FaEyeSlash/>}
          </div>
        </div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="password-container">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Enter Your Password Again"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div onClick={toggleConfirmPasswordVisibility}>
            {confirmPasswordVisible ? <FaEye/> : <FaEyeSlash/>}
          </div>
        </div>
        <input type="submit" value="Register" />
        <a href="/">Already a User?</a>
      </form>
    </div>
  );
};

export default AuthPage;
