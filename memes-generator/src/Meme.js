import React, {useState, useEffect} from 'react'
import "./style.css";

const Meme = ({meme, setMeme})=>{
    const [inp, setInp] = useState({
        template_id: meme.id,
        username: "memes",
        password: "ShowMeMemes",
        boxes: []
    })

    const [download, setDownload] = useState(null)
    const [loading, setLoading] = useState(false)
    const generateMeme = ()=>{
        setLoading(true)
        let url = `https://api.imgflip.com/caption_image?template_id=${inp.template_id}&username=${inp.username}&password=${inp.password}`;
        inp.boxes.map((box, index) => {
        url += `&boxes[${index}][text]=${box.text}`;
        });
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setMeme({ ...meme, url: data.data.url })
            setDownload(data.data.url)
            setLoading(false)
        })
        .catch(err => {
            console.log(err);
        });
    }
    const downloadMeme = ()=> {
    fetch(download, {
        method: "GET",
        headers: {}
    })
        .then(response => {
        response.arrayBuffer().then(function(buffer) {
            const url = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "meme.png"); 
            document.body.appendChild(link);
            link.click();
        });
        })
        .catch(err => {
        console.log(err);
        });
    }

    return(
        <div className="meme-container">
            <h1>Meme</h1>
            {loading===true? <div>Generating your Meme</div>: <div>
            <img src={meme.url} alt={meme.id} className="img"/>
            {
            [...Array(meme.box_count)].map((_, index) =>(
                <input 
                placeholder={`Enter Input ${index+1}`}
                className="input" 
                key={index}
                onChange={(e) => {
                    const newBoxes = inp.boxes;
                    newBoxes[index] = { text: e.target.value };
                    setInp({ ...inp, boxes: newBoxes });
                }}
                />
            ))
            }
            <div>
            <button onClick={()=>{generateMeme()}}>Generate Meme</button>
            <button onClick={()=>{setMeme(null)}}>Back</button>
            {download === null?<></>: <button onClick={e => downloadMeme(e)}>Download</button>}
            </div>
            </div>
            }

        </div>
    )
}
export default  Meme;
