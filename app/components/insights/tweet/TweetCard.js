import { Tweet } from "react-tweet";
export default function TweetCard({ tweetId }) {
    return (
        <div className="break-inside w-[420px] hover:scale-105 duration-200 ease-in-out" data-theme="light">
            <Tweet id={tweetId} />
        </div>
    );
}