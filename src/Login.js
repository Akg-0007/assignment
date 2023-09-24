import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const navi = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:4000/api/register', { name, email, mobileNumber })
      .then((response) => {
        console.log(response.data.message);

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({ name, email, mobileNumber }));

        navi('/home');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default LoginForm;
