import {
  faCloudBolt,
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
        <div className="time">20:08</div>
        <div className="greeting">Good Evening, Name</div>
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
      <div className="footer">Footer</div>
    </div>
  );
}
