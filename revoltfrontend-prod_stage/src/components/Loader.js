import React from "react";

const Loader = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100vw",
          zIndex: "9999",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#6c757d",
          opacity: ".3",
          position: "fixed",
          top: "0px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          width: "100vw",
          gap: "20px",
          height: "100vh",
          zIndex: "9999",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "0px",
        }}
      >
        <div
          className="spinner-border"
          style={{ height: "25px", width: "25px" }}
        ></div>
        <div
          className="spinner-grow"
          style={{ height: "25px", width: "25px" }}
        ></div>
        <div
          className="spinner-grow"
          style={{ height: "25px", width: "25px" }}
        ></div>
      </div>
    </div>
  );
};

export default React.memo(Loader);
