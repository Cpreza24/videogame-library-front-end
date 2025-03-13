import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import ConsoleList from './components/ConsoleList/ConsoleList';
import ConsoleForm from './components/ConsoleForm/ConsoleForm';
import * as consoleService from './services/consoleService';
import { UserContext } from './contexts/UserContext';

const App = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [consoles, setConsoles] = useState([]);

  const handleAddConsole = async (consoleFormData) => {
    const newConsole = await consoleService.create(consoleFormData);
    setConsoles([newConsole, ...consoles]);
    navigate('/consoles');
  };

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
