import { useState } from "react";
import "./Modal.css";

function Modal() {
  const [happening, setHappening] = useState(true);
  const [nearby, setNearby] = useState(false);
  const [colorHappening, setColorHappening] = useState("1px solid blue");
  const [colorNearby, setColorNearby] = useState("none");
  const [fontHappening, setFontHappening] = useState("black");
  const [fontNearby, setFontNearby] = useState("grey");

  function handleHappening() {
    setHappening(true);
    setColorHappening("1px solid blue");
    setNearby(false);
    setColorNearby("none");
    setFontHappening("black");
    setFontNearby("grey");
  }

  function handleNearby() {
    setNearby(true);
    setColorNearby("1px solid blue");
    setHappening(false);
    setColorHappening("none");
    setFontHappening("grey");
    setFontNearby("black");
  }

  return (
    <div id="modal-container">
      <div className="modal-container-info">
        <div className="modal-container-info-header">
          <p className="modal-container-info-header-find">Find Presentations</p>
          <p className="modal-container-info-header-location">
            Location: Exhibit Hall: Stage
          </p>
        </div>
        <div className="modal-container-info-body">
          <div className="modal-container-info-body-button">
            <button
              onClick={handleHappening}
              style={{
                borderBottom: colorHappening,
                color: fontHappening,
              }}
            >
              Happening Now
            </button>
            <button
              onClick={handleNearby}
              style={{
                borderBottom: colorNearby,
                color: fontNearby,
              }}
            >
              Nearby
            </button>
          </div>
          {happening ? (
            // <a
            //   href="https://astc-web-companion-test.netlify.app/sessions/29"
            //   className="#modal-container-link"
            //   style={{
            //     textDecoration: "none",
            //     color: "black",
            //   }}
            // >
            <div className="modal-container-info-body-session">
              <div className="modal-container-info-body-time">
                <p>1:50pm-2:05pm</p>
              </div>
              <div className="Session">
                <div className="Session-icon">
                  <span>
                    <i className="fa-regular fa-calendar"></i>
                  </span>
                </div>
                <div className="Session-info">
                  <p className="Session-info-title">
                    Airborne Interactive: Elevating the Museum Experience with
                    Spatial Computing:
                  </p>
                  <p className="Session-info-time">1:50pm-2:05pm</p>
                  <p className="Session-info-presenters">
                    Presenter: Shiri Burson - AYR Immersive, Chicago, Illinois,
                    United States.
                  </p>
                  <p className="Session-info-location">
                    Location: Exhibit Hall: Stage
                  </p>
                </div>
                <div className="Session-arrow">
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </div>
            </div>
          ) : (
            // </a>
            <div className="modal-container-info-body-session">
              {/* <a
                href="https://astc-web-companion-test.netlify.app/sessions/30"
                className="#modal-container-link"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              > */}
              <div className="modal-container-info-body-time">
                <p>2:10pm-2:25pm</p>
              </div>
              <div className="Session">
                <div className="Session-icon">
                  <span>
                    <i className="fa-regular fa-calendar"></i>
                  </span>
                </div>
                <div className="Session-info">
                  <p className="Session-info-title">
                    Astronomy Activities for Neurodiverse Youth
                  </p>
                  <p className="Session-info-time">2:10pm-2:25pm</p>
                  <p className="Session-info-presenters">
                    Presenters:
                    <br></br>
                    Wendy Martin
                    <br></br>
                    Genevieve Ward-Wernet
                  </p>
                  <p className="Session-info-location">
                    Location: Exhibit Hall: Stage
                  </p>
                </div>
                <div className="Session-arrow">
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </div>
              {/* </a> */}
              {/* <a
                href="https://astc-web-companion-test.netlify.app/sessions/31"
                className="#modal-container-link"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              > */}
              <div className="modal-container-info-body-time">
                <p>2:45-3pm</p>
              </div>
              <div className="Session">
                <div className="Session-icon">
                  <span>
                    <i className="fa-regular fa-calendar"></i>
                  </span>
                </div>
                <div className="Session-info">
                  <p className="Session-info-title">
                    Dinosaurs Will Always Be Awesome (¡Y Accesibles Para Todos!)
                  </p>
                  <p className="Session-info-time">2:45-3pm</p>
                  <p className="Session-info-presenters">
                    Presenter:
                    <br></br>
                    Jimmy Waldron, MA.Ed
                    <br></br>
                    Nico Vargas
                    <br></br>
                    Rose Maldonado
                    <br></br>
                    Dean R. Lomax, PhD
                  </p>
                  <p className="Session-info-location">
                    Location: Exhibit Hall: Stage
                  </p>
                </div>
                <div className="Session-arrow">
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </div>
              {/* </a> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
