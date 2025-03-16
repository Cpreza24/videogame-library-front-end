const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/games`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (err) {
    console.log(err.message);
  }
};

const create = async (gameFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify(gameFormData),
    });
    return res.json();
  } catch (err) {
    console.log(err.message);
  }
};

const show = async (gameId) => {
  if (!gameId) {
    console.error('Error: gameId is missing');
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/${gameId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (!res.ok) throw new Error(`Failed to fetch game: ${res.statusText}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Fetch error:', err.message);
    return null;
  }
};

async function update(gameId, gameFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${gameId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const deleteGame = async (gameId) => {
  try {
    const res = await fetch(`${BASE_URL}/${gameId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err.message);
  }
};

export { index, create, show, update, deleteGame };
