import { useContext } from 'react';
import { Link } from 'react-router';
import './NavBar.css';

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
            <Link className='nav-link' to='/'>
              Dashboard
            </Link>
          </li>
          <li>
            <Link className='nav-link' to='/consoles'>
              Consoles
            </Link>
          </li>
          <li>
            <Link className='nav-link' to='/consoles/new'>
              Add Console
            </Link>
          </li>
          <li>
            <Link className='nav-link' to='/games'>
              Games
            </Link>
          </li>
          <li>
            <Link className='nav-link' to='/games/new'>
              Add Game
            </Link>
          </li>

          <li>
            <Link className='nav-link' to='/' onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link className='nav-link' to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link className='nav-link' to='/sign-in'>
              Sign In
            </Link>
          </li>
          <li>
            <Link className='nav-link' to='/sign-up'>
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
