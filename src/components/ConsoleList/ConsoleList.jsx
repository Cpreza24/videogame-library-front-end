import React from 'react';
import { Link } from 'react-router';
import './ConsoleList.css';

function ConsoleList({ consoles }) {
  return (
    <main>
      <div className='header-container'>
        <h1>Console List</h1>
        <p>Click a console to see more information</p>
      </div>
      <div className='console-container'>
        {consoles.map((console) => (
          <Link
            className='console-link'
            key={console._id}
            to={`/consoles/${console._id}`}
          >
            {console.name}
          </Link>
        ))}
      </div>
    </main>
  );
}

export default ConsoleList;
