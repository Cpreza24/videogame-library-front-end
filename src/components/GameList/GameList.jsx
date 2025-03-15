import React from 'react';
import { Link } from 'react-router';

function GameList({ games }) {
  return (
    <main>
      <div>
        <h1>Games list</h1>
      </div>
      <div>
        {games.map((game) => (
          <Link key={game._id} to={`/games/${game._id}`}>
            <h2>{game.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default GameList;
