// src/Form.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNo: "",
    country: "",
    city: "",
    panNo: "",
    aadharNo: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordErrors = [];
    if (password.length < 8)
      passwordErrors.push("Password must be at least 8 characters long.");
    if (!/[A-Z]/.test(password))
      passwordErrors.push(
        "Password must contain at least one uppercase letter."
      );
    if (!/[a-z]/.test(password))
      passwordErrors.push(
        "Password must contain at least one lowercase letter."
      );
    if (!/[0-9]/.test(password))
      passwordErrors.push("Password must contain at least one number.");
    if (!/[!@#$%^&*]/.test(password))
      passwordErrors.push(
        "Password must contain at least one special character."
      );
    return passwordErrors;
  };

  const validate = () => {
    let errors = {};
    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phoneNo) errors.phoneNo = "Phone Number is required";
    if (!formData.country) errors.country = "Country is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.panNo) errors.panNo = "Pan Number is required";
    if (!formData.aadharNo) errors.aadharNo = "Aadhar Number is required";

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) errors.password = passwordErrors.join(" ");

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      const passwordErrors = validatePassword(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordErrors.length > 0 ? passwordErrors.join(" ") : "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value
          ? ""
          : `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      navigate("/success", { state: { formData } });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span>{errors.firstName}</span>}
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span>{errors.lastName}</span>}
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span>{errors.username}</span>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Password</label>
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            Show/Hide
          </button>
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
          />
          {errors.phoneNo && <span>{errors.phoneNo}</span>}
        </div>
        <div>
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="india">India</option>
            <option value="usa">USA</option>
            {/* Add more countries as needed */}
          </select>
          {errors.country && <span>{errors.country}</span>}
        </div>
        <div>
          <label>City</label>
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="">Select City</option>
            <option value="mumbai">Mumbai</option>
            <option value="newyork">New York</option>
            {/* Add more cities as needed */}
          </select>
          {errors.city && <span>{errors.city}</span>}
        </div>
        <div>
          <label>Pan Number</label>
          <input
            type="text"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
          />
          {errors.panNo && <span>{errors.panNo}</span>}
        </div>
        <div>
          <label>Aadhar Number</label>
          <input
            type="text"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
          />
          {errors.aadharNo && <span>{errors.aadharNo}</span>}
        </div>
        <div>
          <button
            type="submit"
            disabled={Object.keys(errors).some((key) => errors[key] !== "")}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
