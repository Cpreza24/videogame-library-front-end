import React from 'react';
import { Link } from 'react-router';

function ConsoleList({ consoles }) {
  return (
    <main>
      <div>
        <h1>Consoles List</h1>
      </div>
      <div>
        {consoles.map((console) => (
          <Link key={console._id} to={`/consoles/${console._id}`}>
            <h2>{console.name}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default ConsoleList;
