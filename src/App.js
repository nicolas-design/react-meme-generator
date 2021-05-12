import './App.css';
import { useState } from 'react';
import logo from './logo.svg';

function App() {
  const [topText, setTopText] = useState('Your Text');
  const [bottomText, setBottomText] = useState('Your Text');
  const [memeImg, setMemeImg] = useState('buzz');
  const [placeHolder, setPlaceHolder] = useState('');

  let replTop = topText
    .replace(/\?/g, '~q')
    .replace(/#/g, '~h')
    .replace(/\//g, '~s');

  let replBot = bottomText
    .replace(/\?/g, '~q')
    .replace(/#/g, '~h')
    .replace(/\//g, '~s');

  let src1 = `https://api.memegen.link/images/${memeImg}/${replTop}/${replBot}.png`;

  return (
    <div className="App">
      <div>
        <label>
          Top Text:{' '}
          <input onChange={(event) => setTopText(event.currentTarget.value)} />
        </label>
        <label>
          Bottom Text:{' '}
          <input
            onChange={(event) => setBottomText(event.currentTarget.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Meme:
          <input
            onChange={(event) => setPlaceHolder(event.currentTarget.value)}
          />
        </label>
        <button
          onClick={() => {
            setMemeImg(placeHolder);
          }}
        >
          submit
        </button>
      </div>
      <img src={src1} alt="buzz" />
      <div>
        <a href={src1} download>
          Click to download
        </a>
      </div>
    </div>
  );
}

export default App;
