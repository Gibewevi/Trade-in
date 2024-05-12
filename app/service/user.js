const API_URL = process.env.NEXT_PUBLIC_API_URL;

const login = async (credentials) => {
    console.log('login service : ', credentials);
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}


const addNewUser = async (user) => {
    try {
        const response = await fetch(`${API_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const userResponse = await response.json();
        return userResponse;

    } catch (error) {
        console.error("Error adding new user:", error);
        throw error;
    }
};

const userService = {
    addNewUser,
    login
}

export default userService;

