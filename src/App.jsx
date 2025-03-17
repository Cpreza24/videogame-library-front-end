import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, NavigationType } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import ConsoleList from './components/ConsoleList/ConsoleList';
import ConsoleForm from './components/ConsoleForm/ConsoleForm';
import ConsoleDetails from './components/ConsoleDetails/ConsoleDetails';
import GameList from './components/GameList/GameList';
import GameDetails from './components/GameDetails/GameDetails';
import GameForm from './components/GameForm/GameForm';
import * as gameService from './services/gameService';
import * as consoleService from './services/consoleService';
import { UserContext } from './contexts/UserContext';

const App = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [consoles, setConsoles] = useState([]);
  const [games, setGames] = useState([]);

  const handleAddConsole = async (consoleFormData) => {
    const newConsole = await consoleService.create(consoleFormData);
    setConsoles([newConsole, ...consoles]);
    navigate('/consoles');
  };

  const handleUpdatedConsole = async (consoleId, consoleFormData) => {
    const updatedConsole = await consoleService.update(
      consoleId,
      consoleFormData
    );
    setConsoles(
      consoles.map((console) =>
        consoleId === console._id ? updatedConsole : console
      )
    );
    navigate(`/consoles/${consoleId}`);
  };

  const handleDeleteConsole = async (consoleId) => {
    const deletedConsole = await consoleService.deleteConsole(consoleId);
    setConsoles(
      consoles.filter((console) => console._id !== deletedConsole._id)
    );
    navigate('/consoles');
  };

  const handleAddGame = async (gameFormData) => {
    const newGame = await gameService.create(gameFormData);
    setGames([newGame, ...games]);
    navigate('/games');
  };

  const handleUpdatedGame = async (gameId, gameFormData) => {
    const updatedGame = await gameService.update(gameId, gameFormData);
    setGames(games.map((game) => (gameId === game._id ? updatedGame : game)));
    navigate(`/games/${gameId}`);
  };

  const handleDeleteGame = async (gameId) => {
    const deletedGame = await gameService.deleteGame(gameId);
    setGames(games.filter((game) => game._id !== deletedGame._id));
    navigate('/games');
  };

  useEffect(() => {
    const fetchAllGames = async () => {
      const gameData = await gameService.index();
      setGames(gameData);
    };
    if (user) fetchAllGames();
  }, [user]);

  useEffect(() => {
    const fetchAllConsoles = async () => {
      const consoleData = await consoleService.index();
      setConsoles(consoleData);
    };
    if (user) fetchAllConsoles();
  }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />

        {user && (
          <>
            <Route
              path='/consoles'
              element={<ConsoleList consoles={consoles} />}
            />
            <Route
              path='/consoles/new'
              element={<ConsoleForm handleAddConsole={handleAddConsole} />}
            />
            <Route
              path='/consoles/:consoleId'
              element={
                <ConsoleDetails handleDeleteConsole={handleDeleteConsole} />
              }
            />
            <Route
              path='/consoles/:consoleId/edit'
              element={
                <ConsoleForm handleUpdatedConsole={handleUpdatedConsole} />
              }
            />
            <Route path='/games' element={<GameList games={games} />} />
            <Route
              path='/games/new'
              element={<GameForm handleAddGame={handleAddGame} />}
            />
            <Route
              path='/games/:gameId'
              element={<GameDetails handleDeleteGame={handleDeleteGame} />}
            />
            <Route
              path='/games/:gameId/edit'
              element={<GameForm handleUpdatedGame={handleUpdatedGame} />}
            />
          </>
        )}
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
