const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/consoles`;

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

const create = async (consoleFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify(consoleFormData),
    });
    return res.json();
  } catch (err) {
    console.log(err.message);
  }
};

const show = async (consoleId) => {
  try {
    const res = await fetch(`${BASE_URL}/${consoleId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (err) {
    console.log(err.message);
  }
};

async function update(consoleId, consoleFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${consoleId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consoleFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const deleteConsole = async (consoleId) => {
  try {
    const res = await fetch(`${BASE_URL}/${consoleId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (err) {
    console.log(ErrorEvent.message);
  }
};

export { index, create, show, update, deleteConsole };
