import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Home() {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const navi = useNavigate();

  const sessionTimeoutRef = useRef(null);

  useEffect(() => {
    const isAdminUser =
      user.name === 'admin' &&
      user.email === 'admin@admin.com';
    setIsAdmin(isAdminUser);

    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get('http://localhost:4000/api/messages', {
          headers: {
            'x-auth-token': token,
          },
        })
        .then((response) => {
          setMessages(response.data.messages);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const sessionTimeout = 5 * 60 * 1000;
    sessionTimeoutRef.current = setTimeout(() => {
      handleLogout();
    }, sessionTimeout);

    return () => {
      clearTimeout(sessionTimeoutRef.current);
    };
  }, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    clearTimeout(sessionTimeoutRef.current);
    navi('/logino');
  };

  const handleSubmitMessage = () => {
    if (newMessage.trim() === '') {
      return;
    }

    axios
      .post(
        'http://localhost:4000/api/addmess',
        { message: newMessage },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      )
      .then((response) => {
        setMessages([...messages, { text: newMessage }]);
        setNewMessage('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2>Welcome, {user.name}!</h2>
      {isAdmin && (
        <div>
          <button className="admin-button" onClick={() => navi('/admin')}>
            View All Users
          </button>
        </div>
      )}
      <div>
        <h3>Write a Message:</h3>
        <input
          type="text"
          className="message-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <button className="submit-button" onClick={handleSubmitMessage}>
          Submit
        </button>
      </div>
      <div className="messages">
        <h3>Messages:</h3>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message.text}</li>
          ))}
        </ul>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
