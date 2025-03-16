import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as gameService from '../../services/gameService';

function GameDetails({ handleDeleteGame }) {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const gameData = await gameService.show(gameId);

        if (!gameData) {
          throw new Error('game not found');
        }
        setGame(gameData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [gameId]);

  if (loading) return <p>Loading console details...</p>;

  if (error) return <p>Error: {error}</p>;

  if (!console) return <p>Console not found.</p>;

  return (
    <main>
      <div>
        <h1>game details</h1>
      </div>
      <div>
        <h2>{game.title}</h2>
        <p>{game.console}</p>
        <p>{game.rating}</p>
        <p>{game.purchaseDate}</p>
      </div>
      <div>
        <Link to={`/games/${gameId}/edit`}>Edit</Link>
        <button onClick={() => handleDeleteGame(gameId)}>Delete</button>
      </div>
    </main>
  );
}

export default GameDetails;
