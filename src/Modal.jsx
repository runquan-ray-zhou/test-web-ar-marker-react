import "./Modal.css";

export default function Modal() {
  return (
    <div
      id="modal-container"
      style={{
        display: "none",
        position: "absolute",
        top: "20%",
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
        <h2>HTML Modal Content</h2>
        <p>You can place HTML content here, like forms, images, or videos.</p>
        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Close</button>
        </a>
      </div>
    </div>
  );
}
