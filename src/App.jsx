import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

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
        {user ? (
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
            <Route path='/games/:gameId' element={<GameDetails />} />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
