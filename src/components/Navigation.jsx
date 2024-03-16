import React, { useState } from "react";

const Navbar = () => {
  // State to manage the visibility of the full-page navigation
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navbarStyle = {
    overflow: "hidden",
    backgroundColor: "#333",
    position: "fixed",
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  };

  const companyStyle = {
    color: "white",
    padding: "14px 20px",
  };

  const reset = () => {
    localStorage.clear();
    window.location.reload();
    // setCurrentState("AddPeople");
  };

  return (
    <div style={navbarStyle}>
      <div style={companyStyle}>
        <header className="App-header">
          <h2>Money Splitter</h2>
        </header>
      </div>
      <button
        onClick={reset}
        style={{
          padding: "14px 20px",
          backgroundColor: "#1a1a1a",
          border: "none",
        }}
        title="Reset All"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-counterclockwise"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"
          />
          <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
        </svg>
      </button>
    </div>
  );
};

export default Navbar;
