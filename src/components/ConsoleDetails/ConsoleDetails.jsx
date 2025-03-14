import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as consoleService from '../../services/consoleService';

function ConsoleDetails() {
  const { consoleId } = useParams();
  const [console, setConsole] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchConsole = async () => {
      const consoleData = await consoleService.show(consoleId);
      setConsole(consoleData);
    };
    fetchConsole();
  }, [consoleId]);

  return (
    <div>
      <h1>{console.name}</h1>
    </div>
  );
}

export default ConsoleDetails;
