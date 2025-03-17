import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as gameService from '../../services/gameService';
import './GameDetails.css';

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
      <div></div>
      <div>
        <h1>{game.title}</h1>
        <p>Console: {game.console}</p>
        <p>Rating: {game.rating}</p>
        <p>Purchased: {game.purchaseDate}</p>
      </div>
      <div className='btn-container'>
        <Link className='edit-btn' to={`/games/${gameId}/edit`}>
          Edit
        </Link>
        <button className='delete-btn' onClick={() => handleDeleteGame(gameId)}>
          Delete
        </button>
      </div>
    </main>
  );
}

export default GameDetails;
