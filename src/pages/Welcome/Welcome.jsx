import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import "./welcome.css";

export default function Welcome() {
  const nameInput = useRef("");
  const [name, setName] = useState("");

  return (
    <div className="welcome-container background-image">
      <div className="welcome-text">Hello! What's your name?</div>
      <input
        type="text"
        className="welcome-input"
        ref={nameInput}
        onChange={() => {
          setName(nameInput.current.value);
        }}
      />

      {name !== "" ? (
        <button
          className="welcome-button"
          onClick={() => {
            localStorage.setItem("userName", nameInput.current.value);
            window.location.reload(false);
          }}
        >
          Continue
          <FontAwesomeIcon className="welcome-icon" icon={faAngleRight} />{" "}
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
