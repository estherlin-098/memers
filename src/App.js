import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Search } from '@material-ui/icons';

function App() {
  const [text, setText] = useState('')
  const [memes, setMemes] = useState([]) //it's an array inside of json file
  const [loading, setLoading] = useState(false)

  async function getMemes() {
    const key = 'eQVdZZXH4xLAaJV3AEF3oiS4YF0NuyB1'
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key=' + key
    url += '&q=' + text //the quiry (from text input)
    const r = await fetch(url) //receive the response then move on (async - fetch) r: response
    const body = await r.json()
    setMemes(body.data)
    setText('') //after using it, set text equals to empty
    setLoading (false)
  }

  console.log(memes)

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrap"> 
          <TextField fullWidth variant = "outlined"
          label="Search for memes" 
          value={text} //control the value inside *******
          onChange={e=> setText(e.target.value)} //control the input fleid, and back to empty after we send it ********
          onKeyPress={e=>{ //key press - enter - to press
            if(e.key==='Enter') getMemes()
          }}
          />
          <Button variant="contained" color="primary"
            onClick={getMemes}>
            <Search />
            Search
          </Button>
        </div>
        </header>
        
        {loading && <LinearProgress />}

        <div className='memes'>
        {memes.map((meme,i)=> <Meme key={i} {...meme} />)}
        </div>
    </div>
  );
}

function Meme({images, title}){
  const url = images.fixed_height.url
  return (<div className="meme" onClick={()=>window.open(url, '_blank')}>
    <div className="meme-title">{title}</div>
    <img height="200" alt="meme" src={url} />
  </div>)
}

export default App;

//firebase init
//npm run build
//firebase deploy
 
