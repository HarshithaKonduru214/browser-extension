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
          <div className="weather-temperature">
            <FontAwesomeIcon icon={faCloudBolt} />
            33 &deg;
          </div>
          <div className="weather-location">Bengaluru</div>
        </div>
      </div>
      <div className="main">Main</div>
      <div className="footer">Footer</div>
    </div>
  );
}
