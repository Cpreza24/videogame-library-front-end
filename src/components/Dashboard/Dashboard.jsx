import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main>
      <h1>Welcome, {user.username}!</h1>
      <div className='welcome-container'>
        <p>
          This is your dashboard! It looks a little empty right now but, that
          will change with future updates! You can log your game consoles and
          videogames here to keep track of all your games. Use one of the links
          above to get started logging or to check your saved library.
        </p>
      </div>
    </main>
  );
};

export default Dashboard;
