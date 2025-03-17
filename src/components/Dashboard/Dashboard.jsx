import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  return (
    <main>
      <h1>Welcome, {user.username}!</h1>
      <p>
        This is the dashboard page where you can see a list of users. Click on a
        user to see their videogame library. Use the links to log your own and
        start sharing your games!
      </p>
      <Link>{users.username}</Link>
    </main>
  );
};

export default Dashboard;
