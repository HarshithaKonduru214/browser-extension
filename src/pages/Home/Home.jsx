/* eslint-disable no-unused-expressions */
import {
  faClipboardList,
  faGear,
  faPencil,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import "./home.css";

export default function Home() {
  const focusInput = useRef("");
  const [focusText, setFocusText] = useState("");
  const [focusState, setFocusState] = useState(false);
  const [checked, setChecked] = useState(false);

  const [logoutMenu, setLogoutMenu] = useState(false);
  const [todoDisplay, setTodoDisplay] = useState(false);

  // TIME FETCH
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const minutes = minute / 10 < 1 ? `0${minute}` : minute;

  const [weatherInfo, setWeatherInfo] = useState({
    location: {
      name: "",
      region: "",
      country: "",
    },
    temperature: 0,
    icon: "",
  });

  useEffect(() => {
    getUserLocation();
  });

  const success = (position) => {
    getWeather(position.coords.latitude, position.coords.longitude);
  };

  const error = () => {
    getWeather();
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error);
  };

  async function getWeather(latitude, longitude) {
    let apiRequest = "";
    latitude && longitude
      ? (apiRequest = `https://api.weatherapi.com/v1/current.json?key=90592d9f740046e29bb53205221404&q=${latitude},${longitude}&aqi=yes`)
      : (apiRequest = `https://api.weatherapi.com/v1/current.json?key=90592d9f740046e29bb53205221404&q=Bangalore&aqi=yes`);
    try {
      const res = await axios.get(apiRequest);
      setWeatherInfo({
        location: {
          name: res.data.location.name,
          region: res.data.location.region,
          country: res.data.location.country,
        },
        temperature: res.data.current.temp_c,
        icon: res.data.current.condition.icon,
      });
    } catch (error) {
      console.log(error);
    }
  }
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
          <img
            src={weatherInfo.icon}
            alt="weather-icon"
            className="weather-icon"
          />
          <div className="weather-details">
            <div className="weather-temperature">
              {weatherInfo.temperature} &deg;
            </div>
            <div className="weather-location">
              {weatherInfo.location.name}, {weatherInfo.location.region},{" "}
              {weatherInfo.location.country}
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="time">
          {hour}:{minutes}
        </div>
        <div className="greeting">
          Good
          {(hour < 4 && " Night") ||
            (hour < 12 && " Morning") ||
            (hour < 16 && " Afternoon") ||
            (hour < 21 && " Evening") ||
            "Night"}
          , {localStorage.getItem("userName")}
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
