const getTweetBycontent = async (search) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        // Fetch tweet from your API
        const response = await fetch(`${API_URL}/api/tweets?search=${search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        // Vérifiez si la réponse est réussie
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        // Puisque les tweets sont retournés directement sous forme de tableau
        const tweets = await response.json(); // Directement récupérer le tableau
        return tweets;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

const tweet = {
    getTweetBycontent,
}

export default tweet;
