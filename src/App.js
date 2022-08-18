import './App.css';
import { useEffect, useState, useRef } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function App() {
  const searchInput = useRef(null)


  const [text2, setText2] = useState("")
  const [inputChar, setInputChar] = useState('')
  const [validStr, setValidStr] = useState('asdfjkl;')
  const length = 30
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
  const [keyPressed, setKeyPressed] = useState('')

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
    var res = ''
    var x = Array.from(letters).join('')
    for (let index = 0; index < length; index++) {
      res = res + x.charAt(Math.floor(Math.random() * (Math.floor(Math.random() * 10))))
    }

    setInputChar(res)
    setText2('')
  }
  const handleClick = (e) => {
    let l = e.key.toLowerCase(e.key)
    setKeyPressed(l)

    setTotalWords(totalWords + 1)
    if (l === inputChar[0]) {
      var x = inputChar[0]
      setToPress(inputChar[0])
      setText2(text2 + x)
      setInputChar(inputChar.substring(1))
      let a = l
      var m = { a: correct[a] + 1 }
      setCorrectCount(correctCount + 1)
      setCorrect(correct => ({
        ...correct,
        ...m
      }))
    }

    else {
      let a = l
      var o = { a: error[a] + 1 }
      setErrorCount(errorCount + 1)
      setCorrect(error => ({
        ...error,
        ...o
      }))
    }
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
  useEffect(() => {
    if (inputChar.length === 0) {
      info()
      stringGenerate()
    }
  })
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

  useEffect(() => {
    if (document.activeElement === searchInput.current) {
      setRunning(true)
    }
    else {
      setRunning(false)
    }
  })

  const submit = () => {
    confirmAlert({
      title: 'Confirm to reset',
      message: 'this will remove all your progress',
      buttons: [
        {
          label: 'Yes',
          onClick: () => reset()
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }
  return (
    <>
      <div className="not_supported">
        <h3>The Screen Resolution is not supported</h3>
      </div>
      <div className="App" >
        <div className="info">
          <p> Speed : <span> {(speed / 6)} wpm </span></p>
          <p> accuracy : <span> {accuracy}({(changeInAccuracy === NaN || changeInAccuracy === 0) ? ' ' : changeInAccuracy} %) </span></p>
          <p>Time escaped : <span>{toHHMMSS((time / 1000))}<i>({(running === false) ? 'paused' : 'running'})</i></span></p>
          <p>Total key Error : <span>{errorCount}</span></p>
          <button onClick={submit} className='btn-reset'>reset</button>
        </div>
        <hr className='hr-break' />
        <div className="info">
          <p> current Key :<span>'{inputChar[0]}'</span></p>
          {/* <p> string :<span>'{validStr}'</span></p> */}
          <div className='form'>
            <input value='asdfjkl;' name='easy' checked={validStr === 'asdfjkl;'} type="radio" onChange={(e) => {
              setValidStr(e.target.value)
            }} /> <span>ASDFJKL;</span>
            <input value='abcdefghijklmnopqrstuvwxyz' checked={validStr === 'abcdefghijklmnopqrstuvwxyz'} name='hardcore' type="radio" onChange={(e) => {
              setValidStr(e.target.value)
            }} /><span>a-z</span>
            <input value='abcdefghijklmnopqrstuvwxyz1234567890' checked={validStr === 'abcdefghijklmnopqrstuvwxyz1234567890'} name='nightmare' type="radio" onChange={(e) => {
              setValidStr(e.target.value)
            }} /><span>a-z 0-9</span>
            <input value='abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+{}|:">?<-=[];,./' checked={validStr === 'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+{}|:">?<-=[];,./'} name='God' type="radio" onChange={(e) => {
              setValidStr(e.target.value)
            }} /><span>all keys(a-z A-Z 0-9 symbols)</span>
            <button onClick={stringGenerate} className='btn-reset'>Generate String</button>
          </div>
        </div>
        <hr className='hr-break' />
        <br />
        <div className="title char_area">
          <h1 className="typed" >
            {text2}
          </h1>

          <h1 className="to_type" >
            {inputChar}
          </h1>
        </div>
        <input type="text"
          className='inputArea'
          ref={searchInput}
          placeholder={document.activeElement === searchInput.current ? ' ' : 'start typing here '}
          readOnly={true}
          onKeyDown={(e) =>
            handleClick(e)
          }
          onKeyUp={(e) => {
            setKeyPressed('')
          }
          } />
        <div className="keyboard">
          <div className="keyboard">
            <ul className="row row-0">
              <li className={keyPressed === 'Escape' ? ' key selected' : 'key'} id="esc">ESC</li>
              <li className={keyPressed === '1' ? ' key selected' : 'key'} id="1">1</li>
              <li className={keyPressed === '2' ? ' key selected' : 'key'} id="2">2</li>
              <li className={keyPressed === '3' ? ' key selected' : 'key'} id="3">3</li>
              <li className={keyPressed === '4' ? ' key selected' : 'key'} id="4">4</li>
              <li className={keyPressed === '5' ? ' key selected' : 'key'} id="5">5</li>
              <li className={keyPressed === '6' ? ' key selected' : 'key'} id="6">6</li>
              <li className={keyPressed === '7' ? ' key selected' : 'key'} id="7">7</li>
              <li className={keyPressed === '8' ? ' key selected' : 'key'} id="8">8</li>
              <li className={keyPressed === '9' ? ' key selected' : 'key'} id="9">9</li>
              <li className={keyPressed === '0' ? ' key selected' : 'key'} id="10">0</li>
              <li className={keyPressed === '-' ? ' key selected' : 'key'} >-</li>
              <li className={keyPressed === '+' ? ' key selected' : 'key'} >+</li>
              <li className={keyPressed === 'Backspace' ? ' key selected' : 'key'} id="back">BACK</li>
            </ul>
            <ul className="row row-1">
              <li className={keyPressed === 'Tab' ? ' key selected' : 'key'} id="tab">TAB</li>
              <li className={keyPressed === 'q' ? ' key selected' : 'key'} id="Q">Q</li>
              <li className={keyPressed === 'w' ? ' key selected' : 'key'} id="W">W</li>
              <li className={keyPressed === 'e' ? ' key selected' : 'key'} id="E">E</li>
              <li className={keyPressed === 'r' ? ' key selected' : 'key'} id="R">R</li>
              <li className={keyPressed === 't' ? ' key selected' : 'key'} id="T">T</li>
              <li className={keyPressed === 'y' ? ' key selected' : 'key'} id="Y">Y</li>
              <li className={keyPressed === 'u' ? ' key selected' : 'key'} id="U">U</li>
              <li className={keyPressed === 'i' ? ' key selected' : 'key'} id="I">I</li>
              <li className={keyPressed === 'o' ? ' key selected' : 'key'} id="O">O</li>
              <li className={keyPressed === 'p' ? ' key selected' : 'key'} id="P">P</li>
              <li className={keyPressed === 'BracketLeft' ? ' key selected' : 'key'} >[</li>
              <li className={keyPressed === 'BracketRight' ? ' key selected' : 'key'} >]</li>
              <li className={keyPressed === 'Backslash' ? ' key selected' : 'key'} >\</li>
            </ul>
            <ul className="row row-2">
              <li className={keyPressed === 'CapsLock' ? ' key selected' : 'key'} id="caps">CAPS</li>
              <li className={keyPressed === 'a' ? ' key selected' : 'key'} id="A">A</li>
              <li className={keyPressed === 's' ? ' key selected' : 'key'} id="S">S</li>
              <li className={keyPressed === 'd' ? ' key selected' : 'key'} id="D">D</li>
              <li className={keyPressed === 'f' ? ' key selected' : 'key'} id="F">F</li>
              <li className={keyPressed === 'g' ? ' key selected' : 'key'} id="G">G</li>
              <li className={keyPressed === 'h' ? ' key selected' : 'key'} id="H">H</li>
              <li className={keyPressed === 'j' ? ' key selected' : 'key'} id="J">J</li>
              <li className={keyPressed === 'k' ? ' key selected' : 'key'} id="K">K</li>
              <li className={keyPressed === 'l' ? ' key selected' : 'key'} id="L">L</li>
              <li className={keyPressed === 'Comma' ? ' key selected' : 'key'} >:</li>
              <li className={keyPressed === "Quote" ? ' key selected' : 'key'} >''</li>
              <li className={keyPressed === 'Enter' ? ' key selected' : 'key'} id="enter">ENTER</li>
            </ul>
            <ul className="row row-3">
              <li className={keyPressed === 'shift' ? ' key selected' : 'key'} id="left-shift">SHIFT</li>
              <li className={keyPressed === 'z' ? ' key selected' : 'key'} id="Z">Z</li>
              <li className={keyPressed === 'x' ? ' key selected' : 'key'} id="X">X</li>
              <li className={keyPressed === 'c' ? ' key selected' : 'key'} id="C">C</li>
              <li className={keyPressed === 'v' ? ' key selected' : 'key'} id="V">V</li>
              <li className={keyPressed === 'b' ? ' key selected' : 'key'} id="B">B</li>
              <li className={keyPressed === 'n' ? ' key selected' : 'key'} id="N">N</li>
              <li className={keyPressed === 'm' ? ' key selected' : 'key'} id="M">M</li>
              <li className={keyPressed === ',' ? ' key selected' : 'key'} >,</li>
              <li className={keyPressed === '.' ? ' key selected' : 'key'} >.</li>
              <li className={keyPressed === ';' ? ' key selected' : 'key'} >;</li>
              <li className={keyPressed === 'shift' ? ' key selected' : 'key'} id="right-shift">SHIFT</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
