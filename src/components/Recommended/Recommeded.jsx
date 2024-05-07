import React, { useEffect, useState } from 'react'
import './Recommeded.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import {API_KEY, value_converter} from '../../data'
import { Link } from 'react-router-dom'

const Recommeded = ({categoryId}) => {

    const [apiData, setApiData] = useState([]);

    const fetchData  = async ()=>{
        const api_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20contentDetails%2C%20statistics&chart=mostPopular&maxResults=10&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
        await fetch(api_url).then(response=>response.json()).then(data=>setApiData(data.items));
    }
    useEffect(()=>{
        fetchData();
    },[])

  return (
    <>

   
                <div className="recommended">
        
        {
            apiData? apiData.map((item,index)=>{
                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list">
            <img src={item.snippet.thumbnails.default.url} alt="" />
            <div className="vid-info">
                <h4>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{value_converter(item.statistics.viewCount)}</p>
            </div>
        </Link>
                )
            }):"null"
        }
        
    </div>
    
            
        
    
    
    </>
)
}

export default Recommeded