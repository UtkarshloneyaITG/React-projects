import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [number, setnNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("aluu");
  let passwordRef = useRef(null);
  let passwordGenerater = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number) str += "0123456789";
    if (characters) str += "!@#$%^&*()-_+={}~`";

    for (let x = 1; x <= length; x++) {
      let rand = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(rand);
    }
    setPassword(pass);
  }, [length, number, characters]);
  let copyToClipBoard = () => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(passwordRef.current.value);
  };
  useEffect(() => {
    passwordGenerater();
  }, [length, number, characters]);

  return (
    <>
      <div className="card">
        <h1>Password Generator</h1>

        <div className="row">
          <div className="col output-wrap">
            <input
              className="pw-output"
              type="text"
              readOnly
              placeholder="Generated password will appear here"
              aria-label="Password output"
              value={password}
              ref={passwordRef}
            />
            <button className="btn" onClick={copyToClipBoard}>
              Copy
            </button>
          </div>
        </div>

        <div className="controls">
          <div className="control range-control">
            <label htmlFor="length" className="range-label">
              Password Length (<span>{length}</span>)
            </label>
            <input
              type="range"
              id="length"
              name="length"
              min="6"
              max="20"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
          </div>

          <label className="control checkbox">
            <input
              type="checkbox"
              onChange={() => {
                setnNumber((prev) => !prev);
              }}
            />
            Include letters
          </label>
          <label className="control checkbox">
            <input
              type="checkbox"
              onChange={() => {
                setCharacters((prev) => !prev);
              }}
            />
            Include numbers
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
