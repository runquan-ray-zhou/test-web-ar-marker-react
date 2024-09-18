import "./Modal.css";

export default function Modal() {
  return (
    <div
      id="modal-container"
      style={{
        display: "none",
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "200px",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        zIndex: 100,
      }}
    >
      <div
        className="modal-container-info"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="modal-container-info-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p>Find Presentations</p>
          <p>Location: S102D</p>
        </div>
        {/* <div className="modal-container-info-body">
          <div className="modal-container-info-body-button">
            <button>Happening Now</button>
            <button>Nearby</button>
          </div>
          <div className="modal-container-info-body-time">
            <p>1:50pm-2:05pm</p>
          </div>
          <div className="modal-container-info-body-session">
            <div className="Session-icon">
              <span>
                <i className="fa-regular fa-calendar"></i>
              </span>
            </div>
            <div className="Session-info">
              <div className="Session-name">
                <p>
                  Airborne Interactive: Elevating the Museum Experience with
                  Spatial Computing:
                </p>
              </div>
              <div className="Session-presenter">
                <p>Presenter:</p>
                <p>
                  Shiri Burson AYR Immersive, Chicago, Illinois, United States.
                </p>
              </div>
              <div className="Session-location">
                <p>Location:</p>
                <p>Exhibit Hall: Stage</p>
              </div>
            </div>
          </div>
        </div> */}

        <a
          href="https://astc-web-companion-test.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Close</button>
        </a>
      </div>
    </div>
  );
}
