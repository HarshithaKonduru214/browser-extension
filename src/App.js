import { useEffect, useState } from "react";
import "./App.css";
import { Home, Welcome } from "./pages";

function App() {
  const [userState, setUserState] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("userName");
    setUserState(user);
  }, [userState]);

  return (
    <div className="App">
      <div>{userState ? <Home /> : <Welcome />}</div>
    </div>
  );
}

export default App;
