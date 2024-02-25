'use client'
import { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function PlayerVideo({ lesson }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videojs(videoRef.current, {
                sources: [
                    {
                        src: lesson.contentUrl,
                        type: "video/mp4"
                    }
                ]
            });
        }
    });

    return (
        <div className="w-full">
            <video controls ref={videoRef} className="video-js" />
        </div>

    );
}
