// src/components/RegisterPage.js
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from './App';

function RegisterPage() {
  const { setUserData } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    // Implement your registration logic here
    // For simplicity, we'll set a dummy user data here
    setUserData({
      username,
      // other user data
    });
    setRegistered(true);
  };

  if (registered) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterPage;
