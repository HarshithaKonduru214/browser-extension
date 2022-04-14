/* eslint-disable no-unused-expressions */
import {
  faClipboardList,
  faGear,
  faPencil,
  faSearch,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import "./home.css";

export default function Home() {
  const focusInput = useRef("");
  const searchInput = useRef("");
  const todoInput = useRef("");
  const [searchText, setSearchText] = useState("");
  const [focusText, setFocusText] = useState("");
  const [quoteText, setQuoteText] = useState("");
  const [focusState, setFocusState] = useState(false);
  const [checked, setChecked] = useState(false);

  const [logoutMenu, setLogoutMenu] = useState(false);
  const [todoTasks, setTodoTasks] = useState([]);
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

  function todoUpdate() {
    todoInput.current.value &&
      setTodoTasks([
        ...todoTasks,
        { _id: uuid(), name: todoInput.current.value, todoStrike: true },
      ]);
  }

  useEffect(() => {
    getUserLocation();
  });

  useEffect(() => {
    getQuoteText();
  }, []);
  async function getQuoteText() {
    try {
      const res = await axios.get("https://api.quotable.io/random");
      setQuoteText(res.data.content);
    } catch (error) {
      console.log(error);
    }
  }

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
          <form
            method="get"
            action="https://www.google.com/search"
            className="search-form"
            target="_blank"
            rel="noopener noreferrer"
          >
            <input
              type="text"
              name="q"
              className="search-input"
              placeholder="Google Search"
              autocomplete="off"
              ref={searchInput}
              value={searchText}
              onChange={() => setSearchText(searchInput.current.value)}
            />
            <button className="search-button" type="submit">
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
            </button>
          </form>
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
        <div className="quote">"{quoteText}"</div>
        <div className="todo" onClick={() => setTodoDisplay((prev) => !prev)}>
          <FontAwesomeIcon icon={faClipboardList} />
          Todo
        </div>

        {todoDisplay ? (
          <div className="todo-menu">
            <div className="todo-title">Today</div>
            <div className="todo-tasks">
              {todoTasks !== [] &&
                todoTasks.map((item) => {
                  return (
                    <div className="task-wrapper">
                      <div
                        className={`tasks ${item.todoStrike ? "" : "strike"}`}
                      >
                        <input
                          type="checkbox"
                          id="todo-check"
                          onChange={() => {
                            const temp = todoTasks.map((obj) => {
                              return obj._id === item._id
                                ? { ...obj, todoStrike: !item.todoStrike }
                                : obj;
                            });
                            setTodoTasks(temp);
                          }}
                          checked={item.todoStrike ? false : true}
                        />
                        {item.name}
                      </div>
                      <FontAwesomeIcon
                        className="remove-icon"
                        icon={faX}
                        onClick={() => {
                          const tempArr = todoTasks
                            .map((obj) => obj)
                            .filter((obj) => obj._id !== item._id);
                          setTodoTasks(tempArr);
                        }}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="todo-footer">
              <input
                type="text"
                className="todo-input"
                placeholder="Add todo"
                ref={todoInput}
              />
              <button
                className="add-button"
                onClick={() => {
                  todoUpdate();
                }}
              >
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
