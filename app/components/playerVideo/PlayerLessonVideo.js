'use client'
import { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function PlayerVideo({ content }) {
    const contentUrl = content.contentUrl
    const videoRef = useRef(null);
    
    useEffect(() => {
        if (videoRef.current) {
            videojs(videoRef.current, {
                sources: [
                    {
                        src: contentUrl,
                        type: "video/mp4"
                    }
                ]
            });
        }
    });


    return (
        <div className="relative flex items-center justify-center h-full">
            <div className="flex-none w-[15%] max-w-[260px] h-full bg-[#0B0B0B] bg-opacity-50"></div>
            <div className="flex-1 h-full">
                <video controls ref={videoRef} className="video-js w-full" />
            </div>
            <div className="flex-none w-[15%] max-w-[260px] h-full bg-[#0B0B0B] bg-opacity-50"></div>
        </div>
    );
}
