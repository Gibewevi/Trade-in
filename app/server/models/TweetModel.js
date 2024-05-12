import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getTweetsByContent = async (content) => {
 // Récupérer les tweets qui contiennent le mot-clé spécifié dans le contenu
 const tweets = await prisma.tweet.findMany({
    where: {
      content: {
        contains: content, 
      },
    },
 });

 return tweets;
};

const tweetModel = {
 getTweetsByContent,
};

export default tweetModel;