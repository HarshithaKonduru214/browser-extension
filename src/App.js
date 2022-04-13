import { useState } from "react";
import "./App.css";
import { Home, Welcome } from "./pages";

function App() {
  const [userState, setUserState] = useState(true);

  return (
    <div className="App">
      <div>{userState ? <Home /> : <Welcome />}</div>
    </div>
  );
}

export default App;
