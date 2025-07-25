import { useState } from "react";
import "./App.css";
import PwnMeter from "./components/PwnedMeter";
import type { ZxcvbnResult } from "@zxcvbn-ts/core";

function App() {
  const [pass, setPass] = useState("");

  return (
    <>
      <input type="text" onChange={(e) => setPass(e.target.value)} />
      <PwnMeter password={pass} callback={(response: ZxcvbnResult) => console.log(response)} />
    </>
  );
}

export default App;
