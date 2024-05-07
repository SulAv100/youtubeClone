import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { useParams, useSearchParams } from 'react-router-dom'
import {API_KEY,value_converter} from '../../data'

import moment from 'moment';
const PlayVideo = ({}) => {

    const {videoId} = useParams();
    const [apiData,setApiData] = useState(null);
    const [channelData,setChannelData] = useState(null);
    const [commentData, setCommentData] = useState(null);


 
    
    const fetchVideoData = async ()=>{
           const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
           await fetch(videoDetails_url).then(response=>response.json()).then(data=>setApiData(data.items[0]));
    }

    const fetchChannelData = async () =>{
        const channelData_url =`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelID}&key=${API_KEY}`;
        await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]));
    }
    const fetchCommentData = async ()=>{
        const commentDetail_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        await fetch(commentDetail_url).then(resp=>resp.json()).then(data=>setCommentData(data.items));
    }

    useEffect(()=>{
        fetchChannelData();
    },[apiData])

    useEffect(()=>{
        fetchCommentData();
    },[videoId])

    useEffect(()=>{
        fetchVideoData();
    },[videoId]);
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
                <img src={channelData? channelData.snippet.thumbnails.default.url:"null"} alt="" />
                <div>
                    <p>{apiData? apiData.snippet.channelTitle:"Dr.751"}</p>
                    <span>{channelData? value_converter(channelData.statistics.subscriberCount):"100 k"}</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                    <p>{apiData? apiData.snippet.description:"This is notthing"}</p>

                <h4>{apiData?value_converter(apiData.statistics.commentCount):"none" }</h4>
                {
                 commentData? commentData.map((item,index)=>{
                        return (
                            <div key={index} className="comment">
                 <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                 <div>
                     <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1  day ago</span></h3>
                     <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                     <div className="comment-action">
                         <img src={like} alt="" />
                         <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                         <img src={dislike} alt="" />
                     </div>

                 </div>
             </div>
                     )
                        
        }):"null"
                }
                

            </div>
        </div>
    </>
)
}

export default PlayVideo