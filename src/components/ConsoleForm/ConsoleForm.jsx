import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as consoleService from '../../services/consoleService';

function ConsoleForm({ handleAddConsole, handleUpdatedConsole }) {
  const { consoleId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    make: '',
    purchaseDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (consoleId) {
      handleUpdatedConsole(consoleId, formData);
    } else {
      handleAddConsole(formData);
    }
  };

  useEffect(() => {
    const fetchConsole = async () => {
      const consoleData = await consoleService.show(consoleId);
      setFormData(consoleData);
    };
    if (consoleId) fetchConsole();
  }, [consoleId]);

  return (
    <main>
      <div>
        <h1>console form</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name-input'>Name: </label>
          <input
            required
            placeholder='Console'
            type='text'
            name='name'
            id='name-input'
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor='make-input'>Make: </label>
          <input
            required
            placeholder='Company Name'
            type='text'
            name='make'
            id='make-input'
            value={formData.make}
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
          <button type='submit'>Submit</button>
        </form>
      </div>
    </main>
  );
}

export default ConsoleForm;
