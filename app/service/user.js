const addNewUser = async (user) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
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
}

export default userService;

