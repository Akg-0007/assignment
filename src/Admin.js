import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get('http://localhost:4000/api/admin', {
          headers: {
            'x-auth-token': token,
          },
        })
        .then((response) => {
          setUserData(response.data.users);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Messages</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobileNumber}</td>
              <td>
                <ul>
                  {user.messages.map((message, messageIndex) => (
                    <li key={messageIndex}>{message.text}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
