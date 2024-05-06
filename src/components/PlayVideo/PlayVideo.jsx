import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { useSearchParams } from 'react-router-dom'
import {API_KEY,value_converter} from '../../data'

import moment from 'moment';
const PlayVideo = ({videoId}) => {

    const [apiData,setApiData] = useState(null);
    const [channelData,setChannelData] = useState([]);
    
    const fetchVideoData = async ()=>{
           const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
           await fetch(videoDetails_url).then(response=>response.json()).then(data=>setApiData(data.items[0]));
    }

    const fetchChannelData = async () =>{
        const channelData_url =`https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails%20statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]));
    }

    useEffect(()=>{
        fetchChannelData();
    },[apiData])

    useEffect(()=>{
        fetchVideoData();
    },[]);
  return (
    <>
        <div className="play-video">
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>{apiData? apiData.snippet.title:"Title here"}</h3>
            <div className="play-video-info">
                <p>{apiData? value_converter(apiData.statistics.viewCount):"16 K"} &bull; { apiData? moment(apiData.snippet.publishedAt).fromNow():"4 days ago"}</p>
                <div>
                    <span>
                        <img src={like} alt="" />{apiData? value_converter(apiData.statistics.likeCount):"16 K" }
                    </span>
                    <span>
                        <img src={dislike} alt="" />{apiData? value_converter(apiData.statistics.dislikeCount):"16 K" }
                    </span>
                    <span>
                        <img src={share} alt="" />
                    </span>
                    <span>
                        <img src={save} alt="" />Save
                    </span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={jack} alt="" />
                <div>
                    <p>{apiData? apiData.snippet.channelTitle:"Dr.751"}</p>
                    <span>{apiData? value_converter(apiData.statistics.subscriberCount):"100 k"}</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                    <p>{apiData? apiData.snippet.description:"This is notthing"}</p>

                <hr />
                <h4>{apiData?value_converter(apiData.statistics.commentCount):"none" }</h4>
                <div className="comment">
                    <img src={user_profile} alt="" />
                    <div>
                        <h3>Jack Nichloson <span>1  day ago</span></h3>
                        <p>Shitty boi shitty boi</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>244</span>
                            <img src={dislike} alt="" />
                        </div>

                    </div>
                </div>
                <div className="comment">
                    <img src={user_profile} alt="" />
                    <div>
                        <h3>Jack Nichloson <span>1  day ago</span></h3>
                        <p>Shitty boi shitty boi</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>244</span>
                            <img src={dislike} alt="" />
                        </div>

                    </div>
                </div>
                <div className="comment">
                    <img src={user_profile} alt="" />
                    <div>
                        <h3>Jack Nichloson <span>1  day ago</span></h3>
                        <p>Shitty boi shitty boi</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>244</span>
                            <img src={dislike} alt="" />
                        </div>

                    </div>
                </div>
                <div className="comment">
                    <img src={user_profile} alt="" />
                    <div>
                        <h3>Jack Nichloson <span>1  day ago</span></h3>
                        <p>Shitty boi shitty boi</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>244</span>
                            <img src={dislike} alt="" />
                        </div>

                    </div>
                </div>
                <div className="comment">
                    <img src={user_profile} alt="" />
                    <div>
                        <h3>Jack Nichloson <span>1  day ago</span></h3>
                        <p>Shitty boi shitty boi</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>244</span>
                            <img src={dislike} alt="" />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </>
)
}

export default PlayVideo