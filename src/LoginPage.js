// src/components/LoginPage.js
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './App';

function LoginPage() {
  const { userData, setUserData } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here, set user data in the context upon successful login
    // For simplicity, we'll set a dummy user data here
    setUserData({
      username: 'exampleUser',
      // other user data
    });
    setLoggedIn(true);
  };

  if (loggedIn || userData) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
