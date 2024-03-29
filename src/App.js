import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [emailError, setEmailError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    setEmailError(re.test(email) ? '' : 'Invalid email address');
  };

  const validatePassword = (password) => {
    let errors = [];

    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Need 1 Capital Letter');
    }

    if (!/(?=.{8,})/.test(password)) {
      errors.push('Atleast 8 Character password');
    }

    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      errors.push('Need 1 Special Character');
    }

    setPasswordErrors(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(formData.email);
    validatePassword(formData.password);

    if (!emailError && !passwordErrors.length) {
      console.log(formData);
    }
  };

  return (
    <div className="App">
      <h1>Authentication Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={(e) => validateEmail(e.target.value)}
            required
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={(e) => validatePassword(e.target.value)}
            required
          />
          {passwordErrors.length > 0 && (
            <div className="error">
              {passwordErrors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default App;
