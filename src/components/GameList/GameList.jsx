import React from 'react';
import { Link } from 'react-router';
import './GameList.css';

function GameList({ games }) {
  return (
    <main>
      <div className='header-container'>
        <h1>Games list</h1>
        <p>Click a console to see more information</p>
      </div>
      <div className='game-container'>
        {games.length === 0 ? (
          <p>No games saved</p>
        ) : (
          games.map((game) => (
            <Link
              className='game-link'
              key={game._id}
              to={`/games/${game._id}`}
            >
              <h2>{game.title}</h2>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}

export default GameList;
