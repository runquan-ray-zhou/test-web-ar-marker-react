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
      <div className="modal-container-info">
        <div className="modal-container-info-header">
          <p>Find Presentations</p>
          <p>Location: S102D</p>
        </div>
        <div className="modal-container-info-body">
          <div className="modal-container-info-body-button">
            <button>Happening Now</button>
            <button>Nearby</button>
          </div>
          <div>
            <p>9:00AM</p>
          </div>
          <div></div>
        </div>

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
