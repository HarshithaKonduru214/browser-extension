import { faCloudBolt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./home.css";

export default function Home() {
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
      <div className="main">Main</div>
      <div className="footer">Footer</div>
    </div>
  );
}
