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
  try {
    const res = await fetch(`${BASE_URL}/${gameId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (err) {
    console.log(err.message);
  }
};

export { index, create, show };
