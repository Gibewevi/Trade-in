import tweetModel from "../models/TweetModel";
const getTweetsByContent = async (content) => {
    const tweets = tweetModel.getTweetsByContent(content);
    return tweets;
}

const tweetController = {
    getTweetsByContent,
};

export default tweetController;