import { useState } from "react";
import "./App.css";
import PwnMeter from "./components/PwnedMeter";
import type { ZxcvbnResult } from "@zxcvbn-ts/core";

function App() {
  const [pass, setPass] = useState("");

  return (
    <>
      <div className="test-body">
        <div className="test-box">
          <input type="text" className="test-input" onChange={(e) => setPass(e.target.value)} />
          <PwnMeter password={pass} callback={(response: ZxcvbnResult) => console.log(response)} />
        </div>
      </div>
    </>
  );
}

export default App;
