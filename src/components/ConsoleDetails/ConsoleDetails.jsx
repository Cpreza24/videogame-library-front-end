import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom'; // Fix incorrect import
import { UserContext } from '../../contexts/UserContext';
import * as consoleService from '../../services/consoleService';

function ConsoleDetails() {
  const { consoleId } = useParams();
  const [console, setConsole] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error handling
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

  // Handle loading state
  if (loading) return <p>Loading console details...</p>;

  // Handle errors
  if (error) return <p>Error: {error}</p>;

  // Handle case where console is still null
  if (!console) return <p>Console not found.</p>;

  return (
    <main>
      <div>
        <h1>{console.name}</h1>
        <p>Make: {console.make}</p>
        <p>Purchase Date: {console.purchaseDate}</p>
      </div>
      <div>
        <Link to={`/consoles/${consoleId}/edit`}>Edit</Link>
        <button onClick={() => props.handleDeleteHoot(hootId)}>Delete</button>
      </div>
    </main>
  );
}

export default ConsoleDetails;
