import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import './SignInForm.css';

import { signIn } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Sign In</h1>
      <p>{message}</p>
      <form className='sign-in-form' autoComplete='off' onSubmit={handleSubmit}>
        <div className='input-container'>
          <div>
            <label htmlFor='email'>Username:</label>
            <input
              type='text'
              autoComplete='off'
              id='username'
              value={formData.username}
              name='username'
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              autoComplete='off'
              id='password'
              value={formData.password}
              name='password'
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className='sign-in-btn-container'>
          <button className='sign-in-btn'>Sign In</button>
          <button className='cancel-sign-in-btn' onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignInForm;
