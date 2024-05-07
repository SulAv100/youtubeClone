import React from 'react'
import './Video.css'
import PlayVideo from '../../components/PlayVideo/PlayVideo'
import Recommeded from '../../components/Recommended/Recommeded'
import { useParams } from 'react-router-dom'

const Video = () => {

    const {videoId, categoryId} = useParams();
  return (
    <>
        <div className="play-container">
            <PlayVideo videoId={videoId} categoryId={categoryId}/>
            <Recommeded categoryId={categoryId}/>
        </div>
    </>
)
}

export default Video