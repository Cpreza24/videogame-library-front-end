import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom'; // Fix incorrect import
import { UserContext } from '../../contexts/UserContext';
import * as consoleService from '../../services/consoleService';
import './ConsoleDetails.css';

function ConsoleDetails({ handleDeleteConsole }) {
  const { consoleId } = useParams();
  const [console, setConsole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchConsole = async () => {
      try {
        const consoleData = await consoleService.show(consoleId);

        if (!consoleData) {
          throw new Error('Console not found');
        }

        setConsole(consoleData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConsole();
  }, [consoleId]);

  if (loading) return <p>Loading console details...</p>;

  if (error) return <p>Error: {error}</p>;

  if (!console) return <p>Console not found.</p>;

  return (
    <main>
      <div>
        <h1>{console.name}</h1>
        <p>Make: {console.make}</p>
        <p>Purchase Date: {console.purchaseDate}</p>
      </div>
      <div className='btn-container'>
        <Link className='edit-btn' to={`/consoles/${consoleId}/edit`}>
          Edit
        </Link>
        <button
          className='delete-btn'
          onClick={() => handleDeleteConsole(consoleId)}
        >
          Delete
        </button>
      </div>
    </main>
  );
}

export default ConsoleDetails;
