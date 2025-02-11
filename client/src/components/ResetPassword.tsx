//ResetPassword.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      if (!response.ok) throw new Error("Failed to reset password");

      alert("Password reset successful! Please log in.");
      navigate("/login"); //return to login
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleReset}>
      <h2>Reset Password</h2>
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
        <label>New Password</label>
        <input
          type="password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-gray">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
