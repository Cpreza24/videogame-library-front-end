import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as gameService from '../../services/gameService';
import './GameForm.css';

function GameForm({ handleAddGame, handleUpdatedGame }) {
  const { gameId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    console: '',
    rating: '',
    purchaseDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameId) {
      handleUpdatedGame(gameId, formData);
    } else {
      handleAddGame(formData);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchGame = async () => {
      if (!gameId) return;

      try {
        const gameData = await gameService.show(gameId);

        if (!gameData) {
          console.error('Game not found or invalid response');
          return;
        }
        const formattedDate = gameData.purchaseDate
          ? new Date(gameData.purchaseDate).toISOString().split('T')[0]
          : '';

        setFormData({
          title: gameData.title || '',
          console: gameData.console || '',
          rating: gameData.rating || '',
          purchaseDate: formattedDate, // Fixing the date format
        });
      } catch (error) {
        console.error('Error fetching game:', error);
      }
    };

    fetchGame();
  }, [gameId]);
  return (
    <main>
      <div>
        <h1>Game Form</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title-input'>Title: </label>
          <input
            required
            placeholder='Game'
            type='text'
            name='title'
            id='title-input'
            value={formData.title}
            onChange={handleChange}
          />
          <label htmlFor='console-input'>Console: </label>
          <input
            required
            placeholder='Console'
            type='text'
            name='console'
            id='console-input'
            value={formData.console}
            onChange={handleChange}
          />
          <label htmlFor='rating-input'>Rating: </label>
          <input
            type='text'
            name='rating'
            id='rating-input'
            value={formData.rating}
            onChange={handleChange}
          />
          <label htmlFor='purchase-date-input'>Purchased: </label>
          <input
            type='date'
            name='purchaseDate'
            id='purchase-date-input'
            value={formData.purchaseDate}
            onChange={handleChange}
          />
          <button className='submit-btn' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

export default GameForm;
