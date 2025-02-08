//LoginModal.tsx
import { login } from "../api/authAPI";
import React,  { useState } from "react";

interface LoginModalProps {
  isLoginMode: boolean;
  onLoginSuccess: ()=> void; //callback for a successful login
}

const LoginModal: React.FC<LoginModalProps> = ({ isLoginMode, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLoginOrRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        // Use login function from authAPI.tsx
        const data = await login({email, password});
        console.log(`Login Mode: ${email}  ${password}`)
        if (data && data.token) {
          localStorage.setItem("token", data.token);
          onLoginSuccess(); //Navigate to the dahsboard page
        } else {
          alert("Login failed");
        }
      } else {
        // Handle user registration
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error("Registration failed");
        }

        alert("Registration successful! Please log in.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleLoginOrRegister}>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {isLoginMode ? "Sign In" : "Submit" }
      </button>
    </form>
  );
};


export default LoginModal;
