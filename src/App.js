import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';



function App() {

  const [text, setText] = useState("")
  const [text2, setText2] = useState(" ")
  const [character, setCharacter] = useState('')
  const [inputChar, setInputChar] = useState('')
  const [validStr, setValidStr] = useState('asdf')
  const [length, setLength] = useState(50)
  // window.addEventListener('onkey')

  function stringGenerate() {
    var res = ''
    for (let index = 0; index < length; index++) {
      var res = res + validStr.charAt(Math.floor(Math.random() * (Math.floor(Math.random() * 10))))
    }
    setInputChar(res)
  }
  // function isValid(key, queue) {

  // }
  const handleClick = (e) => {
    if (e.key == inputChar[0]) {
      setInputChar(inputChar.substring(1))
      console.log('working')
    }
    else {
      console.log('error')
    }

  }


  return (
    <div className="App">
      <input type="text"
        readOnly={true}
        onKeyDown={(e) =>
          handleClick(e)
        } />
      <input type="text" value={validStr} onChange={(e) => {
        setValidStr(e.target.value)
      }} />
      <input type="text" value={length} onChange={(e) => {
        setLength(e.target.value)
      }} />
      <button onClick={stringGenerate}>Generate String</button>


      <div className="keyboard">

        <h1 className="title">{inputChar}</h1>
        <h1 className="title">{text2}</h1>
        <div className="keyboard">
          <ul className="row row-0">
            <li className="key" id="esc">ESC</li>
            <li className="key" id="1">1</li>
            <li className="key" id="2">2</li>
            <li className="key" id="3">3</li>
            <li className="key" id="4">4</li>
            <li className="key" id="5">5</li>
            <li className="key" id="6">6</li>
            <li className="key" id="7">7</li>
            <li className="key" id="8">8</li>
            <li className="key" id="9">9</li>
            <li className="key" id="10">0</li>
            <li className="key" >-</li>
            <li className="key" >+</li>
            <li className="key" id="back">BACK</li>
          </ul>
          <ul className="row row-1">
            <li className="key" id="tab">TAB</li>
            <li className="key" id="Q">Q</li>
            <li className="key" id="W">W</li>
            <li className="key" id="E">E</li>
            <li className="key" id="R">R</li>
            <li className="key" id="T">T</li>
            <li className="key" id="Y">Y</li>
            <li className="key" id="U">U</li>
            <li className="key" id="I">I</li>
            <li className="key" id="O">O</li>
            <li className="key" id="P">P</li>
            <li className="key" >[</li>
            <li className="key" >]</li>
            <li className="key" >\</li>
          </ul>
          <ul className="row row-2">
            <li className="key" id="caps">CAPS</li>
            <li className="key" id="A">A</li>
            <li className="key" id="S">S</li>
            <li className="key" id="D">D</li>
            <li className="key" id="F">F</li>
            <li className="key" id="G">G</li>
            <li className="key" id="H">H</li>
            <li className="key" id="J">J</li>
            <li className="key" id="K">K</li>
            <li className="key" id="L">L</li>
            <li className="key" >:</li>
            <li className="key" >''</li>
            <li className="key" id="enter">ENTER</li>
          </ul>
          <ul className="row row-3">
            <li className="key" id="left-shift">SHIFT</li>
            <li className="key" id="Z">Z</li>
            <li className="key" id="X">X</li>
            <li className="key" id="C">C</li>
            <li className="key" id="V">V</li>
            <li className="key" id="B">B</li>
            <li className="key" id="N">N</li>
            <li className="key" id="M">M</li>
            <li className="key" >,</li>
            <li className="key" >.</li>
            <li className="key" >;</li>
            <li className="key" id="right-shift">SHIFT</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
