import './App.css';
import { useEffect, useState } from 'react';

function downloadBlob(blob, name = 'blob.png') {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement('a');

  // Set link's href to point to the Blob URL
  link.href = blobUrl;
  link.download = name;

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    }),
  );

  // Remove link from body
  document.body.removeChild(link);
}
function App() {
  const [topText1, setTopText1] = useState('Your Text');
  const [bottomText1, setBottomText1] = useState('Your Text');
  const [topText, setTopText] = useState('Your Text');
  const [bottomText, setBottomText] = useState('Your Text');
  const [memeImg, setMemeImg] = useState('aag');
  const [placeHolder, setPlaceHolder] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.memegen.link/templates/');
        const json = await response.json();
        setData(json);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const replTop = topText
    .replace(/\?/g, '~q')
    .replace(/#/g, '~h')
    .replace(/\//g, '~s');

  const replBot = bottomText
    .replace(/\?/g, '~q')
    .replace(/#/g, '~h')
    .replace(/\//g, '~s');

  const src1 = `https://api.memegen.link/images/${memeImg}/${replTop}/${replBot}.png`;

  const options = {};

  return (
    <div className="App">
      <div>
        <h1>Meme Generator</h1>
        <label>
          <input
            type="text"
            placeholder="Top Text"
            onChange={(event) => setTopText1(event.currentTarget.value)}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Bottom Tex"
            onChange={(event) => setBottomText1(event.currentTarget.value)}
          />
        </label>
        <br />

        <div class="selectWrapper">
          <select
            onChange={(event) => setPlaceHolder(event.currentTarget.value)}
            class="selectBox"
          >
            {data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            setMemeImg(placeHolder);
            setTopText(topText1);
            setBottomText(bottomText1);
          }}
        >
          Generate Meme
        </button>
      </div>
      <img src={src1} alt="buzz" />
      <div>
        <button
          onClick={() => {
            fetch(src1, options)
              .then((res) => res.blob())
              .then((blob) => {
                downloadBlob(blob, 'meme.png');
              });
          }}
        >
          Click to download
        </button>
      </div>
    </div>
  );
}

export default App;
