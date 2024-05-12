'use client'
import React, { useEffect, useState } from "react";
import Search from "../insights/tweet/Search";
import { Tweet } from "react-tweet";
import TweetCard from "../insights/tweet/TweetCard";

const TweetDeck = ({ tweets }) => {
const [tweetsList, setTweetsList] = useState(tweets);

 useEffect(()=>{
      setTweetsList(tweets);
 }, [tweets]);

 return (
    <div className="min-h-screen">
      <div className="flex items-center w-full max-w-7xl h-[60px] mb-[35px]">
        <Search tweetsList={tweetsList} setTweetsList={setTweetsList}/>
      </div>

      <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg max-w-8xl mx-auto test">
        {tweetsList.map((tweet, id) => (
          <TweetCard tweetId={tweet.tweetId} key={id} />
        ))}
      </div>
    </div>
 );
};

export default TweetDeck;
