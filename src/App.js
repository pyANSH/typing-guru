import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import Typewriter from 'typewriter-effect/dist/core'

function App() {
  const ref = useRef(null);


  const [text2, setText2] = useState("")
  const [inputChar, setInputChar] = useState('')
  const [validStr, setValidStr] = useState('asdf')
  const [length, setLength] = useState(30)
  const [toPress, setToPress] = useState('')

  const [correct, setCorrect] = useState({
    ' ': 0, a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0
  })
  const [error, setError] = useState({
    ' ': 0, a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0
  })

  const [time, setTime] = useState(0);

  const [errorCount, setErrorCount] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)

  const [accuracy, setAccuracy] = useState(0)
  const [totalWords, setTotalWords] = useState(0)
  const [changeInAccuracy, setChangeInAccuracy] = useState(0)
  const [speed, setSpeed] = useState(0)

  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  function stringGenerate() {
    var y = validStr + ''
    var letters = new Set();
    for (let i = 0; i < y.length; i++) {
      letters.add(y[i])
    }
    var x = Array.from(letters).join('')

    var res = ''
    for (let index = 0; index < length; index++) {
      var res = res + x.charAt(Math.floor(Math.random() * (Math.floor(Math.random() * 10))))
    }

    setInputChar(res)
    setText2('')
  }
  const handleClick = (e) => {
    if (running === true) {
      setTotalWords(totalWords + 1)
      if (e.key == inputChar[0]) {
        var x = inputChar[0]
        setToPress(inputChar[0])
        setText2(text2 + x)
        setInputChar(inputChar.substring(1))
        let a = e.key
        var m = { a: correct[e.key] + 1 }
        setCorrectCount(correctCount + 1)
        setCorrect(correct => ({
          ...correct,
          ...m
        }))
      }

      else {
        let a = e.key
        var m = { a: error[e.key] + 1 }
        setErrorCount(errorCount + 1)
        setCorrect(error => ({
          ...error,
          ...m
        }))
      }
    }
    else {
      window.alert('press start to start typing')
    }
  }
  function restart() {
    // stringGenerate()
    info()
    triggerStopWatch()
  }
  function reset() {
    setAccuracy(0)
    setChangeInAccuracy(0)
    setCorrectCount(0)
    setErrorCount(0)
    setTotalWords(0)
    setSpeed(0)
    setTime(0)
  }
  function info() {
    let m = (correctCount / totalWords) * 100
    setChangeInAccuracy(Number((accuracy - m).toFixed(1)))
    setAccuracy(m)
    let a = ((time / (1000 * 60)))
    let s = totalWords / a
    setSpeed(Number((s).toFixed(1)))
  }
  function triggerStopWatch() {
    if (running === false) {
      // setTime(0)
      setRunning(true)
    }
    else {
      setRunning(false)
    }
  }
  useEffect(() => {
    const a = document.getElementById(toPress)
    console.log(a)
    if (inputChar.length == 0) {
      info()
      stringGenerate()
    }
  }, [inputChar])
  const toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours, minutes, seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v, i) => v !== "00" || i > 0)
      .join(":")
  }
  return (
    <>
      <div className="not_supported">
        <h3>The Screen Resolution is not supported</h3>
      </div>
      <div className="App" >
        <div className="info">
          <p> Speed : <span> {speed} wpm </span></p>
          <p> accuracy : <span> {accuracy}({(changeInAccuracy === NaN || changeInAccuracy === 0) ? ' ' : changeInAccuracy} %) </span></p>
          <p>Time escaped : <span>{toHHMMSS((time / 1000))}</span></p>
          <p>Total key Error : <span>{errorCount}</span></p>
        </div>
        <hr className='hr-break' />
        <div className="info">
          <p> current Key :<span>'{inputChar[0]}'</span></p>
        </div>
        <hr className='hr-break' />
        <br />
        <div className="valid_char_option">
          {/* <button onClick={(e) => { add_validChar(e.target.value) }} className={(x) => { (valueCheck(x.target.value)) ? 'select' : 'not_select' }} value='a'>a</button> */}
        </div>
        <div className="setting">
          <input type="text" value={validStr} onChange={(e) => {
            setValidStr(e.target.value)
          }} />
          <button onClick={stringGenerate}>Generate String</button>
          <button onClick={restart}>{(running === false) ? 'start' : 'Stop'}</button>
          <button onClick={reset}>reset Values</button>
          <input type="text"
            className=''
            readOnly={true}
            onKeyDown={(e) =>
              handleClick(e)
            } />
        </div>
        <div className="title char_area">
          <h1 className="typed" >
            {text2}
          </h1>

          <h1 className="to_type" >
            {inputChar}
          </h1>
        </div>
        <div className="keyboard">
          <div className="keyboard">
            <ul className="row row-0">
              <li className="key selected" id="esc">ESC</li>
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
    </>
  );
}

export default App;
