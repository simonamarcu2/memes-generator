import React, { useEffect, useState } from "react";
import "./style.css";
import Meme from './Meme'
export default function App() {
    const [data, setData] = useState(null);
    const [meme, setMeme] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        if(data===null)
        {
        fetch('https://api.imgflip.com/get_memes')
        .then( (res) => res.json())
        .then( (respons) => {setData(respons.data.memes)
        })
        setLoading(false)
        }
    },[data])


    return (
        <div className="app">
        {
        loading === true || data===null?
        <div className="loading">
            Loading
        </div>
        :

        meme !== null?
        <div>
            <Meme meme={meme} setMeme={setMeme}/>
        </div>
        :
        <div className="container">
            {data.map((m,index)=>(
                <div className="card" onClick = {()=>{setMeme(m)}} key={index}>
                    <img src={m.url} alt={m.id} className="image"/>
                </div>
            ))}
        </div>
    }
    </div>
    );
}
