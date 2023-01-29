import React from 'react'
import './VideoBackground.css'

const VIDEO_WIDTH = 1920
const VIDEO_HEIGHT = 1080
export const VideoBackground = () => {
    return <div className="video-background">
        <iframe
            width={VIDEO_WIDTH}
            height={VIDEO_HEIGHT}
            src='https://www.youtube.com/embed/-ZfRAkzVt-Q?version=3&loop=1&playlist=-ZfRAkzVt-Q&autoplay=1&controls=1&mute=1&loop=1&modestbranding=1&showinfo=0&start=0&enablejsapi=1&&widgetid=3'
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'/>
    </div>
};