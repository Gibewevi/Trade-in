import tweetController from "@/app/server/controllers/TweetController";

export async function GET(request) {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const search = url.searchParams.get('search');

    // Attendre la réponse asynchrone
    const tweets = await tweetController.getTweetsByContent(search);

    return new Response(JSON.stringify(tweets), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    console.error('Erreur:', error);
    return new Response(JSON.stringify({ error: "Une erreur est survenue." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
}
