import {
  faClipboardList,
  faCloudBolt,
  faGear,
  faPencil,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import "./home.css";

export default function Home() {
  const focusInput = useRef("");
  const [focusText, setFocusText] = useState("");
  const [focusState, setFocusState] = useState(false);
  const [checked, setChecked] = useState(false);

  const [logoutMenu, setLogoutMenu] = useState(false);
  const [todoDisplay, setTodoDisplay] = useState(false);

  return (
    <div className="home-container background-image">
      <div className="header">
        <div className="searchbar">
          <input
            type="text"
            className="search-input"
            placeholder="Google Search"
          />
          <FontAwesomeIcon className="search-icon" icon={faSearch} />
        </div>
        <div className="weather">
          <FontAwesomeIcon icon={faCloudBolt} className="weather-icon" />
          <div className="weather-details">
            <div className="weather-temperature">33 &deg;</div>
            <div className="weather-location">Bangalore</div>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="time">16:45</div>
        <div className="greeting">
          Good Evening, {localStorage.getItem("userName")}
        </div>
        <div className="focus">
          <div className="focus-question">What's your main focus today?</div>
          {focusText !== "" && focusState ? (
            <>
              <div className="focus-title">TODAY</div>
              <div className="focus-item">
                <input
                  type="checkbox"
                  onChange={() => setChecked((prev) => !prev)}
                />
                <div className={`${checked ? "strike" : ""}`}>{focusText}</div>
                <FontAwesomeIcon icon={faPencil} className="edit-icon" />
              </div>
            </>
          ) : (
            <input
              type="text"
              className="focus-input"
              ref={focusInput}
              onKeyPress={(event) =>
                event.key === "Enter"
                  ? (setFocusState(true),
                    setFocusText(focusInput.current.value))
                  : ""
              }
            />
          )}
        </div>
      </div>
      <div className="footer">
        <div className="logout">
          <FontAwesomeIcon
            icon={faGear}
            className="logout-icon"
            onClick={() => setLogoutMenu((prev) => !prev)}
          />
          {logoutMenu ? (
            <div
              className="logout-menu"
              onClick={() => {
                localStorage.removeItem("userName");
                window.location.reload(false);
              }}
            >
              Change name
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="quote">"Quote of the day"</div>
        <div className="todo" onClick={() => setTodoDisplay((prev) => !prev)}>
          <FontAwesomeIcon icon={faClipboardList} />
          Todo
        </div>
        {todoDisplay ? (
          <div className="todo-menu">
            <div className="todo-title">Today</div>
            <div className="todo-items"></div>
            <div className="todo-footer">
              <input type="text" className="todo-input" />
              <button className="add-button" onClick={() => {}}>
                Add
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
