
const Meme = ({meme, setMeme})=>{

    return(
        <div className="meme-container">
            <h1>Meme</h1>
        <div>
            <img src={meme.url} alt={meme.id} className="img"/>
            {
            [...Array(meme.box_count)].map((_, index) =>(
                <input 
                placeholder={`Enter Input ${index+1}`}
                className="input" 
                key={index}
                />
            ))
            }
            <div>
            <button>Generate Meme</button>
            <button>Back</button>
            </div>
            </div>
        </div>
    )
}

const [inp, setInp] = useState({
    template_id: meme.id,
    username: "username",
    password: "password",
    boxes: []
})
