// src/Success.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Form.css";

const Success = () => {
  const { state } = useLocation();
  const { formData } = state || {};
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <h1>Submission Successful</h1>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default Success;
