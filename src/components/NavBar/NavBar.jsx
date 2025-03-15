import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav>
      {user ? (
        <ul>
          <li>
            <Link to='/consoles'>Consoles</Link>
          </li>
          <li>
            <Link to='/consoles/new'>Add Console</Link>
          </li>
          <li>
            <Link to='/games'>Games</Link>
          </li>
          <li>
            <Link to='/games/new'>Add Game</Link>
          </li>
          <li>
            <Link to='/'>Dashboard</Link>
          </li>
          <li>
            <Link to='/' onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/sign-in'>Sign In</Link>
          </li>
          <li>
            <Link to='/sign-up'>Sign Up</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
